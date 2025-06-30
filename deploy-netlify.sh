#!/bin/bash

echo "🚀 Atualizando o site no Netlify..."

# Adicionar todas as mudanças
git add .

# Fazer commit das mudanças
git commit -m "Atualização: garantia 7 dias, música mobile otimizada, navegação testemunhos melhorada"

# Enviar para o GitHub
git push origin main

echo "✅ Atualização enviada para o GitHub!"
echo "🌐 O Netlify irá fazer deploy automaticamente em alguns minutos."
echo "📱 Você pode acompanhar o progresso no painel do Netlify."