/*Elementos do HTML*/

const FormPreencher = document.getElementById('form-preencher');
const FormCadastro = document.getElementById('form-cadastro');
const BotaoAdicionar = document.getElementById('btn');
const Listaul = document.getElementById('lista');
const mensagem = document.getElementById('mensagem');
const quantidadeLivros = document.getElementById('qtd');
const mediaLivros = document.getElementById('media');
const totalLivros = document.getElementById('total')
const filtroGenero = document.getElementById('filtro-genero');
filtroGenero.addEventListener('change', atualizar_lista);

/* Tema escuro */

const dark = document.getElementById("texto-darkmode");
const body = document.getElementsByTagName("body")[0];

const savedTheme = localStorage.getItem("tema");

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

    // Se o filtro não for "todos" e o gênero for diferente, pula este livro
    if (filtroGenero.value !== 'todos' && livro.genero !== filtroGenero.value) {
            continue; 
    }
       
        li.innerHTML = `<div><h2>${livro.titulo}</h2><h2>R$${livro.valorUnitario}</h2></div>\n<p>${livro.descricao}</p>\n<div><div id="carac"><h4>Gênero: ${livro.genero}</h4><h4>Quantidade: ${livro.quantidade}</div></h4><div class="excluir" id="excluir${i}"></div></div>`;
        Listaul.appendChild(li);
        
        const excluir = document.getElementById(`excluir${i}`);
        excluir.addEventListener('click', (event) => {
            event.preventDefault();

            LivrosCadastrados.splice(i, 1);
            TotalGeral -= livro.quantidade * livro.valorUnitario;
            QuantidadeTotal -= livro.quantidade;
            let MediaTotal = TotalGeral / QuantidadeTotal;
            if (QuantidadeTotal === 0) {
                MediaTotal = 0;
            }

            quantidadeLivros.innerText = `Total de livros cadastrados: ${QuantidadeTotal}`
            mediaLivros.innerHTML = `Média do valor unitário: R$${MediaTotal.toFixed(2)}`
            totalLivros.innerText = `Valor total dos livros: R$${TotalGeral.toFixed(2)}`

            atualizar_opcoes_filtro(); // Atualiza o filtro
            atualizar_lista();         // Atualiza a lista
            salvarDados();             // ESSENCIAL: Salva para o livro não voltar depois

        });
    }

    /*JSON stringtify, converte o array para texto e exibe*/
    const dadosJSON = JSON.stringify(LivrosCadastrados);
    console.log("Conteúdo atual em JSON:", dadosJSON);

    /* Salvando os dados atualizados */
    salvarDados();

}

/* Salvar dados com JSON e localStorage, serve para, ao recarregar a página, seus livros não desaparecerem */

function salvarDados() {
    localStorage.setItem('meus_livros', JSON.stringify(LivrosCadastrados));
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

    quantidadeLivros.innerText = `Total de livros cadastrados: ${QuantidadeTotal}`
    mediaLivros.innerHTML = `Média do valor unitário: R$${MediaTotal.toFixed(2)}`
    totalLivros.innerText = `Valor total dos livros: R$${TotalGeral.toFixed(2)}`


    /*Criando objeto "livro" e adicionando na lista LivrosCadastrados*/

    const livro = {
        titulo: titulo,
        descricao: descricao,
        genero: genero,
        quantidade: quantidade,
        valorUnitario: valorUnitario
    }
    LivrosCadastrados.push(livro);
    atualizar_lista();
    atualizar_opcoes_filtro();

});

/* Aplicação da mudança de tema */

if (savedTheme === "dark") {
    body.setAttribute("theme", "dark");
}

dark.addEventListener("click", function(event) {
    event.preventDefault();

    const currentTheme = body.getAttribute("theme");

    if (currentTheme === "dark") {
        body.removeAttribute("theme");
        localStorage.setItem("tema", "light"); 
    } else {
        body.setAttribute("theme", "dark");
        localStorage.setItem("tema", "dark");
    }
});

/* Acessando livros salvos por meio de localStorage*/

const livrosSalvos = localStorage.getItem('meus_livros');

if (livrosSalvos) {
    LivrosCadastrados = JSON.parse(livrosSalvos);
    /*Desenha os livros carregados*/
    atualizar_lista(); 
}

function atualizar_opcoes_filtro() {
    const generosUnicos = [...new Set(LivrosCadastrados.map(livro => livro.genero))];
    const valorAtual = filtroGenero.value;
    
    // Texto do botão igual ao da imagem
    filtroGenero.innerHTML = '<option value="todos">Filtrar por Gênero</option>';
    
    generosUnicos.forEach(genero => {
        const option = document.createElement('option');
        option.value = genero;
        option.innerText = genero;
        filtroGenero.appendChild(option);
    });

    if (generosUnicos.includes(valorAtual)) {
        filtroGenero.value = valorAtual;
    }
}