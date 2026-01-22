let FormPreencher = document.getElementById('form-preencher');
const BotaoAdicionar = document.getElementById('btn');
const Listaul = document.getElementById('lista');
let FormCadastro = document.getElementById('form-cadastro');
let LivrosCadastrados = [];
let TotalGeral = 0;
let QuantidadeTotal = 0;
let MediaTotal = TotalGeral / QuantidadeTotal;

function atualizar_lista() {
    Listaul.innerHTML = ''; 

    for (let i = 0; i < LivrosCadastrados.length; i++) {
        let li = document.createElement('li');
        let livro = LivrosCadastrados[i];

        li.textContent = `${livro.titulo}\n${livro.genero}\n${livro.descricao}\nQuantidade: ${livro.quantidade}\nValor: R$${livro.valorUnitario}`;
        Listaul.appendChild(li);
    }
}

BotaoAdicionar.addEventListener('click', function(event) {
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