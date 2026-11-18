var faseVidaModel = require("../models/faseVidaModel");

function listar(req, res) {
    faseVidaModel.listar()
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log("\nHouve um erro ao listar as fases da vida! Erro: ", erro.sqlMessage || erro);
                res.status(500).send("Não foi possível carregar as fases da vida.");
            }
        );
}

module.exports = {
    listar
}
