# Deploy no Netlify - Sono Zen

## Problema Identificado

Você estava fazendo deploy da pasta `netlify-build` que continha uma versão HTML estática antiga, em vez da versão React moderna que desenvolvemos.

## Solução para Deploy Correto no Netlify

### 1. Configurações do Netlify

No painel do Netlify, configure:

**Build settings:**
- Build command: `npm run build`
- Publish directory: `dist/public`
- Node version: `18`

**Environment variables (se necessário):**
- `NODE_VERSION`: `18`

### 2. Arquivo netlify.toml

Já criei o arquivo `netlify.toml` na raiz do projeto com as configurações corretas.

### 3. Estrutura Correta

- ✅ Versão React moderna (pasta principal do projeto)
- ❌ Versão HTML estática antiga (pasta netlify-build - removida)

### 4. Como fazer o deploy correto

1. No Netlify, aponte para a raiz do repositório
2. Use as configurações de build mencionadas acima
3. O comando `npm run build` irá gerar a versão React moderna na pasta `dist/public`

### 5. Diferenças entre as versões

**Versão antiga (HTML estático):**
- Design mais simples
- Cores diferentes
- Funcionalidades limitadas

**Versão nova (React moderna):**
- Tema escuro elegante
- Componentes interativos
- Animações suaves
- Design responsivo otimizado
- Gradientes e efeitos visuais modernos

## Próximos Passos

1. Configure o Netlify com as configurações acima
2. Faça um novo deploy
3. O site ficará igual à versão que está rodando no Replit