# Sono Zen - Landing Page

Uma landing page moderna para promover o método oriental de sono Sono Zen, construída com React e design otimizado para conversão.

## ✨ Características

- 🌙 **Design Moderno**: Interface escura elegante com animações suaves
- 📱 **Totalmente Responsivo**: Otimizado para 99% de usuários mobile
- 🚀 **Alta Performance**: Construído com Vite e React
- 💎 **Componentes Premium**: Interface baseada em shadcn/ui
- 🎯 **Focado em Conversão**: Layout otimizado para vendas
- 🔒 **Proteção de Conteúdo**: Sistema anti-cópia integrado

## 🛠 Tecnologias

- **Frontend**: React 18 + TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL + Drizzle ORM
- **Deployment**: Netlify Ready

## 🚀 Como Executar

### Pré-requisitos
- Node.js 20+
- PostgreSQL (para produção)

### Instalação
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/sono-zen.git
cd sono-zen

# Instale as dependências
npm install

# Configure as variáveis de ambiente (opcional para desenvolvimento)
cp .env.example .env

# Execute em modo desenvolvimento
npm run dev
```

### Scripts Disponíveis
```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar em produção
npm start

# Verificar tipos TypeScript
npm run check

# Sincronizar banco de dados
npm run db:push
```

## 📁 Estrutura do Projeto

```
sono-zen/
├── client/               # Frontend React
│   ├── src/
│   │   ├── components/   # Componentes UI
│   │   ├── pages/        # Páginas da aplicação
│   │   └── lib/          # Utilitários
├── server/               # Backend Express
│   ├── routes.ts         # Rotas da API
│   └── storage.ts        # Camada de dados
├── shared/               # Código compartilhado
│   └── schema.ts         # Schemas do banco
└── dist/                 # Build de produção
```

## 🌐 Deploy no Netlify

Este projeto está configurado para deploy automático no Netlify:

1. **Push para GitHub**: O projeto já está pronto para ser enviado
2. **Connect no Netlify**: Conecte seu repositório GitHub ao Netlify
3. **Build automático**: As configurações estão em `netlify.toml`

### Configurações de Build
- **Build Command**: `npm run build`
- **Publish Directory**: `dist-netlify`
- **Node Version**: 20

## 📝 Funcionalidades

### Seções da Landing Page
- **Hero**: Chamada principal com CTA
- **Problema**: Identifica dores dos visitantes
- **Método**: Explica a solução Sono Zen
- **Jornada**: Mostra o processo de 7 noites
- **Benefícios**: Resultados esperados
- **Depoimentos**: Prova social
- **Preços**: Oferta principal
- **Autor**: Credibilidade
- **FAQ**: Objeções comuns

### Formulários
- **Captura de Leads**: E-mail marketing
- **Checkout**: Processamento de compras
- **Validação**: Zod + React Hook Form

## 🔧 Configuração de Produção

### Variáveis de Ambiente
```env
DATABASE_URL=postgresql://...
NODE_ENV=production
```

### Banco de Dados
O projeto usa PostgreSQL com Drizzle ORM. Para sincronizar o schema:
```bash
npm run db:push
```

## 📱 Otimizações Mobile

- Font sizes responsivos (text-3xl → text-6xl)
- Touch targets otimizados (py-4 px-3)
- CTA fixo para mobile
- Menu de navegação touch-friendly
- Carregamento rápido em 3G

## 🎨 Personalização

### Cores e Temas
As cores estão definidas em `client/src/index.css` usando CSS variables.

### Componentes
Todos os componentes UI estão em `client/src/components/ui/` baseados no shadcn/ui.

## 📊 Analytics e Conversão

- Formulários otimizados para conversão
- CTAs estrategicamente posicionados
- Design focado na experiência mobile
- Proteção contra cópia de conteúdo

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Add nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

---

Desenvolvido com ❤️ para promover noites de sono melhores