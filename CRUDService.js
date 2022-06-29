var listaDeEventos = []
var listaDeUsuarios = []
var listaDeResponsaveis = []
var usuarioLogado

var novoEvento
var idEvento = 1
var nomeUsuario
var data
var horario
var plataformavar
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
var usuarioRegistrado
var posicaoUsuarioDaLista

var eventoAtualLogado
var eventoAtualGeral
var eventoBuscado = ''
var dadoRecebido

var url
var numTag = ''

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

// ----- CRUD -----

function cadastrarNovoEvento() {
    validaListaEventosDoLocalStorage()
    idUsuario = numTag 
    nomeUsuario = 'Ana Paula Moraes'
    data = instanciaDataAtual()
    horario = instanciaHorarioAtual()
    plataformaNumerada = 'B12'

    this.novoEvento = new Evento(this.idEvento, idUsuario, nomeUsuario, data, horario, plataformaNumerada/*IP circuito*/)

    listaDeEventos.push(novoEvento)
    localStorage.setItem("eventosKey", JSON.stringify(listaDeEventos))
    ShowModal()
    //Condições para modal:
    // - Login ativo
    // - 'usuarioLogado' ser vinculado ao usuário do evento registrado
    /*usuarioLogado = localStorage.getItem("usuarioLogado")
    if (usuarioLogado != '' || usuarioLogado != null || usuarioLogado != undefined) {
        usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"))
        if (this.novoEvento.idUsuario == this.usuarioLogado.id) {
            ShowModal()
        }
    }*/
}

function habilitarLeitura(){
var habilita = setInterval(leitura(), 2000);
}

function desabilitarLeitura(){
    clearInterval(habilita)
}

