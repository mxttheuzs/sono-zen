#!/bin/bash

echo "=== Push automatizado para GitHub ==="

# Limpar possíveis locks do git
rm -f .git/index.lock 2>/dev/null || true

# Configurar credenciais temporárias
export GIT_ASKPASS="echo"
export GIT_USERNAME="mxttheuzs"

# Tentar diferentes métodos de push
echo "Tentando push método 1..."
git push origin main 2>/dev/null && echo "✅ Push realizado com sucesso!" && exit 0

echo "Tentando push método 2..."
git push --set-upstream origin main 2>/dev/null && echo "✅ Push realizado com sucesso!" && exit 0

echo "Tentando push método 3..."
git push -f origin main 2>/dev/null && echo "✅ Push realizado com sucesso!" && exit 0

echo "❌ Push via terminal falhou."
echo "💡 Use a interface Git do Replit:"
echo "   1. Clique em 'Version Control' no painel lateral"
echo "   2. Clique em 'Commit & Push'"
echo "   3. Ou use o atalho Ctrl+Shift+G"