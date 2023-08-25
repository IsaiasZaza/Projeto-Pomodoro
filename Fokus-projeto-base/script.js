//variaveis cores
const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
//variavel imagem
const banner = document.querySelector('.app__image');
const imagemPauseOuPlay = document.querySelector('.app__card-primary-butto-icon')
//variavel texto
const titulo = document.querySelector('.app__title');
//bottons
const botoes = document.querySelectorAll('.app__card-button');
//variaveis musicas
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
//botons audio
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3')
//variavel temporizador
let tempoDecorridoEmSegundos = 1500
const startPauseBt = document.querySelector('#start-pause');
let intervadoID = null;

//botao começar
const iniciarOuPausarBt = document.querySelector('#start-pause span')
//tempo
const tempoNaTela = document.querySelector('#timer');

//evento play musica paused, play, pause eventos do js puro
musica.loop = true;
musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})


//cor do background
focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
})
curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active');
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
})

function alterarContexto(contexto) {
    mostrarTempo();
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active');
    })

    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta </strong>`;
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície. <strong class="app__title-strong">Faça uma pausa longa </strong>`;
            break;
        default:
            break;
    }
}

audioTempoFinalizado.loop = false;

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        audioTempoFinalizado.play(); //finalizado
        alert('tempo finalizado');
        zerar()
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar);
function iniciarOuPausar() {
    if (intervadoID) {
        iniciarOuPausarBt.textContent = "Começar";
        imagemPauseOuPlay.setAttribute('src', 'play_arrow.png');
        audioPausa.play(); //audio pausado
        console.log('temporizador: pausado')
        zerar()
        return
    }
    intervadoID = setInterval(contagemRegressiva, 1000);
    audioPlay.play(); //audio iniciado
    imagemPauseOuPlay.setAttribute('src', 'pause.png');
    iniciarOuPausarBt.textContent = "Pausar";

}
function zerar() {
    clearInterval(intervadoID);
    intervadoID = null
}

function mostrarTempo() {
    const temporizador = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = temporizador.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}
mostrarTempo()
//html.setAttribute('data-contexto', 'descanso-longo');     EXEMPLO CONTEXTO
//banner.setAttribute('src', '/imagens/descanso-longo.png');