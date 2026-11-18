var database = require("../database/config")

var COLUNAS_LISTAGEM = `h.id, h.nome_musica, h.artista, h.data_musica, h.trecho, h.impacto,
                        f.nome AS fase, g.nome AS genero, u.nome AS autor`;

var TABELAS_LISTAGEM = `FROM historia h
                        JOIN fase_vida f ON h.fk_fase_vida = f.id
                        JOIN genero g ON h.fk_genero = g.id
                        JOIN usuario u ON h.fk_usuario = u.id`;

function salvarHistoria(nomeMusica, artista, dataMusica, trecho, textoCompleto, impacto, fkFaseVida, fkGenero, fkUsuario) {
    var instrucaoSql = `
        INSERT INTO historia (nome_musica, artista, data_musica, trecho, texto_completo, impacto, fk_fase_vida, fk_genero, fk_usuario)
        VALUES ('${nomeMusica}', '${artista}', '${dataMusica}', '${trecho}', '${textoCompleto}', '${impacto}', '${fkFaseVida}', '${fkGenero}', '${fkUsuario}');
    `;

    return database.executar(instrucaoSql);
}

function listarTodas() {
    var instrucaoSql = `SELECT ${COLUNAS_LISTAGEM} ${TABELAS_LISTAGEM} ORDER BY h.data_publicacao DESC`;

    return database.executar(instrucaoSql);
}

function listarPorUsuario(idUsuario) {
    var instrucaoSql = `SELECT ${COLUNAS_LISTAGEM} ${TABELAS_LISTAGEM}
                        WHERE h.fk_usuario = '${idUsuario}'
                        ORDER BY h.data_publicacao DESC`;

    return database.executar(instrucaoSql);
}

function buscarPorId(idHistoria) {
    var instrucaoSql = `SELECT ${COLUNAS_LISTAGEM}, h.texto_completo, h.fk_fase_vida, h.fk_genero, h.fk_usuario
                        ${TABELAS_LISTAGEM}
                        WHERE h.id = '${idHistoria}'`;

    return database.executar(instrucaoSql);
}

function apagar(idHistoria) {
    var instrucaoSql = `DELETE FROM historia WHERE id = '${idHistoria}'`;

    return database.executar(instrucaoSql);
}

function atualizar(idHistoria, nomeMusica, artista, dataMusica, trecho, textoCompleto, impacto, fkFaseVida, fkGenero) {
    var instrucaoSql = `UPDATE historia SET
                            nome_musica = '${nomeMusica}',
                            artista = '${artista}',
                            data_musica = '${dataMusica}',
                            trecho = '${trecho}',
                            texto_completo = '${textoCompleto}',
                            impacto = '${impacto}',
                            fk_fase_vida = '${fkFaseVida}',
                            fk_genero = '${fkGenero}'
                        WHERE id = '${idHistoria}'`;

    return database.executar(instrucaoSql);
}

function contarPorUsuario(idUsuario) {
    var instrucaoSql = `SELECT COUNT(id) AS total FROM historia WHERE fk_usuario = '${idUsuario}'`;

    return database.executar(instrucaoSql);
}

function contarTodas() {
    var instrucaoSql = `SELECT COUNT(id) AS total FROM historia`;

    return database.executar(instrucaoSql);
}

function impactoMedioPorUsuario(idUsuario) {
    var instrucaoSql = `SELECT ROUND(AVG(impacto), 1) AS media FROM historia WHERE fk_usuario = '${idUsuario}'`;

    return database.executar(instrucaoSql);
}

function destaquePorUsuario(idUsuario) {
    var instrucaoSql = `SELECT h.id, h.nome_musica, h.artista, h.impacto, u.nome AS autor
                        FROM historia h
                        JOIN usuario u ON h.fk_usuario = u.id
                        WHERE h.fk_usuario = '${idUsuario}'
                        ORDER BY h.impacto DESC, h.data_publicacao DESC
                        LIMIT 1`;

    return database.executar(instrucaoSql);
}

function contarPorFase(idUsuario) {
    var instrucaoSql = `SELECT f.nome AS fase, COUNT(h.id) AS total
                        FROM fase_vida f
                        LEFT JOIN historia h ON h.fk_fase_vida = f.id AND h.fk_usuario = '${idUsuario}'
                        GROUP BY f.id, f.nome
                        ORDER BY f.id`;

    return database.executar(instrucaoSql);
}

function contarPorGeneroEFase(idUsuario) {
    var instrucaoSql = `SELECT g.nome AS genero, f.nome AS fase, COUNT(h.id) AS total
                        FROM historia h
                        JOIN genero g ON h.fk_genero = g.id
                        JOIN fase_vida f ON h.fk_fase_vida = f.id
                        WHERE h.fk_usuario = '${idUsuario}'
                        GROUP BY g.nome, f.nome, f.id
                        ORDER BY f.id, total DESC`;

    return database.executar(instrucaoSql);
}

function contarPorDecada(idUsuario) {
    var instrucaoSql = `SELECT CONCAT(FLOOR(YEAR(data_musica) / 10) * 10, 's') AS decada, COUNT(id) AS total
                        FROM historia
                        WHERE fk_usuario = '${idUsuario}'
                        GROUP BY decada
                        ORDER BY decada`;

    return database.executar(instrucaoSql);
}

function impactoMedioPorFase(idUsuario) {
    var instrucaoSql = `SELECT f.nome AS fase, ROUND(AVG(h.impacto), 1) AS media
                        FROM historia h
                        JOIN fase_vida f ON h.fk_fase_vida = f.id
                        WHERE h.fk_usuario = '${idUsuario}'
                        GROUP BY f.id, f.nome
                        ORDER BY f.id`;

    return database.executar(instrucaoSql);
}

module.exports = {
    salvarHistoria,
    listarTodas,
    listarPorUsuario,
    buscarPorId,
    apagar,
    atualizar,
    contarPorUsuario,
    contarTodas,
    impactoMedioPorUsuario,
    destaquePorUsuario,
    contarPorFase,
    contarPorGeneroEFase,
    contarPorDecada,
    impactoMedioPorFase
};
