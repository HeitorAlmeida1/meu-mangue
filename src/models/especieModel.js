// ============================================================
// ARQUIVO ORIGINAL DA API web-data-viz (BandTec)
// Mantido comentado: não é usado pelo Meu Mangue, mas preservado
// conforme a orientação de não remover nada da API original.
// ============================================================
// var database = require("../database/config");
//
// function escapar(valor) {
//   return String(valor).replace(/'/g, "''");
// }
//
// function cadastrar(especie) {
//   var instrucaoSql = `
//     INSERT INTO especie (
//       nome,
//       nome_normalizado,
//       tipo_agua,
//       tamanho_medio_cm,
//       status_aprovacao,
//       fk_empresa,
//       fk_usuario_criador,
//       fk_usuario_aprovador,
//       data_aprovacao
//     ) VALUES (
//       '${escapar(especie.nome)}',
//       '${escapar(especie.nomeNormalizado)}',
//       '${escapar(especie.tipoAgua)}',
//       ${Number(especie.tamanhoMedioCm)},
//       '${escapar(especie.statusAprovacao)}',
//       ${Number(especie.idEmpresa)},
//       ${Number(especie.idUsuarioCriador)},
//       ${especie.idUsuarioAprovador ? Number(especie.idUsuarioAprovador) : "NULL"},
//       ${especie.idUsuarioAprovador ? "NOW()" : "NULL"}
//     );
//   `;
//
//   return database.executar(instrucaoSql);
// }
//
// function listarPorEmpresa(empresaId) {
//   var instrucaoSql = `
//     SELECT
//       e.id,
//       e.nome,
//       e.tipo_agua AS tipoAgua,
//       e.tamanho_medio_cm AS tamanhoMedioCm,
//       e.status_aprovacao AS statusAprovacao,
//       e.data_criacao AS dataCriacao,
//       uc.nome AS usuarioCriador,
//       ua.nome AS usuarioAprovador
//     FROM especie e
//     JOIN usuario uc ON uc.id = e.fk_usuario_criador
//     LEFT JOIN usuario ua ON ua.id = e.fk_usuario_aprovador
//     WHERE e.fk_empresa = ${Number(empresaId)}
//     ORDER BY e.id DESC;
//   `;
//
//   return database.executar(instrucaoSql);
// }
//
// function listarPendentes(empresaId) {
//   var instrucaoSql = `
//     SELECT
//       e.id,
//       e.nome,
//       e.tipo_agua AS tipoAgua,
//       e.tamanho_medio_cm AS tamanhoMedioCm,
//       e.data_criacao AS dataCriacao,
//       u.nome AS usuarioCriador
//     FROM especie e
//     JOIN usuario u ON u.id = e.fk_usuario_criador
//     WHERE e.fk_empresa = ${Number(empresaId)}
//       AND e.status_aprovacao = 'PENDENTE'
//     ORDER BY e.id ASC;
//   `;
//
//   return database.executar(instrucaoSql);
// }
//
// function buscarPorId(idEspecie) {
//   var instrucaoSql = `
//     SELECT
//       id,
//       nome,
//       nome_normalizado AS nomeNormalizado,
//       tipo_agua AS tipoAgua,
//       status_aprovacao AS statusAprovacao,
//       fk_empresa AS empresaId
//     FROM especie
//     WHERE id = ${Number(idEspecie)};
//   `;
//
//   return database.executar(instrucaoSql);
// }
//
// function atualizarStatus(idEspecie, status, idUsuarioAprovador) {
//   var instrucaoSql = `
//     UPDATE especie
//     SET
//       status_aprovacao = '${escapar(status)}',
//       fk_usuario_aprovador = ${Number(idUsuarioAprovador)},
//       data_aprovacao = NOW()
//     WHERE id = ${Number(idEspecie)};
//   `;
//
//   return database.executar(instrucaoSql);
// }
//
// function cadastrarAlocacao(idEspecie, idAquario, idUsuarioSolicitante, statusAprovacao, idUsuarioAprovador) {
//   var instrucaoSql = `
//     INSERT INTO especie_aquario (
//       fk_especie,
//       fk_aquario,
//       status_aprovacao,
//       fk_usuario_solicitante,
//       fk_usuario_aprovador,
//       data_aprovacao
//     ) VALUES (
//       ${Number(idEspecie)},
//       ${Number(idAquario)},
//       '${escapar(statusAprovacao)}',
//       ${Number(idUsuarioSolicitante)},
//       ${idUsuarioAprovador ? Number(idUsuarioAprovador) : "NULL"},
//       ${idUsuarioAprovador ? "NOW()" : "NULL"}
//     );
//   `;
//
//   return database.executar(instrucaoSql);
// }
//
// function listarAlocacoesPorEmpresa(empresaId) {
//   var instrucaoSql = `
//     SELECT
//       ea.id,
//       e.nome AS especie,
//       e.tipo_agua AS tipoAguaEspecie,
//       a.descricao AS aquario,
//       a.tipo_agua AS tipoAguaAquario,
//       ea.status_aprovacao AS statusAprovacao,
//       us.nome AS usuarioSolicitante,
//       ua.nome AS usuarioAprovador,
//       ea.data_solicitacao AS dataSolicitacao
//     FROM especie_aquario ea
//     JOIN especie e ON e.id = ea.fk_especie
//     JOIN aquario a ON a.id = ea.fk_aquario
//     JOIN usuario us ON us.id = ea.fk_usuario_solicitante
//     LEFT JOIN usuario ua ON ua.id = ea.fk_usuario_aprovador
//     WHERE e.fk_empresa = ${Number(empresaId)}
//     ORDER BY ea.id DESC;
//   `;
//
//   return database.executar(instrucaoSql);
// }
//
// function listarMetricas(empresaId) {
//   var instrucaoTotal = `
//     SELECT
//       COUNT(*) AS totalEspecies,
//       SUM(CASE WHEN status_aprovacao = 'PENDENTE' THEN 1 ELSE 0 END) AS pendentes,
//       SUM(CASE WHEN status_aprovacao = 'APROVADA' THEN 1 ELSE 0 END) AS aprovadas,
//       SUM(CASE WHEN status_aprovacao = 'REJEITADA' THEN 1 ELSE 0 END) AS rejeitadas
//     FROM especie
//     WHERE fk_empresa = ${Number(empresaId)};
//   `;
//
//   var instrucaoTipoAgua = `
//     SELECT
//       tipo_agua AS tipoAgua,
//       COUNT(*) AS total
//     FROM especie
//     WHERE fk_empresa = ${Number(empresaId)}
//     GROUP BY tipo_agua;
//   `;
//
//   var instrucaoFaixaTamanho = `
//     SELECT
//       CASE
//         WHEN tamanho_medio_cm < 10 THEN 'PEQUENO'
//         WHEN tamanho_medio_cm <= 30 THEN 'MEDIO'
//         ELSE 'GRANDE'
//       END AS faixa,
//       COUNT(*) AS total
//     FROM especie
//     WHERE fk_empresa = ${Number(empresaId)}
//     GROUP BY faixa;
//   `;
//
//   return Promise.all([
//     database.executar(instrucaoTotal),
//     database.executar(instrucaoTipoAgua),
//     database.executar(instrucaoFaixaTamanho),
//   ]);
// }
//
// module.exports = {
//   cadastrar,
//   listarPorEmpresa,
//   listarPendentes,
//   buscarPorId,
//   atualizarStatus,
//   cadastrarAlocacao,
//   listarAlocacoesPorEmpresa,
//   listarMetricas,
// };
//
