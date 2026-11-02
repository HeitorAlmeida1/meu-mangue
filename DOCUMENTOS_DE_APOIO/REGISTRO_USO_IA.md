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

### Prompt 5

> olha eu pensei neste script de criaçao de tabela
>
> ```sql
> CREATE DATABASE meu_mangue;
>
> USE meu_mangue;
>
> CREATE TABLE usuario (
> id INT PRIMARY KEY AUTO_INCREMENT,
> nome VARCHAR(80),
> email VARCHAR(100) UNIQUE,
> senha VARCHAR(50),
> dt_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
> ) AUTO_INCREMENT = 1;
>
> CREATE TABLE fase_vida (
> id INT PRIMARY KEY AUTO_INCREMENT,
> nome VARCHAR(45)
> ) AUTO_INCREMENT = 1;
>
> CREATE TABLE historia (
> id INT PRIMARY KEY AUTO_INCREMENT,
> nome_musica VARCHAR(100),
> artista VARCHAR(100),
> data_musica DATE,
> trecho VARCHAR(140),
> texto_completo TEXT,
> dt_publicacao DATETIME DEFAULT CURRENT_TIMESTAMP,
> fk_usuario INT,
> fk_fase_vida INT,
> FOREIGN KEY (fk_usuario) REFERENCES usuario(id),
> FOREIGN KEY (fk_fase_vida) REFERENCES fase_vida(id)
> ) AUTO_INCREMENT = 1;
> ```
>
> leve em considerançao que eu fiz algumas mudanças tirei comentarios e favoritar curtir etc etc

**Resposta da IA (resumo):** validação dos pontos corretos do rascunho (tabela de
apoio `fase_vida` em vez de texto livre repetido, FKs na tabela "filha", uso de
`DEFAULT CURRENT_TIMESTAMP`). Duas perguntas levantadas para o autor decidir, sem a
IA propor a solução: (1) onde ficam os valores de nota/frequência/impacto previstos
no `AGENTS.md` para alimentar a dashboard — atributo direto em `historia` ou uma
entidade de avaliação separada; (2) confirmação se a remoção de favoritar/curtir
(refletida na exclusão de `minhas-favoritas.html`) é definitiva, já que isso decide
se é necessária uma tabela de relacionamento N:N no futuro.

### Prompt 6

> isto do agents eu nao irei fazer neste momento e a pergunta 2 sim de momento eu deixei isto de lado e irei avaliar melhor em outro momenot

**Resposta da IA (resumo):** decisão do autor registrada: o recurso de
nota/frequência/impacto (calculadora/dashboard) do `AGENTS.md` fica fora do escopo
por enquanto, assim como favoritar/curtir. Com isso, o schema de `usuario`,
`fase_vida` e `historia` foi validado como suficiente para o escopo atual do
projeto. Ambos os recursos podem ser retomados em uma modelagem futura.

### Prompt 7

> [imagem: diagrama ER gerado a partir do script, mostrando usuario 1:N historia e
> historia N:1 fase_vida, confirmando o schema executado no banco]
>
> já rodei o script, bora pra camada de historia, em anexo deixei a modelagem de como ficou

**Resposta da IA (resumo):** confirmação de que o diagrama bate com o script
executado. Observação de que `public/nova-historia.html` já tem o formulário e a
função `salvarHistoria()` prontos, montando um objeto JS com os campos que o
back-end vai precisar ler (`nomeMusica`, `artista`, `dataMusica`, `fkFaseVida`,
`trecho`, `textoCompleto`), faltando apenas o `fetch` real. Definida a ordem de
construção da camada de `historia` (model → controller → rota → front-end),
começando pelo model, usando `usuarioModel.js`/função `cadastrar` como referência.
Perguntas levantadas para o autor pensar antes de escrever: de onde vem o
`fk_usuario` (não vem do formulário) e conferência dos nomes de coluna do próprio
schema. Código não escrito pela IA — autor vai tentar a função sozinho primeiro.

### Prompt 8

> pode me dar um guia maior sobre isto, estou pedindo sua ajuda nisto pois a primeira vez que faço, entao seja paciente e claro

**Resposta da IA (resumo):** guia detalhado, linha por linha, explicando o
`usuarioModel.js` já existente (import do `database/config`, parâmetros de função,
template strings com crase e `${}`, sintaxe do `INSERT INTO`, por que o `return` é
necessário, o que faz o `module.exports`), e depois um checklist de 5 passos para o
autor construir `historiaModel.js` sozinho: (1) quais colunas não entram no INSERT
por serem automáticas (`id`, `dt_publicacao`); (2) de onde viria `fk_usuario`
(usuário logado, via `sessionStorage.ID_USUARIO`); (3) diferença entre o camelCase
que chega do front-end e o snake_case usado internamente; (4) montagem do
`INSERT INTO`; (5) `return` e `module.exports`. Nenhum código escrito pela IA.

