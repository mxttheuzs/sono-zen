#!/bin/bash

echo "=== Push para GitHub com novo token ==="

# Configurar credenciais
export GIT_ASKPASS="echo"
export GIT_USERNAME="mxttheuzs"

# Token fornecido pelo usuário
GITHUB_TOKEN="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"

echo "Adicionando arquivos..."
git add .

echo "Fazendo commit..."
git commit -m "✨ Atualização completa do Sono Zen

- Projeto completo com programa de 4 fases
- Nova página /programa com 30 atividades detalhadas
- Interface moderna com React e Tailwind CSS
- Backend Express configurado
- Navegação e componentes atualizados"

echo "Enviando para GitHub com novo token..."
git push https://${GITHUB_TOKEN}@github.com/mxttheuzs/sono-zen.git main

echo "✅ Push concluído com sucesso!"