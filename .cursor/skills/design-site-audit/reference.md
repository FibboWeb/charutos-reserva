# Template: Documentação de Design Audit

Use este template ao gerar o arquivo `DESIGN-AUDIT-<nome>.md`. Substitua os placeholders pelos dados extraídos.

---

```markdown
# Design Audit — [NOME_DO_SITE]

> Documentação gerada automaticamente para guiar o desenvolvimento baseado no design do site de referência.

## 1. Resumo do Site

| Campo | Valor |
|-------|-------|
| **URL** | [URL_ANALISADA] |
| **Título** | [TITULO_PAGINA] |
| **Descrição** | [META_DESCRIPTION] |
| **Theme Color** | [META_THEME_COLOR] |
| **Viewport** | [WIDTH] x [HEIGHT] px |
| **Data da Análise** | [DATA] |

---

## 2. Paleta de Cores

### Cores Extraídas

| Cor | HEX | RGB | Uso Sugerido |
|-----|-----|-----|--------------|
| [NOME] | [HEX] | [RGB] | texto primário / fundo / destaque / etc |
| ... | ... | ... | ... |

### Conversão RGB → HEX

Para cores em formato `rgb(r, g, b)` ou `rgba(r, g, b, a)`:
```
HEX = # + (r.toString(16).padStart(2,'0') + g.toString(16).padStart(2,'0') + b.toString(16).padStart(2,'0'))
```

### Cores Principais (inferir do contexto)

- **Primária**: [cor mais usada para CTAs/links]
- **Secundária**: [cor complementar]
- **Fundo**: [background principal]
- **Texto**: [cor do texto principal]
- **Texto Secundário**: [cor de texto muted]

---

## 3. Tipografia

### Fontes Utilizadas

| Font Family | Uso |
|-------------|-----|
| [FONT_1] | [onde aparece] |
| [FONT_2] | [onde aparece] |

### Tamanhos de Fonte

| Tamanho | Uso Típico |
|---------|------------|
| [ex: 12px] | labels, captions |
| [ex: 14px] | corpo de texto |
| [ex: 16px] | parágrafo padrão |
| [ex: 18px] | subtítulos |
| [ex: 24px] | títulos |
| [ex: 32px+] | headings principais |

### Pesos de Fonte (font-weight)

- [listar pesos encontrados: 400, 500, 600, 700, etc]

### Importação (Google Fonts)

```html
<link href="https://fonts.googleapis.com/css2?family=[FONT_NAME]:wght@[WEIGHTS]&display=swap" rel="stylesheet">
```

---

## 4. Espaçamentos

### Padrões Encontrados

| Propriedade | Valores | Uso |
|-------------|---------|-----|
| padding | [valores] | [contexto] |
| margin | [valores] | [contexto] |
| gap | [valores] | [contexto] |

### Escala de Espaçamento Sugerida

```
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
--spacing-2xl: 48px;
```

*Ajustar conforme valores reais extraídos.*

---

## 5. CSS Variables (Design Tokens)

### Variáveis Extraídas do :root

```css
:root {
  /* Cores */
  /* [--var-name: value;] */
  
  /* Tipografia */
  /* [--font-*: value;] */
  
  /* Espaçamento */
  /* [--spacing-*: value;] */
  
  /* Outros */
  /* [--*: value;] */
}
```

*Listar todas as variáveis CSS encontradas em `cssVariables`.*

---

## 6. Layout e Estrutura

### Breakpoints (inferir do viewport)

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Grid/Flex

- [Observações sobre layout: grid columns, flex direction, etc]

---

## 7. Screenshots de Referência

- `design-audit-screenshot.png` — captura full page da análise

---

## 8. Recomendações para Desenvolvimento

1. **Cores**: Usar as variáveis CSS ou a paleta HEX documentada
2. **Fontes**: Importar via Google Fonts ou CDN conforme listado
3. **Espaçamentos**: Seguir a escala documentada para consistência
4. **Tokens**: Criar arquivo `tokens.css` ou `design-tokens.json` com os valores
5. **Responsividade**: Aplicar breakpoints conforme estrutura observada

---

## 9. Checklist do Desenvolvedor

- [ ] Configurar paleta de cores no projeto
- [ ] Importar e aplicar fontes
- [ ] Definir escala de espaçamento
- [ ] Criar variáveis CSS com os tokens
- [ ] Validar contra screenshots de referência
```

---

## Função Auxiliar: RGB para HEX

Para incluir no processo de geração da documentação:

```javascript
function rgbToHex(rgb) {
  if (rgb.startsWith('#')) return rgb;
  const match = rgb.match(/\d+/g);
  if (!match) return rgb;
  const [r, g, b] = match.map(Number);
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}
```
