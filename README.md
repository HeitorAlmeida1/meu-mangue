# Meu Mangue — Da Lama à Música

Projeto acadêmico individual. A ideia é contar histórias de vida através de
músicas marcantes: cada usuário cadastra "histórias", associando uma música a
uma fase da vida (infância, adolescência, hoje), e conta o que ela representa.

Identidade visual inspirada no Manguebeat (Chico Science & Nação Zumbi) — cores de
lama/mangue/sol, tipografia de colagem, ícones de traço.

## Tecnologias

- Front-end: HTML, CSS e JavaScript puro (sem framework)
- Back-end: Node.js + Express
- Banco de dados: MySQL

## Estrutura do projeto

```
public/            telas do site (páginas públicas e dashboard), css, js e assets
src/routes/        define as URLs da API
src/controllers/    recebe a requisição, valida e chama o model
src/models/        monta e executa as queries no banco
src/database/      conexão com o banco e script de criação das tabelas
app.js             arquivo principal, inicia o servidor e liga as rotas
DOCUMENTOS_DE_APOIO/  entregáveis do projeto e registro de uso de IA como apoio de aprendizado
```

## Como rodar localmente

1. Clone o repositório e instale as dependências:
   ```
   npm install
   ```

2. Crie o banco de dados MySQL rodando o script em `src/database/script-tabelas.sql`.

3. Configure o arquivo `.env.dev` com as credenciais do seu banco local (host,
   usuário, senha, nome do banco, porta) e a porta/host da aplicação.

4. Suba o servidor:
   ```
   npm run dev
   ```

5. Acesse `http://localhost:3333` (ou a porta que você definiu) no navegador.

## O que já funciona

- Cadastro e login de usuário (com validação de senha forte)
- Criar uma nova história (música + artista + fase da vida + texto)

## O que ainda está sendo construído

- Listar histórias de verdade a partir do banco (hoje as telas de listagem são
  só exemplos fixos no HTML)
- Ver o detalhe de uma história pelo id, editar e apagar
- Dashboard com números e histórico reais do usuário logado
- Editar/apagar perfil de usuário

## Sobre o uso de IA neste projeto

Usei o Claude Code como apoio de aprendizado ao longo do desenvolvimento, sempre
no papel de orientador: pedindo pra ele me explicar conceitos e apontar erros,
mas escrevendo o código eu mesmo. O registro dessas conversas está em
`DOCUMENTOS_DE_APOIO/REGISTRO_USO_IA.md`.

## Créditos

A base inicial do back-end (estrutura de pastas `routes`/`controllers`/`models` e
a conexão com o MySQL) partiu do projeto de referência **web-data-viz**,
disponibilizado pelos desenvolvedores da São Paulo Tech School / Bandtec Digital
School como implementação de referência para o projeto de primeiro semestre.
Todo o domínio (telas, banco de dados e funcionalidades do "Meu Mangue") foi
adaptado e desenvolvido a partir dessa base.
