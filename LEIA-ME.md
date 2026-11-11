# Gerador de Balaústres — versão app (PWA)

O app abre por um link, pode ser instalado como aplicativo e funciona **sem internet**.
O link entrega apenas o **formulário em branco**. Tudo o que se preenche (atas, cadastro
da Loja, Irmãos, brasão) fica **somente no navegador do aparelho** de quem usa.
Nada é enviado para o GitHub nem para nenhum outro lugar.

## Arquivos

| Arquivo | Para que serve |
|---|---|
| `index.html` | O gerador (o mesmo de antes, com o visual novo preto e ouro) |
| `manifest.webmanifest` | Nome, cores e ícones do app instalado |
| `sw.js` | Guarda o formulário no aparelho para abrir offline |
| `icon-*.png`, `apple-touch-icon.png` | Ícones do app |

O `index.html` continua funcionando sozinho, aberto direto do computador, como antes.

## Publicar no GitHub Pages (uma vez)

1. Em github.com, crie um repositório **público** (ex.: `balaustres`).
   O GitHub Pages gratuito exige repositório público. O que fica público é só o formulário em branco.
2. Clique em **Add file → Upload files** e arraste **todo o conteúdo** desta pasta. Clique em **Commit changes**.
3. Vá em **Settings → Pages**. Em *Source*, escolha **Deploy from a branch**,
   branch **main**, pasta **/ (root)**. Clique em **Save**.
4. Em 1 ou 2 minutos o endereço fica pronto:
   `https://<seu-usuario>.github.io/balaustres/`

## Instalar no aparelho

- **Computador (Chrome/Edge):** abra o link e clique em **Instalar app** no cabeçalho
  (ou no ícone de instalar na barra de endereço).
- **Android (Chrome):** menu ⋮ → **Instalar app**.
- **iPhone (Safari):** botão Compartilhar → **Adicionar à Tela de Início**.

Depois de aberto uma vez com internet, o app funciona offline.

## Passar o cadastro da versão antiga para o app

O navegador guarda os dados separados por endereço. O cadastro feito no arquivo aberto do
computador **não aparece sozinho** no app. Para levar:

1. No arquivo antigo: Configurações da Loja → **Salvar cópia completa (.json)**.
2. No app: Configurações da Loja → **Restaurar cópia completa**.

## Atualizar o app

1. No GitHub, envie o novo `index.html` (Upload files, substituindo o antigo).
2. Em `sw.js`, troque a data em `const VERSAO = '...'` (por exemplo, para a data do dia).

Quem já tem o app recebe a versão nova sozinho: ela vale a partir da segunda abertura com internet.

## Cuidados

- Os dados ficam no navegador. **Limpar os dados de navegação apaga o cadastro e o rascunho.**
  Guarde a planilha da Loja e a cópia completa (.json) num lugar seguro.
- Em computador compartilhado, quem usar o mesmo navegador verá o cadastro e o rascunho.
