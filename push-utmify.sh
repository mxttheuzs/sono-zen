#!/bin/bash

echo "=== Push UTMify Pixel Update ==="

# Remover todos os locks possíveis
rm -f .git/index.lock 2>/dev/null
rm -f .git/refs/heads/main.lock 2>/dev/null
rm -f .git/config.lock 2>/dev/null

# Configurar variáveis de ambiente para evitar prompts
export GIT_ASKPASS=""
export GIT_USERNAME="mxttheuzs"
export GIT_PASSWORD=""

# Verificar se há mudanças
echo "Verificando mudanças..."
git status --porcelain

# Adicionar arquivos
echo "Adicionando arquivos..."
git add client/index.html replit.md

# Commit
echo "Fazendo commit..."
git commit -m "🚀 UTMify Pixel implementado com sucesso

- Adicionado UTMify Pixel ID: 689acb039da0aae12d5a0f44
- Script carregado dinamicamente no head
- Sistema de tracking duplo funcionando
- Logs confirmam funcionamento correto"

# Push usando HTTPS com token
echo "Enviando para GitHub..."
git push https://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@github.com/mxttheuzs/sono-zen.git main

echo "✅ Push concluído!"