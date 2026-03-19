# Exemplos de Uso — Design Site Audit

## Exemplo 1: Chamada do MCP

```json
// 1. Navegar
{
  "server": "user-playwright",
  "toolName": "browser_navigate",
  "arguments": { "url": "https://tailwindcss.com" }
}

// 2. Extrair design
{
  "server": "user-playwright",
  "toolName": "browser_evaluate",
  "arguments": {
    "function": "() => { /* script do SKILL.md */ }"
  }
}
```

## Exemplo 2: Resposta Típica da Extração

```json
{
  "url": "https://exemplo.com",
  "title": "Exemplo - Landing Page",
  "cssVariables": {
    "--primary": "#3b82f6",
    "--spacing-unit": "8px"
  },
  "colors": [
    { "raw": "rgb(59, 130, 246)", "hex": "#3b82f6" },
    { "raw": "rgb(17, 24, 39)", "hex": "#111827" }
  ],
  "fonts": ["Inter", "system-ui", "sans-serif"],
  "fontSizes": ["12px", "14px", "16px", "18px", "24px", "32px"],
  "spacings": ["padding: 16px", "gap: 24px", "margin: 32px"],
  "viewport": { "width": 1920, "height": 1080 },
  "meta": {
    "description": "Site de exemplo",
    "themeColor": "#3b82f6"
  }
}
```

## Exemplo 3: Trecho de Documentação Gerada

```markdown
## 2. Paleta de Cores

| Cor | HEX | Uso Sugerido |
|-----|-----|--------------|
| Azul primário | #3b82f6 | CTAs, links |
| Cinza escuro | #111827 | Texto principal |
| Branco | #ffffff | Fundo |
```

## Exemplo 4: Prompt do Usuário

- "Analise o design do https://stripe.com e gere a documentação"
- "Extraia a paleta de cores e fontes do site X para eu replicar"
- "Faça um audit de design do [URL] e documente tudo para o dev"
