let FormPreencher = document.getElementById('form-preencher');
const BotaoAdicionar = document.getElementById('btn');
const BotaoExcluir = document.getElementById('btn-excluir');
const Listaul = document.getElementById('lista');
let mensagem = document.getElementById('mensagem');
let FormCadastro = document.getElementById('form-cadastro');
let LivrosCadastrados = [];
let TotalGeral = 0;
let QuantidadeTotal = 0;

function atualizar_lista() {
    Listaul.innerHTML = ''; 

    for (let i = 0; i < LivrosCadastrados.length; i++) {
        let li = document.createElement('li');
        let livro = LivrosCadastrados[i];

        li.textContent = `${livro.titulo}\nGênero: ${livro.genero}\n${livro.descricao}\nQuantidade: ${livro.quantidade}\nR$${livro.valorUnitario}`;
        Listaul.appendChild(li);
    }
}

BotaoAdicionar.addEventListener('click', (event) => {
    event.preventDefault();

    let titulo = document.getElementsByName('titulo')[0].value;
    let descricao = document.getElementsByName('descricao')[0].value;
    let genero = document.getElementsByName('genero')[0].value;
    let quantidade = document.getElementsByName('quantidade')[0].value;
    let valorUnitario = document.getElementsByName('valorUnitario')[0].value;

    quantidade = Number(quantidade);
    valorUnitario = Number(valorUnitario.replace(",", ".")).toFixed(2);

    TotalGeral += quantidade * valorUnitario;
    QuantidadeTotal += quantidade;
    let MediaTotal = TotalGeral / QuantidadeTotal;

    const livro = {
        titulo: titulo,
        descricao: descricao,
        genero: genero,
        quantidade: quantidade,
        valorUnitario: valorUnitario
    }
    LivrosCadastrados.push(livro);
    atualizar_lista();

});