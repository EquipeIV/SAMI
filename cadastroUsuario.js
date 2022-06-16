var listaDeUsuarios = []
var listaDeResponsaveis = []
var objetoAtual
var posicao
// ---- USUÁRIO -----
var novoUsuario
var novoEndereco
var novoID
var idDoTitular

var id, nome, cpf, senha, endereco
var cidade, bairro, rua, numero, complemento
// ----- RESPONSÁVEL -----
var novoResponsavel
var novoEnderecoResponsavel

var idResp, nomeResp, cpfResp, senhaResp, enderecoResp
var cidadeResp, bairroResp, ruaResp, numeroResp, complementoResp

//var selectAtributosUsuario = document.querySelector('#atributo')
//selectAtributosUsuario.addEventListener('change', function () { })

// ----- INPUTS HTML USUÁRIO-----

var nomeInput = document.getElementById("nome")
var cpfInput = document.getElementById("cpf")
var senhaInput = document.getElementById("senha")

var cidadeInput = document.getElementById("cidade")
var bairroInput = document.getElementById("bairro")
var ruaInput = document.getElementById("rua")
var numeroInput = document.getElementById("numero")
var complementoInput = document.getElementById("complemento")

var responsavelSelect = document.getElementById("responsavelSelect")

var idParaBuscar = document.getElementById("idParaBuscar")
var nomeParaBuscar = document.getElementById("nomeParaBuscar")
var cpfParaBuscar = document.getElementById("cpfParaBuscar")
var idParaDeletar = document.getElementById("idParaDeletar")
var idParaEditar = document.getElementById("idParaEditar")
var novoValorEditar = document.getElementById("novoValorEditar")


// ----- INPUTS HTML RESPONSÁVEL -----
var nomeRespInput
var cpfRespInput
var senhaRespInput

var cidadeRespInput
var bairroRespInput
var ruaRespInput
var numeroRespInput
var complementoRespInput

// ----- CONSTRUTORES DOS OBJETOS -----

function Usuario(id, nome, cpf, senha, endereco) {
    this.id = id
    this.nome = nome
    this.cpf = cpf
    this.senha = senha
    this.endereco = endereco
}

function Endereco(cidade, bairro, rua, numero, complemento) {
    this.cidade = cidade
    this.bairro = bairro
    this.rua = rua
    this.numero = numero
    this.complemento = complemento
}

function Responsavel(idResp, nomeResp, cpfResp, senhaResp, enderecoResp) {
    this.idResp = idResp
    this.nomeResp = nomeResp
    this.cpfResp = cpfResp
    this.senhaResp = senhaResp
    this.enderecoResp = enderecoResp
}

function EnderecoResponsavel(cidadeResp, bairroResp, ruaResp, numeroResp, complementoResp) {
    this.cidadeResp = cidadeResp
    this.bairroResp = bairroResp
    this.ruaResp = ruaResp
    this.numeroResp = numeroResp
    this.complementoResp = complementoResp
}


// ----- CRUD -----

function cadastrarGeral() {

    cadastrarNovoUsuario()

    if (novoUsuario == null || novoEndereco == null) {
        alert("Não pode haver campos vazios!")
        return
    }

    if (!ehListaVazia(listaDeUsuarios)) {
        if (existeCpf(novoUsuario.cpf)) {
            alert(`CPF [${novoUsuario.cpf}] já cadastrado!`)
            return
        }
    }

    if (responsavelSelect.value == 2) {
        cpfRespInput = document.getElementById("cpfResp")
        if (cpfRespInput.value == novoUsuario.cpf) {
            alert(`CPFs idênticos!`)
            return
        }
        if (existeCpf(cpfRespInput.value)) {
            alert(`CPF [${cpfRespInput.value}] já cadastrado!`)
            return
        }
        cadastrarNovoResponsavel()

        if (novoResponsavel == null || novoEnderecoResponsavel == null) {
            alert("Não pode haver campos vazios!")
            return
        }

        listaDeResponsaveis.push(novoResponsavel)
        localStorage.setItem("responsaveisKey", JSON.stringify(listaDeResponsaveis))
    }

    listaDeUsuarios.push(novoUsuario)
    localStorage.setItem("usuariosKey", JSON.stringify(listaDeUsuarios))
    alert("Novo usuário cadastrado!")
    window.location.href = "inicioIN.html"
}

