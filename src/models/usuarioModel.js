var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT id, nome, email FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizar(idUsuario, nome, email, senha) {

    // Quando o usuário deixa o campo de senha em branco, a senha atual é mantida.
    var instrucaoSql = "";

    if (senha == "") {
        instrucaoSql = `UPDATE usuario SET nome = '${nome}', email = '${email}' WHERE id = '${idUsuario}'`;
    } else {
        instrucaoSql = `UPDATE usuario SET nome = '${nome}', email = '${email}', senha = '${senha}' WHERE id = '${idUsuario}'`;
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// As histórias precisam sair antes do usuário: a chave estrangeira
// fk_usuario impede apagar alguém que ainda tenha histórias no banco.
function apagarHistoriasDoUsuario(idUsuario) {

    var instrucaoSql = `DELETE FROM historia WHERE fk_usuario = '${idUsuario}'`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function apagar(idUsuario) {

    var instrucaoSql = `DELETE FROM usuario WHERE id = '${idUsuario}'`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    atualizar,
    apagarHistoriasDoUsuario,
    apagar
};