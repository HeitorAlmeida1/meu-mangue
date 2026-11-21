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
// function buscarAquariosPorEmpresa(empresaId) {
//   var instrucaoSql = `
//     SELECT
//       a.id,
//       a.descricao,
//       a.tipo_agua AS tipoAgua,
//       a.fk_empresa AS empresaId,
//       COALESCE(SUM(CASE WHEN ea.status_aprovacao = 'APROVADA' THEN 1 ELSE 0 END), 0) AS totalEspecies
//     FROM aquario a
//     LEFT JOIN especie_aquario ea ON ea.fk_aquario = a.id
//     WHERE a.fk_empresa = ${Number(empresaId)}
//     GROUP BY a.id, a.descricao, a.tipo_agua, a.fk_empresa
//     ORDER BY a.id;
//   `;
//
//   console.log("Executando a instrução SQL: \n" + instrucaoSql);
//   return database.executar(instrucaoSql);
// }
//
// function buscarPorId(idAquario) {
//   var instrucaoSql = `
//     SELECT
//       id,
//       descricao,
//       tipo_agua AS tipoAgua,
//       fk_empresa AS empresaId
//     FROM aquario
//     WHERE id = ${Number(idAquario)};
//   `;
//
//   console.log("Executando a instrução SQL: \n" + instrucaoSql);
//   return database.executar(instrucaoSql);
// }
//
// function cadastrar(descricao, tipoAgua, empresaId) {
//   var instrucaoSql = `
//     INSERT INTO aquario (descricao, tipo_agua, fk_empresa)
//     VALUES ('${escapar(descricao)}', '${escapar(tipoAgua)}', ${Number(empresaId)});
//   `;
//
//   console.log("Executando a instrução SQL: \n" + instrucaoSql);
//   return database.executar(instrucaoSql);
// }
//
//
// module.exports = {
//   buscarAquariosPorEmpresa,
//   buscarPorId,
//   cadastrar
// }
//
