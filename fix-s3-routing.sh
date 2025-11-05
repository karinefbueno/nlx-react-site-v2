#!/bin/bash
# Script para corrigir roteamento SPA no S3
# Uso: ./fix-s3-routing.sh nome-do-bucket [região]

BUCKET_NAME=${1:-connect-public-test}
REGION=${2:-us-west-2}

echo "🔧 Configurando roteamento SPA para o bucket: $BUCKET_NAME"

# Configurar error document para index.html (essencial para SPAs)
aws s3 website s3://$BUCKET_NAME/ \
    --index-document index.html \
    --error-document index.html \
    --region $REGION

echo "✅ Configuração concluída!"
echo "Agora todas as rotas (/about, /services, etc.) redirecionarão para index.html"
echo "O React Router cuidará do roteamento client-side"