# Design Audit — Charutos Reserva

> Documentação gerada automaticamente para guiar o desenvolvimento baseado no design do site de referência.

## 1. Resumo do Site

| Campo | Valor |
|-------|-------|
| **URL** | https://charutosreserva.com.br/ |
| **Título** | Charutos Reserva - Charutos Exclusivos e Acessórios de Qualidade |
| **Descrição** | Explore a Charutos Reserva e encontre uma seleção única de charutos, desde clássicos até edições limitadas, além de acessórios essenciais. Compre online e receba em casa! |
| **Theme Color** | Não definido |
| **Viewport** | 1920 x 961 px |
| **Data da Análise** | 16 de março de 2026 |

---

## 2. Paleta de Cores

### Cores Extraídas (Principais)

| Cor | HEX | RGB | Uso Sugerido |
|-----|-----|-----|--------------|
| Verde Escuro (Dark) | `#1a322c` | rgb(26, 50, 44) | Header, footer, texto primário, CTAs |
| Dourado (Accent) | `#d4b064` | rgb(212, 176, 100) | Botões secundários, links hover, destaques |
| Branco | `#ffffff` | rgb(255, 255, 255) | Fundo principal, texto em fundos escuros |
| Cinza Claro | `#fafafa` | hsl(0, 0%, 98%) | Fundo secundário, footer |
| Cinza Médio | `#959595` | rgb(149, 149, 149) | Texto secundário, placeholders |
| Verde Sucesso | `#64cd82` | rgb(100, 205, 130) | Botões "Adicionar ao carrinho", alertas positivos |
| Vermelho Oferta | `#e93d3d` | rgb(233, 61, 61) | Labels de promoção, preços antigos riscados |
| Azul Preço | `#1a3945` | rgb(26, 57, 69) | Preços dos produtos |
| Verde Escuro Produto | `#12262f` | rgb(18, 38, 47) | Labels de produto |
| Dourado Escuro | `#c79b2f` | rgb(199, 155, 47) | Hover em botões dourados |
| Cinza Borda | `#efefef` | rgb(239, 239, 239) | Bordas, divisores |
| Cinza Input | `#f2f2f2` | rgb(242, 242, 242) | Background de inputs |

### Cores Principais (Design Tokens)

- **Primária (Dark)**: `#1a322c` — header, footer, navegação, texto principal
- **Secundária (Accent)**: `#d4b064` — botões, links hover, destaques, CTAs secundários
- **Fundo**: `#ffffff` — background principal da página
- **Fundo Secundário**: `#fafafa` — footer, áreas alternadas
- **Texto**: `#1a322c` — texto principal
- **Texto Secundário**: `#959595` — labels, placeholders, texto muted
- **CTA Positivo**: `#64cd82` — botões "Adicionar ao carrinho"
- **Destaque Negativo**: `#e93d3d` — ofertas, promoções, erros

### Gradientes

```css
/* Gradiente tema (banner, destaques) */
--theme_bg_gradient: linear-gradient(135deg, #E84A93 20%, #FBC34A 100%);

/* Gradiente escuro */
--dark_gradient: linear-gradient(320deg, rgba(232, 74, 147, 1) 4%, rgba(239, 179, 76, 1) 100%);

/* Gradiente claro */
--light_gradient: linear-gradient(120deg, rgba(244, 244, 244, 1), rgba(239, 179, 76, .51) 100%);
```

---

## 3. Tipografia

### Fontes Utilizadas

| Font Family | Uso |
|-------------|-----|
| **Inter, sans-serif** | Fonte principal do site (corpo, títulos, botões) |
| **Open Sans, Arial, sans-serif** | Fallback em alguns componentes |
| **GTStandard-M, sans-serif** | Possivelmente em elementos específicos |

### Tamanhos de Fonte

| Tamanho | Uso Típico |
|---------|------------|
| 8px | Labels muito pequenos, badges |
| 10px | Micro-texto |
| 12px | Labels, captions, sale labels |
| 13px | Breadcrumbs, texto auxiliar |
| 14px | Corpo de texto padrão, botões |
| 16px | Parágrafo destacado |
| 18px | Subtítulos, lead text |
| 20px | H4 |
| 21px | H3 |
| 22px | H2 mobile |
| 24px | H2 desktop |
| 32px | H1 desktop |
| 27.5px | Títulos especiais |

### Pesos de Fonte (font-weight)

- **400** — texto regular
- **700** — texto em negrito, preços, botões
- **800** — títulos
- **900** — títulos principais

