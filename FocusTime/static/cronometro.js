const hours = document.querySelector('#horas h3');
const minutes = document.querySelector('#minutos h3');
const seconds = document.querySelector('#segundos h3');
const meta_lista = document.getElementById('metas');
const cronometroElement = document.querySelector('.cronometro');

let intervalid = 0;
let timer = 0;
let mark = [];

const cronometro_horas = (tempo) => {
    const horas = Math.floor(tempo / 3600);
    
    return `${horas.toString().padStart(2 ,'0') }`;
}

const cronometro_minutos = (tempo) => {
    const minutos = Math.floor((tempo % 3600) / 60);

    return `${minutos.toString().padStart(2 ,'0') }`;
}

const cronometro_segundos = (tempo) => {
    const segundos = Math.floor(tempo % 60);

    return `${segundos.toString().padStart(2 ,'0') }`;
}




const toggleTimer = () => {
    const btn_play = document.getElementById('play');
    const action = btn_play.getAttribute('action');

    clearInterval(intervalid);

    if (action === 'start' || action ===  'continue'){

        cronometroElement.style.setProperty('--load-progress', '1');

        intervalid = setInterval(() =>{
            timer += 1;
            setTimer(timer);
        }, 1000);

        btn_play.setAttribute('action' , 'pause');
        btn_play.innerHTML = '<img src="/static/img/icon_pause.png">';
    }

    else if (action === 'pause'){
        cronometroElement.style.setProperty('--load-progress', '0');
        btn_play.setAttribute('action' , 'continue');
        btn_play.innerHTML = '<img src="/static/img/icon_play.png">';
    }
    
}


const restartButton = document.getElementById('restart');

restartButton.addEventListener('click', () => {
    clearInterval(intervalid);
    timer = 0;
    setTimer(timer);

    const btn_play = document.getElementById('play');
    btn_play.setAttribute('action', 'start');
    btn_play.innerHTML = '<img src="/static/img/icon_play.png">';
    
    cronometroElement.style.setProperty('--load-progress', '0');
});





const formatNumber = (num) => num.toString().padStart(2, '0');



const setTimer = (tempo) => {
    hours.innerText = formatNumber(cronometro_horas(tempo));
    minutes.innerText = formatNumber(cronometro_minutos(tempo));
    seconds.innerText = formatNumber(cronometro_segundos(tempo));
}


document.getElementById('play').addEventListener('click',toggleTimer);