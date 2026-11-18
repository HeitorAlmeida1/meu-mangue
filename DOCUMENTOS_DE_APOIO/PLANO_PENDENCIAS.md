# Plano de pendências — Meu Mangue

Gerado em 2026-11-17. Lista consolidada de tudo que falta para o projeto ficar
completo, incluindo as mudanças de modelagem para alimentar os gráficos da dashboard.

A ordem importa: cada parte depende da anterior.

---

## PARTE 1 — Banco de dados (fazer primeiro, tudo depende disso)

**1.1** Criar a tabela `genero` — mesma estrutura de `fase_vida`:
`id` (PK, auto increment), `nome` (VARCHAR, NOT NULL).

**1.2** Popular `genero` com os gêneros que fazem sentido pro projeto
(ex: Manguebeat, MPB, Rock, Axé, R&B, Rap, Infantil, Pop...).

**1.3** Adicionar na tabela `historia`:
- `fk_genero INT NOT NULL` + a FOREIGN KEY referenciando `genero(id)`
- `impacto INT NOT NULL` (valor de 1 a 5)

**1.4** Atualizar o `src/database/meu-mangue.sql` para refletir o schema novo
(é o arquivo que documenta o banco).

**1.5** Popular o banco com 20–30 histórias variadas via `INSERT` direto.
Hoje são 7 (uma chamada "teste") — gráfico com 7 registros fica vazio na
apresentação. Variar gêneros, fases, décadas e impactos.

⚠️ Atenção: as histórias que já existem não têm `fk_genero` nem `impacto`.
Ao adicionar colunas `NOT NULL` numa tabela com dados, defina um valor padrão
para as linhas antigas (ou preencha-as com `UPDATE` logo em seguida).

---

## PARTE 2 — Back-end: ajustar o que já existe

**2.1** `historiaModel.salvarHistoria` — incluir `fk_genero` e `impacto` no `INSERT`
(mais 2 parâmetros, mais 2 colunas, mais 2 valores).

**2.2** `historiaController.salvarHistoria` — ler os 2 campos novos do `req.body`
e validá-los, igual aos demais.

**2.3** `historiaModel.listarTodas` / `listarPorUsuario` / `buscarPorId` — acrescentar
o `JOIN` com `genero` e trazer `g.nome AS genero` e `h.impacto`.

---

## PARTE 3 — Back-end: rotas novas

**3.1** Apagar história — model (`DELETE FROM historia WHERE id`), controller e
rota `router.delete("/apagar/:idHistoria")`.

**3.2** Atualizar história — model (`UPDATE historia SET ... WHERE id`), controller e
rota `router.put("/atualizar/:idHistoria")`.

**3.3** Listar gêneros — model (`SELECT * FROM genero`), controller e rota `GET`.
Serve para montar o `<select>` do formulário a partir do banco.

**3.4** Listar fases — mesma coisa para `fase_vida` (hoje as opções estão fixas no HTML).

**3.5** Métricas da dashboard (consultas com `COUNT` / `AVG` / `GROUP BY`):
- total de histórias do usuário
- total de histórias no site
- média de impacto das histórias do usuário
- contagem por fase da vida (gráfico 1)
- contagem por gênero e fase (gráfico 2)
- contagem por década (gráfico 3)
- média de impacto por fase (gráfico 4)

**3.6** Perfil do usuário — `atualizar` e `apagar` no `usuarioModel`/`usuarioController`
+ rotas `PUT` e `DELETE`. **Nada disso existe ainda.**

---

## PARTE 4 — Front-end: formulário de história

**4.1** `nova-historia.html` — adicionar `<select>` de gênero e campo de impacto
(1 a 5; um `<select>` é mais simples que estrelas).

**4.2** Incluir os 2 campos novos no objeto enviado no `fetch` e na validação.

**4.3** Preencher os `<select>` de gênero e fase a partir do banco (rotas 3.3 e 3.4),
em vez de deixar as opções fixas no HTML.

