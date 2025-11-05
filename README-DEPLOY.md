# 🚀 Deploy no AWS S3

## Pré-requisitos

1. **AWS CLI configurado**:
   ```bash
   aws configure
   ```

2. **Bucket S3 criado** (opcional - o script pode criar):
   ```bash
   aws s3 mb s3://seu-bucket-name --region us-east-1
   ```

## Deploy

### Método 1: Script Automático
```bash
chmod +x deploy.sh
./deploy.sh seu-bucket-name us-east-1
```

### Método 2: Manual
```bash
# Build do projeto
npm run build

# Upload para S3
aws s3 sync dist/ s3://seu-bucket-name/ --delete

# Configurar website estático
aws s3 website s3://seu-bucket-name/ --index-document index.html --error-document index.html
```

## Configurações de Segurança

### Política do Bucket (Acesso Público)
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::seu-bucket-name/*"
        }
    ]
}
```

### CORS (se necessário)
```json
[
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["GET", "HEAD"],
        "AllowedOrigins": ["*"],
        "ExposeHeaders": []
    }
]
```

## URLs de Acesso

- **Website**: `http://seu-bucket-name.s3-website-us-east-1.amazonaws.com`
- **CloudFront** (recomendado para produção): Configure uma distribuição CloudFront

## Problemas Comuns

1. **Erro 403**: Verifique se a política do bucket permite acesso público
2. **Arquivos não carregam**: Verifique se o `base: './'` está configurado no vite.config.mjs
3. **Rotas não funcionam**: Certifique-se de que o error-document está configurado como index.html

## Melhorias Recomendadas

- [ ] Configurar CloudFront para HTTPS e melhor performance
- [ ] Implementar CI/CD com GitHub Actions
- [ ] Configurar domínio customizado
- [ ] Implementar cache headers otimizados