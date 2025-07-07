# Guia Rápido: Criar Versão em Inglês

## Método Mais Simples

### 1. Download do Projeto Atual
No Replit:
- Clique em "⋮" (três pontos) → "Download as ZIP"
- Salve o arquivo `sono-zen.zip`

### 2. Criar Nova Repl
- Vá para https://replit.com/
- Clique "Create Repl" → "Import from ZIP"
- Faça upload do arquivo baixado
- Nome: `zensleep-method`

### 3. Traduções Essenciais
Abra estes arquivos na nova repl e substitua:

**client/src/components/landing/hero-section.tsx**
```typescript
// Linha ~46
"Durma Como um Bebê" → "Sleep Like a Baby"
"em Apenas 7 Noites" → "in Just 7 Nights"

// Linha ~54
"Pare de ficar 3h rolando na cama" → "Stop spending 3 hours tossing and turning"

// Linha ~57
"Descubra o método oriental" → "Discover the Oriental method"
"adormecer em 15 minutos" → "fall asleep in 15 minutes"

// Linha ~65
"Sem remédios ou dependência" → "No medications or dependency"
"Resultados em 1 semana" → "Results in 1 week"
"Técnicas orientais milenares" → "Ancient Oriental techniques"

// Linha ~91
"SAIBA MAIS" → "LEARN MORE"

// Linha ~100
"Garantia Total 7 Dias" → "7-Day Money-Back Guarantee"

// Linha ~104
"Vidas Transformadas" → "Lives Transformed"
```

**client/src/components/landing/pricing-section.tsx**
```typescript
// Buscar e substituir:
"R$ 47,90" → "$47.90"
"R$ 27,90" → "$27.90" 
"R$ 20,00" → "$20.00"
"Sua Transformação Começa Hoje" → "Your Transformation Starts Today"
"Transformar Meu Sono Agora" → "Transform My Sleep Now"
"BRL" → "USD"
```

### 4. Traduções de Seções

**Problem Section (problem-section.tsx)**
```typescript
"Você Também Passa Por Isso?" → "Do You Also Experience This?"
```

**Method Section (method-section.tsx)**
```typescript
"Transforme Sua Noite em um Momento Sagrado" → "Transform Your Night into a Sacred Moment"
```

**Quiz (sleep-comfort-quiz.tsx)**
```typescript
"Como Anda Seu Sono?" → "How's Your Sleep?"
"Quero Transformar Meu Sono!" → "I Want to Transform My Sleep!"
"Fazer Novamente" → "Try Again"
```

**Video Preview (video-preview-section.tsx)**
```typescript
"Veja Por Dentro do Sono Zen" → "See Inside ZenSleep Method"
"Desbloquear Acesso Completo" → "Unlock Full Access"
```

### 5. Meta Tags (client/index.html)
```html
<title>Sleep Like a Baby in 7 Nights - ZenSleep Method</title>
<meta name="description" content="Discover the Oriental sleep method that helps you fall asleep in 15 minutes. No medications needed - guaranteed results in 7 days." />
```

### 6. Configurações

**package.json**
```json
"name": "zensleep-method"
```

**Criar .env**
```
DATABASE_URL=your_database_url
FACEBOOK_PIXEL_ID=your_english_pixel_id
```

### 7. Testar
```bash
npm install
npm run dev
```

## Ferramentas de Tradução

Para acelerar o processo, use:

1. **Find & Replace** no editor
2. **VS Code**: Ctrl+Shift+F (buscar em todos os arquivos)
3. **Arquivo de referência**: `translations.json` (criado pelo script)

## URLs de Pagamento

Atualize a URL de checkout no arquivo relevante:
- Stripe/PayPal para mercado internacional
- Configure moeda USD

## Nome do Produto Sugerido

**"ZenSleep Method: 7-Night Sleep Transformation"**

## Preços Sugeridos (USD)

- Preço original: $47.90
- Preço promocional: $27.90  
- Desconto: $20.00 (42% OFF)

---

**Tempo estimado: 2-3 horas para tradução completa**