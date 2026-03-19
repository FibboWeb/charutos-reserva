---
name: design-site-audit
description: Navega em sites com o Playwright MCP, extrai paleta de cores, fontes, espaçamentos e tokens de design, e gera documentação detalhada para guiar o desenvolvimento. Use quando precisar analisar o design de um site de referência, criar design system a partir de um site existente, ou documentar a identidade visual para replicação.
---

# Design Site Audit

Skill especialista em extrair design tokens de sites via navegação com Playwright MCP. Produz documentação estruturada para outro agente seguir no desenvolvimento.

## Quando Usar

- Usuário fornece URL de site para análise de design
- Precisa replicar identidade visual de um site de referência
- Criar design system baseado em site existente
- Documentar paleta, tipografia e padrões para desenvolvimento

## Pré-requisitos

1. **Playwright MCP** deve estar habilitado (user-playwright)
2. Se o navegador não estiver instalado, chamar `browser_install` primeiro
3. Receber a URL do site a ser analisado

---

## Workflow de Extração

### Passo 1: Navegar até o site

```
call_mcp_tool → server: user-playwright, toolName: browser_navigate
arguments: { "url": "<URL_FORNECIDA>" }
```

### Passo 2: Capturar snapshot da página

```
call_mcp_tool → server: user-playwright, toolName: browser_snapshot
```

Guarda a estrutura acessível para referência.

### Passo 3: Extrair design tokens via JavaScript

Usar `browser_evaluate` com a função abaixo para extrair cores, fontes e tokens:

```javascript
() => {
  const root = document.documentElement;
  const computed = getComputedStyle(root);
  
  // CSS Variables (design tokens)
  const cssVars = {};
  const sheets = Array.from(document.styleSheets);
  for (const sheet of sheets) {
    try {
      const rules = Array.from(sheet.cssRules || []);
      for (const rule of rules) {
        if (rule.selectorText && (rule.selectorText.includes(':root') || rule.selectorText.includes('html'))) {
          const css = rule.cssText;
          const varMatches = css.matchAll(/--([^:]+):\s*([^;]+)/g);
          for (const m of varMatches) cssVars[m[1].trim()] = m[2].trim();
        }
      }
    } catch (e) {}
  }
  
  // Cores únicas da página
  const colors = new Set();
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
  let node;
  while (node = walker.nextNode()) {
    const style = getComputedStyle(node);
    ['color', 'backgroundColor', 'borderColor', 'fill', 'stroke'].forEach(prop => {
      const val = style[prop];
      if (val && val !== 'rgba(0, 0, 0, 0)' && val !== 'transparent') colors.add(val);
    });
  }
  
  // Fontes únicas
  const fonts = new Set();
  const fontWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
  let fn;
  while (fn = fontWalker.nextNode()) {
    const f = getComputedStyle(fn).fontFamily;
    if (f) fonts.add(f);
  }
  
  // Tamanhos de fonte
  const fontSizes = new Set();
  const fsWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
  let fs;
  while (fs = fsWalker.nextNode()) {
    const size = getComputedStyle(fs).fontSize;
    if (size) fontSizes.add(size);
  }
  
  // Espaçamentos comuns
  const spacings = new Set();
  const spWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
  let sp;
  while (sp = spWalker.nextNode()) {
    const s = getComputedStyle(sp);
    ['padding', 'paddingTop', 'paddingBottom', 'margin', 'marginTop', 'marginBottom', 'gap'].forEach(p => {
      const v = s[p];
      if (v && v !== '0px') spacings.add(`${p}: ${v}`);
    });
  }
  
  // Converter RGB/RGBA para HEX
  const toHex = (c) => {
    if (c.startsWith('#')) return c;
    const m = c.match(/\d+/g);
    if (!m || m.length < 3) return c;
    return '#' + [m[0], m[1], m[2]].map(x => parseInt(x).toString(16).padStart(2, '0')).join('');
  };
  const colorsWithHex = Array.from(colors).map(c => ({ raw: c, hex: toHex(c) }));

  return {
    url: location.href,
    title: document.title,
    cssVariables: cssVars,
    colors: colorsWithHex,
    fonts: Array.from(fonts),
    fontSizes: Array.from(fontSizes),
    spacings: Array.from(spacings).slice(0, 50),
    viewport: { width: innerWidth, height: innerHeight },
    meta: {
      description: document.querySelector('meta[name="description"]')?.content || null,
      themeColor: document.querySelector('meta[name="theme-color"]')?.content || null
    }
  };
}
```

### Passo 4: Screenshot de referência

```
call_mcp_tool → server: user-playwright, toolName: browser_take_screenshot
arguments: { "type": "png", "fullPage": true, "filename": "design-audit-screenshot.png" }
```

### Passo 5: Navegar em páginas internas (opcional)

Se houver links principais (header, footer), navegar em 1-2 páginas adicionais e repetir extração para capturar variações de design.

### Passo 6: Gerar documentação

Criar arquivo `DESIGN-AUDIT-<nome-site>.md` no projeto usando o template em [reference.md](reference.md).

---

## Estrutura da Documentação de Saída

A documentação deve incluir:

| Seção | Conteúdo |
|-------|----------|
| **Resumo** | URL, título, descrição do site |
| **Paleta de Cores** | Cores extraídas em HEX, RGB e uso sugerido |
| **Tipografia** | Fontes, tamanhos, pesos |
| **Espaçamentos** | Padrões de padding, margin, gap |
| **CSS Variables** | Tokens customizados encontrados |
| **Meta** | theme-color, viewport |
| **Screenshots** | Referência visual anexada |
| **Recomendações** | Como aplicar no desenvolvimento |

---

## Dicas de Extração

- **Cores**: Converter `rgb/rgba` para HEX quando possível para facilitar uso em CSS
- **Fontes**: Identificar fontes do Google Fonts ou sistema; incluir fallbacks
- **Prioridade**: Se houver muitas variáveis CSS, priorizar as que parecem design tokens (--color-*, --spacing-*, --font-*)
- **Limpeza**: Remover duplicatas e valores genéricos (inherit, initial)

---

## Exemplo de Uso

**Entrada do usuário**: "Analise o design do site https://exemplo.com e gere a documentação"

**Fluxo**:
1. `browser_navigate` → https://exemplo.com
2. `browser_snapshot` → estrutura
3. `browser_evaluate` → script de extração
4. `browser_take_screenshot` → fullPage
5. Escrever `DESIGN-AUDIT-exemplo.md` com os dados + template

---

## Recursos Adicionais

- Template completo da documentação: [reference.md](reference.md)
