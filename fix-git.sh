#!/bin/bash

echo "=== Corrigindo configuração do Git ==="

# Remover remote existente se houver
git remote remove origin 2>/dev/null || true

# Adicionar o remote correto (substitua SEU-USUARIO pelo seu username do GitHub)
git remote add origin https://github.com/mxttheuzs/sono-zen.git

# Verificar se funcionou
echo "Remote configurado:"
git remote -v

# Fazer push
echo "Enviando para o GitHub..."
git push -u origin main

echo "=== Pronto! ==="