var listaDeEventos = []
var listaDeUsuarios = []
var listaDeResponsaveis = []
var usuarioLogado

var novoEvento
var idEvento = 1
var nomeUsuario, data, horario, plataforma
var plataformaNumerada

var usuarioADMIN = 'admin'
var senhaADMIN = 'admin'
var usuario = document.getElementById("usuarioInput")
var senha = document.getElementById("senhaInput")
var usuarioSimulado // VAI DEIXAR DE EXISTIR
var usuarioRegistrado
var posicaoUsuarioDaLista

var eventoAtualLogado
var eventoAtualGeral
var eventoBuscado = ''

var posicao = -1

var stringPrint

var idEventoEditar = document.getElementById("idEventoEditar")
var novoValorEditar = document.getElementById("novoValorEditar")

var selectAtributosEvento = document.querySelector('#atributo')
selectAtributosEvento.addEventListener('change', function () { })

// ----- CONSTRUTOR -----

function Evento(idEvento, idUsuario, nomeUsuario, data, horario, plataforma) {
    this.idEvento = idEvento
    this.idUsuario = idUsuario
    this.nomeUsuario = nomeUsuario
    this.data = data;
    this.horario = horario;
    this.plataforma = plataforma;
}

// ----- CRUD -----

function cadastrarNovoEvento() {
    validaListaEventosDoLocalStorage()
    usuarioSimulado = buscarUsuarioAleatorio()
    alert(`Usuário [${usuarioSimulado.nome}] fez um registro agora!`)
    idUsuario = usuarioSimulado.id
    nomeUsuario = usuarioSimulado.nome
    data = instanciaDataAtual()
    horario = instanciaHorarioAtual()
    plat = gerarSecaoPlataformaAleatoria()
    numPlat = gerarInteiroAleatorio(1, 20)
    plataformaNumerada = plat + numPlat

    novoEvento = new Evento(this.idEvento, idUsuario, nomeUsuario, data, horario, plataformaNumerada)

    listaDeEventos.push(novoEvento)
    localStorage.setItem("eventosKey", JSON.stringify(listaDeEventos))
    //gerarModal(/*PARÂMETROS DO OBJETO EVENTO*/)

}

function tabelarEventosDoUsuarioLogado() {
    var tabelaLogado = document.getElementById('eventosUsuario')
    tabelaLogado.innerText = ''
    listaDeEventos = JSON.parse(localStorage.getItem("eventosKey"))
    usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"))
    if (listaDeEventos == null || listaDeEventos == '' || listaDeEventos == undefined) {
        alert('Não há registros!')
    } else {
        var flag = 0
        for (i = 0; i < listaDeEventos.length; i++) {
            eventoAtualLogado = listaDeEventos[i]

            if (eventoAtualLogado.idUsuario == usuarioLogado.id) {
                flag = 1
                var tr = tabelaLogado.insertRow()

                var tdIdEventoLogado = tr.insertCell()
                var tdIdUsuarioLogado = tr.insertCell()
                var tdNomeLogado = tr.insertCell()
                var tdDataLogado = tr.insertCell()
                var tdHorarioLogado = tr.insertCell()
                var tdPlataformaLogado = tr.insertCell()

                tdIdEventoLogado.innerText = eventoAtualLogado.idEvento
                tdIdUsuarioLogado.innerText = eventoAtualLogado.idUsuario
                tdNomeLogado.innerText = eventoAtualLogado.nomeUsuario
                tdDataLogado.innerText = eventoAtualLogado.data
                tdHorarioLogado.innerText = eventoAtualLogado.horario
                tdPlataformaLogado.innerText = eventoAtualLogado.plataforma
            }
        }
        if (flag == 0) {
            alert("Não há registros!")
        }
    }
}

function tabelarTodosEventos() {
    var tabelaGeral = document.getElementById('eventosGeral')
    tabelaGeral.innerText = ''
    listaDeEventos = JSON.parse(localStorage.getItem("eventosKey"))
    if (listaDeEventos == null || listaDeEventos == '' || listaDeEventos == undefined) {
        alert('Não há registros!')
    } else {
        for (i = 0; i < listaDeEventos.length; i++) {
            eventoAtualGeral = listaDeEventos[i]

            var tr = tabelaGeral.insertRow()

            var tdIdEventoGeral = tr.insertCell()
            var tdIdUsuarioGeral = tr.insertCell()
            var tdNomeGeral = tr.insertCell()
            var tdDataGeral = tr.insertCell()
            var tdHorarioGeral = tr.insertCell()
            var tdPlataformaGeral = tr.insertCell()

            tdIdEventoGeral.innerText = eventoAtualGeral.idEvento
            tdIdUsuarioGeral.innerText = eventoAtualGeral.idUsuario
            tdNomeGeral.innerText = eventoAtualGeral.nomeUsuario
            tdDataGeral.innerText = eventoAtualGeral.data
            tdHorarioGeral.innerText = eventoAtualGeral.horario
            tdPlataformaGeral.innerText = eventoAtualGeral.plataforma
        }
    }
}

function buscarEventoPorId() {
    listaDeEventos = JSON.parse(localStorage.getItem("eventosKey"))
    for (i = 0; i < listaDeEventos.length; i++) {
        if (listaDeEventos[i].idEvento == idEventoEditar.value) {
            this.eventoBuscado = listaDeEventos[i]
            posicao = i
            mostrarEventoPorId()
        }
    }
}

