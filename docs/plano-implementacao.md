# Plano de implementacao - cadastro e governanca de especies

## 1) Visao geral

Este plano detalha a implementacao da funcionalidade de cadastro de especies com controle de duplicidade, compatibilidade por tipo de agua e aprovacao por supervisor, conforme `docs/especificacao.md`.

Objetivos praticos desta entrega:
- eliminar cadastros duplicados (incluindo variacoes de nome);
- impedir alocacao de especie em aquario com tipo de agua incompativel;
- introduzir fluxo de aprovacao para operacoes sensiveis (registro e alocacao);
- ampliar a dashboard com metricas de especies (tipo de agua e tamanho).

## 2) Arquivos alterados ou criados

### Backend (API)

**Alterar**
- `src/database/script-tabelas.sql` (novas colunas/tabelas e constraints);
- `app.js` (registrar rota de especies);
- `src/routes/usuarios.js` (ajustes para cadastro com `tipoUsuario`);
- `src/controllers/usuarioController.js` (validar e propagar `tipoUsuario`);
- `src/models/usuarioModel.js` (persistir e retornar `tipoUsuario` na autenticacao);
- `src/controllers/aquarioController.js` (validacao de `tipoAgua` no cadastro);
- `src/models/aquarioModel.js` (persistir/consultar `tipoAgua` e corrigir assinatura do cadastro);
- `public/login.html` (guardar `TIPO_USUARIO` na sessao);
- `public/cadastro.html` (campo `tipoUsuario` no formulario, com regra de perfil);
- `public/js/sessao.js` (validacao de sessao incluindo perfil quando necessario);
- `public/dashboard/cards.html` (exibir informacoes de tipo de agua e especies por aquario);
- `public/dashboard/dashboard.html` (adicionar visualizacao de metricas por especies).

**Criar**
- `src/routes/especies.js`;
- `src/controllers/especieController.js`;
- `src/models/especieModel.js`.

### Frontend (dashboard)

**Criar**
- `public/dashboard/especies.html` (tela de cadastro, listagem, aprovacao e alocacao de especies).

**Opcional (se precisarmos separar logica JS da pagina)**
- `public/js/especies.js`.

## 3) Componentes da solucao

- Camada de dados: schema revisado com suporte a papel de usuario, tipo de agua e ciclo de aprovacao.
- API de especies: endpoints para criar, listar, aprovar/rejeitar e alocar especie em aquario.
- API de aquarios: cadastro com `tipoAgua` obrigatorio e resposta com metadados para o front.
- Auth/sessao: retorno de perfil de usuario para controle de permissao no front.
- Dashboard de especies: formulario, fila de pendencias e indicadores.

## 4) Modelagem e regras de negocio

### 4.1 Entidades e campos

- `usuario` (alteracao): adicionar `tipo_usuario` (ex.: `BASICO`, `SUPERVISOR`).
- `aquario` (alteracao): adicionar `tipo_agua` (ex.: `DOCE`, `SALGADA`).
- `especie` (nova):
  - `id`;
  - `nome` (exibicao);
  - `nome_normalizado` (para anti-duplicidade);
  - `tipo_agua`;
  - `tamanho_medio_cm`;
  - `status_aprovacao` (`PENDENTE`, `APROVADA`, `REJEITADA`);
  - `fk_empresa`, `fk_usuario_criador`, `fk_usuario_aprovador`;
  - `data_criacao`, `data_aprovacao`.

> Decisao: manter `nome` para UX e usar `nome_normalizado` como chave de controle (lowercase, sem acento, sem espacos extras).

### 4.2 Regras obrigatorias

- `tipo_usuario` e `tipo_agua` sao obrigatorios.
- Nao permitir duas especies com mesmo `nome_normalizado` na mesma empresa.
- Somente `SUPERVISOR` pode aprovar/rejeitar cadastro e alocacao.
- Somente especie `APROVADA` pode ser alocada em aquario.
- So permitir alocacao se `especie.tipo_agua == aquario.tipo_agua`.

### 4.3 Regras de operacao

- Usuario `BASICO` pode solicitar cadastro/alocacao, mas com status pendente.
- Usuario `SUPERVISOR` pode criar ja aprovado (opcional por regra de produto) ou aprovar pendencias.
- Exclusao de especie aprovada deve exigir perfil `SUPERVISOR` e nao permitir se houver dependencia ativa (definir no endpoint).

## 5) Fluxo funcional (ponta a ponta)

1. Usuario autenticado acessa tela de especies.
2. Cadastro de especie envia `nome`, `tipoAgua`, `tamanhoMedioCm`.
3. API normaliza nome e valida duplicidade por empresa.
4. API grava especie como `PENDENTE` (ou `APROVADA` para supervisor, se habilitado).
5. Supervisor acessa fila de pendencias e aprova/rejeita.
6. Com especie aprovada, usuario solicita alocacao em aquario.
7. API valida compatibilidade de `tipo_agua` entre especie e aquario.
8. Dashboard exibe metricas: total de especies, pendentes, distribuicao por tipo de agua e faixa de tamanho.

