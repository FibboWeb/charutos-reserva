# Scripts do tema

## Criar página de comparação

O script `create-compare-page.sh` cria a página "Comparar" no Shopify via API.

### Pré-requisitos

1. **App personalizado** no Shopify com permissão `write_content`
2. **Admin API access token** do app

### Como obter o token

1. Admin → **Configurações** → **Aplicativos e canais de vendas**
2. **Desenvolver aplicativos** → **Criar app** → **Criar app personalizado**
3. Em **Configuração** → **Escopos da API**: marque `write_content` (e `read_content`)
4. **Instalar app** na loja
5. Copie o **Admin API access token**

### Executar

```bash
SHOPIFY_STORE=charutos-reserva.myshopify.com \
SHOPIFY_ACCESS_TOKEN=shpat_xxxxxxxxxxxx \
./scripts/create-compare-page.sh
```

Substitua pelos valores da sua loja.

### Alternativa manual

Se preferir criar manualmente:

1. Admin → **Páginas** → **Adicionar página**
2. Título: **Comparar**
3. Conteúdo: deixe em branco
4. Em **Modelo de tema** (ou Template): selecione **compare**
5. Em **URL e metadados**: handle deve ser `compare`
6. Salvar e publicar
