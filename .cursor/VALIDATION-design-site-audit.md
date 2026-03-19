# Validação: design-site-audit

Relatório de validação da skill `design-site-audit` conforme critérios do **create-skill**.

---

## ✅ Checklist de Qualidade

### Core Quality

| Critério | Status | Observação |
|----------|--------|------------|
| Description específica com termos-chave | ✅ | Inclui: Playwright MCP, paleta de cores, fontes, espaçamentos, tokens de design, design system |
| Description inclui WHAT e WHEN | ✅ | WHAT: extrai e gera documentação. WHEN: analisar design, criar design system, documentar identidade visual |
| Escrita em terceira pessoa | ⚠️ | "Use quando precisar" é imperativo. Sugestão: "Aplicar quando o usuário fornece URL para análise de design" |
| SKILL.md < 500 linhas | ✅ | ~192 linhas |
| Terminologia consistente | ✅ | design tokens, paleta, cores, fontes, espaçamentos — uso uniforme |
| Exemplos concretos | ✅ | URL exemplo.com + fluxo passo a passo |

### Estrutura

| Critério | Status | Observação |
|----------|--------|------------|
| Referências um nível | ✅ | Apenas `[reference.md](reference.md)` |
| Progressive disclosure | ✅ | Workflow principal no SKILL.md; template detalhado no reference.md |
| Workflow com passos claros | ✅ | Passos 1–6 numerados e descritos |
| Sem informação sensível ao tempo | ✅ | Nenhuma data ou versão específica |

### Anti-patterns

| Critério | Status | Observação |
|----------|--------|------------|
| Sem paths estilo Windows | ✅ | Usa `reference.md` |
| Nome válido (lowercase, hífens, ≤64 chars) | ✅ | `design-site-audit` |

---

## Pontos Fortes

1. **Frontmatter completo** — `name` e `description` presentes e válidos
2. **Workflow bem definido** — 6 passos com chamadas MCP explícitas
3. **Script de extração completo** — JavaScript pronto para `browser_evaluate`, com conversão RGB→HEX
4. **Template de saída** — reference.md com estrutura detalhada para documentação
5. **Pré-requisitos explícitos** — Playwright MCP, browser_install, URL

---

## Melhorias Sugeridas

### 1. Descrição (menor)

Ajustar para terceira pessoa mais estrita:

```yaml
# Atual
description: Navega em sites com o Playwright MCP, extrai paleta de cores... Use quando precisar analisar...

# Sugestão
description: Navega em sites com o Playwright MCP, extrai paleta de cores, fontes, espaçamentos e tokens de design, e gera documentação detalhada. Aplicar quando o usuário fornece URL para análise de design, criação de design system a partir de site existente, ou documentação de identidade visual para replicação.
```

### 2. Redundância no intro

A linha 9 repete o que já está na description. Pode ser removida ou reduzida:

```markdown
# Design Site Audit

Skill especialista em extrair design tokens...
```

→ Pode virar apenas: "Extrai design tokens de sites via Playwright MCP e gera documentação estruturada."

### 3. Progressive disclosure do script (opcional)

O script JavaScript (~90 linhas) poderia ir para `reference.md` ou `scripts/extract-tokens.js`, com um resumo no SKILL.md. Como é essencial para o fluxo, manter inline também é aceitável — a skill está bem abaixo de 500 linhas.

### 4. Verificar schema do MCP antes de chamar

O SKILL.md menciona `call_mcp_tool` mas não orienta a checar o schema do Playwright MCP antes de chamar. As regras do projeto já exigem isso para MCP em geral — vale reforçar na skill:

```markdown
**Importante**: Antes de chamar `browser_navigate`, `browser_evaluate`, etc., verificar o schema em `mcps/user-playwright/tools/` para confirmar parâmetros.
```

---

## Conclusão

| Categoria | Resultado |
|-----------|-----------|
| **Aprovada** | Sim |
| **Conformidade** | ~95% |
| **Ações obrigatórias** | Nenhuma |
| **Ações recomendadas** | Ajuste menor na description; reduzir redundância no intro |

A skill está bem estruturada, segue os princípios do create-skill e está pronta para uso. As melhorias são incrementais.
