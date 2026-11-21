var faseVidaModel = require("../models/faseVidaModel");

function listar(req, res) {
    faseVidaModel.listar()
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao listar as fases da vida: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    listar
}
