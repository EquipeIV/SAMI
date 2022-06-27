/* ACOPLADO
var listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosKey"))
var listaDeResponsaveis = JSON.parse(localStorage.getItem("responsaveisKey"))
var listaDeEventos = JSON.parse(localStorage.getItem("eventosKey"))

var idEventoEditar = document.getElementById("idEventoEditar")
var novoValor = document.getElementById("novoValor")

var eventoBuscado = ''
var posicao = -1

var stringPrint

var selectAtributosEvento = document.querySelector('#atributo')
selectAtributosEvento.addEventListener('change', function () { })

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

function editarEventoPorId() {
    if (!ehInputVazio(novoValor.value)) {
        switch (selectAtributosEvento.value) {
            case 'nome':
                listaDeEventos[posicao].nomeUsuario = novoValor.value
                break
            case 'data':
                listaDeEventos[posicao].data = novoValor.value
                break
            case 'horario':
                listaDeEventos[posicao].horario = novoValor.value
                break
            case 'plataforma':
                listaDeEventos[posicao].plataforma = novoValor.value
                break
        }
        localStorage.setItem("eventosKey", JSON.stringify(listaDeEventos))
        alert('Registro editado!')
    } else {
        alert("Campo não pode ser vazio!")
    }
    location.reload()
}

function deletarEventoPorId() {
    if (existeId(idEventoEditar.value)) {
        listaDeEventos.splice(posicao, 1)
        localStorage.setItem("eventosKey", JSON.stringify(listaDeEventos))
        alert('Registro deletado!')
    } 
    location.reload()
}


// ----- VALIDAÇÕES -----

function ehInputVazio(input) {
    if (input == '' || input == null || input == undefined) {
        return true
    } else {
        return false
    }
}

function existeId(id) {
    var retorno = false

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
*/