function cadastrarNovoUsuario() {
    validaListaUsuariosDoLocalStorage()
    novoID = gerarIdAleatorio(1, 100)
    id = novoID

    novoEndereco = criarObjetoEndereco()
    novoUsuario = criarObjetoUsuario()

    if (novoUsuario == null || novoEndereco == null) {
        return
    }

    // Certifica que ID gerado é único
    while (existeId(novoUsuario.id)) {
        novoID = gerarIdAleatorio(1, 100)
        novoUsuario.id = novoID
    }
}

function cadastrarNovoResponsavel() {
    validaListaResponsaveisDoLocalStorage()

    novoEnderecoResponsavel = criarObjetoEnderecoResponsavel()
    novoResponsavel = criarObjetoResponsavel()
}

function listarTodosUsuariosSalvos() {
    document.querySelector('#listar').innerHTML = ''
    listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosKey"))
    if (listaDeUsuarios == null || listaDeUsuarios == '') {
        alert('Não há registros!')
    } else {
        var cabecalho = '<br> <<< REGISTROS >>> <br> <br> (ID / NOME / CPF) <br>'
        var stringPrint = ''
        for (i = 0; i < listaDeUsuarios.length; i++) {
            objetoAtual = listaDeUsuarios[i]
            stringPrint += `<br> ${objetoAtual.id} | ${objetoAtual.nome} | ${objetoAtual.cpf} <br>`
        }
        document.querySelector('#listar').innerHTML = cabecalho + stringPrint
    }
}

function buscarUsuarioPorId() {
    listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosKey"))
    var usuarioBuscadoPorId

    if (listaDeUsuarios == null || listaDeUsuarios == '') {
        alert('Não há registros!')
    } else {
        if (!ehInputVazio(idParaBuscar.value)) {
            if (existeId(idParaBuscar.value)) {
                usuarioBuscadoPorId = listaDeUsuarios[posicao]
                alert(`ID: ${usuarioBuscadoPorId.id}\nNome: ${usuarioBuscadoPorId.nome}\nCPF: ${usuarioBuscadoPorId.cpf}`)
            } else {
                alert(`O seguinte ID não existe: [${idParaBuscar.value}]`)
            }
        } else {
            alert("Campo não pode ser vazio!")
        }
    }
}

function buscarUsuarioPorNome() {
    listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosKey"))
    var usuarioBuscadoPorNome

    if (listaDeUsuarios == null || listaDeUsuarios == '') {
        alert('Não há registros!')
    } else {
        if (!ehInputVazio(nomeParaBuscar.value)) {
            if (existeNome(nomeParaBuscar.value)) {
                usuarioBuscadoPorNome = listaDeUsuarios[posicao]
                alert(`ID: ${usuarioBuscadoPorNome.id}\nNome: ${usuarioBuscadoPorNome.nome}\nCPF: ${usuarioBuscadoPorNome.cpf}`)
            } else {
                alert(`O seguinte usuário não existe: [${nomeParaBuscar.value}]`)
            }
        } else {
            alert("Campo não pode ser vazio!")
        }
    }
}

function buscarUsuarioPorCpf() {
    listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosKey"))
    var usuarioBuscadoPorCpf

    if (listaDeUsuarios == null || listaDeUsuarios == '') {
        alert('Não há registros!')
    } else {
        if (!ehInputVazio(cpfParaBuscar.value)) {
            if (existeCpf(cpfParaBuscar.value)) {
                usuarioBuscadoPorCpf = listaDeUsuarios[posicao]
                alert(`ID: ${usuarioBuscadoPorCpf.id}\nNome: ${usuarioBuscadoPorCpf.nome}\nCPF: ${usuarioBuscadoPorCpf.cpf}`)
            } else {
                alert(`O seguinte CPF não existe: [${cpfParaBuscar.value}]`)
            }
        } else {
            alert("Campo não pode ser vazio!")
        }
    }
}

