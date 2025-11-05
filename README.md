# nlx-react-site

Projeto convertido para React (Vite) a partir dos HTMLs originais.

## Como usar

1. Instale dependências:
```bash
npm install
```

2. Rode em desenvolvimento:
```bash
npm run dev
```

3. Gere build para produção e faça upload da pasta `dist/` para o AWS S3:
```bash
npm run build
# Em seguida faça upload do conteúdo de /dist para seu bucket S3
```

### Observações
- O Bootstrap está configurado via CDN no `index.html` conforme solicitado.
- Os arquivos de estilo originais foram copiados para `public/assets/css/` e as imagens para `public/assets/img/`.
- O `Footer` foi criado com o snippet NLX extraído dos HTMLs originais e é renderizado por `dangerouslySetInnerHTML` para preservar scripts exatamente como estavam.
- Não foi alterado o CSS do projeto — mantivemos os arquivos originais para preservar o visual.


## Deploy para AWS S3 (SPA)

1. Crie um bucket no S3 e habilite Static website hosting.
2. Configure Index document: index.html e Error document: index.html para suportar rotas do React Router.
3. Faça upload do conteúdo de `dist/` após `npm run build`.
4. Considere configurar CloudFront para HTTPS e cache.
