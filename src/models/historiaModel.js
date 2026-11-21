var database = require("../database/config");

function salvarHistoria(nomeMusica, artista, dataMusica, trecho, textoCompleto, impacto, fkFaseVida, fkGenero, fkUsuario) {
    console.log("ACESSEI O HISTORIA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function salvarHistoria()");
    var instrucaoSql = `
        INSERT INTO historia (nome_musica, artista, data_musica, trecho, texto_completo, impacto, fk_fase_vida, fk_genero, fk_usuario)
            VALUES ('${nomeMusica}', '${artista}', '${dataMusica}', '${trecho}', '${textoCompleto}', '${impacto}', '${fkFaseVida}', '${fkGenero}', '${fkUsuario}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarTodas() {
    console.log("ACESSEI O HISTORIA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarTodas()");
    var instrucaoSql = `
        SELECT
            h.id,
            h.nome_musica,
            h.artista,
            h.data_musica,
            h.trecho,
            h.impacto,
            f.nome AS fase,
            g.nome AS genero,
            u.nome AS autor
        FROM historia h
            INNER JOIN fase_vida f
                ON h.fk_fase_vida = f.id
            INNER JOIN genero g
                ON h.fk_genero = g.id
            INNER JOIN usuario u
                ON h.fk_usuario = u.id
        ORDER BY h.data_publicacao DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPorUsuario(idUsuario) {
    console.log("ACESSEI O HISTORIA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
    var instrucaoSql = `
        SELECT
            h.id,
            h.nome_musica,
            h.artista,
            h.data_musica,
            h.trecho,
            h.impacto,
            f.nome AS fase,
            g.nome AS genero,
            u.nome AS autor
        FROM historia h
            INNER JOIN fase_vida f
                ON h.fk_fase_vida = f.id
            INNER JOIN genero g
                ON h.fk_genero = g.id
            INNER JOIN usuario u
                ON h.fk_usuario = u.id
        WHERE h.fk_usuario = '${idUsuario}'
        ORDER BY h.data_publicacao DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPorId(idHistoria) {
    console.log("ACESSEI O HISTORIA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarPorId()");
    var instrucaoSql = `
        SELECT
            h.id,
            h.nome_musica,
            h.artista,
            h.data_musica,
            h.trecho,
            h.texto_completo,
            h.impacto,
            h.fk_fase_vida,
            h.fk_genero,
            h.fk_usuario,
            f.nome AS fase,
            g.nome AS genero,
            u.nome AS autor
        FROM historia h
            INNER JOIN fase_vida f
                ON h.fk_fase_vida = f.id
            INNER JOIN genero g
                ON h.fk_genero = g.id
            INNER JOIN usuario u
                ON h.fk_usuario = u.id
        WHERE h.id = '${idHistoria}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function apagar(idHistoria) {
    console.log("ACESSEI O HISTORIA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function apagar()");
    var instrucaoSql = `
        DELETE FROM historia WHERE id = '${idHistoria}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizar(idHistoria, nomeMusica, artista, dataMusica, trecho, textoCompleto, impacto, fkFaseVida, fkGenero) {
    console.log("ACESSEI O HISTORIA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizar()");
    var instrucaoSql = `
        UPDATE historia SET
            nome_musica = '${nomeMusica}',
            artista = '${artista}',
            data_musica = '${dataMusica}',
            trecho = '${trecho}',
            texto_completo = '${textoCompleto}',
            impacto = '${impacto}',
            fk_fase_vida = '${fkFaseVida}',
            fk_genero = '${fkGenero}'
        WHERE id = '${idHistoria}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function contarPorUsuario(idUsuario) {
    console.log("ACESSEI O HISTORIA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function contarPorUsuario()");
    var instrucaoSql = `
        SELECT COUNT(id) AS total FROM historia WHERE fk_usuario = '${idUsuario}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function contarTodas() {
    console.log("ACESSEI O HISTORIA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function contarTodas()");
    var instrucaoSql = `
        SELECT COUNT(id) AS total FROM historia;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function impactoMedioPorUsuario(idUsuario) {
    console.log("ACESSEI O HISTORIA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function impactoMedioPorUsuario()");
    var instrucaoSql = `
        SELECT ROUND(AVG(impacto), 1) AS media FROM historia WHERE fk_usuario = '${idUsuario}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function destaquePorUsuario(idUsuario) {
    console.log("ACESSEI O HISTORIA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function destaquePorUsuario()");
    var instrucaoSql = `
        SELECT
            h.id,
            h.nome_musica,
            h.artista,
            h.impacto,
            u.nome AS autor
        FROM historia h
            INNER JOIN usuario u
                ON h.fk_usuario = u.id
        WHERE h.fk_usuario = '${idUsuario}'
        ORDER BY h.impacto DESC, h.data_publicacao DESC
        LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function contarPorFase(idUsuario) {
    console.log("ACESSEI O HISTORIA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function contarPorFase()");
    var instrucaoSql = `
        SELECT
            f.nome AS fase,
            COUNT(h.id) AS total
        FROM fase_vida f
            LEFT JOIN historia h
                ON h.fk_fase_vida = f.id AND h.fk_usuario = '${idUsuario}'
        GROUP BY f.id, f.nome
        ORDER BY f.id;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function contarPorGeneroEFase(idUsuario) {
    console.log("ACESSEI O HISTORIA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function contarPorGeneroEFase()");
    var instrucaoSql = `
        SELECT
            g.nome AS genero,
            f.nome AS fase,
            COUNT(h.id) AS total
        FROM historia h
            INNER JOIN genero g
                ON h.fk_genero = g.id
            INNER JOIN fase_vida f
                ON h.fk_fase_vida = f.id
        WHERE h.fk_usuario = '${idUsuario}'
        GROUP BY g.nome, f.nome, f.id
        ORDER BY f.id, total DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function contarPorDecada(idUsuario) {
    console.log("ACESSEI O HISTORIA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function contarPorDecada()");
    var instrucaoSql = `
        SELECT
            CONCAT(FLOOR(YEAR(data_musica) / 10) * 10, 's') AS decada,
            COUNT(id) AS total
        FROM historia
        WHERE fk_usuario = '${idUsuario}'
        GROUP BY decada
        ORDER BY decada;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function impactoMedioPorFase(idUsuario) {
    console.log("ACESSEI O HISTORIA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function impactoMedioPorFase()");
    var instrucaoSql = `
        SELECT
            f.nome AS fase,
            ROUND(AVG(h.impacto), 1) AS media
        FROM historia h
            INNER JOIN fase_vida f
                ON h.fk_fase_vida = f.id
        WHERE h.fk_usuario = '${idUsuario}'
        GROUP BY f.id, f.nome
        ORDER BY f.id;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
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
