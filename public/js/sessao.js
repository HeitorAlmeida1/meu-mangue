function caminhoBase() {
    if (window.location.pathname.indexOf("/dashboard/") > -1) {
        return "../";
    }
    return "";
}
function estaLogado() {
    return sessionStorage.EMAIL_USUARIO != undefined && sessionStorage.NOME_USUARIO != undefined;
}
function montarNavbar(paginaAtual) {
    var navbar = document.getElementById("navbar");
    if (navbar == null) {
        return;
    }
    var base = caminhoBase();
    var html = "";
    html += criarItemNavbar("home", "Home", base + "index.html", paginaAtual);
    html += criarItemNavbar("historias", "Histórias", base + "historias.html", paginaAtual);
    if (estaLogado()) {
        html += criarItemNavbar("nova-historia", "Nova história", base + "nova-historia.html", paginaAtual);
        html += criarItemNavbar("dashboard", "Dashboard", base + "dashboard/dashboard.html", paginaAtual);
        html += `<li><a href="#" onclick="limparSessao(); return false;">Sair</a></li>`;
    } else {
        html += criarItemNavbar("login", "Login", base + "login.html", paginaAtual);
        html += criarItemNavbar("cadastro", "Cadastro", base + "cadastro.html", paginaAtual);
    }
    navbar.innerHTML = html;
}
function criarItemNavbar(chave, texto, link, paginaAtual) {
    var classe = "";

    if (chave == paginaAtual) {
        classe = ' class="agora"';
    }
    return `<li${classe}><a href="${link}">${texto}</a></li>`;
}
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var b_usuario = document.getElementById("b_usuario");
    if (email != null && nome != null) {
        if (b_usuario) {
            b_usuario.innerHTML = nome;
        }
    } else {
        window.location = caminhoBase() + "login.html";
    }
}
function limparSessao() {
    var base = caminhoBase();
    sessionStorage.clear();
    window.location = base + "login.html";
}
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    if (divAguardar) {
        divAguardar.style.display = "flex";
    }
}
function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    if (divAguardar) {
        divAguardar.style.display = "none";
    }
    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto && divErrosLogin) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}