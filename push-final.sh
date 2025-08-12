#!/bin/bash

echo "=== Push Final das Atualizações do Sono Zen ==="

# Configurar credenciais
export GIT_ASKPASS="echo"
export GIT_USERNAME="mxttheuzs"

# Remover locks se existirem
rm -f .git/index.lock 2>/dev/null || true

echo "Verificando status do repositório..."
git status --porcelain

echo "Adicionando arquivos..."
git add .

echo "Fazendo commit..."
git commit -m "✨ Programa 4 fases completo: novas imagens + página detalhada com 30 atividades

- Substituídas imagens das 4 fases do programa
- Criado programa detalhado com 30 atividades
- Nova página /programa com interface expansível
- Navegação atualizada com link programa completo
- Dados estruturados em shared/program-data.ts"

echo "Enviando para GitHub..."
git push origin main

echo "✅ Push concluído!"