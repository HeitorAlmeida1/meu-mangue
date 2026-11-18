var database = require("../database/config")

function listar(){

    var instrucaoSql = `SELECT id, nome, descricao FROM fase_vida ORDER BY id`

    return database.executar(instrucaoSql)
}

module.exports = {
    listar
};
