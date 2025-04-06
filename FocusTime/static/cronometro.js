const hours = document.getElementById('horas');
const minutes = document.getElementById('minutos');
const seconds = document.getElementById('segundos');
const meta_lista = document.getElementById('metas');
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
        intervalid = setInterval(() =>{
            timer += 1;
            setTimer(timer);
        }, 1000);

        btn_play.setAttribute('action' , 'pause');
        btn_play.innerHTML = '<img src="/static/img/icon_pause.png">';
    }

    else if (action === 'pause'){
        btn_play.setAttribute('action' , 'continue');
        btn_play.innerHTML = '<img src="/static/img/icon_play.png">';
    }
    
}

const formatNumber = (num) => num.toString().padStart(2, '0');



const setTimer = (tempo) => {
    hours.innerText = formatNumber(cronometro_horas(tempo));
    minutes.innerText = formatNumber(cronometro_minutos(tempo));
    seconds.innerText = formatNumber(cronometro_segundos(tempo));
}


document.getElementById('play').addEventListener('click',toggleTimer);