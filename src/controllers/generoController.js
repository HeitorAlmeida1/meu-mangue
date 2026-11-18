var generoModel = require("../models/generoModel");

function listar(req, res) {
    generoModel.listar()
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log("\nHouve um erro ao listar os gêneros! Erro: ", erro.sqlMessage || erro);
                res.status(500).send("Não foi possível carregar os gêneros.");
            }
        );
}

module.exports = {
    listar
}
