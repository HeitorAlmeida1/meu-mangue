var generoModel = require("../models/generoModel");

function listar(req, res) {
    generoModel.listar()
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao listar os gêneros: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    listar
}
