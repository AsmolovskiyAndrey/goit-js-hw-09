// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const myInput = document.querySelector('input');
const startBtn = document.querySelector('button');

const refDays = document.querySelector('span[data-days]');
const refHours = document.querySelector('span[data-hours]');
const refMinutes = document.querySelector('span[data-minutes]');
const refSeconds = document.querySelector('span[data-seconds]');

let selectedDateGlobal = 0;
let isActive = false;

startBtn.addEventListener("click", timerStart);

startBtn.disabled = true; //!кнопка стоп изначально неактивна

const fp = flatpickr(myInput, {  //! flatpickr - Выбор даты в поле с Notiflix предупреждением
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const differenceDates = selectedDates[0].getTime() - Date.now();
        if (differenceDates < 0) {
            Notiflix.Notify.failure('Please choose a date in the future',{
            timeout: 3000,
            },);
            return
        }
        startBtn.disabled = false; //!кнопка стоп стала активной
        selectedDateGlobal = selectedDates[0].getTime(); //! сделал доступной в глаюалбной области видимости
    },
}); 

function timerStart() {
    if (isActive) { //! не позволяет запустить таймер несколько раз
        return
    }
    showTimeOnDisplay(convertMs(selectedDateGlobal - Date.now())); //! запуск в первый раз(до setInterval)

    const intervalId = setInterval(() => {
        const deltaTime = selectedDateGlobal - Date.now();
        // console.log(convertMs(deltaTime));
        showTimeOnDisplay(convertMs(deltaTime));
        isActive = true;
        
        if (deltaTime <= 900) { //! остановит таймер на 0
            clearInterval(intervalId);
            isActive = false;
            Notiflix.Notify.success('Time is over', //! выведет сообщение что время вышло
            {timeout: 6000,},
            );
            startBtn.disabled = true;
        }
    }, 1000);

}

function showTimeOnDisplay({ days, hours, minutes, seconds }) { //! выводит данные на дисплей
    refDays.textContent = days;
    refHours.textContent = hours;
    refMinutes.textContent = minutes;
    refSeconds.textContent = seconds;
}

function convertMs(ms) { //! конвертирует секунды в дни,часы,минуты и секунды
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) { //! добавляет 0 до 10-ти
    return String(value).padStart(2, '0');
}