#!/bin/bash

echo "🚀 Forçando novo deploy no Netlify..."

# Criar um commit dummy para forçar redeploy
echo "# Deploy $(date)" >> README.md
git add README.md

# Commit das mudanças principais
git add -A
git commit -m "Fix: Resolve Netlify build timeout

- Timer reduzido para 2.5 segundos
- Sistema de música removido para compatibilidade mobile
- Otimizações de build para evitar travamento
- Deploy: $(date)"

# Push para triggerar novo build
git push origin main

echo "✅ Push enviado! Netlify deve iniciar novo build em alguns minutos."
echo "🔗 Verifique o status em: https://app.netlify.com"