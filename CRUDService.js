var listaDeEventos = []
var listaDeUsuarios = []
var usuarioLogado

var novoEvento
var idEvento = 1
var nomeUsuario, data, horario, plataforma
var plataformaNumerada

var usuarioSimulado
var usuarioRegistrado
var posicaoUsuarioDaLista
var eventoAtualLogado
var eventoAtualGeral
var posicao = -1
var idEventoDeletar = document.getElementById("idEventoDeletar")
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

function deletarEventoPorId() {
    listaDeEventos = JSON.parse(localStorage.getItem("eventosKey"))
    if (!ehInputVazio(idEventoDeletar.value)) {
        if (existeId(idEventoDeletar.value)) {
            listaDeEventos.splice(posicao, 1)
            localStorage.setItem("eventosKey", JSON.stringify(listaDeEventos))
            alert('Evento deletado!')
        } else {
            alert(`O seguinte ID não existe: [${idEventoDeletar.value}]`)
        }
    } else {
        alert("Campo não pode ser vazio!")
    }
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
}

function limparObjetoLogado() {
    localStorage.setItem('usuarioLogado', '')
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