# AGENTS.md — Charutos Reserva (Shopify Theme)

Tema Shopify Online Store 2.0 da loja **Charutos Reserva** (charutaria premium BR). Trabalho principal: seções, snippets, assets e templates JSON — merchants montam páginas no Theme Editor.

## Estrutura do repositório

```
assets/       # CSS, JS e estáticos (base.css, custom.css, global.js, Swiper, jQuery…)
config/       # settings_schema.json + settings_data.json
layout/       # theme.liquid, password.liquid
locales/      # i18n (en.default.*, pt-BR.*, etc.)
sections/     # ~100 seções com {% schema %}
snippets/     # ~160 fragmentos via {% render %}
templates/    # templates JSON OS2.0 (+ customers/*.liquid, gift_card.liquid)
scripts/      # utilitários locais (ex.: create-menus.js) — não faz parte do tema publicado
```

Não há pasta `blocks/` nem `package.json` / `shopify.theme.toml`. CSS/JS vivem em `assets/`, não em `{% stylesheet %}` / `{% javascript %}` de forma generalizada.

## Docs internas

- `.claude/docs/design-system.md` — paleta, tipografia, home, blog
- `.claude/docs/shopify-architecture.md` — referência Liquid/schema Shopify (genérica; adapte ao padrão deste tema)

## Design (resumo)

| Token | Hex | Uso |
|-------|-----|-----|
| Verde floresta | `#1A322C` | CTA, header, accent-1 |
| Ouro | `#C49A3C` | Destaques, badges |
| Tabaco | `#8B5E3C` | Secundário |
| Creme | `#F5F0E8` | background-2 |
| Borda | `#D4C5A9` | Cards / separadores |

Fonte: **Inter**. Blog principal: handle `blog-rei-dos-charutos`. Evitar cores saturadas e tipografia serifada.

## Como trabalhar neste tema

1. **Customizações visuais globais** → preferir `assets/custom.css` (já carregado em `layout/theme.liquid` após `base.css`).
2. **Nova seção** → `sections/*.liquid` com `{% schema %}` + CSS/JS em `assets/` referenciados via `stylesheet_tag` / `script_tag` / `asset_url`.
3. **Reuso sem settings no editor** → `snippets/` + `{% render 'nome', param: value %}`.
4. **Templates JSON** (`templates/*.json`, `config/settings_data.json`) podem ser sobrescritos pelo Theme Editor — editar com cautela.
5. **Textos** → `{{ 'chave' | t }}`; novas chaves em `locales/en.default.json` (e `pt-BR.json` quando o texto for da loja BR). Schema labels em `*.schema.json`.
6. **Assets globais já no layout**: jQuery, `global.js`, Swiper, WOW, Font Awesome, `dT_bundle*`, wishlist/compare, `dt-theme.js`. Não duplicar libs.

## Convenções Liquid

```liquid
{%- comment -%} Preferir trim com - quando fizer sentido {%- endcomment -%}
{% render 'card-product', product: product %}

{{ 'arquivo.css' | asset_url | stylesheet_tag }}
<script src="{{ 'arquivo.js' | asset_url }}" defer="defer"></script>

{{ image | image_url: width: 1200 | image_tag: loading: 'lazy', alt: image.alt }}
```

- Usar `render`, não `include`.
- Sempre `{{ content_for_header }}` / `{{ content_for_layout }}` no layout.
- Settings de uma propriedade CSS → variável CSS; várias propriedades → classes.
- Não inventar `blocks/` theme-block nem APIs que este tema não usa.

## Home (`templates/index.json`)

Ordem típica: slideshow → suriya-grid-banner-2 → product-tab → dt-grid-banner → dt-product-tab → image-with-logo → dt-rich-text → cartrek-product-tab → testimonial → dt-collapsible-content → arnold-featured-blog → dt-support-block → dt-instagram-gallery.

## O que não fazer

- Não commitar `.env` (já no `.gitignore`).
- Não “modernizar” o tema inteiro para OS2.0 theme blocks / `{% stylesheet %}` sem pedido explícito.
- Não alterar `settings_data.json` ou JSON de templates só para “organizar” — risco de conflito com o admin.
- Não adicionar dependências npm; o tema é Liquid + assets estáticos.
- Não hardcodar cores fora da paleta / color schemes do tema.

## Checklist rápido

- [ ] Mudança na seção/snippet certa (não no template JSON se o editor puder sobrescrever)
- [ ] CSS custom em `custom.css` ou asset da seção
- [ ] Traduções atualizadas
- [ ] Visual alinhado ao design system
- [ ] Sem regressão em mobile (viewport e imagens mobile nos banners)
