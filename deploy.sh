#!/bin/bash
# Deploy automático do site React no S3
# Uso: ./deploy.sh nome-do-bucket [região]

set -e

# Função para tratamento de erros
error_exit() {
    echo "❌ Erro: $1" >&2
    exit 1
}

# Validação de parâmetros
if [ -z "$1" ]; then
    error_exit "informe o nome do bucket. Uso: ./deploy.sh nome-do-bucket [região]"
fi

BUCKET_NAME=$1
REGION=${2:-$(aws configure get region)}

# Verificar se AWS CLI está configurado
if ! aws sts get-caller-identity &>/dev/null; then
    error_exit "AWS CLI não está configurado. Execute 'aws configure' primeiro."
fi

echo "🚀 Iniciando build do projeto..."
npm run build || error_exit "Falha no build do projeto"

echo "📦 Fazendo upload dos arquivos de dist/ para o bucket S3: $BUCKET_NAME"
aws s3 sync dist/ s3://$BUCKET_NAME/ --delete --region $REGION || error_exit "Falha no upload para S3"

echo "🌐 Configurando o site estático no S3..."
aws s3 website s3://$BUCKET_NAME/ --index-document index.html --error-document index.html --region $REGION || error_exit "Falha na configuração do website"

echo "✅ Deploy concluído com sucesso!"
echo "🌐 Acesse o site em:"
echo "👉 http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"
