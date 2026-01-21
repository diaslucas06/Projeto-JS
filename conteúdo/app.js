let FormPreencher = document.getElementById('#form-preencher');
let FormCadastro = document.getElementById('#form-cadastro');

let Botao = document.getElementById('btn');
let Lista = []

Botao.addEventListener('click', function(event) {
    event.preventDefault();

    let titulo = document.getElementsByName('titulo')[0].value;
    let descricao = document.getElementsByName('descricao')[0].value;
    let Categoria = document.getElementsByName('categoria')[0].value;
    let Quantidade = document.getElementsByName('quantidade')[0].value;
    let ValorUnitario = document.getElementsByName('valorUnitario')[0].value;

    livro = {}
    livro.titulo = titulo;
    livro.descricao = descricao;
    livro.categoria = Categoria;
    livro.quantidade = Quantidade;
    livro.valorUnitario = ValorUnitario;
    
    Lista.push(livro);
});