### Prompts 9–12 (ciclo de revisão do `historiaModel.js`)

> da uma olhada no arquivo novo que fiz historia.js

**Resposta da IA (resumo):** revisão do primeiro rascunho (`src/models/historia.js`),
apontando 6 problemas sem corrigir o código: `database` não importado; `module.exports`
ausente; `INSERT INTO usuario` (nome de tabela errado, sobra de copiar/colar);
`console.log` de debug referenciando variáveis inexistentes (`nome, email, senha`,
sobra do `usuarioModel.js`); `fk_usuario` ausente dos parâmetros e da query; sugestão
de renomear o arquivo para `historiaModel.js` por consistência com o padrão do
projeto.

> ok eu entendi tudo que voce pontuo e arrumei, de uma olhada so nao entendi na parte da fk_usuario, ok tem que colocar mas no values eu coloco oque entao ? tipo eu puxo esse dado de onde nao entendi

**Resposta da IA (resumo):** explicação conceitual de que o model não busca dados
sozinho (não tem acesso a `sessionStorage`), só recebe valores como parâmetro, assim
como os demais campos; a origem real do valor de `fk_usuario` (sessão do usuário
logado) será resolvida depois, na camada de controller/rota. Identificado bug
concreto na query enviada (número de colunas incompatível com número de valores,
vírgula sobrando, posições trocadas).

> corrigi, agora dá uma olhada de novo

**Resposta da IA (resumo):** apontado que a lista de parâmetros e de colunas já
estava correta, mas a lista de `VALUES` ainda tinha 6 itens para 7 colunas (faltando
`${fkUsuario}`), sem fornecer a linha corrigida.

> corrigi, dá uma olhada de novo

**Resposta da IA (resumo):** `historiaModel.js` validado como funcionalmente
correto — import do banco, nome de tabela, 7 colunas/7 valores na mesma ordem,
`return` da Promise e `module.exports` todos presentes. Apontado apenas um detalhe
cosmético (console.log de debug não lista `fkUsuario`), sem necessidade de correção
imediata. Encerrada a etapa de model; próxima etapa é o controller.

### Prompts 13–16 (ciclo de revisão do `historiaController.js`)

> pode me ajudar ? eu criei o arquivo e fiz algumas mudanças, mas entendo pouco

**Resposta da IA (resumo):** explicação de que o primeiro rascunho misturava partes
de duas funções diferentes copiadas de `usuarioController.js`: o corpo de
`salvarHistoria` ainda tinha a lógica antiga de `autenticar` (email/senha,
`aquarioModel`), havia uma função `cadastrar` inteira duplicada e não usada, e o
`module.exports` exportava funções inexistentes no arquivo. Explicado por que
`cadastrar` (chamada única a um model) é o padrão certo a seguir aqui, e não
`autenticar` (duas chamadas encadeadas a models). Checklist de 6 ajustes passado ao
autor, sem reescrever o arquivo.

> corrigi, dá uma olhada de novo *(primeira rodada)*

**Resposta da IA (resumo):** corpo da função já estruturado corretamente; apontados
3 ajustes restantes: remover `require` não utilizado de `aquarioModel`, adicionar
validação faltante para `fkUsuario`, e corrigir `module.exports` (exportava
`autenticar`/`cadastrar`, funções inexistentes no arquivo — erro que quebraria a
aplicação ao dar `require` nesse controller).

> corrigi, dá uma olhada de novo *(segunda rodada)*

**Resposta da IA (resumo):** `historiaController.js` validado como completo e
correto — import limpo, validação dos 7 campos obrigatórios, chamada ao model na
ordem certa, tratamento de sucesso/erro, `module.exports` exportando `salvarHistoria`.
Apontado apenas um comentário cosmético desatualizado (sobra de texto mencionando
`usuarioModel.js`).

### Prompts 17–20 (criação e wiring da rota `historias.js`)

> de uma olhada crie e dei uma primeira editada no arquivo historias.js

**Resposta da IA (resumo):** revisão de `src/routes/historias.js` — estrutura
correta (`require` do controller, `router.post("/salvarHistoria", ...)`,
`module.exports`); apontado um typo de nome de variável (`historiaControler`, sem
afetar o funcionamento por ser usado de forma consistente) e um comentário
desatualizado. Identificada a etapa ainda faltante: registrar essa rota em `app.js`
(import + `app.use`), explicando o papel de cada um dos dois blocos existentes nesse
arquivo (`src/routes/index`, `usuarios`, `avisos`, etc.) como referência.

