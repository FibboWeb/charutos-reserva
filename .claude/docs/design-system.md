# Design System — Charutos Reserva

> Referência de design para o tema Shopify. Use este documento ao criar ou editar seções, snippets e assets.

---

## Identidade Visual

**Charutos Reserva** é uma charutaria premium brasileira. O visual transmite sofisticação, tradição e exclusividade — paleta escura com verde floresta, dourado envelhecido e tons de tabaco.

---

## Paleta de Cores

### Cores principais

| Token | Hex | Uso |
|-------|-----|-----|
| Verde Floresta (brand primary) | `#1A322C` | Botões CTA, backgrounds escuros, header, overlays |
| Ouro Envelhecido (accent) | `#C49A3C` | Destaques, badges premium, ícones de destaque, hover states |
| Tabaco/Couro (secondary) | `#8B5E3C` | Bordas ativas, elementos secundários, detalhes |

### Neutros

| Token | Hex | Uso |
|-------|-----|-----|
| Texto principal | `#1C1C1C` | Corpo de texto, títulos |
| Branco | `#FFFFFF` | Fundo principal, texto sobre escuro |
| Creme/Marfim | `#F5F0E8` | Fundo secundário, seções alternadas |
| Off-white quente | `#F8F4EE` | Overlays suaves, tooltips |
| Borda/Pergaminho | `#D4C5A9` | Bordas de cards, separadores |

### Configuração no tema Shopify (`settings_data.json`)

```json
"colors_accent_1":              "#1A322C",
"colors_accent_2":              "#C49A3C",
"colors_accent_3":              "#8B5E3C",
"colors_text":                  "#1C1C1C",
"colors_border":                "#D4C5A9",
"colors_outline_button_labels": "#1A322C",
"colors_solid_button_labels":   "#FFFFFF",
"colors_background_1":          "#FFFFFF",
"colors_background_2":          "#F5F0E8",
"colors_background_3":          "#1A322C",
"overlay_color":                "#F8F4EE",
"checkout_accent_color":        "#1A322C",
"checkout_button_color":        "#1A322C"
```

### Color Schemes do Shopify

| Scheme | Background | Uso |
|--------|-----------|-----|
| `background-1` | `#FFFFFF` | Seções padrão, cards de produto |
| `background-2` | `#F5F0E8` | Seções alternadas, FAQ, depoimentos |
| `accent-1` | `#1A322C` | Seções de destaque escuras, banners hero |

---

## Tipografia

### Fonte principal: **Inter**

Configurada em todos os slots do tema (header, body, additional).

```json
"type_header_font":    "inter_n4",
"type_body_font":      "inter_n4",
"type_additional_font":"inter_n4"
```

Google Fonts import:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
```

### Escala tipográfica

| Nível | Tamanho | Peso | Uso |
|-------|---------|------|-----|
| Display / H0 | `2.5rem+` | 700 | Banners hero, títulos principais |
| H1 | `2rem` | 600 | Títulos de seção |
| H2 | `1.5rem` | 600 | Subtítulos, cards |
| Body | `1rem` | 400 | Texto de corpo |
| Small | `0.875rem` | 400 | Labels, badges, metadata |
| Caption | `0.75rem` | 400 | Preços secundários, legenda |

---

## Componentes

### Botões

- **Primário**: fundo `#1A322C`, texto `#FFFFFF`, hover escurece para `#12221f`
- **Outline**: borda e texto `#1A322C`, fundo transparente
- **Destaque/Gold**: fundo `#C49A3C`, texto `#FFFFFF`
- Border-radius: `4px`

### Cards de Produto

- Fundo: `background-1` (`#FFFFFF`)
- Borda: `#D4C5A9`
- Badge de desconto: fundo `#C49A3C`, texto branco
- Badge esgotado: fundo `#8B5E3C`, texto branco

### Links e Destaques

- Links padrão: `#1A322C`
- Links hover: `#C49A3C`
- Sublinhado suave no hover

---

## Blog: `blog-rei-dos-charutos`

Handle do blog principal da loja. Usar este handle em todas as seções que referenciam blog posts.

---

## Estrutura de Seções da Home (`templates/index.json`)

Ordem atual das seções:
1. `slideshow` — banner hero
2. `suriya-grid-banner-2` — grid de categorias
3. `product-tab` — produtos em destaque
4. `dt-grid-banner` — banners promocionais
5. `dt-product-tab` — produtos do dia
6. `image-with-logo` — marcas parceiras
7. `dt-rich-text` — texto rico com imagem
8. `cartrek-product-tab` — produtos sugeridos
9. `testimonial` — depoimentos
10. `dt-collapsible-content` — FAQ (Perguntas Frequentes)
11. `arnold-featured-blog` — Blog (blog-rei-dos-charutos)
12. `dt-support-block` — bloco de suporte
13. `dt-instagram-gallery` — galeria Instagram

---

## Diretrizes Gerais

- **Nunca usar cores vibrantes/saturadas** sem aprovação — a marca é sóbria e premium
- **Evitar tipografia serifada** — Inter mantém modernidade com sobriedade
- **Imagens** devem ter tom quente (âmbar, sépia, verde escuro) para manter coerência
- **Espaçamento generoso** — seções com padding entre 60–120px
- **Manter consistência** com `color_scheme: background-1` como padrão e `accent-1` para seções de destaque escuras