function deletarUsuarioPorId() {
    listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosKey"))
    if (!ehInputVazio(idParaDeletar.value)) {
        if (existeId(idParaDeletar.value)) {
            listaDeUsuarios.splice(posicao, 1)
            localStorage.setItem("usuariosKey", JSON.stringify(listaDeUsuarios))
            alert('Usuário deletado!')
        } else {
            alert(`O seguinte ID não existe: [${idParaDeletar.value}]`)
        }
    } else {
        alert("Campo não pode ser vazio!")
    }
}

function editarUsuario() {
    listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosKey"))
    if (!ehInputVazio(idParaEditar.value)) {
        if (existeId(idParaEditar.value)) {
            switch (selectAtributosUsuario.value) {
                case 'nome':
                    listaDeUsuarios[posicao].nome = novoValorEditar.value
                    break
                case 'cpf':
                    listaDeUsuarios[posicao].cpf = novoValorEditar.value
                    break
                case 'senha':
                    listaDeUsuarios[posicao].senha = novoValorEditar.value
                    break

                case 'endereco':
                    switch (atributoEndereco.value) {

                        case 'cidade':
                            listaDeUsuarios[posicao].endereco.cidade = novoValorEditar.value
                            break

                        case 'bairro':
                            listaDeUsuarios[posicao].endereco.bairro = novoValorEditar.value
                            break

                        case 'rua':
                            listaDeUsuarios[posicao].endereco.rua = novoValorEditar.value
                            break

                        case 'numero':
                            listaDeUsuarios[posicao].endereco.numero = novoValorEditar.value
                            break

                        case 'complemento':
                            listaDeUsuarios[posicao].endereco.complemento = novoValorEditar.value
                            break
                    }
            }

            localStorage.setItem("usuariosKey", JSON.stringify(listaDeUsuarios))
            alert(`Usuário editado!`)

            location.reload()
        } else {
            alert(`Este id [${idParaEditar.value}] não existe!`)
        }
    } else {
        alert("Campo não pode ser vazio!")
    }
}

function editarResponsavel(){
    
}

// ----- BUILDERS -----

function criarObjetoUsuario() {
    if (ehInputVazio(nomeInput.value) || ehInputVazio(cpfInput.value) || ehInputVazio(senhaInput.value)) {
        return

    }
    var objetoUsuario = new Usuario(
        id,
        nomeInput.value,
        cpfInput.value,
        senhaInput.value,
        novoEndereco
    )
    this.idDoTitular = id

    return objetoUsuario

}

function criarObjetoEndereco() {
    if (ehInputVazio(cidadeInput.value) || ehInputVazio(bairroInput.value) || ehInputVazio(ruaInput.value) || ehInputVazio(numeroInput.value)) {
        return
    }
    var objetoEndereco = new Endereco(
        cidadeInput.value,
        bairroInput.value,
        ruaInput.value,
        numeroInput.value,
        complementoInput.value
    )

    return objetoEndereco

}

function criarObjetoResponsavel() {

    nomeRespInput = document.getElementById("nomeResp")
    cpfRespInput = document.getElementById("cpfResp")
    senhaRespInput = document.getElementById("senha")

    idResp = this.idDoTitular

    if (ehInputVazio(nomeRespInput.value) || ehInputVazio(cpfRespInput.value)) {
        return
    }

    var objetoResponsavel = new Responsavel(
        idResp,
        nomeRespInput.value,
        cpfRespInput.value,
        senhaRespInput.value,
        novoEnderecoResponsavel
    )

    return objetoResponsavel
}

function criarObjetoEnderecoResponsavel() {
    cidadeRespInput = document.getElementById("cidadeResp")
    bairroRespInput = document.getElementById("bairroResp")
    ruaRespInput = document.getElementById("ruaResp")
    numeroRespInput = document.getElementById("numeroResp")
    complementoRespInput = document.getElementById("complementoResp")

    if (ehInputVazio(cidadeRespInput.value) || ehInputVazio(bairroRespInput.value) || ehInputVazio(ruaRespInput.value) || ehInputVazio(numeroRespInput.value)) {
        return
    }

    objetoEnderecoResponsavel = new EnderecoResponsavel(
        cidadeRespInput.value,
        bairroRespInput.value,
        ruaRespInput.value,
        numeroRespInput.value,
        complementoRespInput.value
    )

    return objetoEnderecoResponsavel
}

