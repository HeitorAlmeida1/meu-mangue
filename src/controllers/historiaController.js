var historiaModel = require("../models/historiaModel");

var ERRO_PADRAO = "Não foi possível completar a operação. Tente novamente.";

function estaVazio(valor) {
    return valor == undefined || valor.toString().trim() == "";
}

function validarHistoria(dados) {
    if (estaVazio(dados.nomeMusica)) {
        return "Informe o nome da música.";
    }
    if (estaVazio(dados.artista)) {
        return "Informe o nome do artista.";
    }
    if (estaVazio(dados.dataMusica)) {
        return "Informe a data da música.";
    }
    if (estaVazio(dados.trecho)) {
        return "Informe o trecho que aparece nos cards.";
    }
    if (estaVazio(dados.textoCompleto)) {
        return "Informe o texto completo da história.";
    }
    if (estaVazio(dados.fkFaseVida)) {
        return "Selecione a fase da vida.";
    }
    if (estaVazio(dados.fkGenero)) {
        return "Selecione o gênero musical.";
    }
    if (estaVazio(dados.impacto) || isNaN(Number(dados.impacto)) || Number(dados.impacto) < 1 || Number(dados.impacto) > 5) {
        return "O impacto precisa ser um valor de 1 a 5.";
    }

    return null;
}

function lerHistoriaDoBody(req) {
    return {
        nomeMusica: req.body.nomeMusicaServer,
        artista: req.body.artistaServer,
        dataMusica: req.body.dataMusicaServer,
        trecho: req.body.trechoServer,
        textoCompleto: req.body.textoCompletoServer,
        impacto: req.body.impactoServer,
        fkFaseVida: req.body.fkFaseVidaServer,
        fkGenero: req.body.fkGeneroServer,
        fkUsuario: req.body.fkUsuarioServer
    };
}

function responderErro(res, erro, contexto) {
    console.log("\n" + contexto + " Erro: ", erro.sqlMessage || erro);
    res.status(500).send(ERRO_PADRAO);
}

function salvarHistoria(req, res) {
    var dados = lerHistoriaDoBody(req);
    var erroValidacao = validarHistoria(dados);

    if (erroValidacao != null) {
        res.status(400).send(erroValidacao);
    } else if (estaVazio(dados.fkUsuario)) {
        res.status(400).send("Você precisa estar logado para publicar uma história.");
    } else {
        historiaModel.salvarHistoria(dados.nomeMusica, dados.artista, dados.dataMusica, dados.trecho, dados.textoCompleto, dados.impacto, dados.fkFaseVida, dados.fkGenero, dados.fkUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    responderErro(res, erro, "Houve um erro ao cadastrar a história!");
                }
            );
    }
}

function listarTodas(req, res) {
    historiaModel.listarTodas()
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                responderErro(res, erro, "Houve um erro ao listar as histórias!");
            }
        );
}

function listarPorUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    if (estaVazio(idUsuario)) {
        res.status(400).send("Informe o usuário das histórias.");
    } else {
        historiaModel.listarPorUsuario(idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    responderErro(res, erro, "Houve um erro ao listar as histórias do usuário!");
                }
            );
    }
}

function buscarPorId(req, res) {
    var idHistoria = req.params.idHistoria;

    if (estaVazio(idHistoria)) {
        res.status(400).send("Informe a história que deseja buscar.");
    } else {
        historiaModel.buscarPorId(idHistoria)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    responderErro(res, erro, "Houve um erro ao buscar a história!");
                }
            );
    }
}

function apagar(req, res) {
    var idHistoria = req.params.idHistoria;

    if (estaVazio(idHistoria)) {
        res.status(400).send("Informe a história que deseja apagar.");
    } else {
        historiaModel.apagar(idHistoria)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    responderErro(res, erro, "Houve um erro ao apagar a história!");
                }
            );
    }
}

function atualizar(req, res) {
    var idHistoria = req.params.idHistoria;
    var dados = lerHistoriaDoBody(req);
    var erroValidacao = validarHistoria(dados);

    if (estaVazio(idHistoria)) {
        res.status(400).send("Informe a história que deseja atualizar.");
    } else if (erroValidacao != null) {
        res.status(400).send(erroValidacao);
    } else {
        historiaModel.atualizar(idHistoria, dados.nomeMusica, dados.artista, dados.dataMusica, dados.trecho, dados.textoCompleto, dados.impacto, dados.fkFaseVida, dados.fkGenero)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    responderErro(res, erro, "Houve um erro ao atualizar a história!");
                }
            );
    }
}

function dadosDashboard(req, res) {
    var idUsuario = req.params.idUsuario;

    if (estaVazio(idUsuario)) {
        res.status(400).send("Informe o usuário da dashboard.");
    } else {
        Promise.all([
            historiaModel.contarPorUsuario(idUsuario),
            historiaModel.contarTodas(),
            historiaModel.impactoMedioPorUsuario(idUsuario),
            historiaModel.destaquePorUsuario(idUsuario),
            historiaModel.contarPorFase(idUsuario),
            historiaModel.contarPorGeneroEFase(idUsuario),
            historiaModel.contarPorDecada(idUsuario),
            historiaModel.impactoMedioPorFase(idUsuario)
        ]).then(
            function (resultados) {
                res.json({
                    totalMinhas: resultados[0][0].total,
                    totalSite: resultados[1][0].total,
                    impactoMedio: resultados[2][0].media,
                    destaque: resultados[3][0],
                    porFase: resultados[4],
                    porGeneroEFase: resultados[5],
                    porDecada: resultados[6],
                    impactoPorFase: resultados[7]
                });
            }
        ).catch(
            function (erro) {
                responderErro(res, erro, "Houve um erro ao buscar os dados da dashboard!");
            }
        );
    }
}

module.exports = {
    salvarHistoria,
    listarTodas,
    listarPorUsuario,
    buscarPorId,
    apagar,
    atualizar,
    dadosDashboard
}
