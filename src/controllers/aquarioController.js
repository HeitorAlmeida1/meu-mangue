// ============================================================
// ARQUIVO ORIGINAL DA API web-data-viz (BandTec)
// Mantido comentado: não é usado pelo Meu Mangue, mas preservado
// conforme a orientação de não remover nada da API original.
// ============================================================
// var aquarioModel = require("../models/aquarioModel");
//
// function buscarAquariosPorEmpresa(req, res) {
//   var empresaId = req.params.empresaId;
//
//   aquarioModel.buscarAquariosPorEmpresa(empresaId).then((resultado) => {
//     if (resultado.length > 0) {
//       res.status(200).json(resultado);
//     } else {
//       res.status(204).json([]);
//     }
//   }).catch(function (erro) {
//     console.log(erro);
//     console.log("Houve um erro ao buscar os aquarios: ", erro.sqlMessage);
//     res.status(500).json(erro.sqlMessage);
//   });
// }
//
//
// function cadastrar(req, res) {
//   var descricao = req.body.descricao;
//   var tipoAgua = req.body.tipoAgua;
//   var empresaId = req.body.empresaId;
//
//   if (descricao == undefined) {
//     res.status(400).send("descricao está undefined!");
//   } else if (tipoAgua == undefined) {
//     res.status(400).send("tipoAgua está undefined!");
//   } else if (empresaId == undefined) {
//     res.status(400).send("empresaId está undefined!");
//   } else {
//
//
//     aquarioModel.cadastrar(descricao, String(tipoAgua).toUpperCase(), empresaId)
//       .then((resultado) => {
//         res.status(201).json(resultado);
//       }
//       ).catch((erro) => {
//         console.log(erro);
//         console.log(
//           "\nHouve um erro ao realizar o cadastro! Erro: ",
//           erro.sqlMessage
//         );
//         res.status(500).json(erro.sqlMessage);
//       });
//   }
// }
//
// module.exports = {
//   buscarAquariosPorEmpresa,
//   cadastrar
// }
//
