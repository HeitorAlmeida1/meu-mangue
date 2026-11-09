var express = require("express");
var router = express.Router();

var historiaController = require("../controllers/historiaController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/salvarHistoria", function (req, res) {
    historiaController.salvarHistoria(req, res);
})

router.get("/listarTodas", function (req, res) {
    historiaController.listarTodas(req, res);
})

router.get("/listarPorUsuario/:idUsuario", function (req, res) {
    historiaController.listarPorUsuario(req, res);
})

router.get("/buscarPorId/:idHistoria", function (req, res) {
    historiaController.buscarPorId(req, res);
})

module.exports = router;