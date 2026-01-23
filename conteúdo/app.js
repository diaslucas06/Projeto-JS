/*Elementos do HTML*/

const FormPreencher = document.getElementById('form-preencher');
const FormCadastro = document.getElementById('form-cadastro');
const BotaoAdicionar = document.getElementById('btn');
const BotaoExcluir = document.getElementById('btn-excluir');
const Listaul = document.getElementById('lista');
const mensagem = document.getElementById('mensagem');
const quantidadeLivros = document.getElementById('qtd');
const mediaLivros = document.getElementById('media');
const totalLivros = document.getElementById('total')

/*Globais*/

let LivrosCadastrados = [];
let TotalGeral = 0;
let QuantidadeTotal = 0;


/*Lista para atualizar a lista de livros cadastrados*/

function atualizar_lista() {
    Listaul.innerHTML = ''; 

    for (let i = 0; i < LivrosCadastrados.length; i++) {
        let li = document.createElement('li');
        let livro = LivrosCadastrados[i];

        li.textContent = `${livro.titulo}\nGênero: ${livro.genero}\n${livro.descricao}\nQuantidade: ${livro.quantidade}\nR$${livro.valorUnitario}`;
        Listaul.appendChild(li);
    }

    /*JSON stringtify, converte o array para texto e exibe*/
    const dadosJSON = JSON.stringify(LivrosCadastrados);
    console.log("Conteúdo atual em JSON:", dadosJSON);

}

BotaoAdicionar.addEventListener('click', (event) => {
    event.preventDefault();


    /*Valores do Form*/

    let titulo = document.getElementsByName('titulo')[0].value;
    let descricao = document.getElementsByName('descricao')[0].value;
    let genero = document.getElementsByName('genero')[0].value;
    let quantidade = document.getElementsByName('quantidade')[0].value;
    let valorUnitario = document.getElementsByName('valorUnitario')[0].value;

    /*Validação de formulário*/

    if (!titulo && !descricao && !genero && !quantidade && !valorUnitario) {
        mensagem.innerText = "Preencha os campos!";
        return
    }

    else if (!titulo) {
        mensagem.innerText = "Insira um título para o seu livro!";
        return
    }

    else if (!genero) {
            mensagem.innerText = "Insira o gênero do seu livro!";
            return
        }

    else if (!descricao) {
        mensagem.innerText = "Insira uma descrição para o seu livro!";
        return
    }
    
    else if (!quantidade) {
        mensagem.innerText = "Insira a quantidade de livros que deseja adicionar!";
        return
    }

    else if (isNaN(Number(quantidade))) {
        mensagem.innerText = "Insira uma quantidade válida!";
        return
    }

    else if (!valorUnitario) {
        mensagem.innerText = "Insira o valor unitário do seu livro!";
        return
    }

    else if (isNaN(Number(valorUnitario.replace(",", ".")).toFixed(2))) {
        mensagem.innerText = "Insira um valor unitário válido!";
        return
    }

    /*Conversões*/

    quantidade = Number(quantidade);
    valorUnitario = Number(valorUnitario.replace(",", ".")).toFixed(2);

    /*Cálculos*/

    TotalGeral += quantidade * valorUnitario;
    QuantidadeTotal += quantidade;
    let MediaTotal = TotalGeral / QuantidadeTotal;

    /*Mensagens*/

    quantidadeLivros.innerText = `Quantidade total de livros: ${QuantidadeTotal}`
    mediaLivros.innerHTML = `Média do valor unitário: R$${MediaTotal.toFixed(2)}`
    totalLivros.innerText = `Valor total dos livros: ${TotalGeral}`


    /*Criando objeto "livro" e adicionando na lista LivrosCadastrados*/

    const livro = {
        titulo: titulo,
        descricao: descricao,
        genero: genero,
        quantidade: quantidade,
        valorUnitario: valorUnitario
    }
    LivrosCadastrados.push(livro);

    /*Exemplo JSON parse, leitura de dado*/
    const livroJSON = JSON.stringify(livro);
    const livroObjeto = JSON.parse(livroJSON);
    console.log("Objeto recuperado:", livroObjeto);

    atualizar_lista();

});