**4.4** **Modo edição** (depende da rota 3.2):
- carregar os dados da história nos campos ao abrir (usa `buscarPorId`, já pronta)
- deixar os `<select>` pré-selecionados na opção correta
- fazer `salvarHistoria()` decidir entre criar (POST) e atualizar (PUT), conforme
  exista ou não `sessionStorage.ID_HISTORIA_EDITANDO`

---

## PARTE 5 — Front-end: telas de leitura

**5.1** `historia-detalhe.html` — dar `id` aos elementos e preencher com `buscarPorId`
(rota pronta). Lembrar que o retorno é um array: usar `[0]`.

**5.2** `minhas-historias.html` — listar do banco com `listarPorUsuario`
(rota pronta), usando `sessionStorage.ID_USUARIO`.

**5.3** Ligar o botão apagar (depende da rota 3.1) nas duas telas — hoje só fazem
`console.log`.

---

## PARTE 6 — Dashboard e gráficos (Chart.js)

**6.1** Incluir o Chart.js na página (via link de CDN).

**6.2** Cards de métrica — hoje os 3 valores são fixos no HTML:
- `total_minhas` → total de histórias do usuário
- `total_site` → total no site
- `total_lidas` → **trocar**: o banco não registra leituras. Sugestão: usar
  "Impacto médio" das histórias do usuário, que o campo novo permite calcular.

**6.3** Card "Em destaque" — hoje com valor fixo. Sugestão de critério: a história
de **maior impacto** do usuário (o campo novo resolve isso objetivamente).

**6.4** Lista "Minhas histórias" do dashboard — usar `listarPorUsuario` (rota pronta).

**6.5** Gráficos sugeridos (só os que contam algo útil):

| # | Gráfico | Tipo | Por que vale |
|---|---|---|---|
| 1 | Histórias por fase da vida | rosca/pizza | é o eixo central do projeto |
| 2 | Gênero por fase da vida | barras agrupadas | mostra a mudança de gosto ao longo da vida — o mais rico |
| 3 | Músicas por década | barras | usa `data_musica`, dado que já existe |
| 4 | Impacto médio por fase | barras | usa o campo novo; responde "qual fase teve as músicas mais marcantes" |

---

## PARTE 7 — Perfil

**7.1** `meu-perfil.html` — ligar `salvarPerfil()` à rota de atualizar (3.6).

**7.2** Ligar `apagarConta()` à rota de apagar (3.6).

⚠️ **Decisão necessária:** apagar um usuário que tem histórias será **recusado pelo
MySQL** (restrição de chave estrangeira — deixaria histórias órfãs). É preciso
escolher entre apagar as histórias junto antes de apagar o usuário, ou bloquear a
exclusão e avisar o usuário.

---

## PARTE 8 — Achados extras (polimento e correções)

**8.1** `nova-historia.html` não valida sessão. Diferente das telas do dashboard,
ela não chama `validarSessao()` — qualquer pessoa não logada consegue abri-la, e aí
o `fkUsuarioServer` vai vazio e o cadastro falha com erro do servidor.

**8.2** `historia-detalhe.html` mostra os botões **Editar** e **Apagar** para
qualquer visitante, inclusive deslogado e inclusive em histórias de outra pessoa.
Decidir: esconder os botões quando não for o dono (comparando o `fk_usuario` da
história com o `sessionStorage.ID_USUARIO`).

**8.3** Placeholders não preenchidos no rodapé de 4 telas (`index.html`,
`historias.html`, `historia-detalhe.html`, `nova-historia.html`): aparecem
`seuemail@email.com` e `instagram.com/seuusuario`. As telas de login e cadastro já
têm os dados reais — basta padronizar.

**8.4** Remover a história de teste do banco ("teste / teste / teste") antes da
apresentação.

### Notas de contexto (não são tarefas)

Dois pontos existem desde o template original do professor e são comuns em projetos
de primeiro semestre, mas vale saber que existem:

- **Senhas gravadas em texto puro** no banco. Em produção se usaria hash.
- **Queries montadas por concatenação de texto**, o que abre espaço para SQL
  injection. Em produção se usaria query parametrizada.

Só vale mexer nisso se o professor pedir — fogem do escopo da entrega.
