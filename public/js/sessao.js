// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var b_usuario = document.getElementById("b_usuario");

    if (email != null && nome != null) {
        // O if abaixo existe porque nem toda tela do Meu Mangue tem o b_usuario.
        if (b_usuario) {
            b_usuario.innerHTML = nome;
        }
    } else {
        window.location = "/login.html";
    }
}

// Função da API original, não utilizada no Meu Mangue:
// function validarSupervisor() {
//     if (String(sessionStorage.TIPO_USUARIO || "").toUpperCase() !== "SUPERVISOR") {
//         return false;
//     }
//
//     return true;
// }

function limparSessao() {
    sessionStorage.clear();
    window.location = "/login.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}

// navbar do Meu Mangue
function estaLogado() {
    return sessionStorage.EMAIL_USUARIO != undefined && sessionStorage.NOME_USUARIO != undefined;
}

function montarNavbar(paginaAtual) {
    var navbar = document.getElementById("navbar");

    if (navbar == null) {
        return;
    }

    var html = "";

    html += criarItemNavbar("home", "Home", "/index.html", paginaAtual);
    html += criarItemNavbar("historias", "Histórias", "/historias.html", paginaAtual);

    if (estaLogado()) {
        html += criarItemNavbar("nova-historia", "Nova história", "/nova-historia.html", paginaAtual);
        html += criarItemNavbar("dashboard", "Dashboard", "/dashboard/dashboard.html", paginaAtual);
        html += `<li><a href="#" onclick="limparSessao(); return false;">Sair</a></li>`;
    } else {
        html += criarItemNavbar("login", "Login", "/login.html", paginaAtual);
        html += criarItemNavbar("cadastro", "Cadastro", "/cadastro.html", paginaAtual);
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
