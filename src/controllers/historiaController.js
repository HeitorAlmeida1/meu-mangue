var historiaModel = require("../models/historiaModel");

function salvarHistoria(req, res) {
    var nomeMusica = req.body.nomeMusicaServer;
    var artista = req.body.artistaServer;
    var dataMusica = req.body.dataMusicaServer;
    var trecho = req.body.trechoServer;
    var textoCompleto = req.body.textoCompletoServer;
    var impacto = req.body.impactoServer;
    var fkFaseVida = req.body.fkFaseVidaServer;
    var fkGenero = req.body.fkGeneroServer;
    var fkUsuario = req.body.fkUsuarioServer;

    if (nomeMusica == undefined || nomeMusica == "") {
        res.status(400).send("O nome da música está undefined!");
    } else if (artista == undefined || artista == "") {
        res.status(400).send("O artista está undefined!");
    } else if (dataMusica == undefined || dataMusica == "") {
        res.status(400).send("A data da música está undefined!");
    } else if (trecho == undefined || trecho == "") {
        res.status(400).send("O trecho está undefined!");
    } else if (textoCompleto == undefined || textoCompleto == "") {
        res.status(400).send("O texto completo está undefined!");
    } else if (impacto == undefined || impacto == "") {
        res.status(400).send("O impacto está undefined!");
    } else if (impacto < 1 || impacto > 5) {
        res.status(400).send("O impacto precisa ser um valor de 1 a 5!");
    } else if (fkFaseVida == undefined || fkFaseVida == "") {
        res.status(400).send("A fase da vida está undefined!");
    } else if (fkGenero == undefined || fkGenero == "") {
        res.status(400).send("O gênero musical está undefined!");
    } else if (fkUsuario == undefined || fkUsuario == "") {
        res.status(400).send("O usuário está undefined!");
    } else {
        historiaModel.salvarHistoria(nomeMusica, artista, dataMusica, trecho, textoCompleto, impacto, fkFaseVida, fkGenero, fkUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao cadastrar a história: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
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
                console.log(erro);
                console.log("Houve um erro ao listar as histórias: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function listarPorUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("O id do usuário está undefined!");
    } else {
        historiaModel.listarPorUsuario(idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao listar as histórias do usuário: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function buscarPorId(req, res) {
    var idHistoria = req.params.idHistoria;

    if (idHistoria == undefined) {
        res.status(400).send("O id da história está undefined!");
    } else {
        historiaModel.buscarPorId(idHistoria)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao buscar a história: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function apagar(req, res) {
    var idHistoria = req.params.idHistoria;

    if (idHistoria == undefined) {
        res.status(400).send("O id da história está undefined!");
    } else {
        historiaModel.apagar(idHistoria)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao apagar a história: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function atualizar(req, res) {
    var idHistoria = req.params.idHistoria;
    var nomeMusica = req.body.nomeMusicaServer;
    var artista = req.body.artistaServer;
    var dataMusica = req.body.dataMusicaServer;
    var trecho = req.body.trechoServer;
    var textoCompleto = req.body.textoCompletoServer;
    var impacto = req.body.impactoServer;
    var fkFaseVida = req.body.fkFaseVidaServer;
    var fkGenero = req.body.fkGeneroServer;

    if (idHistoria == undefined) {
        res.status(400).send("O id da história está undefined!");
    } else if (nomeMusica == undefined || nomeMusica == "") {
        res.status(400).send("O nome da música está undefined!");
    } else if (artista == undefined || artista == "") {
        res.status(400).send("O artista está undefined!");
    } else if (dataMusica == undefined || dataMusica == "") {
        res.status(400).send("A data da música está undefined!");
    } else if (trecho == undefined || trecho == "") {
        res.status(400).send("O trecho está undefined!");
    } else if (textoCompleto == undefined || textoCompleto == "") {
        res.status(400).send("O texto completo está undefined!");
    } else if (impacto == undefined || impacto == "") {
        res.status(400).send("O impacto está undefined!");
    } else if (impacto < 1 || impacto > 5) {
        res.status(400).send("O impacto precisa ser um valor de 1 a 5!");
    } else if (fkFaseVida == undefined || fkFaseVida == "") {
        res.status(400).send("A fase da vida está undefined!");
    } else if (fkGenero == undefined || fkGenero == "") {
        res.status(400).send("O gênero musical está undefined!");
    } else {
        historiaModel.atualizar(idHistoria, nomeMusica, artista, dataMusica, trecho, textoCompleto, impacto, fkFaseVida, fkGenero)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao atualizar a história: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

// Junta num só JSON tudo que a dashboard precisa, para a tela não ter
// que fazer oito requisições separadas. Cada consulta é feita na sequência
// e vai guardando o resultado no objeto dados.
function dadosDashboard(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("O id do usuário está undefined!");
    } else {
        var dados = {};

        historiaModel.contarPorUsuario(idUsuario).then(function (resultado) {
            dados.totalMinhas = resultado[0].total;
            return historiaModel.contarTodas();

        }).then(function (resultado) {
            dados.totalSite = resultado[0].total;
            return historiaModel.impactoMedioPorUsuario(idUsuario);

        }).then(function (resultado) {
            dados.impactoMedio = resultado[0].media;
            return historiaModel.destaquePorUsuario(idUsuario);

        }).then(function (resultado) {
            dados.destaque = resultado[0];
            return historiaModel.contarPorFase(idUsuario);

        }).then(function (resultado) {
            dados.porFase = resultado;
            return historiaModel.contarPorGeneroEFase(idUsuario);

        }).then(function (resultado) {
            dados.porGeneroEFase = resultado;
            return historiaModel.contarPorDecada(idUsuario);

        }).then(function (resultado) {
            dados.porDecada = resultado;
            return historiaModel.impactoMedioPorFase(idUsuario);

        }).then(function (resultado) {
            dados.impactoPorFase = resultado;
            res.json(dados);

        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os dados da dashboard: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
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
