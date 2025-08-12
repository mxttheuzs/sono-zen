# Como Configurar SSH no GitHub

## Sua Chave SSH (Copie exatamente assim):

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIAMpnmcgH4QSF0tQVPDbUKNjlM2C80ZiXd5XwlCZs97y nath11discord@gmail.com
```

## Passos para Adicionar no GitHub:

1. **Acesse GitHub.com**
   - Faça login na sua conta

2. **Vá para Settings**
   - Clique na sua foto de perfil (canto superior direito)
   - Clique em "Settings"

3. **SSH and GPG Keys**
   - No menu lateral esquerdo, clique em "SSH and GPG keys"

4. **New SSH Key**
   - Clique no botão verde "New SSH key"

5. **Adicione a Chave**
   - **Title**: Digite "Replit Sono Zen" (ou qualquer nome)
   - **Key**: Cole exatamente a chave acima (toda a linha começando com ssh-ed25519)
   - Clique em "Add SSH key"

6. **Confirme sua Senha**
   - GitHub pedirá sua senha para confirmar

## ⚠️ Dicas Importantes:
- Copie a chave COMPLETA (desde ssh-ed25519 até gmail.com)
- Não adicione espaços extras no início ou fim
- Certifique-se de que não há quebras de linha no meio

## Testando a Conexão:
Após adicionar no GitHub, teste no terminal do Replit:
```bash
ssh -T git@github.com
```

## Depois de Configurar:
Você poderá fazer push normalmente:
```bash
git push origin main
```

## Se ainda não funcionar:
- Gere uma nova chave RSA mais compatível:
```bash
ssh-keygen -t rsa -b 4096 -C "nath11discord@gmail.com"
cat ~/.ssh/id_rsa.pub
```