function leitura(){
    url = '192.168.5.20'
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        dadoRecebido = this.responseText;
        if(dadoRecebido == numTag){
            cadastrarNovoEvento()
        }
      }
    };
    xhttp.open("GET", url+"/rfid", true);
    xhttp.send();
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
    var flag = 0
    for (i = 0; i < listaDeEventos.length; i++) {
        if (listaDeEventos[i].idEvento == idEventoEditar.value) {
            this.eventoBuscado = listaDeEventos[i]
            posicao = i
            flag++
            mostrarEventoPorId()
        }
    }
    if (flag == 0) {
        alert(`ID inexistente: [${idEventoEditar.value}]`)
        location.reload()
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
                case "":
                    alert('Selecione um campo!')
                    return
            }

            if (ehInputVazio(novoValorEditar.value)) {
                alert('Preencha novo valor para o campo!')
                return
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

// ----- MODAL -----

function ShowModal() {
    let Modal = document.getElementById("modal")
    Modal.classList.add("modal-show")
    divModal()
    setTimeout(HideModal, 5000)
}
function HideModal() {
    let Modal = document.getElementById("modal")
    Modal.classList.remove("modal-show")
}

function divModal() {
    listaDeEventos = JSON.parse(localStorage.getItem("eventosKey"))
    var ultimoEvento = listaDeEventos[listaDeEventos.length - 1]

    document.getElementById("modal").innerHTML =
        `<div class="content">
        <span class="close" onclick="HideModal()">&times;</span>
        <div class="tablehead" style="display: block;">
            <div class="titulo">  
            <h3>Usuário [${ultimoEvento.nomeUsuario}] registrou passagem</h3>
            </div>
            <table id="table">    
                <thead>
                    <th id="id">ID</th>               
                    <th id="data">DATA</th>
                    <th id="horario">HORARIO</th>
                    <th id="plaforma">PLATAFORMA</th>
                </thead>
                <div id="tabelainfo">
                </div>
                <tbody id="tabelainfo">
                    <tr align="center">
                        <td class="idUsuario">${ultimoEvento.idEvento}</td>
                        <td class="idUsuario">${ultimoEvento.data}</td>
                        <td class="idUsuario">${ultimoEvento.horario}</td>
                        <td class="idUsuario">${ultimoEvento.plataforma}</td>
                    </tr>
                </tbody>
             
            </table>
        </div>
    </div>
`
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

function gerarDadosApresentacao() {

    var listaDeUsuarios = []
    var listaDeResponsaveis = []
    var listaDeEventos = []

    var usuarioUm = {
        id: '016f2e1d',
        nome: 'Ana Paula Moraes',
        cpf: '1234321',
        senha: '123',
        endereco: enderecoUm = {
            cidade: 'São José',
            bairro: 'Barreiros',
            rua: 'Leoberto Leal',
            numero: '1123',
            complemento: 'Casa'
        }
    }

    var usuarioDois = {
        id: '64a7bb12',
        nome: 'Bruno Alves',
        cpf: '4321234',
        senha: '456',
        endereco: enderecoDois = {
            cidade: 'Palhoça',
            bairro: 'Pinheira',
            rua: 'Geral da Pinheira',
            numero: '222',
            complemento: 'Casa'
        }
    }

    var usuarioTres = {
        id: '01ff0621',
        nome: 'Daiana Mendes Silva',
        cpf: '9876789',
        senha: '9987',
        endereco: enderecoTres = {
            cidade: 'Florianópolis',
            bairro: 'Estreito',
            rua: 'Eng. Max de Souza',
            numero: '144',
            complemento: 'Casa'
        }
    }

    var usuarioQuatro = {
        id: '3e90e600',
        nome: 'Evandro Lins',
        cpf: '4567654',
        senha: '3334',
        endereco: enderecoQuatro = {
            cidade: 'São José',
            bairro: 'Bela Vista',
            rua: 'Campeche',
            numero: '445',
            complemento: 'apto 120'
        }
    }

    var usuarioCinco = {
        id: '55d24fae',
        nome: 'Gabriela Martins',
        cpf: '555666',
        senha: '22211',
        endereco: enderecoCinco = {
            cidade: 'São José',
            bairro: 'Jardim Cidade',
            rua: 'Manoel Dias',
            numero: '30',
            complemento: ''
        }
    }

    listaDeUsuarios = [usuarioUm, usuarioDois, usuarioTres, usuarioQuatro, usuarioCinco]
    localStorage.setItem("usuariosKey", JSON.stringify(listaDeUsuarios))

    var responsavelUm = {
        idResp: '01ff0621',
        nomeResp: 'Fabrício Mendes Silva',
        cpfResp: '45546767',
        senhaResp: '8876',
        enderecoResp: enderecoRespUm = {
            cidadeResp: 'Florianópolis',
            bairroResp: 'Estreito',
            ruaResp: 'Eng. Max de Souza',
            numeroResp: '144',
            complementoResp: 'Casa'
        }
    }

    var responsavelDois = {
        idResp: '016f2e1d',
        nomeResp: 'Túlio Santos Moraes',
        cpfResp: '3334443',
        senhaResp: '321',
        enderecoResp: enderecoRespDois = {
            cidadeResp: 'São José',
            bairroResp: 'Barreiros',
            ruaResp: 'Leoberto Leal',
            numeroResp: '1140',
            complementoResp: 'Casa'
        }
    }

    listaDeResponsaveis = [responsavelUm, responsavelDois]
    localStorage.setItem("responsaveisKey", JSON.stringify(listaDeResponsaveis))

    var eventoUm = {
        data: "terça, 21/junho/2022",
        horario: "20:14:59",
        idEvento: 1,
        idUsuario: "64a7bb12",
        nomeUsuario: "Bruno Alves",
        plataforma: "C1"
    }

    var eventoDois = {
        data: "terça, 21/junho/2022",
        horario: "20:17:3",
        idEvento: 2,
        idUsuario: "64a7bb12",
        nomeUsuario: "Bruno Alves",
        plataforma: "B13"
    }

    var eventoTres = {
        data: "terça, 21/junho/2022",
        horario: "20:21:16",
        idEvento: 3,
        idUsuario: "01ff0621",
        nomeUsuario: "Daiana Mendes Silva",
        plataforma: "B19"
    }

    var eventoQuatro = {
        data: "terça, 22/junho/2022",
        horario: "20:17:24",
        idEvento: 4,
        idUsuario: "64a7bb12",
        nomeUsuario: "Bruno Alves",
        plataforma: "E18"
    }

    var eventoCinco = {
        data: "terça, 22/junho/2022",
        horario: "10:18:39",
        idEvento: 5,
        idUsuario: "01ff0621",
        nomeUsuario: "Daiana Mendes Silva",
        plataforma: "C19"
    }

    var eventoSeis = {
        data: "terça, 23/junho/2022",
        horario: "11:23:49",
        idEvento: 6,
        idUsuario: "3e90e600",
        nomeUsuario: "Evandro Lins",
        plataforma: "C15"
    }

    var eventoSete = {
        data: "terça, 23/junho/2022",
        horario: "11:25:29",
        idEvento: 7,
        idUsuario: "3e90e600",
        nomeUsuario: "Evandro Lins",
        plataforma: "C16",
    }

    var eventoOito = {
        data: "terça, 23/junho/2022",
        horario: "11:27:34",
        idEvento: 8,
        idUsuario: "3e90e600",
        nomeUsuario: "Evandro Lins",
        plataforma: "C17"
    }

    var eventoNove = {
        data: "terça, 24/junho/2022",
        horario: "14:25:49",
        idEvento: 9,
        idUsuario: "01ff0621",
        nomeUsuario: "Daiana Mendes Silva",
        plataforma: "D16"
    }

    var eventoDez = {
        data: "terça, 25/junho/2022",
        horario: "14:35:36",
        idEvento: 10,
        idUsuario: "01ff0621",
        nomeUsuario: "Daiana Mendes Silva",
        plataforma: "D16"
    }

    var eventoOnze = {
        data: "terça, 26/junho/2022",
        horario: "21:47:59",
        idEvento: 11,
        idUsuario: "55d24fae",
        nomeUsuario: "Gabriela Martins",
        plataforma: "C7"
    }

    var eventoDoze = {
        data: "sexta, 26/junho/2022",
        horario: "08:43:51",
        idEvento: 12,
        idUsuario: "55d24fae",
        nomeUsuario: "Gabriela Martins",
        plataforma: "A3"
    }

    listaDeEventos = [
        eventoUm, eventoDois, eventoTres, eventoQuatro,
        eventoCinco, eventoSeis, eventoSete, eventoOito,
        eventoNove, eventoDez, eventoOnze, eventoDoze
    ]
    localStorage.setItem("eventosKey", JSON.stringify(listaDeEventos))
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

    var tamanhoLista = listaDeUsuarios.length - 1
    var posicaoNaLista = gerarInteiroAleatorio(0, tamanhoLista)
    return listaDeUsuarios[posicaoNaLista]
}

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

// ----- CRUD -----

function cadastrarNovoEvento() {
    validaListaEventosDoLocalStorage()
    usuarioSimulado = buscarUsuarioAleatorio()
    idUsuario = usuarioSimulado.id
    nomeUsuario = usuarioSimulado.nome
    data = instanciaDataAtual()
    horario = instanciaHorarioAtual()
    plat = gerarSecaoPlataformaAleatoria()
    numPlat = gerarInteiroAleatorio(1, 20)
    plataformaNumerada = plat + numPlat

    this.novoEvento = new Evento(this.idEvento, idUsuario, nomeUsuario, data, horario, plataformaNumerada)

    listaDeEventos.push(novoEvento)
    localStorage.setItem("eventosKey", JSON.stringify(listaDeEventos))

    usuarioLogado = localStorage.getItem("usuarioLogado")
    if (usuarioLogado != '' || usuarioLogado != null || usuarioLogado != undefined) {
        usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"))
        if (this.novoEvento.idUsuario == this.usuarioLogado.id) {
            ShowModal()
        }
    }
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
    var flag = 0
    for (i = 0; i < listaDeEventos.length; i++) {
        if (listaDeEventos[i].idEvento == idEventoEditar.value) {
            this.eventoBuscado = listaDeEventos[i]
            posicao = i
            flag++
            mostrarEventoPorId()
        }
    }
    if (flag == 0) {
        alert(`ID inexistente: [${idEventoEditar.value}]`)
        location.reload()
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
                case "":
                    alert('Selecione um campo!')
                    return
            }

            if (ehInputVazio(novoValorEditar.value)) {
                alert('Preencha novo valor para o campo!')
                return
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

// ----- MODAL -----

function ShowModal() {
    let Modal = document.getElementById("modal")
    Modal.classList.add("modal-show")
    divModal()
    setTimeout(HideModal, 5000)
}
function HideModal() {
    let Modal = document.getElementById("modal")
    Modal.classList.remove("modal-show")
}

function divModal() {
    listaDeEventos = JSON.parse(localStorage.getItem("eventosKey"))
    var ultimoEvento = listaDeEventos[listaDeEventos.length - 1]

    document.getElementById("modal").innerHTML =
        `<div class="content">
        <span class="close" onclick="HideModal()">&times;</span>
        <div class="tablehead" style="display: block;">
            <div class="titulo">  
            <h3>Usuário [${ultimoEvento.nomeUsuario}] registrou passagem</h3>
            </div>
            <table id="table">    
                <thead>
                    <th id="id">ID</th>               
                    <th id="data">DATA</th>
                    <th id="horario">HORARIO</th>
                    <th id="plaforma">PLATAFORMA</th>
                </thead>
                <div id="tabelainfo">
                </div>
                <tbody id="tabelainfo">
                    <tr align="center">
                        <td class="idUsuario">${ultimoEvento.idEvento}</td>
                        <td class="idUsuario">${ultimoEvento.data}</td>
                        <td class="idUsuario">${ultimoEvento.horario}</td>
                        <td class="idUsuario">${ultimoEvento.plataforma}</td>
                    </tr>
                </tbody>
             
            </table>
        </div>
    </div>
`
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

function gerarDadosApresentacao() {

    var listaDeUsuarios = []
    var listaDeResponsaveis = []
    var listaDeEventos = []

    var usuarioUm = {
        id: '016f2e1d',
        nome: 'Ana Paula Moraes',
        cpf: '1234321',
        senha: '123',
        endereco: enderecoUm = {
            cidade: 'São José',
            bairro: 'Barreiros',
            rua: 'Leoberto Leal',
            numero: '1123',
            complemento: 'Casa'
        }
    }

    var usuarioDois = {
        id: '64a7bb12',
        nome: 'Bruno Alves',
        cpf: '4321234',
        senha: '456',
        endereco: enderecoDois = {
            cidade: 'Palhoça',
            bairro: 'Pinheira',
            rua: 'Geral da Pinheira',
            numero: '222',
            complemento: 'Casa'
        }
    }

    var usuarioTres = {
        id: '01ff0621',
        nome: 'Daiana Mendes Silva',
        cpf: '9876789',
        senha: '9987',
        endereco: enderecoTres = {
            cidade: 'Florianópolis',
            bairro: 'Estreito',
            rua: 'Eng. Max de Souza',
            numero: '144',
            complemento: 'Casa'
        }
    }

    var usuarioQuatro = {
        id: '3e90e600',
        nome: 'Evandro Lins',
        cpf: '4567654',
        senha: '3334',
        endereco: enderecoQuatro = {
            cidade: 'São José',
            bairro: 'Bela Vista',
            rua: 'Campeche',
            numero: '445',
            complemento: 'apto 120'
        }
    }

    var usuarioCinco = {
        id: '55d24fae',
        nome: 'Gabriela Martins',
        cpf: '555666',
        senha: '22211',
        endereco: enderecoCinco = {
            cidade: 'São José',
            bairro: 'Jardim Cidade',
            rua: 'Manoel Dias',
            numero: '30',
            complemento: ''
        }
    }

    listaDeUsuarios = [usuarioUm, usuarioDois, usuarioTres, usuarioQuatro, usuarioCinco]
    localStorage.setItem("usuariosKey", JSON.stringify(listaDeUsuarios))

    var responsavelUm = {
        idResp: '01ff0621',
        nomeResp: 'Fabrício Mendes Silva',
        cpfResp: '45546767',
        senhaResp: '8876',
        enderecoResp: enderecoRespUm = {
            cidadeResp: 'Florianópolis',
            bairroResp: 'Estreito',
            ruaResp: 'Eng. Max de Souza',
            numeroResp: '144',
            complementoResp: 'Casa'
        }
    }

    var responsavelDois = {
        idResp: '016f2e1d',
        nomeResp: 'Túlio Santos Moraes',
        cpfResp: '3334443',
        senhaResp: '321',
        enderecoResp: enderecoRespDois = {
            cidadeResp: 'São José',
            bairroResp: 'Barreiros',
            ruaResp: 'Leoberto Leal',
            numeroResp: '1140',
            complementoResp: 'Casa'
        }
    }

    listaDeResponsaveis = [responsavelUm, responsavelDois]
    localStorage.setItem("responsaveisKey", JSON.stringify(listaDeResponsaveis))

    var eventoUm = {
        data: "terça, 21/junho/2022",
        horario: "20:14:59",
        idEvento: 1,
        idUsuario: "64a7bb12",
        nomeUsuario: "Bruno Alves",
        plataforma: "C1"
    }

    var eventoDois = {
        data: "terça, 21/junho/2022",
        horario: "20:17:3",
        idEvento: 2,
        idUsuario: "64a7bb12",
        nomeUsuario: "Bruno Alves",
        plataforma: "B13"
    }

    var eventoTres = {
        data: "terça, 21/junho/2022",
        horario: "20:21:16",
        idEvento: 3,
        idUsuario: "01ff0621",
        nomeUsuario: "Daiana Mendes Silva",
        plataforma: "B19"
    }

    var eventoQuatro = {
        data: "terça, 22/junho/2022",
        horario: "20:17:24",
        idEvento: 4,
        idUsuario: "64a7bb12",
        nomeUsuario: "Bruno Alves",
        plataforma: "E18"
    }

    var eventoCinco = {
        data: "terça, 22/junho/2022",
        horario: "10:18:39",
        idEvento: 5,
        idUsuario: "01ff0621",
        nomeUsuario: "Daiana Mendes Silva",
        plataforma: "C19"
    }

    var eventoSeis = {
        data: "terça, 23/junho/2022",
        horario: "11:23:49",
        idEvento: 6,
        idUsuario: "3e90e600",
        nomeUsuario: "Evandro Lins",
        plataforma: "C15"
    }

    var eventoSete = {
        data: "terça, 23/junho/2022",
        horario: "11:25:29",
        idEvento: 7,
        idUsuario: "3e90e600",
        nomeUsuario: "Evandro Lins",
        plataforma: "C16",
    }

    var eventoOito = {
        data: "terça, 23/junho/2022",
        horario: "11:27:34",
        idEvento: 8,
        idUsuario: "3e90e600",
        nomeUsuario: "Evandro Lins",
        plataforma: "C17"
    }

    var eventoNove = {
        data: "terça, 24/junho/2022",
        horario: "14:25:49",
        idEvento: 9,
        idUsuario: "01ff0621",
        nomeUsuario: "Daiana Mendes Silva",
        plataforma: "D16"
    }

    var eventoDez = {
        data: "terça, 25/junho/2022",
        horario: "14:35:36",
        idEvento: 10,
        idUsuario: "01ff0621",
        nomeUsuario: "Daiana Mendes Silva",
        plataforma: "D16"
    }

    var eventoOnze = {
        data: "terça, 26/junho/2022",
        horario: "21:47:59",
        idEvento: 11,
        idUsuario: "55d24fae",
        nomeUsuario: "Gabriela Martins",
        plataforma: "C7"
    }

    var eventoDoze = {
        data: "sexta, 26/junho/2022",
        horario: "08:43:51",
        idEvento: 12,
        idUsuario: "55d24fae",
        nomeUsuario: "Gabriela Martins",
        plataforma: "A3"
    }

    listaDeEventos = [
        eventoUm, eventoDois, eventoTres, eventoQuatro,
        eventoCinco, eventoSeis, eventoSete, eventoOito,
        eventoNove, eventoDez, eventoOnze, eventoDoze
    ]
    localStorage.setItem("eventosKey", JSON.stringify(listaDeEventos))
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

    var tamanhoLista = listaDeUsuarios.length - 1
    var posicaoNaLista = gerarInteiroAleatorio(0, tamanhoLista)
    return listaDeUsuarios[posicaoNaLista]
}
