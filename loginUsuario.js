var listaDeUsuarios = []
var listaDeResponsaveis = []
var usuario = document.getElementById("usuarioInput")
var senha = document.getElementById("senhaInput")

var posicao = -1

var usuarioADMIN = 'admin'
var senhaADMIN = 'admin'

function logar() {
    var logou = false
    var usuarioLogado

    if (usuario.value === usuarioADMIN && senha.value === senhaADMIN) {
        alert('Olá, ADMIN!')
        logou = true
        usuarioLogado = usuarioADMIN
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))
        window.location.href = "inicioIN.html"
    } else {
        listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosKey"))
        listaDeResponsaveis = JSON.parse(localStorage.getItem("responsaveisKey"))

        // Verifica se há registros de usuários
        if (ehListaVazia(listaDeUsuarios)) {
            alert('Não há usuários cadastrados!')
            return
        }
        // Valida preenchimento obrigatório dos campos
        if (ehInputVazio(usuario.value) || ehInputVazio(senha.value)) {
            alert('Não pode haver campos vazios')
            return
        }

        if (ehCpfValido(listaDeUsuarios, usuario.value)) { // Valida CPF do titular
            if (ehSenhaValida(listaDeUsuarios, senha.value, posicao)) {
                logou = true
                usuarioLogado = {
                    id: listaDeUsuarios[posicao].id,
                    nome: listaDeUsuarios[posicao].nome
                }
                localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))
                alert(`Bem-vindo(a), ${usuarioLogado.nome}!`)
                window.location.href = "inicioIN.html"
            } else {
                alert('Senha inválida!')
            }
        } else if (ehCpfValido(listaDeResponsaveis, usuario.value)) { // Senão, valida CPF do responsável
            if (ehSenhaValida(listaDeResponsaveis, senha.value, posicao)) {
                logou = true
                usuarioLogado = {
                    id: listaDeResponsaveis[posicao].idResp,
                    nome: listaDeResponsaveis[posicao].nomeResp
                }
                localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))
                alert(`Bem-vindo(a), ${usuarioLogado.nome}!`)
                window.location.href = "inicioIN.html"
            } else {
                alert('Senha inválida!')
            }
        } else {
            alert('Usuário inválido!')
            return
        }
    }
}


function ehCpfValido(lista, cpf) {
    var retorno = false
    for (i = 0; i < lista.length; i++) {
        if (cpf == lista[i].cpf || cpf == lista[i].cpfResp) {
            posicao = i
            retorno = true
        }
    }
    return retorno
}

function ehSenhaValida(lista, senha, posicao) {
    if (senha == lista[posicao].senha || senha == lista[posicao].senhaResp) {
        return true
    }
    return false
}

function ehInputVazio(input) {
    if (input == '' || input == null || input == undefined) {
        return true
    }
    return false
}

function ehListaVazia(lista) {
    if (lista == null || lista == '' || lista == undefined) {
        return true
    }
    return false
}