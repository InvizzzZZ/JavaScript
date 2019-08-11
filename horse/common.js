'use strict';
//доска
let board = document.createElement('div');
board.className = 'board';
document.body.appendChild(board);

//кнопка запуска/перезагрузки
let button = document.createElement('button');
button.innerHTML = 'GO';
button.classList.add('button');
button.setAttribute('onClick', 'GO()');
document.body.appendChild(button);

//шахматные ячейки
for (let i = 0; i < 64; i++) {
    let ceil = document.createElement('div');
    ceil.className = 'ceil';
    board.appendChild(ceil);
}

let ceil = document.getElementsByClassName('ceil');

let x = 1, y = 8; //начальные координаты

for (let i = 0; i < ceil.length; i++) { //координаты для всех ячеек

    if (x > 8) { //если х больше 8, то переходим на новый ряд (y--) и начинаем х с 1
        x = 1;
        y--;
    }

    ceil[i].setAttribute('posX', x);
    ceil[i].setAttribute('posY', y);
    x++;

    if ((i % 2 === 0 && y % 2 === 0) || ((i % 2 !== 0 && y % 2 !== 0))) { // разметка доски
        ceil[i].style.backgroundColor = '#80b6bf';
    } else {
        ceil[i].style.backgroundColor = '#f0ebeb';
    }
}

ceil[0].classList.add('current'); //место коня в начале
ceil[0].classList.add('calculated'); //класс в качестве признака, что конь уже был на ячейке

let step = 1; //номер хода, который будет отображаться в ячейке. Начальное значение.

ceil[0].innerHTML = step; // вывод номера хода в ячейку

//текущие координаты коня
let currentX = ceil[0].getAttribute('posX');
let currentY = ceil[0].getAttribute('posY');

var interval; // интервал между ходами коня

//функция запуска по кнопке
function GO() {
    button.innerHTML = "Restart";
    interval = setInterval(() => {
        nextStep();
    }, 200);
}

function nextStep() {
    // возможные ходы коня
    let vars = possibleTurns(currentX, currentY); //подбор возможных ходов коня

    if (vars.length > 0) {

        let index = choiceNextStep(vars); //выбор следующего хода (минимальное кол-во возможных ходов)

        step++; // увеличивается номер хода
        document.querySelector('.current').classList.remove('current'); // убрать коня с ячейки, где был

        vars[index].classList.add('current'); //добавить коня
        vars[index].classList.add('calculated'); //добавить признак, что конь посещал ячейку
        vars[index].innerHTML = step;

        currentX = vars[index].getAttribute('posX');
        currentY = vars[index].getAttribute('posY');

        if (step === 64) {
            clearInterval(interval);
        }
    } else {
        location.reload(true);
    }
}

//выбор следующего хода (минимальное кол-во возможных ходов)
function choiceNextStep(arr) {
    let nextArr = [];

    for (let i = 0; i < arr.length; i++) {
        let nextX = arr[i].getAttribute('posX');
        let nextY = arr[i].getAttribute('posY');
        let nextVars = possibleTurns(nextX, nextY);

        nextArr.push(nextVars.length);
    }

    let min = Math.min.apply(null, nextArr); // минимальный элемент массива
    return nextArr.indexOf(min); // индекс минимального элемента в массиве
}

//подбор возможных ходов коня
function possibleTurns(X, Y) {
    let vars = [
        document.querySelector('[posX="' + (+X + 1) + '"][posY="' + (+Y + 2) + '"]'),
        document.querySelector('[posX="' + (+X + 2) + '"][posY="' + (+Y + 1) + '"]'),
        document.querySelector('[posX="' + (+X + 2) + '"][posY="' + (+Y - 1) + '"]'),
        document.querySelector('[posX="' + (+X + 1) + '"][posY="' + (+Y - 2) + '"]'),
        document.querySelector('[posX="' + (+X - 1) + '"][posY="' + (+Y - 2) + '"]'),
        document.querySelector('[posX="' + (+X - 2) + '"][posY="' + (+Y - 1) + '"]'),
        document.querySelector('[posX="' + (+X - 2) + '"][posY="' + (+Y + 1) + '"]'),
        document.querySelector('[posX="' + (+X - 1) + '"][posY="' + (+Y + 2) + '"]')
    ];

    for (let i = vars.length - 1; i >= 0; i--) { // с конца чтобы не изменять индекс при удалении
        if (!vars[i] || vars[i].classList.contains('calculated')) {
            vars.splice(i, 1);
        }
    }
    return vars;
}
