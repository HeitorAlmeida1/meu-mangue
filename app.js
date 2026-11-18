// var ambiente_processo = 'producao';
var ambiente_processo = 'desenvolvimento';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';

require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");

var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();

var usuarioRouter = require("./src/routes/usuarios");
var historiasRouter = require("./src/routes/historias");
var generosRouter = require("./src/routes/generos");
var fasesVidaRouter = require("./src/routes/fasesVida");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/usuarios", usuarioRouter);
app.use("/historias", historiasRouter);
app.use("/generos", generosRouter);
app.use("/fasesVida", fasesVidaRouter);

app.listen(PORTA_APP, function () {
    console.log(`
    Servidor do Meu Mangue rodando em: http://${HOST_APP}:${PORTA_APP}

    Ambiente: ${process.env.AMBIENTE_PROCESSO}
    Para alternar entre desenvolvimento e produção, comente ou descomente
    as linhas 1 e 2 deste arquivo.
    `);
});
