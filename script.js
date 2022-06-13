/* VARIAVEIS DE CONTROLE */
var perguntasFeitas = [];

// Perguntas do jogo
const perguntas = [
    //Pergunta 0
    {
    pergunta: "Qual dessas linguagens não é considera uma linguagem de programação?",
    respostas: ["C#", "Java", "Ruby", "HTML"],
    correta: "resp3"
    },
    //Pergunta 1
    {
    pergunta: "Qual dessas linguagens é uma linguagem interpretada?",
    respostas: ["C#", "Javascript", "C", "Java"],
    correta: "resp1"
    },
    //Pergunta 2
    {
        pergunta: "O que significa HTML?",
        respostas: ["Hyper Title Middle Loading", "Hyper Text Markup Language", "How To Make This", "Hyper Text Matchup Lineup"],
        correta: "resp1"
    },

    //Pergunta 3
    {
        pergunta: "Qual dessas linguagens surgiu primeiro?",
        respostas: ["Java", "C#", "Python", "Javascript"],
        correta: "resp2"
    },
];
var qtdPerguntas = perguntas.length -1;
gerarPergunta(qtdPerguntas)


function gerarPergunta(maxPerguntas) {  
    let aleatorio = (Math.random() * maxPerguntas).toFixed();

    //CONVERTER PARA NUMERO
    aleatorio = Number(aleatorio);

    //MOSTRAR A PERGUNTA NO CONSOLE
    console.log("A pergunta sorteada foi: "+aleatorio);

    //VERIFICAR SE A PERGUNTA JA FOI SORTEADA
    if(!perguntasFeitas.includes(aleatorio)){

        //COLOCAR COMO PERGUNTA FEITA
        perguntasFeitas.push(aleatorio);

        //PREENCHER O HTML COM OS DADOS DA QUESTAO SORTEADA
        var pergunta_selecionada = perguntas[aleatorio].pergunta;
        console.log(pergunta_selecionada);

        //ALIMENTAR A PERGUNTA VINDA DO SORTEIO
        $('#pergunta').html(pergunta_selecionada);
        $('#pergunta').attr('data-indice', aleatorio);

        //COLOCAR AS RESPOSTAS
        for (var i = 0; i < 4; i++){
            $("#resp"+ i).html(perguntas[aleatorio].respostas[i])
        }

        //EMBARALHAR AS RESPOSTAS
        var pai = $('respostas');
        var botoes = pai.children();

        for(var i = 1; i < botoes.length; i++){
            pai.append(botoes.eq(Math.floor(Math.random() * botoes.length)));
        }
        }else {
            //SE A PERGUNTA JA FOI FEITA
            console.log("a pergunta ja foi feita... tentando novamente");
            if(perguntasFeitas.length < qtdPerguntas +1){
                return gerarPergunta(maxPerguntas);
            }else{
                console.log("Acabaram as perguntas");
                $('#mensagem').html('Parabéns, você venceu.');
                $('#status').removeClass('oculto');
                $('#quiz').addClass('oculto');
                
                
        }
    }

}

$('.resposta').click(function() {
    if($('#quiz').attr('data-status')!=='travado'){
    //PERCORRE TODAS A CLASSES E DESMARCA A CLASSE SELECIONADA
    resetaBotoes();


    //ADICIONAR A CLASSE SELECIONADA 
    $(this).addClass('selecionada');
    }
});
$("#confirm").click(function(){
    //INDICE DA PERGUNTA
    var indice = $("#pergunta").attr('data-indice');

    //QUAL É A RESPOSTA CERTA
    var respCerta = perguntas[indice].correta;

    //QUAL FOI A RESPOSTA SELECIONADA
    $('.resposta').each(function() {
        if($(this).hasClass('selecionada')){
            var resEscolhida = $(this).attr('id');

            if(respCerta == resEscolhida){
                console.log('acertou')
                proximaPergunta();
            }else{
                console.log('Errouuu');
                $('#quiz').attr('data-status', 'travado');
                $('#confirm').addClass('oculto');
                $('#'+respCerta).addClass('correta');
                $('#'+resEscolhida).removeClass('selecionada');
                $('#'+resEscolhida).addClass('errada');
  
               
                setTimeout(() => {
                   gameOver();
                }, 3000);
            }
        }
    });

});
function newGame() {
    $('#confirm').removeClass('oculto');    
    $('#quiz').attr('data-status', 'ok');
    perguntasFeitas = [];
    resetaBotoes(); 
    gerarPergunta(qtdPerguntas);
    $('#quiz').removeClass('oculto');
    $('#status').addClass('oculto');
}

function proximaPergunta(){
    resetaBotoes();
    gerarPergunta(qtdPerguntas);
}

function resetaBotoes(){
    //PERCORRER E DESMARCAR A CLASSE SELECIONADA
    $('.resposta').each(function(){
        if($(this).hasClass('selecionada')){
            $(this).removeClass('selecionada');
        }
        if($(this).hasClass('correta')){
            $(this).removeClass('correta');
        }
        if($(this).hasClass('errada')){
            $(this).removeClass('errada');
        }
    });
}

function gameOver(){
    $('#quiz').addClass('oculto');
    $('#mensagem').html('Game Over');
    $('#status').removeClass('oculto');
    resetaBotoes();
}

$('#novo-jogo').click(function(){
    newGame();
});