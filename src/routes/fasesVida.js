var express = require("express");
var router = express.Router();

var faseVidaController = require("../controllers/faseVidaController");

router.get("/listar", function (req, res) {
    faseVidaController.listar(req, res);
})

module.exports = router;
