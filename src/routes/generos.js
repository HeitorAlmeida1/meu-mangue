var express = require("express");
var router = express.Router();

var generoController = require("../controllers/generoController");

router.get("/listar", function (req, res) {
    generoController.listar(req, res);
})

module.exports = router;
