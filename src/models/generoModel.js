var database = require("../database/config")

function listar(){

    var instrucaoSql = `SELECT id, nome FROM genero ORDER BY nome`

    return database.executar(instrucaoSql)
}

module.exports = {
    listar
};
