var database = require("../database/config")

function salvarHistoria(nomeMusica, artista, dataMusica, trecho, textoCompleto, fkFaseVida, fkUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nomeMusica, artista, dataMusica, trecho, textoCompleto, fkFaseVida, fkUsuario);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO historia (nome_musica, artista, data_musica, trecho, texto_completo, fk_fase_vida, fk_usuario) VALUES ('${nomeMusica}', '${artista}', '${dataMusica}', '${trecho}', '${textoCompleto}', '${fkFaseVida}', '${fkUsuario}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarTodas(){

    var instrucaoSql = `SELECT h.id, h.nome_musica, h.artista, h.data_musica, h.trecho, f.nome AS fase, u.nome AS autor FROM historia h JOIN fase_vida f ON h.fk_fase_vida = f.id JOIN usuario u ON h.fk_usuario = u.id ORDER BY h.data_publicacao DESC`

    return database.executar(instrucaoSql)
}

function listarPorUsuario(idUsuario){

    var instrucaoSql = `SELECT h.id, h.nome_musica, h.artista, h.data_musica, h.trecho, f.nome AS fase, u.nome AS autor FROM historia h JOIN fase_vida f ON h.fk_fase_vida = f.id JOIN usuario u ON h.fk_usuario = u.id WHERE h.fk_usuario = '${idUsuario}' ORDER BY h.data_publicacao DESC`

    return database.executar(instrucaoSql)
}

function buscarPorId(idHistoria){

    var instrucaoSql = `SELECT h.fk_fase_vida, h.texto_completo, h.id, h.nome_musica, h.artista, h.data_musica, h.trecho, f.nome AS fase, u.nome AS autor FROM historia h JOIN fase_vida f ON h.fk_fase_vida = f.id JOIN usuario u ON h.fk_usuario = u.id WHERE h.id = '${idHistoria}'`

    return database.executar(instrucaoSql)
}

module.exports = {
    salvarHistoria,
    listarTodas,
    listarPorUsuario,
    buscarPorId
};