### Importação (Google Fonts)

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800;900&display=swap" rel="stylesheet">
```

---

## 4. Espaçamentos

### Padrões Encontrados

| Propriedade | Valores | Uso |
|-------------|---------|-----|
| padding | 14px 22px | Botões, elementos interativos |
| padding | 16.8px 22.5px | Botões principais |
| padding | 0px 30px | Container horizontal |
| padding | 12px, 16px | Cards, seções |
| margin | 0px 24px | Espaçamento entre colunas |
| margin | 0px 0px 12px | Entre blocos |
| margin | 0px 0px 26px | Entre seções |
| gap | 16px | Grid de produtos |
| content_p | 25px | Padding do conteúdo |
| nav_dist | 24px | Navegação |
| footer_bottom_p | 20px | Rodapé |

### Escala de Espaçamento (Design Tokens)

```css
--size_8: 8px;
--size_10: 10px;
--size_12: 12px;
--size_14: 14px;
--size_16: 16px;
--size_18: 18px;
--size_20: 20px;
--size_24: 24px;
--size_32: 32px;
--content_p: 25px;
--btn_pv: 16.8px;
--btn_ph: 22.5px;
--nav_dist: 24px;
```

---

## 5. CSS Variables (Design Tokens)

### Variáveis Extraídas do :root (Principais)

```css
:root {
  /* Cores base */
  --white: #FFFFFF;
  --black: #1a322c;
  --dark: #1a322c;
  --light: #fafafa;
  --sand: #fafafa;
  --gray_text: #959595;
  --coal: hsl(0, 0%, 20%);

  /* Cores de tema */
  --primary_text: var(--black);
  --primary_bg: var(--white);
  --secondary_bg: #d4b064;
  --secondary_bg_dark: #c99c3c;
  --secondary_btn_text: #ffffff;
  --accent: #d4b064;
  --accent_bg: var(--accent);
  --accent_fg: var(--white);

  /* Alertas e ofertas */
  --alert_error: #e93d3d;
  --sale_label_bg: #e93d3d;
  --sale_label_text: #FFFFFF;
  --tertiary_bg: #64cd82;

  /* Tipografia */
  --main_fz: 14px;
  --main_ff: Inter, sans-serif;
  --main_ff_h: Inter, sans-serif;
  --main_fw: 400;
  --main_fw_strong: 700;
  --main_fw_h: 800;
  --main_lh: 1.8571428571;
  --main_lh_h: 1.1875;
  --main_h1: 32px;
  --main_h2: 24px;
  --main_h3: 21px;
  --main_h4: 18px;

  /* Mobile */
  --mob_h1: 22px;
  --mob_h2: 22px;
  --mob_h3: 22px;
  --mob_h4: 15px;

  /* Botões */
  --btn_br: 4px;
  --btn_pv: 16.8px;
  --btn_ph: 22.5px;
  --btn_fz: var(--size_14_f);

  /* Layout */
  --glw: 1280px;
  --ghw: 1280px;
  --header_mih: 69px;
  --header_mih_m: 45px;
  --logo_h: 130px;
  --logo_h_m: 88px;

  /* Inputs */
  --custom_input_bg: var(--white);
  --custom_input_bd: rgba(26, 50, 44, .08);
  --custom_input_fg: var(--dark);

  /* Footer */
  --custom_footer_bg: var(--sand);
  --custom_footer_fg: var(--primary_text);
  --custom_footer_fg_hover: var(--secondary_bg);
}
```

---

## 6. Layout e Estrutura

### Breakpoints

- **Mobile**: < 768px (header_mih_m: 45px, logo_h_m: 88px)
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px (viewport analisado: 1920px)

### Grid

- **Largura máxima**: 1280px (`--glw`, `--ghw`)
- **Padding conteúdo**: 25px
- **Produtos**: Grade responsiva com gap de 16px

### Componentes Principais

- **Header**: Altura mínima 69px (desktop), 45px (mobile)
- **Logo**: 130px (desktop), 88px (mobile)
- **Barra superior**: 34px de altura (promoções)
- **Footer**: Fundo `#fafafa`, borda `#fafafa`

---

## 7. Screenshots de Referência

- `design-audit-charutosreserva.png` — captura full page da análise

---

## 8. Recomendações para Desenvolvimento

1. **Cores**: Usar as variáveis CSS documentadas (`--dark`, `--accent`, `--secondary_bg`) para manter consistência com o tema Shopify
2. **Fontes**: Importar Inter via Google Fonts com pesos 400, 700, 800 e 900
3. **Espaçamentos**: Seguir a escala `--size_*` e `--btn_*` para botões e containers
4. **Tokens**: O tema já possui design tokens extensos; reutilizar `:root` existente ao customizar
5. **Responsividade**: Aplicar `--mob_*` para breakpoints mobile
6. **Botões**: Border-radius 4px, padding 16.8px 22.5px, fonte 14px bold
7. **CTAs**: Verde `#64cd82` para "Adicionar ao carrinho", dourado `#d4b064` para "Ver Todos"

---

## 9. Checklist do Desenvolvedor

- [ ] Configurar paleta de cores no projeto (dark #1a322c, accent #d4b064)
- [ ] Importar e aplicar fonte Inter
- [ ] Definir escala de espaçamento (8, 12, 16, 24, 32px)
- [ ] Criar/reutilizar variáveis CSS com os tokens
- [ ] Validar header (69px) e logo (130px) no desktop
- [ ] Validar botões (border-radius 4px, padding correto)
- [ ] Validar contra screenshots de referência
