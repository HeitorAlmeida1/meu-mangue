var database = require("../database/config")

function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT id, nome, email FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;

    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, senha) {
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}');
    `;

    return database.executar(instrucaoSql);
}

function atualizar(idUsuario, nome, email, senha) {
    var instrucaoSql = "";

    if (senha == "") {
        instrucaoSql = `UPDATE usuario SET nome = '${nome}', email = '${email}' WHERE id = '${idUsuario}'`;
    } else {
        instrucaoSql = `UPDATE usuario SET nome = '${nome}', email = '${email}', senha = '${senha}' WHERE id = '${idUsuario}'`;
    }

    return database.executar(instrucaoSql);
}

function apagarHistoriasDoUsuario(idUsuario) {
    var instrucaoSql = `DELETE FROM historia WHERE fk_usuario = '${idUsuario}'`;

    return database.executar(instrucaoSql);
}

function apagar(idUsuario) {
    var instrucaoSql = `DELETE FROM usuario WHERE id = '${idUsuario}'`;

    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    atualizar,
    apagarHistoriasDoUsuario,
    apagar
};
