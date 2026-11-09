var historiaModel = require("../models/historiaModel");

function salvarHistoria(req, res) {
    var nomeMusica = req.body.nomeMusicaServer;
    var artista = req.body.artistaServer;
    var dataMusica = req.body.dataMusicaServer;
    var trecho = req.body.trechoServer;
    var textoCompleto = req.body.textoCompletoServer;
    var fkFaseVida = req.body.fkFaseVidaServer;
    var fkUsuario = req.body.fkUsuarioServer;

    if (nomeMusica == undefined) {
        res.status(400).send("Precisa-se ter uma música vinculada a está história!");
    } else if (artista == undefined) {
        res.status(400).send("Precisa-se ter um artista vinculado a está história!");
    } else if (dataMusica == undefined) {
        res.status(400).send("Precisa-se ter uma data vinculada a está história!");
    } else if (trecho == undefined) {
        res.status(400).send("Precisa-se ter um trecho vinculado a está história!");
    } else if (textoCompleto == undefined) {
        res.status(400).send("Precisa-se ter uma historia elaborada vinculada a está história!");
    } else if (fkFaseVida == undefined) {
        res.status(400).send("Precisa-se ter uma fase de sua vida vinculada a está história!");
    } else if (fkUsuario == undefined) {
        res.status(400).send("Precisa-se ter uma pessoa vinculada a está história!");
    }else {

        historiaModel.salvarHistoria(nomeMusica, artista, dataMusica, trecho, textoCompleto, fkFaseVida, fkUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao cadastrar sua história! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function listarTodas(req, res){
    historiaModel.listarTodas()
    .then(
        function (resultado) {
            res.json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao listar as histórias! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );
}

function listarPorUsuario(req, res){
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined){
         res.status(400).send("O id do usuário está undefined!");
    }else {
        historiaModel.listarPorUsuario(idUsuario)
    .then(
        function (resultado) {
            res.json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao listar as histórias! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );
    }
}

function buscarPorId(req, res){
    var idHistoria = req.params.idHistoria;

    if (idHistoria == undefined){
         res.status(400).send("O id da história está undefined!");
    }else {
        historiaModel.buscarPorId(idHistoria)
    .then(
        function (resultado) {
            res.json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao listar as histórias! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );
    }
}

module.exports = {
    salvarHistoria,
    listarTodas,
    listarPorUsuario,
    buscarPorId
}