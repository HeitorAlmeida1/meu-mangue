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

## 2026-11-05

### Prompt 29

> ola, de uma olhada em como esta o projeto atualmente, fiz muitas mudanças principalmente no visual de uma olhada e continue me ajudando a como ligar todas as telas com elas mesmas e o banco de dados, no banco de dados eu ja fiz um der deixarei em anexo como ficou

(seguido de imagem do diagrama ER atualizado e, após pergunta da IA sobre a
localização do código, do caminho `C:\meu-mangue\`)

**Resposta da IA (resumo):** sessão retomada em ambiente/pasta diferente da
anterior. IA localizou o projeto real em `C:\meu-mangue` (a pasta inicialmente
aberta só tinha entregáveis: pptx, xlsx, docx, der.png, script SQL). Revisão de
sincronização: confirmado que tudo construído nas sessões anteriores permanece
intacto (`historiaModel.js`, `historiaController.js`, `src/routes/historias.js`,
registro em `app.js`, e o `fetch` em `nova-historia.html`), com o visual da tela
redesenhado por cima sem alterar a lógica. Confirmado que o schema real do banco
(`meu_mangue`, batendo com o diagrama ER anexado) evoluiu desde a última revisão
(colunas `NOT NULL`, `fase_vida.descricao`, dados de teste e consultas `JOIN`
prontas). Reconfirmado o problema pendente identificado na sessão anterior: o
`usuarioModel.js` ainda busca uma coluna `fk_empresa` inexistente na tabela
`usuario` atual, o que deve estar quebrando o login. Também observado que
`src/database/script-tabelas.sql` ainda reflete o schema antigo "aquatech" e não
o schema real em uso.

### Prompt 30

> primeiro pode me passar tudo que eu tenho que arrumar ou excluir para deixar tudo 100% ai depois nos vamos por etapas de mudanças ok ? me liste tudo que eu preciso fazer

**Resposta da IA (resumo):** auditoria completa do projeto (todas as telas em
`public/`, todos os models/controllers/rotas em `src/`), sem alterar nada, gerando
uma lista única de pendências organizada por prioridade (ver checklist abaixo).

### Prompt 31

> sim, salva a lista e começa pelo login

**Resposta da IA (resumo):** lista salva neste arquivo como checklist. Início da
correção guiada do login (prioridade mais alta da lista).

## Checklist de pendências (gerado em 2026-11-05)

### 🔴 Prioridade alta (impede o site de funcionar)

- [ ] `src/models/usuarioModel.js` (`autenticar`) busca coluna `fk_empresa`,
      inexistente na tabela `usuario` atual — login quebrado.
- [ ] `src/controllers/usuarioController.js` (`autenticar`) chama
      `aquarioModel.buscarAquariosPorEmpresa(...)` e devolve `aquarios` no JSON —
      não se aplica ao domínio atual.
- [ ] `public/js/sessao.js` (`validarSessao`) assume que existe um elemento
      `id="b_usuario"` em toda página que a chama — só existe em `dashboard.html`;
      vai travar em `minhas-historias.html` e `meu-perfil.html` quando logado.

### 🟡 Prioridade média (telas visuais sem dados reais do banco)

- [ ] `historias.html`: lista de histórias é fixa no HTML — falta listar do banco
      (model/controller/rota de listagem + fetch) e fazer os filtros funcionarem.
- [ ] `historia-detalhe.html`: ignora o `?id=` da URL, sempre mostra o mesmo
      exemplo — falta buscar por id; `apagarHistoria()` só faz `console.log`,
      falta rota de deletar.
- [ ] Edição de história incompleta: `nova-historia.html` não carrega os dados
      existentes no formulário nem faz `PUT`/atualização — sempre cria um registro
      novo; falta model/controller/rota de atualizar.
- [ ] `dashboard.html`: métricas, destaque e lista "Minhas histórias" são fixos no
      HTML — precisam vir de consultas reais (já há rascunhos no `meu-mangue.sql`).
- [ ] `minhas-historias.html` (dashboard): lista fixa (2 exemplos fake); `apagar()`
      só faz `console.log` — falta listagem real por usuário e apagar de verdade.
- [ ] `meu-perfil.html`: `salvarPerfil()` e `apagarConta()` só fazem `console.log`
      — não existe nenhuma função de atualizar/apagar usuário no model/controller
      ainda; precisa ser criada do zero.

### 🟢 Prioridade baixa (organização/limpeza, não quebra nada)

- [ ] Código morto do template "aquatech": `aquarioController.js`,
      `avisoController.js`, `empresaController.js`, `medidaController.js` e
      models/rotas equivalentes, mais as linhas correspondentes em `app.js`.
- [ ] `src/database/script-tabelas.sql` desatualizado (ainda mostra schema
      "aquatech"); atualizar para refletir o schema real ou remover.
- [ ] `src/routes/index.js` usa `res.render("index")` sem view engine configurada
      — código morto (o `express.static` já responde `GET /` antes dessa rota).
- [ ] Sobras de copy-paste: `console.log("ESTOU NO THEN DO entrar()!")` em
      `login.html` e `nova-historia.html`; comentário desatualizado em
      `historiaController.js` mencionando `usuarioModel.js`; `sessionStorage.AQUARIOS`
      salvo sem necessidade em `login.html`.
- [ ] `package.json` lista `"path"` como dependência — é módulo nativo do Node,
      não precisa ser instalado via npm.

### Prompts 32-34 (ciclo de correção do login)

> ok vou vamos da um passo atras pera ai tem como eu mudar esta conversa para o repositorio que voce esta vinculado seja este com o projeto e os codigos ??

**Resposta da IA (resumo):** sessão movida, via ferramenta de troca de diretório,
para `C:\meu-mangue` (antes só tinha acesso como pasta extra) — projeto agora
vinculado como diretório principal da sessão.

> ok agora olhe de novo ele e me fale as prioridades por favor

**Resposta da IA (resumo):** reapresentação do checklist já salvo (nada havia
mudado nos arquivos, só a vinculação da sessão).

> pode repetir o guia

**Resposta da IA (resumo):** repetição do guia dos 3 ajustes do login (query do
`usuarioModel.js`, simplificação do `usuarioController.js`, limpeza do
`login.html`).

> ok consegui o item 1 e 3 acho confira se esta ok e me explique melhor o item 2

**Resposta da IA (resumo):** itens 1 e 3 validados como corretos. Explicação
aprofundada do item 2 — o papel de `resultadoAutenticar.length` nas 3 ramificações
(`== 1`, `== 0`, caso contrário), por que a chamada a `aquarioModel` não fazia mais
sentido (dependia de `empresaId`, já removido da query), e o que deveria substituí-la
(um único `res.json({ id, email, nome })`, sem `senha`). Checklist de 3 ações
passado ao autor, sem reescrever o arquivo.

> corrigi, dá uma olhada de novo

**Resposta da IA (resumo):** `usuarioController.js` validado como correto —
bloco do `aquarioModel` substituído por `res.json` direto, `require` não utilizado
removido, resto da lógica intacta. Login considerado pronto para teste.

> nao esta redirecionando

**Resposta da IA (resumo):** diagnóstico ativo pela IA (não apenas orientação):
rodado um script Node pontual, usando as próprias credenciais do `.env.dev`, para
testar a conexão/consulta ao banco diretamente. Resultado: erro de permissão
(`SELECT command denied to user 'insert_mangue'@'localhost'`) — causa raiz não era
mais código, e sim o usuário do MySQL usado pela aplicação ter só permissão de
`INSERT`.

> o meu banco é so de insert o que esta la

**Resposta da IA (resumo):** explicado o impacto: toda função de leitura (login e,
no futuro, listagens) depende de `SELECT`; editar/apagar vão depender de
`UPDATE`/`DELETE`. Autor confirmou que a restrição foi um erro de configuração (não
proposital), e foi orientado a conceder as permissões faltantes no MySQL (fora do
código da aplicação, via usuário administrador).

> nao foi ainda mudei as permissoes do usuario reinicie todas as aplicaçoes e nao foi

**Resposta da IA (resumo):** reexecutado o mesmo script de diagnóstico — `SELECT`
já funcionando, confirmando que a permissão foi corrigida com sucesso. Como o autor
ainda via falha, foi passado um checklist de diagnóstico (URL certa com servidor
rodando, aba Network do navegador, terminal do `npm run dev`).

> ok estava na url errada esta indo para a dash agr, vamos continuar as ligaçoes, o cadastro esta ok ?

**Resposta da IA (resumo):** login confirmado funcional. Revisão do fluxo de
cadastro (`cadastro.html`, rota, controller, model) — estrutura correta e deveria
funcionar (usuário do banco já tinha `INSERT` desde o início). Identificados 2
achados novos, fora do checklist original: (1) senha e confirmação de senha nunca
são comparadas; (2) em caso de falha (ex: e-mail duplicado, coluna `UNIQUE`), o
usuário não vê nenhuma mensagem de erro.

## Item novo: polimento de cadastro/login (login funcional, ajustes em cadastro.html)

> ok o cadastro esta tudo ok, vamos fazer essas mudanças que citou ? [...] seria legal colocar um filtro com for para so receber senhas fortes [...] na parte de mensagem que aparece erro ou sucesso precisamos mudar o css tbm

**Resposta da IA (resumo):** 4 melhorias guiadas passo a passo em `cadastro.html`
(e `estilo.css`), todas implementadas pelo autor com revisão da IA a cada rodada:
1. Validação de senha == confirmação de senha (5ª condição no `if` de campos).
2. Exibição do erro real do servidor na falha do cadastro (`resposta.text().then(...)`
   substituindo um `throw` de texto fixo).
3. Validação de senha forte (mínimo 8 caracteres, 1 número, 1 maiúscula) usando um
   `for` percorrendo a string caractere por caractere e comparação por intervalo
   (`caractere >= '0' && caractere <= '9'`, etc.) — técnica escolhida para não
   depender de regex.
4. Diferenciação visual via CSS: nova classe `.card_erro.sucesso` (verde,
   `#2E6B3F`) ativada com `classList.add`/`remove` conforme sucesso ou erro,
   mantendo o vermelho como padrão de erro.

Idas e vindas no processo: esqueceu de "fechar" o estado de carregamento
(`finalizarAguardar()`) no bloco de senha fraca na primeira tentativa; inverteu
`add`/`remove` no bloco de sucesso numa rodada. Ambos corrigidos pelo autor após
explicação da IA, sem a IA escrever o código.

## Item: correção do `validarSessao()` (checklist 🔴, item 3)

> sim, vamos corrigir o validarSessao

**Resposta da IA (resumo):** explicado o bug (`getElementById` retorna `null` em
páginas sem `#b_usuario`, e a linha seguinte quebra ao tentar `null.innerHTML`).
Apresentadas 2 opções — adicionar o elemento em todas as páginas, ou tornar a
função defensiva checando `if (b_usuario)` antes de usá-lo — com recomendação pela
segunda. Autor escolheu a opção B.

> corrigi, dá uma olhada de novo *(duas rodadas)*

**Resposta da IA (resumo):** primeira tentativa criou um bloco `if (b_usuario)`
novo e redundante, rodando sempre (inclusive deslogado), sem proteger a linha
original que de fato quebrava. Explicado por que a correção precisava **substituir**
a linha existente dentro do `if (email != null && nome != null)`, não adicionar um
bloco paralelo. Segunda tentativa corrigida e validada.

## Próximos passos

- Checklist 🔴 (prioridade alta) 100% concluído: login, `usuarioController.js` e
  `validarSessao()` corrigidos e revisados. Login e cadastro funcionais, com
  validação de senha forte e feedback visual de sucesso/erro.
- Restante do checklist 🟡/🟢 ainda pendente: listagem/detalhe/edição de histórias,
  dashboard com dados reais, perfil (salvar/apagar conta), limpeza de código morto
  do template "aquatech", `script-tabelas.sql` desatualizado, `src/routes/index.js`,
  sobras de copy-paste, dependência `"path"` desnecessária no `package.json`.
