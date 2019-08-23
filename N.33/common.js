'use strict';

window.addEventListener('load', createClock, false);

function createClock() {
    //ширина и высота дива часов
    const clockWidthHeight = 400;
//радиус часов
    const clockRadius = Math.round(clockWidthHeight * Math.sqrt(2)) / 2;

//радиус круга на котором располгаются цифры
    var radius = clockRadius * 0.6;

//угол для первой цифры
    var angleGrad = 0;

//циферблат
    let clockFace = document.createElement('div');
    clockFace.id = 'clockFace';
    clockFace.style.width = clockWidthHeight + 'px';
    clockFace.style.height = clockWidthHeight + 'px';    clockFace.style.lineHeight = 0.625 * clockWidthHeight + 'px';
    clockFace.classList.add('clockFace');
    document.body.appendChild(clockFace);
//конец

//часовая стрелка -
    let hourArrow = document.createElement('div');
    hourArrow.style.width = radius * 0.8 + 'px';
    hourArrow.style.height = clockWidthHeight * 0.02 + 'px';
    hourArrow.style.backgroundColor = 'black';
    hourArrow.classList.add('arrow');
    clockFace.appendChild(hourArrow);
    hourArrow.style.left = (clockFace.offsetWidth / 2) + 'px';
    hourArrow.style.top = (clockFace.offsetHeight / 2) - (hourArrow.offsetHeight / 2) + 'px';
//конец

//минутная стрелка
    let minuteArrow = document.createElement('div');
    minuteArrow.style.width = radius * 0.9 + 'px';
    minuteArrow.style.height = clockWidthHeight * 0.015 + 'px';
    minuteArrow.style.backgroundColor = 'black';
    minuteArrow.classList.add('arrow');
    clockFace.appendChild(minuteArrow);
    minuteArrow.style.left = (clockFace.offsetWidth / 2) + 'px';
    minuteArrow.style.top = (clockFace.offsetHeight / 2) - (minuteArrow.offsetHeight / 2) + 'px';
//конец

//секундная стрелка
    let secondArrow = document.createElement('div');
    secondArrow.style.width = radius + 'px';
    secondArrow.style.height = clockWidthHeight * 0.01 + 'px';
    secondArrow.style.backgroundColor = 'red';
    secondArrow.classList.add('arrow');
    clockFace.appendChild(secondArrow);
    secondArrow.style.left = (clockFace.offsetWidth / 2) + 'px';
    secondArrow.style.top = (clockFace.offsetHeight / 2) - (secondArrow.offsetHeight / 2) + 'px';
//конец

//кружок в центре часов
    let center = document.createElement('div');
    center.classList.add('center');
    clockFace.appendChild(center);
    center.style.left = (clockFace.offsetWidth / 2) - (center.offsetWidth / 2) + 'px';
    center.style.top = (clockFace.offsetHeight / 2) - (center.offsetHeight / 2) + 'px';
//конец

//цифры
    for (let i = 12; i > 0; i--) {
        var angleRad = angleGrad / 180 * Math.PI;
        let number = document.createElement('div');
        number.style.width = clockWidthHeight * 0.125 + 'px';
        number.style.height = clockWidthHeight * 0.125 + 'px';
        number.style.lineHeight = number.style.height;
        number.textContent = i;
        number.classList.add('number');
        clockFace.appendChild(number);
        pos(clockFace, number);
        angleGrad -= 30;
    }
//конец
    var currTime = new Date(); //текущее время
//время

    let time = document.createElement('span');
    time.id = 'time';
    time.classList.add('time');
    time.innerHTML = formatDateTime(currTime);
    clockFace.appendChild(time);
//конец

    // let degSec = currTime.getSeconds() * 360 / 60 - 90 + (360 / 60); // начальный угол для секундной стрелки
    let degSec = currTime.getSeconds() * 360 / 60 - 90; // начальный угол для секундной стрелки
    secondArrow.style.transform = "rotate(" + degSec + "deg)"; // начальное положение секундной стрелки

    // let degMin = (currTime.getMinutes() * 60 + currTime.getSeconds()) * 360 / (60 * 60) - 90 + (360 / 60 / 60); // начальный угол для минутной стрелки
    let degMin = (currTime.getMinutes() * 60 + currTime.getSeconds()) * 360 / (60 * 60) - 90; // начальный угол для минутной стрелки
    minuteArrow.style.transform = "rotate(" + degMin + "deg)"; // начальное положение минутной стрелки

    // let degHour = (currTime.getHours() * 60 * 60 + currTime.getMinutes() * 60 + currTime.getSeconds()) * (360 * 2) / (24 * 60 * 60) - 90 + (360 * 2 / 24 / 60 / 60); // начальный угол для часовой стрелки
    let degHour = (currTime.getHours() * 60 * 60 + currTime.getMinutes() * 60 + currTime.getSeconds()) * (360 * 2) / (24 * 60 * 60) - 90; // начальный угол для часовой стрелки
    hourArrow.style.transform = "rotate(" + degHour + "deg)"; // начальное положение часовой стрелки

//интервал для времени и стрелок
    let intervalTime = setInterval(() => {
        var currTime = new Date();
        document.getElementById('time').innerHTML = formatDateTime(currTime);

        secondArrow.style.transform = "rotate(" + degSec + "deg)";
        // degSec = (degSec + 6) % 360; // каждую секунду секундная стрелка смещается на 6 градусов
        degSec = currTime.getSeconds() * 360 / 60 - 90 + (360 / 60); // угол для секундной стрелки каждую секунду

        minuteArrow.style.transform = "rotate(" + degMin + "deg)";
        // degMin = (degMin + 0.1) % 360; // каждую секунду минутная стрелка смещается на 0.1 градусов
        degMin = (currTime.getMinutes() * 60 + currTime.getSeconds()) * 360 / (60 * 60) - 90 + (360 / 60 / 60); // угол для минутной стрелки каждую секунду

        hourArrow.style.transform = "rotate(" + degHour + "deg)";
        // degHour = (degHour + 0.008333333) % 360; // каждую секунду часовая стрелка смещается на 0.008333333 градусов
        degHour = (currTime.getHours() * 60 * 60 + currTime.getMinutes() * 60 + currTime.getSeconds()) * (360 * 2) / (24 * 60 * 60) - 90 + (360 * 2 / 24 / 60 / 60); // угол для часовой стрелки каждую секунду
    }, 1000);
//конец

//позиционирование цифр на циферблате
    function pos(clockFace, number) {
        var clockFaceCenterX = clockFace.offsetLeft + clockFace.offsetWidth / 2;
        var clockFaceCenterY = clockFace.offsetTop + clockFace.offsetHeight / 2;

        var numberCenterX = clockFaceCenterX + radius * Math.sin(angleRad);
        var numberCenterY = clockFaceCenterY - radius * Math.cos(angleRad);

        number.style.left = Math.round(numberCenterX - number.offsetWidth / 2) + 'px';
        number.style.top = Math.round(numberCenterY - number.offsetHeight / 2) + 'px';
    }

//форматирует переданную дату-время в формате дд.мм.гггг чч:мм:сс
    function formatDateTime(dt) {
        var hours = dt.getHours();
        var minutes = dt.getMinutes();
        var seconds = dt.getSeconds();
        return str0l(hours, 2) + ':' + str0l(minutes, 2) + ':' + str0l(seconds, 2);
    }

//дополняет строку val слева нулями до длины Len
    function str0l(val, len) {
        var strVal = val.toString();
        while (strVal.length < len)
            strVal = '0' + strVal;
        return strVal;
    }
}

