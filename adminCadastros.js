// PERMITE DELEÇÃO DE QUALQUER USUÁRIO (SE POSSUIR RESPONSÁVEL, É DELETADO JUNTO) E RESPONSÁVEL
// PERMITE EDIÇÕES DE TODOS OS ATRIBUTOS DE USUÁRIOS E DE RESPONSÁVEIS MAS NÃO FAZ VALIDAÇÃO DE NOVOS VALORES. 
// EXEMPLO: NÃO VERIFICA SE NOVO CPF JÁ ESTÁ REGISTRADO

var listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosKey"))
var listaDeResponsaveis = JSON.parse(localStorage.getItem("responsaveisKey"))

var idUsuarioBuscar = document.getElementById("idUsuarioBuscar")
var usuarioBuscado
var enderecoUsuarioBuscado

var responsavelBuscado
var enderecoResponsavelBuscado

var posicaoUsuario = -1
var posicaoResponsavel = -1

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

var selectAtributosUsuario = document.querySelector('#atributosUsuario')
selectAtributosUsuario.addEventListener('change', function () { })

function mostrarUsuarioBuscado() {
    document.querySelector('#usuarioBuscado').innerHTML = ''
    var stringUsuario = ''
    var stringResponsavel = ''

    if (existeUsuarioComID(idUsuarioBuscar.value)) {
        this.usuarioBuscado = listaDeUsuarios[posicaoUsuario]
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

    if (existeResponsavelComID(idUsuarioBuscar.value)) {
        this.responsavelBuscado = listaDeResponsaveis[posicaoResponsavel]
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

function editarUsuario() {
    alert(novoValorEditarUsuario.value)
    switch (selectAtributosUsuario.value) {
        case 'nome':
            this.usuarioBuscado.nome = novoValorEditarUsuario.value
            break
        case 'cpf':
            this.usuarioBuscado.cpf = novoValorEditarUsuario.value
            break
        case 'senha':
            this.usuarioBuscado.senha = novoValorEditarUsuario.value
            break

        case 'cidade':
            this.usuarioBuscado.endereco.cidade = novoValorEditarUsuario.value
            break

        case 'bairro':
            this.usuarioBuscado.endereco.bairro = novoValorEditarUsuario.value
            break

        case 'rua':
            this.usuarioBuscado.endereco.rua = novoValorEditarUsuario.value
            break

        case 'numero':
            this.usuarioBuscado.endereco.numero = novoValorEditarUsuario.value
            break

        case 'complemento':
            this.usuarioBuscado.endereco.complemento = novoValorEditarUsuario.value
            break

    }

    localStorage.setItem("usuariosKey", JSON.stringify(listaDeUsuarios))
    alert(`Usuário editado!`)
    location.reload()
}

function editarResponsavel() {
    var selectAtributosResponsavel = document.querySelector('#atributosResponsavel')
    selectAtributosResponsavel.addEventListener('change', function () { })
    switch (selectAtributosResponsavel.value) {
        case 'nome':
            this.responsavelBuscado.nomeResp = novoValorEditarResponsavel.value
            break
        case 'cpf':
            this.responsavelBuscado.cpfResp = novoValorEditarResponsavel.value
            break
        case 'senha':
            this.responsavelBuscado.senhaResp = novoValorEditarResponsavel.value
            break

        case 'cidade':
            this.responsavelBuscado.enderecoResp.cidadeResp = novoValorEditarResponsavel.value
            break

        case 'bairro':
            this.responsavelBuscado.enderecoResp.bairroResp = novoValorEditarResponsavel.value
            break

        case 'rua':
            this.responsavelBuscado.enderecoResp.ruaResp = novoValorEditarResponsavel.value
            break

        case 'numero':
            this.responsavelBuscado.enderecoResp.numeroResp = novoValorEditarResponsavel.value
            break

        case 'complemento':
            this.responsavelBuscado.enderecoResp.complementoResp = novoValorEditarResponsavel.value
            break

    }

    localStorage.setItem("responsaveisKey", JSON.stringify(listaDeResponsaveis))
    alert(`Responsável editado!`)
    location.reload()
}

function deletarUsuario() {
    if (existeUsuarioComID(idUsuarioBuscar.value)) {
        listaDeUsuarios.splice(posicaoUsuario, 1)
        localStorage.setItem("usuariosKey", JSON.stringify(listaDeUsuarios))
        alert('Usuário deletado!')
        deletarResponsavel()
    }
    location.reload()
}

function deletarResponsavel() {
    if (existeResponsavelComID(idUsuarioBuscar.value)) {
        listaDeResponsaveis.splice(posicaoResponsavel, 1)
        localStorage.setItem("responsaveisKey", JSON.stringify(listaDeResponsaveis))
        alert('Responsável deletado!')
    }
}

function existeUsuarioComID(idCheck) {
    var retorno = false
    for (i = 0; i < listaDeUsuarios.length; i++) {
        if (listaDeUsuarios[i].id == idCheck) {
            posicaoUsuario = i
            retorno = true
        }
    }
    return retorno
}

function existeResponsavelComID(idCheck) {
    var retorno = false
    for (i = 0; i < listaDeResponsaveis.length; i++) {
        if (listaDeResponsaveis[i].idResp == idCheck) {
            posicaoResponsavel = i
            retorno = true
        }
    }
    return retorno
}