## 6) Decisoes tecnicas

- Padrao arquitetural: manter convencao atual `route -> controller -> model`.
- Banco: usar constraint UNIQUE em (`fk_empresa`, `nome_normalizado`) para blindar duplicidade no nivel SQL.
- Integridade: validar regras tanto no controller quanto no model (defesa em profundidade).
- Compatibilidade: manter endpoints existentes sem quebra (incrementar payload, nao substituir chaves usadas hoje).
- Frontend: controle de permissao por `sessionStorage.TIPO_USUARIO` para esconder acoes de supervisor de usuarios basicos.
- Observabilidade minima: logs de operacoes de aprovacao e rejeicao no backend.

## 7) Etapas numeradas de implementacao e validacao

1. **Ajustar schema do banco**
   - Implementacao: atualizar `src/database/script-tabelas.sql` com novos campos/tabela e constraints.
   - Validacao:
     - executar script sem erro;
     - tentar inserir especie duplicada por `nome_normalizado` e confirmar bloqueio;
     - tentar inserir `tipo_usuario`/`tipo_agua` nulo e confirmar erro.

2. **Atualizar cadastro e autenticacao de usuario**
   - Implementacao: propagar `tipoUsuario` em `public/cadastro.html`, `src/routes/usuarios.js`, `src/controllers/usuarioController.js`, `src/models/usuarioModel.js`, `public/login.html`.
   - Validacao:
     - cadastrar usuario BASICO e SUPERVISOR;
     - autenticar e conferir `sessionStorage.TIPO_USUARIO` preenchido corretamente.

3. **Atualizar modulo de aquarios com tipo de agua**
   - Implementacao: ajustar controller/model de aquarios para receber e devolver `tipoAgua`.
   - Validacao:
     - cadastrar aquario com `DOCE` e `SALGADA`;
     - validar erro ao omitir `tipoAgua`.

4. **Criar modulo de especies (CRUD basico + workflow)**
   - Implementacao: criar `src/routes/especies.js`, `src/controllers/especieController.js`, `src/models/especieModel.js` e registrar em `app.js`.
   - Validacao:
     - criar especie nova e conferir status inicial;
     - tentar duplicar nome (com variacao de caixa/acento) e confirmar bloqueio;
     - listar especies por empresa.

5. **Implementar aprovacao de especies por supervisor**
   - Implementacao: endpoints de aprovar/rejeitar com verificacao de perfil.
   - Validacao:
     - BASICO nao consegue aprovar;
     - SUPERVISOR aprova e status muda para `APROVADA` com `fk_usuario_aprovador`.

6. **Implementar regra de alocacao por compatibilidade**
   - Implementacao: endpoint de alocacao validando status de aprovacao e `tipo_agua`.
   - Validacao:
     - alocacao incompativel retorna erro de regra de negocio;
     - alocacao compativel persiste e aparece na listagem.

7. **Criar interface de especies na dashboard**
   - Implementacao: nova tela `public/dashboard/especies.html` (formulario, tabela de pendencias e acoes de aprovacao).
   - Validacao:
     - BASICO visualiza cadastro e historico sem botoes de aprovacao;
     - SUPERVISOR visualiza e executa aprovar/rejeitar com feedback em tela.

8. **Atualizar metricas da dashboard**
   - Implementacao: ajustar `public/dashboard/cards.html` e `public/dashboard/dashboard.html` para exibir dados de especies.
   - Validacao:
     - grafico/indicadores refletem totais por tipo de agua e faixa de tamanho;
     - valores conferem com consultas SQL de apoio.

9. **Teste integrado e criterios de aceite**
   - Implementacao: roteiro manual cobrindo cadastro, duplicidade, aprovacao, alocacao e visualizacao.
   - Validacao:
     - executar cenarios feliz + erro;
     - registrar evidencias (prints/JSON de respostas) para cada criterio de aceite da especificacao.

## 8) Riscos e mitigacoes

- Risco de regressao no login/cadastro atual -> mitigar com teste de smoke nas telas existentes.
- Risco de inconsistencias por validacao so no front -> mitigar com validacao obrigatoria no backend e constraint SQL.
- Risco de divergencia entre nome exibido e nome normalizado -> mitigar com funcao unica de normalizacao no backend.

## 9) Entrega esperada ao final

- Fluxo completo de especies com governanca por perfil e compatibilidade de aquario.
- Dashboard refletindo as novas metricas operacionais.
- Documentacao tecnica atualizada com endpoints e regras aplicadas.
