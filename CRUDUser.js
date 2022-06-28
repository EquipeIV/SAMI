var listaDeUsuarios = []
var listaDeResponsaveis = []
var objetoAtual
var usuarioLogado
var posicao = -1
var posicaoResp = -1
// ---- USUÁRIO -----
var novoUsuario
var novoEndereco
var novoID
var idDoTitular

var id, nome, cpf, senha, endereco // id deve ser trocado pelo código gerado pela tag
var cidade, bairro, rua, numero, complemento
// ----- RESPONSÁVEL -----
var novoResponsavel
var novoEnderecoResponsavel

var idResp, nomeResp, cpfResp, senhaResp, enderecoResp
var cidadeResp, bairroResp, ruaResp, numeroResp, complementoResp

var selectAtributosUsuario = document.getElementById("atributosUsuario")

var usuarioBuscado
var enderecoUsuarioBuscado

var responsavelBuscado
var enderecoResponsavelBuscado

var separacao = '<center> ============================================================= <br>' + ' ============================================================= <br><br></center>'

var stringEditarResponsavel = '<center><select name="atributosResponsavel" id="atributosResponsavel">' +
    '<option value="" disabled selected>Atributo responsável...</option>' +
    '<option value="nome">NOME</option>' +
    '<option value="cpf">CPF</option>' +
    '<option value="senha">SENHA</option>' +
    '<option value="cidade">CIDADE</option>' +
    '<option value="bairro">BAIRRO</option>' +
    '<option value="rua">RUA</option>' +
    '<option value="numero">NÚMERO</option>' +
    '<option value="complemento">COMPLEMENTO</option>' +
    '</select><br><br>' +
    '<label>Novo valor</label><br>' +
    '<input type="text" id="novoValorEditarResponsavel"><br><br>' +
    '<button onclick="editarResponsavel()">EDITAR RESPONSÁVEL</button><br><br>' +
    '<button onclick="deletarResponsavel()">DELETAR RESPONSÁVEL</button><br><br></center>'

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

var idUsuarioBuscar = document.getElementById("idUsuarioBuscar")
var nomeParaBuscar = document.getElementById("nomeParaBuscar")
var cpfParaBuscar = document.getElementById("cpfParaBuscar")
var idParaEditar = document.getElementById("idParaEditar")
var idParaDeletar = document.getElementById("idUsuarioBuscar")
var novoValorInput = document.getElementById("novoValorInput")

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
    this.id = id // deve ser trocado pelo código gerado pela tag
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
    this.idResp = idResp // deve ser trocado pelo código gerado pela tag
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
    window.location.href = "inicioOUT.html"
}

