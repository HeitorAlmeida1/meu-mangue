// ============================================================
// ARQUIVO ORIGINAL DA API web-data-viz (BandTec)
// Mantido comentado: não é usado pelo Meu Mangue, mas preservado
// conforme a orientação de não remover nada da API original.
// ============================================================
// var especieModel = require("../models/especieModel");
// var aquarioModel = require("../models/aquarioModel");
//
// function normalizarNome(nome) {
//   return nome
//     .normalize("NFD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .toLowerCase()
//     .trim()
//     .replace(/\s+/g, " ");
// }
//
// function ehSupervisor(tipoUsuario) {
//   return String(tipoUsuario || "").toUpperCase() === "SUPERVISOR";
// }
//
// function cadastrar(req, res) {
//   var nome = req.body.nome;
//   var tipoAgua = req.body.tipoAgua;
//   var tamanhoMedioCm = Number(req.body.tamanhoMedioCm);
//   var idUsuario = Number(req.body.idUsuario);
//   var idEmpresa = Number(req.body.idEmpresa);
//   var tipoUsuario = req.body.tipoUsuario;
//
//   if (!nome || !tipoAgua || !idUsuario || !idEmpresa || !tamanhoMedioCm) {
//     return res.status(400).send("Campos obrigatorios nao informados para cadastrar especie.");
//   }
//
//   if (Number.isNaN(tamanhoMedioCm) || tamanhoMedioCm <= 0) {
//     return res.status(400).send("tamanhoMedioCm deve ser um numero positivo.");
//   }
//
//   var nomeNormalizado = normalizarNome(nome);
//   var statusAprovacao = ehSupervisor(tipoUsuario) ? "APROVADA" : "PENDENTE";
//
//   especieModel
//     .cadastrar({
//       nome: nome.trim(),
//       nomeNormalizado,
//       tipoAgua: String(tipoAgua).toUpperCase(),
//       tamanhoMedioCm,
//       statusAprovacao,
//       idEmpresa,
//       idUsuarioCriador: idUsuario,
//       idUsuarioAprovador: ehSupervisor(tipoUsuario) ? idUsuario : null,
//     })
//     .then(function (resultado) {
//       res.status(201).json(resultado);
//     })
//     .catch(function (erro) {
//       if (erro && erro.code === "ER_DUP_ENTRY") {
//         return res.status(409).send("Ja existe especie com esse nome na empresa.");
//       }
//
//       console.log(erro);
//       res.status(500).json(erro.sqlMessage || erro.message || erro);
//     });
// }
//
// function listarPorEmpresa(req, res) {
//   var empresaId = req.params.empresaId;
//
//   especieModel
//     .listarPorEmpresa(empresaId)
//     .then(function (resultado) {
//       res.status(200).json(resultado);
//     })
//     .catch(function (erro) {
//       console.log(erro);
//       res.status(500).json(erro.sqlMessage || erro.message || erro);
//     });
// }
//
// function listarPendentes(req, res) {
//   var empresaId = req.params.empresaId;
//
//   especieModel
//     .listarPendentes(empresaId)
//     .then(function (resultado) {
//       res.status(200).json(resultado);
//     })
//     .catch(function (erro) {
//       console.log(erro);
//       res.status(500).json(erro.sqlMessage || erro.message || erro);
//     });
// }
//
// function aprovar(req, res) {
//   var idEspecie = Number(req.params.idEspecie);
//   var idUsuario = Number(req.body.idUsuario);
//   var tipoUsuario = req.body.tipoUsuario;
//
//   if (!ehSupervisor(tipoUsuario)) {
//     return res.status(403).send("Somente supervisor pode aprovar especie.");
//   }
//
//   especieModel
//     .atualizarStatus(idEspecie, "APROVADA", idUsuario)
//     .then(function (resultado) {
//       res.status(200).json(resultado);
//     })
//     .catch(function (erro) {
//       console.log(erro);
//       res.status(500).json(erro.sqlMessage || erro.message || erro);
//     });
// }
//
// function rejeitar(req, res) {
//   var idEspecie = Number(req.params.idEspecie);
//   var idUsuario = Number(req.body.idUsuario);
//   var tipoUsuario = req.body.tipoUsuario;
//
//   if (!ehSupervisor(tipoUsuario)) {
//     return res.status(403).send("Somente supervisor pode rejeitar especie.");
//   }
//
//   especieModel
//     .atualizarStatus(idEspecie, "REJEITADA", idUsuario)
//     .then(function (resultado) {
//       res.status(200).json(resultado);
//     })
//     .catch(function (erro) {
//       console.log(erro);
//       res.status(500).json(erro.sqlMessage || erro.message || erro);
//     });
// }
//
// function alocar(req, res) {
//   var idEspecie = Number(req.body.idEspecie);
//   var idAquario = Number(req.body.idAquario);
//   var idUsuario = Number(req.body.idUsuario);
//   var tipoUsuario = req.body.tipoUsuario;
//
//   if (!idEspecie || !idAquario || !idUsuario) {
//     return res.status(400).send("Campos obrigatorios nao informados para alocacao.");
//   }
//
//   especieModel
//     .buscarPorId(idEspecie)
//     .then(function (especies) {
//       if (!especies.length) {
//         return res.status(404).send("Especie nao encontrada.");
//       }
//
//       var especie = especies[0];
//
//       if (especie.statusAprovacao !== "APROVADA") {
//         return res.status(400).send("Somente especie aprovada pode ser alocada.");
//       }
//
//       return aquarioModel.buscarPorId(idAquario).then(function (aquarios) {
//         if (!aquarios.length) {
//           return res.status(404).send("Aquario nao encontrado.");
//         }
//
//         var aquario = aquarios[0];
//         if (aquario.empresaId !== especie.empresaId) {
//           return res.status(400).send("Especie e aquario devem pertencer a mesma empresa.");
//         }
//
//         if (String(especie.tipoAgua).toUpperCase() !== String(aquario.tipoAgua).toUpperCase()) {
//           return res.status(400).send("Tipo de agua incompativel entre especie e aquario.");
//         }
//
//         var statusAprovacao = ehSupervisor(tipoUsuario) ? "APROVADA" : "PENDENTE";
//
//         return especieModel
//           .cadastrarAlocacao(
//             idEspecie,
//             idAquario,
//             idUsuario,
//             statusAprovacao,
//             ehSupervisor(tipoUsuario) ? idUsuario : null
//           )
//           .then(function (resultado) {
//             res.status(201).json(resultado);
//           });
//       });
//     })
//     .catch(function (erro) {
//       if (erro && erro.code === "ER_DUP_ENTRY") {
//         return res.status(409).send("Essa especie ja esta relacionada ao aquario selecionado.");
//       }
//
//       console.log(erro);
//       res.status(500).json(erro.sqlMessage || erro.message || erro);
//     });
// }
//
// function listarAlocacoes(req, res) {
//   var empresaId = req.params.empresaId;
//
//   especieModel
//     .listarAlocacoesPorEmpresa(empresaId)
//     .then(function (resultado) {
//       res.status(200).json(resultado);
//     })
//     .catch(function (erro) {
//       console.log(erro);
//       res.status(500).json(erro.sqlMessage || erro.message || erro);
//     });
// }
//
// function listarMetricas(req, res) {
//   var empresaId = req.params.empresaId;
//
//   especieModel
//     .listarMetricas(empresaId)
//     .then(function (resultado) {
//       res.status(200).json({
//         resumo: resultado[0][0] || {
//           totalEspecies: 0,
//           pendentes: 0,
//           aprovadas: 0,
//           rejeitadas: 0,
//         },
//         porTipoAgua: resultado[1],
//         porFaixaTamanho: resultado[2],
//       });
//     })
//     .catch(function (erro) {
//       console.log(erro);
//       res.status(500).json(erro.sqlMessage || erro.message || erro);
//     });
// }
//
// module.exports = {
//   cadastrar,
//   listarPorEmpresa,
//   listarPendentes,
//   aprovar,
//   rejeitar,
//   alocar,
//   listarAlocacoes,
//   listarMetricas,
// };
//
