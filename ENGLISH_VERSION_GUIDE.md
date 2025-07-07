# Como Criar a Versão em Inglês do Sono Zen

## Opção 1: Criar Nova Repl no Replit

### Passo 1: Exportar o Projeto
1. No Replit, clique no botão de menu (três pontinhos) do seu projeto
2. Selecione "Download as ZIP"
3. Extraia o arquivo ZIP em seu computador

### Passo 2: Criar Nova Repl
1. Vá para https://replit.com/
2. Clique em "Create Repl"
3. Selecione "Import from GitHub" ou "Upload ZIP"
4. Faça upload do arquivo ZIP extraído
5. Nomeie a nova repl como "sono-zen-english"

### Passo 3: Traduzir Arquivos
Após criar a nova repl, você precisará traduzir os seguintes arquivos:

## Arquivos Principais para Traduzir

### 1. client/src/components/landing/hero-section.tsx
**Traduções principais:**
- "Durma Como um Bebê em Apenas 7 Noites" → "Sleep Like a Baby in Just 7 Nights"
- "Pare de ficar 3h rolando na cama" → "Stop tossing and turning for 3 hours"
- "Descubra o método oriental" → "Discover the Oriental method"
- "Sem remédios ou dependência" → "No medications or dependency"
- "Resultados em 1 semana" → "Results in 1 week"
- "Técnicas orientais milenares" → "Ancient Oriental techniques"
- "Garantia Total 7 Dias" → "7-Day Money-Back Guarantee"
- "Vidas Transformadas" → "Lives Transformed"

### 2. client/src/components/landing/problem-section.tsx
**Traduções principais:**
- "Você Também Passa Por Isso?" → "Do You Also Experience This?"
- "Você deita na cama e sua cabeça não para" → "You lie in bed and your mind won't stop"
- "Demora mais de 30 minutos para adormecer" → "Takes more than 30 minutes to fall asleep"
- "Acorda várias vezes durante a noite" → "Wakes up multiple times during the night"
- "Acorda cansado mesmo dormindo 8 horas" → "Wakes up tired even after 8 hours of sleep"

### 3. client/src/components/landing/method-section.tsx
**Traduções principais:**
- "Transforme Sua Noite em um Momento Sagrado" → "Transform Your Night into a Sacred Moment"
- "Como Este Método Resolve de Vez" → "How This Method Solves It Once and For All"
- "Por Que Este Método Funciona Mesmo?" → "Why This Method Really Works?"

### 4. client/src/components/landing/ebook-content-section.tsx
**Traduções principais:**
- "O que você vai aprender" → "What You'll Learn"
- "Técnicas de Respiração Profunda" → "Deep Breathing Techniques"
- "Método 4-7-8" → "4-7-8 Method"
- "Pontos de Acupressão" → "Acupressure Points"
- "Meditação Guiada" → "Guided Meditation"
- "Sons Relaxantes" → "Relaxing Sounds"

### 5. client/src/components/landing/testimonials-section.tsx
**Traduções principais:**
- "Olha Só o Que Eles Falam!" → "Look What They're Saying!"
- "Nossa, funciona mesmo!" → "Wow, it really works!"
- "Nunca mais tive insônia" → "I never had insomnia again"
- "Durmo como um bebê agora" → "I sleep like a baby now"

### 6. client/src/components/landing/pricing-section.tsx
**Traduções principais:**
- "Sua Transformação Começa Hoje" → "Your Transformation Starts Today"
- "Método Completo" → "Complete Method"
- "Garantia de 7 Dias" → "7-Day Guarantee"
- "Acesso Imediato" → "Instant Access"
- "Transformar Meu Sono Agora" → "Transform My Sleep Now"

### 7. client/src/components/landing/faq-section.tsx
**Traduções principais:**
- "Perguntas Frequentes" → "Frequently Asked Questions"
- "Quanto tempo demora para ver resultados?" → "How long does it take to see results?"
- "É seguro seguir este método?" → "Is this method safe to follow?"
- "Funciona para todos os tipos de insônia?" → "Does it work for all types of insomnia?"

### 8. client/src/components/landing/author-section.tsx
**Traduções principais:**
- "Sobre o Autor" → "About the Author"
- "Especialista em Sono" → "Sleep Specialist"
- "vidas transformadas" → "lives transformed"

### 9. client/src/components/quiz/sleep-comfort-quiz.tsx
**Traduções principais:**
- "Como Anda Seu Sono?" → "How's Your Sleep?"
- "Descubra Seu Tipo de Sono" → "Discover Your Sleep Type"
- "Quero Transformar Meu Sono!" → "I Want to Transform My Sleep!"

### 10. client/src/components/landing/video-preview-section.tsx
**Traduções principais:**
- "Veja Por Dentro do Sono Zen" → "See Inside Sono Zen"
- "Preview Exclusivo" → "Exclusive Preview"
- "Desbloquear Acesso Completo" → "Unlock Full Access"

## Opção 2: Usar Git para Criar Branch

Se você preferir usar Git:

```bash
# Criar nova branch para versão em inglês
git checkout -b english-version

# Fazer as traduções nos arquivos
# Então fazer commit
git add .
git commit -m "Create English version of Sono Zen"

# Opcional: criar repositório separado
git remote add english-origin [URL_DO_NOVO_REPOSITORIO]
git push english-origin english-version
```

## Alterações Adicionais Necessárias

### 1. Alterar Meta Tags (client/index.html)
```html
<title>Sleep Like a Baby in 7 Nights - Sono Zen Method</title>
<meta name="description" content="Discover the Oriental sleep method that helps you fall asleep in 15 minutes and sleep like a baby. No medications, guaranteed results in 7 days." />
```

### 2. Atualizar Documentação (replit.md)
- Traduzir o README.md
- Atualizar o replit.md com informações em inglês

### 3. Ajustar Configurações
- Moeda: R$ → $ (se necessário)
- Idioma do navegador: pt-BR → en-US
- Formato de data: DD/MM/YYYY → MM/DD/YYYY

## Dicas Importantes

1. **Mantenha a Estrutura**: Não altere nomes de arquivos ou estrutura de pastas
2. **Teste Responsividade**: Textos em inglês podem ter tamanhos diferentes
3. **URLs de Pagamento**: Atualize links de pagamento se necessário
4. **Pixels de Rastreamento**: Configure novos pixels para a versão em inglês
5. **Domínio**: Configure um novo domínio para a versão em inglês

## Produto em Inglês - Sugestão de Nome

**"ZenSleep Method"** ou **"7-Night Sleep Transform"**

## Estrutura de Preços Sugerida

- Preço original: $47.90
- Preço promocional: $27.90
- Economia: $20.00 (42% OFF)

Isso mantém a mesma estrutura de preços, mas em dólares americanos.