function mostrarEventoPorId() {
    stringPrint = `${this.eventoBuscado.idEvento} | ${this.eventoBuscado.idUsuario} | ${this.eventoBuscado.nomeUsuario} | ${this.eventoBuscado.data} | ${this.eventoBuscado.horario} | ${this.eventoBuscado.plataforma}<br>`
    document.querySelector('#eventoBuscadoEditar').innerHTML = stringPrint
}

function deletarEventoPorId() {
    listaDeEventos = JSON.parse(localStorage.getItem("eventosKey"))
    if (!ehInputVazio(idEventoEditar.value)) {
        if (existeId(idEventoEditar.value)) {
            listaDeEventos.splice(posicao, 1)
            localStorage.setItem("eventosKey", JSON.stringify(listaDeEventos))
            alert('Evento deletado!')
        } else {
            alert(`O seguinte ID não existe: [${idEventoEditar.value}]`)
        }
    } else {
        alert("Campo não pode ser vazio!")
    }
    location.reload()
}

function editarEventoPorId() {
    listaDeEventos = JSON.parse(localStorage.getItem("eventosKey"))
    if (!ehInputVazio(idEventoEditar.value)) {
        if (existeId(idEventoEditar.value)) {
            switch (selectAtributosEvento.value) {
                case 'nome':
                    listaDeEventos[posicao].nomeUsuario = novoValorEditar.value
                    break
                case 'data':
                    listaDeEventos[posicao].data = novoValorEditar.value
                    break
                case 'horario':
                    listaDeEventos[posicao].horario = novoValorEditar.value
                    break
                case 'plataforma':
                    listaDeEventos[posicao].plataforma = novoValorEditar.value
                    break
            }
            localStorage.setItem("eventosKey", JSON.stringify(listaDeEventos))
            alert('Registro editado!')

        } else {
            alert(`O seguinte ID não existe: [${idEventoEditar.value}]`)
        }
    } else {
        alert("Campo não pode ser vazio!")
    }
    location.reload()
}

function limparObjetoLogado() {
    localStorage.setItem('usuarioLogado', '')
}

// ----- LOGIN -----

function logar() {

    if (usuario.value === usuarioADMIN && senha.value === senhaADMIN) {
        alert('Olá, ADMIN!')
        usuarioLogado = usuarioADMIN
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))
        window.location.href = "adminInicio.html"
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
                this.usuarioLogado = {
                    id: listaDeUsuarios[posicao].id,
                    nome: listaDeUsuarios[posicao].nome
                }
                localStorage.setItem('usuarioLogado', JSON.stringify(this.usuarioLogado))
                alert(`Bem-vindo(a), ${this.usuarioLogado.nome}!`)
                window.location.href = "inicioIN.html"
            } else {
                alert('Senha inválida!')
            }
        } else if (ehCpfValido(listaDeResponsaveis, usuario.value)) { // Senão, valida CPF do responsável
            if (ehSenhaValida(listaDeResponsaveis, senha.value, posicao)) {
                this.usuarioLogado = {
                    id: listaDeResponsaveis[posicao].idResp,
                    nome: listaDeResponsaveis[posicao].nomeResp
                }
                localStorage.setItem('usuarioLogado', JSON.stringify(this.usuarioLogado))
                alert(`Bem-vindo(a), ${this.usuarioLogado.nome}!`)
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

// ----- VALIDAÇÕES -----

function validaListaEventosDoLocalStorage() {
    listaDeEventos = JSON.parse(localStorage.getItem("eventosKey"))
    if (listaDeEventos == null || listaDeEventos == '' || listaDeEventos == undefined) {
        listaDeEventos = []
        this.idEvento = 1
    } else {
        var ultimoIndice = (listaDeEventos.length) - 1
        this.idEvento = (listaDeEventos[ultimoIndice].idEvento) + 1

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

function existeId(id) {
    var retorno = false
    listaDeEventos = JSON.parse(localStorage.getItem("eventosKey"))

    if (listaDeEventos == null || listaDeEventos == '' || listaDeEventos == undefined) {
        alert('Não há registros!')
    } else {
        for (i = 0; i < listaDeEventos.length; i++) {
            if (listaDeEventos[i].idEvento == id) {
                posicao = i
                retorno = true
            }
        }
    }
    return retorno
}

function ehInputVazio(input) {
    if (input == '' || input == null || input == undefined) {
        return true
    } else {
        return false
    }
}

function ehListaVazia(lista) {
    if (lista == '' || lista == null || lista == undefined) {
        return true
    }
    return false
}

// ----- BUILDERS -----

function instanciaDataAtual() {
    diasDaSemana = new Array("domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado")
    mesesDoAno = new Array("janeiro", "fevereiro", "março", "abril", "maio", "junho", "agosto", "outubro", "novembro", "dezembro")
    data = new Date
    return `${diasDaSemana[data.getDay()]}, ${data.getDate()}/${mesesDoAno[data.getMonth()]}/${data.getFullYear()}`
}

function instanciaHorarioAtual() {
    agora = new Date();
    horas = agora.getHours();
    minutos = agora.getMinutes();
    segundos = agora.getSeconds();
    return `${horas}:${minutos}:${segundos}`
}

// ----- SIMULADORES -----
// DEIXARÃO DE EXISTIR
function gerarInteiroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gerarSecaoPlataformaAleatoria() {
    var letras = ['A', 'B', 'C', 'D', 'E']
    var index = gerarInteiroAleatorio(0, 4)
    return letras[index]
}

function buscarUsuarioAleatorio() {
    listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosKey"))
    var tamanhoLista = listaDeUsuarios.length
    var posicaoNaLista = gerarInteiroAleatorio(1, tamanhoLista)
    return listaDeUsuarios[posicaoNaLista]
}