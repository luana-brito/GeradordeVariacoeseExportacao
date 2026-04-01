# Gerador de Variações Visuais

Um aplicativo web que transforma imagens em diferentes variações de cores e estilos, permitindo download em PNG com fundo transparente.

## Funcionalidades

- Upload de imagens via clique ou drag-and-drop
- 9 variações automáticas:
  1. Original
  2. Cores do SUS
  3. Cores de Pernambuco
  4. Tons Pastel
  5. Escala de Cinza
  6. Cinza Claro
  7. Branco Tom sobre Tom
  8. Silhueta Branca
  9. Silhueta Preta
- Download individual ou de todas as variações
- Interface responsiva e moderna
- Suporte a PWA (Progressive Web App)

## Estrutura do Projeto

```
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos
├── js/
│   └── app.js          # Lógica da aplicação
├── icons/              # Ícones para PWA
├── manifest.json       # Configuração PWA
├── vercel.json         # Configuração Vercel
├── netlify.toml        # Configuração Netlify
└── README.md           # Este arquivo
```

## Deploy

### Opção 1: Vercel (Recomendado)

1. Crie uma conta em [vercel.com](https://vercel.com)
2. Instale a CLI do Vercel:
   ```bash
   npm install -g vercel
   ```
3. Na pasta do projeto, execute:
   ```bash
   vercel
   ```
4. Siga as instruções para fazer o deploy

**Via GitHub:**
1. Faça push do projeto para um repositório GitHub
2. Acesse [vercel.com](https://vercel.com) e clique em "New Project"
3. Importe o repositório do GitHub
4. Clique em "Deploy"

### Opção 2: Netlify

1. Crie uma conta em [netlify.com](https://netlify.com)
2. Instale a CLI do Netlify:
   ```bash
   npm install -g netlify-cli
   ```
3. Na pasta do projeto, execute:
   ```bash
   netlify deploy --prod
   ```

**Via GitHub:**
1. Faça push do projeto para um repositório GitHub
2. Acesse [app.netlify.com](https://app.netlify.com)
3. Clique em "Add new site" > "Import an existing project"
4. Selecione o repositório e clique em "Deploy"

### Opção 3: GitHub Pages

1. Crie um repositório no GitHub
2. Faça push do projeto:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/seu-usuario/seu-repo.git
   git push -u origin main
   ```
3. Vá em Settings > Pages
4. Em "Source", selecione "Deploy from a branch"
5. Selecione a branch `main` e a pasta `/ (root)`
6. Clique em "Save"

### Opção 4: Hospedagem Manual

Basta fazer upload de todos os arquivos para qualquer servidor web (Apache, Nginx, etc.) ou serviço de hospedagem de arquivos estáticos.

## Configuração dos Ícones PWA

Para que o PWA funcione corretamente, você precisa criar os ícones nas seguintes dimensões:
- 72x72
- 96x96
- 128x128
- 144x144
- 152x152
- 192x192
- 384x384
- 512x512

Você pode usar ferramentas online como [realfavicongenerator.net](https://realfavicongenerator.net/) ou [favicon.io](https://favicon.io/) para gerar os ícones a partir de uma imagem.

## Tecnologias Utilizadas

- HTML5 Canvas API
- CSS3 (Flexbox, Grid, Gradients)
- JavaScript ES6+
- PWA (Progressive Web App)

## Compatibilidade

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## Licença

Este projeto está disponível para uso livre.
