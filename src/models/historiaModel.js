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

module.exports = {
    salvarHistoria
};