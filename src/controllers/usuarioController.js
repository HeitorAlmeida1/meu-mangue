var usuarioModel = require("../models/usuarioModel");

var ERRO_PADRAO = "Não foi possível completar a operação. Tente novamente.";
var ERRO_EMAIL_EM_USO = "Este e-mail já está cadastrado.";

function estaVazio(valor) {
    return valor == undefined || valor.toString().trim() == "";
}

function responderErro(res, erro, contexto) {
    console.log("\n" + contexto + " Erro: ", erro.sqlMessage || erro);

    if (erro.code == "ER_DUP_ENTRY") {
        res.status(400).send(ERRO_EMAIL_EM_USO);
    } else {
        res.status(500).send(ERRO_PADRAO);
    }
}

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (estaVazio(email)) {
        res.status(400).send("Informe o seu e-mail.");
    } else if (estaVazio(senha)) {
        res.status(400).send("Informe a sua senha.");
    } else {
        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    if (resultadoAutenticar.length == 1) {
                        res.json({
                            id: resultadoAutenticar[0].id,
                            email: resultadoAutenticar[0].email,
                            nome: resultadoAutenticar[0].nome
                        });
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("E-mail e/ou senha inválidos.");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    responderErro(res, erro, "Houve um erro ao realizar o login!");
                }
            );
    }
}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (estaVazio(nome)) {
        res.status(400).send("Informe o seu nome.");
    } else if (estaVazio(email)) {
        res.status(400).send("Informe o seu e-mail.");
    } else if (estaVazio(senha)) {
        res.status(400).send("Informe a sua senha.");
    } else {
        usuarioModel.cadastrar(nome, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    responderErro(res, erro, "Houve um erro ao realizar o cadastro!");
                }
            );
    }
}

function atualizar(req, res) {
    var idUsuario = req.params.idUsuario;
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (estaVazio(idUsuario)) {
        res.status(400).send("Informe o usuário que deseja atualizar.");
    } else if (estaVazio(nome)) {
        res.status(400).send("Informe o seu nome.");
    } else if (estaVazio(email)) {
        res.status(400).send("Informe o seu e-mail.");
    } else if (senha == undefined) {
        res.status(400).send("Informe a sua senha.");
    } else {
        usuarioModel.atualizar(idUsuario, nome, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    responderErro(res, erro, "Houve um erro ao atualizar o perfil!");
                }
            );
    }
}

function apagar(req, res) {
    var idUsuario = req.params.idUsuario;

    if (estaVazio(idUsuario)) {
        res.status(400).send("Informe o usuário que deseja apagar.");
    } else {
        // As histórias precisam sair antes do usuário: a chave estrangeira
        // fk_usuario impede apagar alguém que ainda tenha histórias no banco.
        usuarioModel.apagarHistoriasDoUsuario(idUsuario)
            .then(
                function () {
                    return usuarioModel.apagar(idUsuario);
                }
            ).then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    responderErro(res, erro, "Houve um erro ao apagar a conta!");
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrar,
    atualizar,
    apagar
}
