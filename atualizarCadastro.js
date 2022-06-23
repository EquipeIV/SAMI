var listaDeUsuarios = []
var listaDeResponsaveis = []
var usuarioLogado
var posicao = -1
var posicaoResponsavel = -1
var novoValorInput = document.getElementById('novoValorInput')

var selectAtributosUsuario = document.querySelector('#atributosUsuario')
selectAtributosUsuario.addEventListener('change', function () { })

function editarUsuario() {
    listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosKey"))
    listaDeResponsaveis = JSON.parse(localStorage.getItem("responsaveisKey"))
    
    if(document.getElementById("atributosResp")!= null)
    selectAtributosUsuario = document.getElementById("atributosResp")
    if (ehSelectValido()) {
        if (!ehInputVazio(novoValorInput.value)) {
            switch (selectAtributosUsuario.value) {

                case 'nome':
                    listaDeUsuarios[posicao].nome = novoValorInput.value
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
                    if(posicaoResponsavel != -1){
                        listaDeResponsaveis[posicaoResponsavel].senhaResp = novoValorInput.value
                    }
                    break

                    case 'nomeResponsavel':
                        listaDeResponsaveis[posicaoResponsavel].nomeResp = novoValorInput.value
                        break
                        
    
                    case 'cpfResponsavel':
                        listaDeResponsaveis[posicaoResponsavel].cpfResp = novoValorInput.value
                        break
    
                    case 'cidadeResponsavel':
                        listaDeResponsaveis[posicaoResponsavel].enderecoResp.cidadeResp = novoValorInput.value
                        break
    
                    case 'bairroResponsavel':
                        listaDeResponsaveis[posicaoResponsavel].enderecoResp.bairroResp = novoValorInput.value
                        break
    
                    case 'ruaResponsavel':
                        listaDeResponsaveis[posicaoResponsavel].enderecoResp.ruaResp = novoValorInput.value
                        break
    
                    case 'numeroResponsavel':
                        listaDeResponsaveis[posicaoResponsavel].enderecoResp.numeroResp = novoValorInput.value
                        break
    
                    case 'complementoResponsavel':
                        listaDeResponsaveis[posicaoResponsavel].enderecoResp.complementoResp = novoValorInput.value
                        break
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

    if(temResponsavel()){
        deletarResponsavel()
    }

    alert('Seu cadastro foi excluído!')
    limparObjetoLogado()
    window.location.href = 'inicioOUT.html'
}

function deletarResponsavel() {
    listaDeResponsaveis = JSON.parse(localStorage.getItem("responsaveisKey"))
    usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"))
    if (temResponsavel()) {
        listaDeResponsaveis.splice(this.posicaoResponsavel, 1)
        localStorage.setItem("responsaveisKey", JSON.stringify(listaDeResponsaveis))
        alert('Responsável excluído!')
    } else {
        alert('Você não possui responsável')
    }
}

function temResponsavel(){
    var retorno = false
    listaDeResponsaveis = JSON.parse(localStorage.getItem("responsaveisKey"))
    usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"))
    for(i = 0; i < listaDeResponsaveis.length; i++){
        if(listaDeResponsaveis[i].idResp == usuarioLogado.id){
            this.posicaoResponsavel = i
            selectResponsavel()
            retorno = true
        }
    }
    return retorno
}

function selectResponsavel(){
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
   <option value="nomeResponsavel">NOME DO RESPONSAVEL</option>\n
   <option value="cpfResponsavel">CPF DO RESPONSAVEL</option>\n
   <option value="cidadeResponsavel">CIDADE DO RESPONSAVEL</option>\n
   <option value="bairroResponsavel">BAIRRO DO RESPONSAVEL</option>\n
   <option value="ruaResponsavel">RUA DO RESPONSAVEL</option>\n
   <option value="numeroResponsavel">NUMERO DO RESPONSAVEL</option>\n
   <option value="complementoResponsavel">COMPLEMENTO DO RESPONSAVEL</option> </select> <br>`

}

function limparObjetoLogado() {
    localStorage.setItem('usuarioLogado', '')
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
