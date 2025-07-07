#!/bin/bash

# Script para criar versão em inglês do Sono Zen
# Execute este script para criar uma cópia com traduções básicas

echo "🚀 Criando versão em inglês do Sono Zen..."

# Criar diretório para versão em inglês
mkdir -p ../zensleep-english

# Copiar arquivos principais (exceto node_modules e arquivos temporários)
rsync -av --exclude='node_modules' --exclude='.git' --exclude='dist*' --exclude='.cache' . ../zensleep-english/

echo "📁 Arquivos copiados para ../zensleep-english/"

# Criar arquivo de configuração para traduções
cat > ../zensleep-english/translations.json << 'EOF'
{
  "siteName": {
    "pt": "Sono Zen",
    "en": "ZenSleep Method"
  },
  "heroTitle": {
    "pt": "Durma Como um Bebê em Apenas 7 Noites",
    "en": "Sleep Like a Baby in Just 7 Nights"
  },
  "heroSubtitle": {
    "pt": "Pare de ficar 3h rolando na cama sem conseguir dormir",
    "en": "Stop spending 3 hours tossing and turning unable to fall asleep"
  },
  "heroDescription": {
    "pt": "Descubra o método oriental que faz você adormecer em 15 minutos e acordar descansado",
    "en": "Discover the Oriental method that makes you fall asleep in 15 minutes and wake up refreshed"
  },
  "benefits": {
    "noMedications": {
      "pt": "Sem remédios ou dependência",
      "en": "No medications or dependency"
    },
    "results": {
      "pt": "Resultados em 1 semana",
      "en": "Results in 1 week"
    },
    "techniques": {
      "pt": "Técnicas orientais milenares",
      "en": "Ancient Oriental techniques"
    },
    "testimonials": {
      "pt": "depoimentos reais",
      "en": "real testimonials"
    }
  },
  "buttons": {
    "learnMore": {
      "pt": "SAIBA MAIS",
      "en": "LEARN MORE"
    },
    "transformSleep": {
      "pt": "Quero Transformar Meu Sono!",
      "en": "I Want to Transform My Sleep!"
    },
    "unlockAccess": {
      "pt": "Desbloquear Acesso Completo",
      "en": "Unlock Full Access"
    },
    "buyNow": {
      "pt": "Transformar Meu Sono Agora",
      "en": "Transform My Sleep Now"
    }
  },
  "sections": {
    "problem": {
      "title": {
        "pt": "Você Também Passa Por Isso?",
        "en": "Do You Also Experience This?"
      }
    },
    "method": {
      "title": {
        "pt": "Transforme Sua Noite em um Momento Sagrado",
        "en": "Transform Your Night into a Sacred Moment"
      }
    },
    "testimonials": {
      "title": {
        "pt": "Olha Só o Que Eles Falam!",
        "en": "Look What They're Saying!"
      }
    },
    "faq": {
      "title": {
        "pt": "Perguntas Frequentes",
        "en": "Frequently Asked Questions"
      }
    },
    "pricing": {
      "title": {
        "pt": "Sua Transformação Começa Hoje",
        "en": "Your Transformation Starts Today"
      }
    }
  },
  "pricing": {
    "originalPrice": {
      "pt": "R$ 47,90",
      "en": "$47.90"
    },
    "salePrice": {
      "pt": "R$ 27,90",
      "en": "$27.90"
    },
    "savings": {
      "pt": "R$ 20,00",
      "en": "$20.00"
    },
    "currency": {
      "pt": "BRL",
      "en": "USD"
    }
  },
  "guarantee": {
    "text": {
      "pt": "Garantia Total 7 Dias",
      "en": "7-Day Money-Back Guarantee"
    }
  },
  "social": {
    "livesTransformed": {
      "pt": "vidas transformadas",
      "en": "lives transformed"
    }
  }
}
EOF

echo "📝 Arquivo de traduções criado em ../zensleep-english/translations.json"

# Atualizar package.json com novo nome
sed -i 's/"sono-zen"/"zensleep-method"/' ../zensleep-english/package.json

# Atualizar README
cat > ../zensleep-english/README.md << 'EOF'
# ZenSleep Method - English Version

## Overview

ZenSleep Method is a sleep wellness digital product that transforms sleep health through intelligent, personalized audio experiences and holistic relaxation techniques. This application provides a comprehensive approach to improving sleep quality by combining interactive quizzes, responsive design, and user-centric wellness features.

## Product Description

Discover the Oriental sleep method that helps you fall asleep in 15 minutes and sleep like a baby. No medications needed - get guaranteed results in just 7 days with ancient techniques proven to work.

### Key Features:
- 7-night transformation program
- Oriental sleep techniques
- No medications or dependency
- Interactive web app
- Guided meditations
- Relaxing sounds
- Mobile-optimized experience

## Technology Stack

- **Frontend**: React with TypeScript, Vite for build tooling
- **Backend**: Express.js API server with TypeScript  
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Start development server:
```bash
npm run dev
```

## Deployment

The application is configured for deployment on Replit and Netlify:

- **Development**: `npm run dev`
- **Production Build**: `npm run build`  
- **Production Server**: `npm run start`

## Pricing

- Original Price: $47.90
- Sale Price: $27.90
- Savings: $20.00 (42% OFF)

## Guarantee

7-Day Money-Back Guarantee - If you don't see improvement in your sleep within 7 days, get a full refund.

## Support

For questions or support, contact our team through the website's contact form.
EOF

echo "📄 README.md atualizado para versão em inglês"

# Criar arquivo de configuração específico
cat > ../zensleep-english/.env.example << 'EOF'
DATABASE_URL=postgresql://username:password@localhost:5432/zensleep_english
NODE_ENV=development
FACEBOOK_ACCESS_TOKEN=your_facebook_access_token_here
FACEBOOK_PIXEL_ID=your_facebook_pixel_id_here
PAYMENT_URL=https://your-payment-processor.com/checkout
EOF

echo "🔧 Arquivo .env.example criado"

echo ""
echo "✅ Versão em inglês criada com sucesso!"
echo ""
echo "📂 Localização: ../zensleep-english/"
echo ""
echo "🔧 Próximos passos:"
echo "1. cd ../zensleep-english/"
echo "2. npm install"
echo "3. Editar os arquivos de componente com as traduções do translations.json"
echo "4. Configurar variáveis de ambiente (.env)"
echo "5. Testar o site: npm run dev"
echo ""
echo "📝 Arquivo de referência para traduções: translations.json"
echo "📖 Guia completo: ENGLISH_VERSION_GUIDE.md"
EOF