function cadastrarNovoUsuario() {
    validaListaUsuariosDoLocalStorage()

    novoID = gerarIdAleatorio(1, 100) // VAI DEIXAR DE EXISTIR
    id = novoID // SERÁ O CÓDIGO DA TAG

    novoEndereco = criarObjetoEndereco()
    novoUsuario = criarObjetoUsuario()

    if (novoUsuario == null || novoEndereco == null) {
        return
    }

    // VAI DEIXAR DE EXISTIR
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

function tabelarTodosUsuarios() {
    var tabelaGeral = document.getElementById('usuariosGeral')
    tabelaGeral.innerText = ''
    listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosKey"))
    if (listaDeUsuarios == null || listaDeUsuarios == '' || listaDeUsuarios == undefined) {
        alert('Não há registros!')
    } else {
        for (i = 0; i < listaDeUsuarios.length; i++) {
            usuarioAtualGeral = listaDeUsuarios[i]

            var tr = tabelaGeral.insertRow()

            var tdIdUsuarioGeral = tr.insertCell()
            var tdNomeGeral = tr.insertCell()
            var tdCPFGeral = tr.insertCell()
            var tdCidadeGeral = tr.insertCell()
            var tdBairroGeral = tr.insertCell()
            var tdRuaGeral = tr.insertCell()
            var tdNumeroGeral = tr.insertCell()
            var tdComplementoGeral = tr.insertCell()
            var tdSenhaGeral = tr.insertCell()

            tdIdUsuarioGeral.innerText = usuarioAtualGeral.id
            tdNomeGeral.innerText = usuarioAtualGeral.nome
            tdCPFGeral.innerText = usuarioAtualGeral.cpf
            tdCidadeGeral.innerText = usuarioAtualGeral.endereco.cidade
            tdBairroGeral.innerText = usuarioAtualGeral.endereco.bairro
            tdRuaGeral.innerText = usuarioAtualGeral.endereco.rua
            tdNumeroGeral.innerText = usuarioAtualGeral.endereco.numero
            tdComplementoGeral.innerText = usuarioAtualGeral.endereco.complemento
            tdSenhaGeral.innerText = usuarioAtualGeral.senha
        }
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

function deletarUsuarioPorId() {
    listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosKey"))

    if (!ehInputVazio(idParaDeletar.value)) {
        if (existeId(idParaDeletar.value)) {
            listaDeUsuarios.splice(posicao, 1)
            localStorage.setItem("usuariosKey", JSON.stringify(listaDeUsuarios))
            if (existeResponsavel(idParaDeletar.value)) {
                listaDeResponsaveis.splice(this.posicaoResp, 1)
                localStorage.setItem("responsaveisKey", JSON.stringify(listaDeResponsaveis))
            }
            alert('Usuário deletado!')
            location.reload()
        } else {
            alert(`ID inexistente: [${idParaDeletar.value}]`)
        }
    } else {
        alert("Campo não pode ser vazio!")
    }
}

function editarUsuario() {
    listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosKey"))
    listaDeResponsaveis = JSON.parse(localStorage.getItem("responsaveisKey"))

    if (document.getElementById("atributosResp") != null)
        selectAtributosUsuario = document.getElementById("atributosResp")
    if (ehSelectValido()) {
        if (!ehInputVazio(novoValorInput.value)) {
            switch (selectAtributosUsuario.value) {

                case 'nome':
                    listaDeUsuarios[posicao].nome = novoValorInput.value
                    break

                case 'cpf':
                    if (existeCpf(novoValorInput.value)) {
                        alert(`Este CPF já é cadastrado: [${novoValorInput.value}]`)
                        return
                    }
                    listaDeUsuarios[posicao].cpf = novoValorInput.value
                    break

                case 'cidade':
                    listaDeUsuarios[posicao].endereco.cidade = novoValorInput.value
                    break

                case 'bairro':
                    listaDeUsuarios[posicao].endereco.bairro = novoValorInput.value
                    break

                case 'rua':
                    listaDeUsuarios[posicao].endereco.rua = novoValorInput.value
                    break

                case 'numero':
                    listaDeUsuarios[posicao].endereco.numero = novoValorInput.value
                    break

                case 'complemento':
                    listaDeUsuarios[posicao].endereco.complemento = novoValorInput.value
                    break

                case 'senha':
                    listaDeUsuarios[posicao].senha = novoValorInput.value
                    break

                case 'nomeResponsavel':
                    listaDeResponsaveis[posicaoResp].nomeResp = novoValorInput.value
                    break


                case 'cpfResponsavel':
                    listaDeResponsaveis[posicaoResp].cpfResp = novoValorInput.value
                    break

                case 'cidadeResponsavel':
                    listaDeResponsaveis[posicaoResp].enderecoResp.cidadeResp = novoValorInput.value
                    break

                case 'bairroResponsavel':
                    listaDeResponsaveis[posicaoResp].enderecoResp.bairroResp = novoValorInput.value
                    break

                case 'ruaResponsavel':
                    listaDeResponsaveis[posicaoResp].enderecoResp.ruaResp = novoValorInput.value
                    break

                case 'numeroResponsavel':
                    listaDeResponsaveis[posicaoResp].enderecoResp.numeroResp = novoValorInput.value
                    break

                case 'complementoResponsavel':
                    listaDeResponsaveis[posicaoResp].enderecoResp.complementoResp = novoValorInput.value
                    break

                case 'senhaResponsavel':
                    listaDeResponsaveis[posicaoResp].senhaResp = novoValorInput.value
            }

            localStorage.setItem("usuariosKey", JSON.stringify(listaDeUsuarios))
            localStorage.setItem("responsaveisKey", JSON.stringify(listaDeResponsaveis))
            localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado))
            alert(`Usuário editado!`)

            location.reload()
        } else {
            alert('Campo [Novo Valor] não pode ser vazio!')
            return
        }
    } else {
        alert('Selecione um campo para ser atualizado')
        return
    }
}

function encontrarLogadoNaListaDeUsuarios() {
    listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosKey"))
    usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"))
    var flag = 0

    if (usuarioLogado == '' || usuarioLogado == null || usuarioLogado == undefined) {
        alert('ERRO: Não há usuário logado!')
        window.location.href = "inicioOUT.html"
        return
    }

    for (i = 0; i < listaDeUsuarios.length; i++) {
        if (usuarioLogado.id == listaDeUsuarios[i].id) {
            flag = 1
            this.posicao = i
        }
    }

    if (flag == 0) {
        alert('Atenção [ADMIN]! Inicie sua própria sessão para editar cadastros!')
        window.location.href = "inicioOUT.html"
    }
}

function deletarUsuarioLogado() {
    listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosKey"))
    listaDeResponsaveis = JSON.parse(localStorage.getItem("responsaveisKey"))
    usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"))

    encontrarLogadoNaListaDeUsuarios()
    listaDeUsuarios.splice(this.posicao, 1)
    localStorage.setItem("usuariosKey", JSON.stringify(listaDeUsuarios))

    if (temResponsavel()) {
        deletarResponsavel()
    }

    alert('Seu cadastro foi excluído!')
    limparObjetoLogado()
    window.location.href = 'inicioOUT.html'
}

function adicionarResponsavel() {

    validaListaResponsaveisDoLocalStorage()

    cpfRespInput = document.getElementById("cpfResp")
    if (existeCpf(cpfRespInput.value)) {
        alert(`CPF [${cpfRespInput.value}] já cadastrado!`)
        return
    }

    novoEnderecoResponsavel = criarObjetoEnderecoResponsavel()
    novoResponsavel = criarObjetoResponsavel()
    novoResponsavel.idResp = usuarioLogado.id
    listaDeResponsaveis.push(novoResponsavel)
    localStorage.setItem("responsaveisKey", JSON.stringify(listaDeResponsaveis))
    alert("Responsável Adicionado")
    location.reload()
}

function deletarResponsavel() {
    listaDeResponsaveis = JSON.parse(localStorage.getItem("responsaveisKey"))
    usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"))
    if (temResponsavel()) {
        listaDeResponsaveis.splice(this.posicaoResp, 1)
        localStorage.setItem("responsaveisKey", JSON.stringify(listaDeResponsaveis))
        alert('Responsável excluído!')
        location.reload()
    } else {
        alert('Você não possui responsável')
    }
}

function limparObjetoLogado() {
    localStorage.setItem('usuarioLogado', '')
}

function mostrarUsuarioBuscado() {
    document.querySelector('#usuarioBuscado').innerHTML = ''
    var stringUsuario = ''
    var stringResponsavel = ''

    if (ehInputVazio(idUsuarioBuscar.value)) {
        alert('Campo [ID do usuário] não pode ser vazio!')
        return
    }

    if (existeId(idUsuarioBuscar.value)) {
        this.usuarioBuscado = listaDeUsuarios[posicao]
        this.enderecoUsuarioBuscado = this.usuarioBuscado.endereco
        stringUsuario = `<center>
        [USUÁRIO]<br><br> 
            ID: ${usuarioBuscado.id}<br>
            NOME: ${usuarioBuscado.nome}<br>
            CPF: ${usuarioBuscado.cpf}<br>
            CIDADE: ${enderecoUsuarioBuscado.cidade}<br>
            BAIRRO: ${enderecoUsuarioBuscado.bairro}<br>
            RUA: ${enderecoUsuarioBuscado.rua}<br>
            NÚMERO: ${enderecoUsuarioBuscado.numero}<br>
            COMPLEMENTO: ${enderecoUsuarioBuscado.complemento}<br>
            SENHA: ${usuarioBuscado.senha}<br><br></center>`
    } else {
        alert(`ID inexistente: [${idUsuarioBuscar.value}]`)
        location.reload()
        return
    }

    if (existeIdResponsavel(idUsuarioBuscar.value)) {
        this.responsavelBuscado = listaDeResponsaveis[posicaoResp]
        this.enderecoResponsavelBuscado = this.responsavelBuscado.enderecoResp
        stringResponsavel = `<center>
        [RESPONSÁVEL]<br><br> 
            NOME: ${responsavelBuscado.nomeResp}<br>
            CPF: ${responsavelBuscado.cpfResp}<br>
            SENHA: ${responsavelBuscado.senhaResp}<br>
            CIDADE: ${enderecoResponsavelBuscado.cidadeResp}<br>
            BAIRRO: ${enderecoResponsavelBuscado.bairroResp}<br>
            RUA: ${enderecoResponsavelBuscado.ruaResp}<br>
            NÚMERO: ${enderecoResponsavelBuscado.numeroResp}<br>
            COMPLEMENTO: ${enderecoResponsavelBuscado.complementoResp}<br><br></center>` + stringEditarResponsavel
    }

    document.querySelector('#usuarioBuscado').innerHTML = stringUsuario

    if (stringResponsavel != '') {
        document.querySelector('#responsavelBuscado').innerHTML = separacao + stringResponsavel
    }
}

// ----- BUILDERS -----

function criarObjetoUsuario() {
    if (ehInputVazio(nomeInput.value) || ehInputVazio(cpfInput.value) || ehInputVazio(senhaInput.value)) {
        return
    }
    var objetoUsuario = new Usuario(
        id, // SERÁ O CÓDIGO DA TAG
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
    senhaRespInput = document.getElementById("senhaResp")

    if (idDoTitular != null) {
        idResp = this.idDoTitular
    }
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
        '<input id="complementoResp" placeholder="COMPLEMENTO" ><br>' +
        '<input id="senhaResp" placeholder="SENHA"> <br></br>'
}

function selectResponsavel() {
    document.getElementById("atributosUsuario").innerHTML = `<select name="atributosResp" id="atributosResp">\n
    <option value="" disabled selected>Selecione...</option>\n
    <option value="nome">NOME</option>\n
    <option value="cpf">CPF</option>\n
    <option value="cidade">CIDADE</option>\n
    <option value="bairro">BAIRRO</option>\n
    <option value="rua">RUA</option>\n
    <option value="numero">NÚMERO</option>\n
    <option value="complemento">COMPLEMENTO</option>\n
    <option value="senha">SENHA</option>\n
   <option value="nomeResponsavel">NOME (RESPONSÁVEL)</option>\n
   <option value="cpfResponsavel">CPF (RESPONSÁVEL)</option>\n
   <option value="cidadeResponsavel">CIDADE (RESPONSÁVEL)</option>\n
   <option value="bairroResponsavel">BAIRRO (RESPONSÁVEL)</option>\n
   <option value="ruaResponsavel">RUA (RESPONSÁVEL)</option>\n
   <option value="numeroResponsavel">NUMERO (RESPONSÁVEL)</option>\n
   <option value="complementoResponsavel">COMPLEMENTO (RESPONSÁVEL)</option>\n
   <option value="senhaResponsavel">SENHA (RESPONSÁVEL)</option> 
   </select> <br>`
}

function inputsAdicionarResponsavel() {
    document.getElementById("inputsCadastroResponsavel").innerHTML = '<h2 class="textoSubtituloResponsavel">Responsável</h2>' +
        '<input class ="input" id="nomeResp" placeholder="NOME" type="text"><br>' +
        '<input class ="input" id="cpfResp" placeholder="CPF" ><br>' +
        '<input class ="input" id="cidadeResp" placeholder="CIDADE" ><br>' +
        '<input class ="input" id="bairroResp" placeholder="BAIRRO" ><br>' +
        '<input class ="input" id="ruaResp" placeholder="RUA" ><br>' +
        '<input class ="input" id="numeroResp" placeholder="NÚMERO" ><br>' +
        '<input class ="input" id="complementoResp" placeholder="COMPLEMENTO" ><br>' +
        '<input class ="input" id="senhaResp" placeholder="SENHA"> <br>' +
        '<button onclick="adicionarResponsavel()">RESPONSAVEL</button>'
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

function existeResponsavel(idCheck) {
    listaDeResponsaveis = JSON.parse(localStorage.getItem("responsaveisKey"))
    var retorno = false
    for (i = 0; i < listaDeResponsaveis.length; i++) {
        if (idCheck == listaDeResponsaveis[i].idResp) {
            this.posicaoResp = i
            retorno = true
        }
    }
    return retorno
}

function existeIdResponsavel(idCheck) {
    var retorno = false
    for (i = 0; i < listaDeResponsaveis.length; i++) {
        if (listaDeResponsaveis[i].idResp == idCheck) {
            posicaoResp = i
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

function ehSelectValido() {
    var retorno = true
    if (selectAtributosUsuario.value == '' || selectAtributosUsuario.value == null || selectAtributosUsuario.value == undefined) {
        retorno = false
    }
    return retorno
}

function temResponsavel() {
    var retorno = false
    listaDeResponsaveis = JSON.parse(localStorage.getItem("responsaveisKey"))
    usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"))
    for (i = 0; i < listaDeResponsaveis.length; i++) {
        if (listaDeResponsaveis[i].idResp == usuarioLogado.id) {
            this.posicaoResp = i
            selectResponsavel()
            retorno = true
        }
    }
    return retorno
}

// ----- GERADOR DE ID ALEATÓRIO -----
// VAI DEIXAR DE EXISTIR
function gerarIdAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}