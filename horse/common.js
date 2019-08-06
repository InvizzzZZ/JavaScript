let board = document.createElement('div');
board.className = 'board';
document.body.appendChild(board);


for (let i = 0; i < 64; i++) {
    let ceil = document.createElement('div');
    ceil.className = 'ceil';
    board.appendChild(ceil);
}

let ceil = document.getElementsByClassName('ceil');

let x = 1, y = 8;

for (let i = 0; i < ceil.length; i++) {

    if (x > 8) { // если х больше 8, то переходим на новы ряд (y--) и начинаем х с 1
        x = 1;
        y--
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

ceil[0].classList.add('current'); // место коня в начале
ceil[0].classList.add('calculated'); //класс в качестве признака, что конь уже был на ячейке

let step = 1; //номер хода, который будет отображаться в ячейке

ceil[0].innerHTML = step;

//текущие координаты коня
let currentX = ceil[0].getAttribute('posX');
let currentY = ceil[0].getAttribute('posY');

let button = document.createElement('button');
button.innerHTML = 'GO';
button.classList.add('button');
button.setAttribute('onClick', 'GO()');
document.body.appendChild(button);

var interval; // интервал между ходами коня

function GO(){
    button.innerHTML = "Restart";
    interval = setInterval(() => {
        nextStep();
    }, 200);
}

function nextStep() {
    // возможные ходы коня
    let vars = [
        document.querySelector('[posX="' + (+currentX + 1) + '"][posY="' + (+currentY + 2) + '"]'),
        document.querySelector('[posX="' + (+currentX + 2) + '"][posY="' + (+currentY + 1) + '"]'),
        document.querySelector('[posX="' + (+currentX + 2) + '"][posY="' + (+currentY - 1) + '"]'),
        document.querySelector('[posX="' + (+currentX + 1) + '"][posY="' + (+currentY - 2) + '"]'),
        document.querySelector('[posX="' + (+currentX - 1) + '"][posY="' + (+currentY - 2) + '"]'),
        document.querySelector('[posX="' + (+currentX - 2) + '"][posY="' + (+currentY - 1) + '"]'),
        document.querySelector('[posX="' + (+currentX - 2) + '"][posY="' + (+currentY + 1) + '"]'),
        document.querySelector('[posX="' + (+currentX - 1) + '"][posY="' + (+currentY + 2) + '"]')
    ];

    for (let i = vars.length - 1; i >= 0; i--) { // с конца чтобы не изменять индекс при удалении
        if (!vars[i] || vars[i].classList.contains('calculated')) {
            vars.splice(i, 1);
        }
    }

    if (vars.length > 0) {

        let nextArr = [];

        function choiceNextStep() {

            for (let i = 0; i < vars.length; i++) {
                let nextX = vars[i].getAttribute('posX');
                let nextY = vars[i].getAttribute('posY');
                let nextVars = [
                    document.querySelector('[posX="' + (+nextX + 1) + '"][posY="' + (+nextY + 2) + '"]'),
                    document.querySelector('[posX="' + (+nextX + 2) + '"][posY="' + (+nextY + 1) + '"]'),
                    document.querySelector('[posX="' + (+nextX + 2) + '"][posY="' + (+nextY - 1) + '"]'),
                    document.querySelector('[posX="' + (+nextX + 1) + '"][posY="' + (+nextY - 2) + '"]'),
                    document.querySelector('[posX="' + (+nextX - 1) + '"][posY="' + (+nextY - 2) + '"]'),
                    document.querySelector('[posX="' + (+nextX - 2) + '"][posY="' + (+nextY - 1) + '"]'),
                    document.querySelector('[posX="' + (+nextX - 2) + '"][posY="' + (+nextY + 1) + '"]'),
                    document.querySelector('[posX="' + (+nextX - 1) + '"][posY="' + (+nextY + 2) + '"]')
                ];

                for (let i = nextVars.length - 1; i >= 0; i--) { // с конца чтобы не изменять индекс при удалении
                    if (!nextVars[i] || nextVars[i].classList.contains('calculated')) {
                        nextVars.splice(i, 1);
                    }
                }

                nextArr.push(nextVars.length);
            }
            return nextArr;
        }

        nextArr = choiceNextStep();

        let min = Math.min.apply(null, nextArr); // минимальный элемент массива
        let index = nextArr.indexOf(min); // индекс минимального элемента в массиве

        step++;
        document.querySelector('.current').classList.remove('current');

        vars[index].classList.add('current');
        vars[index].classList.add('calculated');
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