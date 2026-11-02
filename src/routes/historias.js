var express = require("express");
var router = express.Router();

var historiaController = require("../controllers/historiaController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/salvarHistoria", function (req, res) {
    historiaController.salvarHistoria(req, res);
})

module.exports = router;