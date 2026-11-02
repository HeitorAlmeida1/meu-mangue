# Registro de uso de IA — Projeto "Da Lama à Música"

Este arquivo documenta, para fins acadêmicos, como a IA foi utilizada
como apoio de aprendizado neste projeto. A regra seguida em toda a conversa, definida
por mim (o autor do projeto) em `AGENTS.md`, foi: **a IA apenas orienta e explica,
nunca escreve código de aplicação por mim**. As decisões de modelagem e a escrita do
código são minhas. Os prompts abaixo estão reproduzidos exatamente como foram
digitados por mim na conversa.

## 2026-11-02

### Prompt 1

> ola, como voce pode ver no repositorio eu ja tenho basicamente as telas feitas, agora eu preciso ligar todas elas ao js e ao banco de dados principalmente, e preciso de sua ajuda para isto, so que eu nao quero que faça nada por mim ok ? apenas me guie e me explique oque eu preciso fazer e oque cada coisa faz, sempre lembradno que estou fazendo isto para aprender, nao quero a coisa mais otimizada quero apenas aprender o basico de utilizaçao de uma api e ate mesmo de desenvolvimento de um site sozinho ok?

**Resposta da IA (resumo):** levantamento do estado atual do repositório (telas prontas
no front-end; back-end com scaffold Express/MySQL herdado de outro projeto da escola,
tema "aquatech", que não corresponde ao domínio real do projeto). Explicação do fluxo
padrão de uma requisição (`front → rota → controller → model → banco`) e do papel de
cada camada. Pergunta de volta sobre por onde o autor gostaria de começar.

### Prompt 2 (seleção em pergunta de múltipla escolha)

> Por onde você quer começar a ligar o front ao back? → **Visão geral da arquitetura**

**Resposta da IA (resumo):** explicação ponta a ponta do fluxo de login já existente
(`POST /usuarios/autenticar`), usando o código real do projeto: o `fetch` em
`login.html`, o roteamento em `app.js` e `src/routes/usuarios.js`, a validação e
orquestração em `usuarioController.js`, e a query SQL em `usuarioModel.js`/
`database/config.js`. Objetivo: usar um caso real já funcionando como "aula" do
padrão rota→controller→model, para depois o autor replicar esse mesmo padrão nas
entidades do próprio domínio (música/história/avaliação).

### Prompt 3

> quero entender o desenho das tabelas primeiro, seria melhor modelar primeiro o banco e dps mexer em qualquer coisa, alem disto tbm voce pode escrever um arquivo neste mesmo repositorio com a nossa conversa ? pois eu preciso mostrar ao professor a minha utilizaçao de ia na atividade

**Resposta da IA (resumo):** concordância com a ordem (banco → resto). Criação deste
arquivo de registro. Explicação do método de modelagem de banco de dados em 4 passos
(identificar entidades → atributos → relacionamentos/cardinalidade → chaves
primárias/estrangeiras), usando exemplos do schema antigo (`usuario`, `aviso`) apenas
como referência de sintaxe SQL, sem propor entidades ou tabelas novas para o domínio
do autor. Pedido ao autor para listar, por conta própria, as entidades e atributos do
seu domínio (música, história, avaliação, etc.).

### Prompt 4

> ok vou pensar sobre a modelagem e ja te mando aqui, e neste arquivo md que fez gostaria que colocasse os meus prompts la

**Resposta da IA (resumo):** reestruturação deste arquivo para incluir os prompts do
autor na íntegra, mantidos a cada nova interação.

## Próximos passos

- Aguardando o autor trazer sua proposta de entidades/atributos para a modelagem do
  banco de dados, para revisão conjunta (sem a IA fornecer a tabela pronta).
