var listaDeUsuarios = []
var usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"))
var posicao = -1
var novoValorInput = document.getElementById('novoValorInput')

var selectAtributosUsuario = document.querySelector('#atributosUsuario')
selectAtributosUsuario.addEventListener('change', function () { })

function editarUsuario() {
    listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosKey"))
    if (ehSelectValido()) {
        if (!ehInputVazio(novoValorInput.value)) {
            switch (selectAtributosUsuario.value) {

                case 'nome':
                    listaDeUsuarios[posicao].nome = novoValorInput.value
                    if (usuarioLogado.nome == listaDeUsuarios[posicao].nome) {
                        usuarioLogado.nome = novoValorInput.value
                    }
                    break

                case 'cpf':
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
            }

            localStorage.setItem("usuariosKey", JSON.stringify(listaDeUsuarios))
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

function acharLogadoNaListaDeUsuarios() {
    listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosKey"))
    var flag = 0

    if (usuarioLogado == '' || usuarioLogado == null || usuarioLogado == undefined) {
        alert('ERRO: Não há usuário logado!')
        window.location.href = "inicioOUT.html"
        return
    }

    for (i = 0; i < listaDeUsuarios.length; i++) {
        if (usuarioLogado.id == listaDeUsuarios[i].id) {
            flag = 1
            posicao = i
        }
    }

    if (flag == 0) {
        alert('Atenção [ADMIN]! Inicie sua própria sessão para editar cadastros!')
        window.location.href = "inicioOUT.html"
    }
}

function ehSelectValido() {
    var retorno = true
    if (selectAtributosUsuario.value == '' || selectAtributosUsuario.value == null || selectAtributosUsuario.value == undefined) {
        retorno = false
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