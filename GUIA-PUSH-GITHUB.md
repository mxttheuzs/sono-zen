# Guia para Push no GitHub - Sono Zen

## Situação Atual
- ✅ Projeto atualizado com as novas imagens das 4 fases
- ✅ Programa completo de 30 dias implementado
- ✅ Nova página `/programa` funcionando
- ✅ Navegação atualizada
- ⚠️ Arquivos prontos para push, mas token expirado

## Opções para fazer o Push

### Opção 1: Interface Git do Replit (Mais Fácil)
1. Pressione `Ctrl + Shift + G` para abrir o painel Git
2. Você verá todos os arquivos modificados listados
3. Digite uma mensagem como: "Atualização: Programa 4 fases completo + nova página detalhada"
4. Clique em "Commit & Push"

### Opção 2: Gerar Novo Token GitHub
1. Vá para GitHub.com → Settings → Developer settings → Personal access tokens
2. Clique em "Generate new token (classic)"
3. Selecione as permissões: `repo` (full control)
4. Copie o novo token
5. Use o comando:
```bash
git push https://SEU_NOVO_TOKEN@github.com/mxttheuzs/sono-zen.git main
```

### Opção 3: Configurar Secrets no Replit
1. No painel lateral do Replit, clique em "Secrets"
2. Adicione:
   - Key: `GITHUB_TOKEN`
   - Value: seu novo token GitHub
3. Reinicie o ambiente
4. Use a interface Git do Replit

## Arquivos que serão enviados no próximo push:
- `attached_assets/fase1-preparacao-quebra-habitos.png`
- `attached_assets/fase2-ritualizacao-tecnicas-corporais.png` 
- `attached_assets/fase3-respiracao-mindfulness.png`
- `attached_assets/fase4-consolidacao-ambiente-ideal.png`
- `shared/program-data.ts`
- `client/src/components/program/detailed-program-view.tsx`
- `client/src/pages/programa.tsx`
- `client/src/App.tsx` (nova rota)
- `client/src/components/landing/navigation.tsx` (link programa)
- `client/src/components/landing/program-content-section.tsx` (novas imagens)

## Repositório GitHub
`https://github.com/mxttheuzs/sono-zen.git`

## Recomendação
Use a **Opção 1** (Interface Git do Replit) - é a mais confiável e não depende de tokens manuais.