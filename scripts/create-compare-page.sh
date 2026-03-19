#!/bin/bash
# Script para criar a página de comparação de produtos no Shopify
# Requer: SHOPIFY_STORE e SHOPIFY_ACCESS_TOKEN
#
# Como obter o token:
# 1. Admin Shopify → Configurações → Aplicativos e canais de vendas
# 2. Desenvolver aplicativos → Criar app → Criar app personalizado
# 3. Configurar escopos: read_content, write_content
# 4. Instalar o app e copiar o Admin API access token

set -e

if [ -z "$SHOPIFY_STORE" ] || [ -z "$SHOPIFY_ACCESS_TOKEN" ]; then
  echo "Uso: SHOPIFY_STORE=loja.myshopify.com SHOPIFY_ACCESS_TOKEN=shpat_xxx ./scripts/create-compare-page.sh"
  echo ""
  echo "Variáveis necessárias:"
  echo "  SHOPIFY_STORE       - URL da loja (ex: charutos-reserva.myshopify.com)"
  echo "  SHOPIFY_ACCESS_TOKEN - Token da Admin API (escopo: write_content)"
  exit 1
fi

# Remove protocolo se presente
STORE="${SHOPIFY_STORE#https://}"
STORE="${STORE#http://}"
STORE="${STORE%.myshopify.com}.myshopify.com"

echo "Criando página Compare em $STORE..."

RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
  "https://${STORE}/admin/api/2024-01/pages.json" \
  -H "Content-Type: application/json" \
  -H "X-Shopify-Access-Token: ${SHOPIFY_ACCESS_TOKEN}" \
  -d '{
    "page": {
      "title": "Comparar",
      "handle": "compare",
      "body_html": "",
      "template_suffix": "compare",
      "published": true
    }
  }')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "201" ]; then
  echo "✓ Página criada com sucesso!"
  echo "  URL: https://${STORE%.myshopify.com}/pages/compare"
  echo "$BODY" | grep -o '"id":[0-9]*' || true
else
  echo "✗ Erro ao criar página (HTTP $HTTP_CODE)"
  echo "$BODY" | head -20
  exit 1
fi
