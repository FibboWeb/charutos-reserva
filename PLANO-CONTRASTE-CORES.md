# Plano de Correção de Contraste de Cores

> Documento criado para corrigir problemas de acessibilidade (WCAG AA) e legibilidade no site Charutos Reserva.

## Referência: WCAG 2.1 AA

- **Texto normal**: contraste mínimo 4.5:1
- **Texto grande** (18px+ ou 14px bold+): contraste mínimo 3:1
- **Componentes de UI**: contraste mínimo 3:1

---

## 1. Texto Secundário (Vendor, Tipo, Labels, Paginação)

| Estado | Cor | HEX | Contraste em #FFF | Status |
|-------|-----|-----|-------------------|--------|
| **Como está** | Cinza claro | `#959595` | ~2.9:1 | ❌ Falha |
| **Como deve ser** | Cinza médio | `#6b6b6b` | ~5.5:1 | ✅ Passa |

**Onde afeta:** "Exibindo 1-8 de 25 resultados", labels como "Tradicional", "Piteira", vendor, product type nos cards.

**Correção:** Alterar `colors_accent_3` em `config/settings_data.json`.

---

## 2. Estrelas de Avaliação (Rating)

| Estado | Cor | HEX | Contraste em #FFF | Status |
|-------|-----|-----|-------------------|--------|
| **Como está** | Amarelo claro | `#fec42d` | ~1.5:1 | ❌ Falha |
| **Como deve ser** | Dourado escuro | `#b8860b` | ~4.5:1 | ✅ Passa |

**Onde afeta:** Ícones de estrelas nos cards de produto.

**Correção:** Alterar cor em `assets/base.css` (classe `.dt-sc-rating`).

---

## 3. Preço Original Riscado (Compare at Price)

| Estado | Cor | HEX | Contraste em #FFF | Status |
|-------|-----|-----|-------------------|--------|
| **Como está** | Dourado claro | `#d4b064` | ~2.5:1 | ❌ Falha |
| **Como deve ser** | Dourado escuro | `#8b6914` | ~4.5:1 | ✅ Passa |

**Onde afeta:** Preço antigo com strikethrough em produtos em promoção.

**Correção:** Adicionar override em `assets/base.css` para `.price--on-sale .price-item--regular`.

---

## 4. Botão Visualização Rápida (Quick View)

| Estado | Fundo | Texto | Contraste | Status |
|--------|-------|-------|-----------|--------|
| **Como está** | Tan/dourado `#d4b064` | Escuro `#1a322c` | ~4.2:1 | ✅ OK |
| **Como deve ser** | Manter | Manter | - | ✅ Sem alteração |

---

## 5. Botão Add to Cart (em cards)

| Estado | Fundo | Ícone/Texto | Contraste | Status |
|--------|-------|-------------|-----------|--------|
| **Como está** | `--gradient-base-accent-2` | Branco | Depende do tema | Verificar |
| **Como deve ser** | Garantir fundo escuro OU texto escuro | Mín. 4.5:1 | ✅ Ajustar se necessário |

O tema usa `colors_accent_2: #d4b064` (dourado). Texto branco em dourado ≈ 2.8:1 — falha.  
**Recomendação:** Usar texto escuro (#1a322c) em botões dourados, ou escurecer o dourado para fundos com texto branco.

---

## Resumo das Alterações Aplicadas

1. ✅ `colors_accent_3`: #959595 → #6b6b6b
2. ✅ Estrelas de rating: #fec42d → #b8860b
3. ✅ Preço riscado: override para #8b6914
4. ⚠️ Botões com fundo dourado: avaliar uso de texto escuro no Theme Editor

---

## Validação

Após as alterações, validar com:
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Extensão [WAVE](https://wave.webaim.org/extension/) ou [axe DevTools](https://www.deque.com/axe/devtools/)
