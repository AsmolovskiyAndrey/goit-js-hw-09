function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

stopBtn.disabled = true; //!кнопка стоп изначально неактивна
let timerId = null;

const clickStartBtn = startBtn.addEventListener('click', onStartClick);
const clickStopBtn = stopBtn.addEventListener('click', onStopClick);


function onStartClick() {
    changeColorBGC(); //! запустит в первый раз изменение BGC
    timerId = setInterval(changeColorBGC, 1000);
    startBtn.disabled = true;
    stopBtn.disabled = false;

}
function onStopClick() {
    clearInterval(timerId);
    startBtn.disabled = false;
    stopBtn.disabled = true;
}

function changeColorBGC() {
    body.style.backgroundColor = getRandomHexColor();
}