function selectEndereco() {

    document.getElementById("SelectAtributosEndereco").innerHTML = `<select id="atributoEndereco">\n
    <option hidden>Selecione</option>\n
    <option value="cidade">CIDADE</option>\n
    <option value="=bairro">BAIRRO</option>\n
    <option value="rua">RUA</option>\n
    <option value="numero">NÚMERO</option>\n
    <option value="complemento">COMPLEMENTO</option>\n
    </select>`

}

function inputsCadastroResponsavel() {
    document.getElementById("inputsCadastroResponsavel").innerHTML = '<h2 class="textoSubtituloResponsavel">Responsável</h2>' +
        '<input id="nomeResp" placeholder="NOME" type="text"><br>' +
        '<input id="cpfResp" placeholder="CPF" ><br>' +
        '<input id="cidadeResp" placeholder="CIDADE" ><br>' +
        '<input id="bairroResp" placeholder="BAIRRO" ><br>' +
        '<input id="ruaResp" placeholder="RUA" ><br>' +
        '<input id="numeroResp" placeholder="NÚMERO" ><br>' +
        '<input id="complementoResp" placeholder="COMPLEMENTO" ><br><br>'
}

function htmlNull() {

    document.getElementById("inputsCadastroResponsavel").innerHTML = null

    document.getElementById("selectAtributosEndereco").innerHTML = null
}

// ----- VALIDAÇÕES -----

function validaListaUsuariosDoLocalStorage() {
    listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosKey"))
    if (ehListaVazia(listaDeUsuarios)) {
        listaDeUsuarios = []
    }
}

function validaListaResponsaveisDoLocalStorage() {
    listaDeResponsaveis = JSON.parse(localStorage.getItem("responsaveisKey"))
    if (ehListaVazia(listaDeResponsaveis)) {
        listaDeResponsaveis = []
    }
}

function existeId(idCheck) {
    var retorno = false
    listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosKey"))
    if (ehListaVazia(listaDeUsuarios)) {
        listaDeUsuarios = []
    }
    for (i = 0; i < listaDeUsuarios.length; i++) {
        if (listaDeUsuarios[i].id == idCheck) {
            posicao = i
            retorno = true
        }
    }
    return retorno
}

function existeNome(nomeCheck) {
    var retorno = false
    listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosKey"))
    for (i = 0; i < listaDeUsuarios.length; i++) {
        if (listaDeUsuarios[i].nome == nomeCheck) {
            posicao = i
            retorno = true
        }
    }
    return retorno
}

function existeCpf(cpfCheck) {
    var retorno = false
    listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosKey"))
    if (ehListaVazia(listaDeUsuarios)) {
        listaDeUsuarios = []
    }
    for (i = 0; i < listaDeUsuarios.length; i++) {
        if (listaDeUsuarios[i].cpf == cpfCheck) {
            posicao = i
            retorno = true
        }
    }
    listaDeResponsaveis = JSON.parse(localStorage.getItem("responsaveisKey"))
    if (ehListaVazia(listaDeResponsaveis)) {
        listaDeResponsaveis = []
    }
    for (i = 0; i < listaDeResponsaveis.length; i++) {
        if (listaDeResponsaveis[i].cpfResp == cpfCheck) {
            posicao = i
            retorno = true
        }
    }
    return retorno
}

function ehInputVazio(input) {
    var retorno = false
    if (input == '' || input == null || input == undefined) {
        retorno = true
    }
    return retorno
}

function ehListaVazia(lista) {
    if (lista == null || lista == '' || lista == undefined) {
        return true
    }
    return false
}

// ----- GERADOR DE ID ALEATÓRIO -----

function gerarIdAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}