> nao consegue entender oque voce explicou por ultimo nesse ultimo passo me explique melhor

**Resposta da IA (resumo):** explicação mais detalhada e didática do `app.js`,
separando em dois passos conceituais: (1) `require(...)` apenas importa o router
exportado pelo arquivo de rota para uma variável local; (2) `app.use(prefixo, router)`
é o que de fato liga esse router a um prefixo de URL. Demonstrado como o prefixo do
`app.js` se soma ao caminho interno definido dentro do arquivo de rota para formar a
URL final chamada pelo front-end (ex: `/usuarios` + `/autenticar` =
`/usuarios/autenticar`). Nenhum código escrito pela IA; autor orientado a adicionar
as duas linhas equivalentes para `historias.js`.

> adicionei as duas linhas, dá uma olhada

**Resposta da IA (resumo):** `app.js` validado — `historiasRouter` importado e
registrado com o prefixo `/historias`, nome de variável consistente nos dois pontos.
Camada completa do backend fechada (model → controller → rota → app.js), com URL
final `POST /historias/salvarHistoria`. Sugerido ao autor rodar `npm run dev` para
testar se o servidor sobe sem erros.

### Prompts 21–28 (ciclo de revisão do `fetch` em `nova-historia.html`)

Sequência de prompts do autor, todos pedindo revisão de rodadas sucessivas de
correção do mesmo trecho de código (`function salvarHistoria()` em
`public/nova-historia.html`):

> vamos para o nova-historia ja dei o comando e deu tudo certo
>
> corrigi, dá uma olhada de novo *(x6, ao longo das rodadas abaixo)*
>
> corrigi oque disse me explique melhor o fetch
>
> de uma olhada peguei a funçao que esta no login como exemplo com ome indicou
>
> corrigi os 3 pontos, dá uma olhada de novo
>
> opção 2 por enquanto, quero simplificar
>
> corrigi os 2 pontos, dá uma olhada de novo

**Resposta da IA (resumo do ciclo completo):** explicação detalhada do conceito de
`fetch` (URL, `method`, `headers`, `body`, `JSON.stringify`, `.then`/`.catch`,
`resposta.ok`, `resposta.json()`/`resposta.text()` como Promises). A partir daí,
revisão iterativa de múltiplos rascunhos do autor (copiados e adaptados de
`entrar()` em `login.html`), identificando nesta ordem: uso de `json.id` sem
`json` existir no escopo (confusão entre leitura e atribuição); leitura incorreta
de `sessionStorage` (`.value` não existe num Storage); variáveis soltas inexistentes
na validação (precisava `historia.propriedade`, não a propriedade sozinha); `body`
reconstruindo um objeto errado em vez de reusar a variável `historia` já montada
(incluindo uma tentativa de sintaxe de objeto inválida e depois um embrulho
desnecessário `{ historia }`); bloco de sucesso tratando dados de usuário
(email/nome/aquários) que não fazem sentido para uma história. Identificado também
um bug de dependência de elementos HTML inexistentes nesta página (`div_aguardar`,
`cardErro`, `mensagem_erro`, `div_erros_login`, todos específicos de `login.html`),
que travariam a função assim que chamada. Autor optou por simplificar (opção 2:
remover essas dependências e usar `alert()` para feedback ao usuário) em vez de
replicar a UI de loading/erro do login. Revisão das rodadas seguintes identificou
um `if` de validação esvaziado por engano (perdendo o `return false`, deixando de
bloquear o envio com campos vazios) e a falta do `alert(texto)` no tratamento de
erro do fetch. Nenhum código escrito pela IA em nenhuma etapa — todas as correções
foram feitas pelo autor a partir de perguntas/explicações guiadas.

**Resultado:** cadeia completa e funcional, ponta a ponta —
`nova-historia.html → POST /historias/salvarHistoria → historiaController →
historiaModel → MySQL`.

## Próximos passos

- Primeira funcionalidade de ponta a ponta concluída: cadastro de história
  (model, controller, rota, `app.js` e front-end).
- Autor vai testar manualmente no navegador (cadastro de história com campo vazio
  e preenchido, conferindo o registro no banco).
- Próximas funcionalidades a repetir o mesmo processo (model → controller → rota →
  front-end): listagem de histórias (`historias.html`, `minhas-historias.html`),
  detalhe de história (`historia-detalhe.html`), fases de vida no formulário (hoje
  fixas no `<select>` do `nova-historia.html`), e cadastro/login de usuário real
  (atualmente a tabela `usuario` do schema antigo ainda está em uso por
  `usuarioModel.js`/`usuarioController.js`, criados para o domínio "aquatech" —
  precisam de revisão para o domínio atual).
