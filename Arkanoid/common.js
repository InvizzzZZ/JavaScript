'use strict';

var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

window.addEventListener('resize', onResize, false);

// setInterval
let interval = 0; // id interval
let control = 0; // признак в полете шарик или нет ( 1 - полет, 0 - нет)
// let cursorPosX = 0;
let touchPosX = 0; // координата Х касания пальца или мыши по paddle
let touchobj = 0; // первая точка прикосновения к paddle
let dist = 0; // расстояние на которое сместился палец или мышь после тапа по paddle

// visual elements
let container = document.getElementById('container');
let field = document.getElementById('field');
let topTabs = document.getElementById('topTabs');
let score = document.getElementById('scoreNode');
let lifes = document.getElementById('lifesNode');
let paddle = document.getElementById('paddle');
let ball = document.getElementById('ball');

// begin game
let play = document.getElementById('play');
play.addEventListener('click', start, false);

// let leftArrow = document.getElementById('leftArrow');
// // leftArrow.addEventListener('click', moveLeftRight, false);
//
// let rightArrow = document.getElementById('rightArrow');
// // rightArrow.addEventListener('click', moveLeftRight, false);
//

let records = JSON.parse(window.localStorage.getItem('records')) || [];
if (records.length === 0) {
    window.localStorage.setItem('records', JSON.stringify(records));
}

// sound
let sound = document.getElementById('sound');
sound.addEventListener('click', soundOff, false);

let pause = document.getElementById('pause_resume');
pause.addEventListener('click', pauseGame, false);

let record = document.getElementById('record');
record.addEventListener('click', showRecords, false);

// screens
let startScreen = document.getElementById('startScreen');
startScreen.addEventListener('click', hideStartScreen, false);
document.addEventListener('keydown', hideStartScreen, false);
let endScreen = document.getElementById('endScreen');
let winScreen = document.getElementById('winScreen');
let recordsScreen = document.getElementById('recordsScreen');
// recordsScreen.style.left = container.style.left + 'px';
// recordsScreen.style.top = container.style.top + 'px';
// recordsScreen.style.right = container.style.right + 'px';
// recordsScreen.style.bottom = container.style.bottom + 'px';


let result = document.getElementById('result');

let titleMusic = document.getElementById('titleMusic');
let roundMusic = document.getElementById('roundMusic');
let endMusic = document.getElementById('endMusic');
let winMusic = document.getElementById('winMusic');


window.onload = () => {
    // showRecords();
    play.style.top = container.offsetTop + container.offsetHeight / 2 - play.offsetHeight / 2 + 'px';
    play.style.left = container.offsetLeft + container.offsetWidth / 2 - play.offsetWidth / 2 + 'px';

    // recordsScreen.top = container.offsetTop + 'px';
    // recordsScreen.left = container.offsetLeft + 'px';
    // recordsScreen.top = container.offsetTop + 'px';
    // recordsScreen.top = container.offsetTop + 'px';

    // leftArrow.style.top = container.offsetHeight - container.offsetHeight / 4 + 'px';
    // leftArrow.style.left = 40 + 'px';

    // rightArrow.style.top = container.offsetHeight - container.offsetHeight / 4 + 'px';
    // rightArrow.style.right = document.getElementById('right').offsetWidth + 40 + 'px';

    titleMusic.muted = false;
    titleMusic.play()
};

// bricks
for (let i = 0; i < 100; i++) {
    let element = document.createElement('div');
    element.className = 'brick';
    field.appendChild(element);
}

let bricks = document.getElementsByClassName('brick');
let brickLast = bricks[bricks.length - 1];
let brick = bricks[0]; // кирпичик
let brickHeight = brick.offsetHeight + 2; // 2 ширина рамки 1 + 1
let brickWidth = brick.offsetWidth + 2; // 2 ширина рамки 1 + 1

// paddle
let paddleProps = {
    posX: field.offsetWidth / 2 + container.offsetLeft - paddle.offsetWidth / 2,
    posY: container.offsetTop + container.offsetHeight - paddle.offsetHeight,

    speed: 0,

    update: function () {
        paddle.style.left = this.posX + "px";
        paddle.style.top = this.posY + "px";

    }
};

// ball
let ballProps = {
    posX: paddleProps.posX + paddle.offsetWidth / 2 - ball.offsetWidth / 2,
    posY: container.offsetTop + container.offsetHeight - paddle.offsetHeight - ball.offsetHeight,

    speedX: randomDiap(-4, 4),
    speedY: -6,

    update: function () {
        ball.style.left = this.posX + "px";
        ball.style.top = this.posY + "px";
    }
};

// score
let scoreProps = {
    score: 0,

    update: function () {
        return this.score;
    }
};

// lifes
let lifesProps = {
    lifes: 3,

    update: function () {
        return this.lifes;
    }
};

// начальное значение для score
score.innerText = scoreProps.update();

// начальное значение для lifes
lifes.innerText = lifesProps.update();

// начальное значение для paddle
paddleProps.update();

// начальное значение для ball
ballProps.update();

function start() {
    if (!interval) {
        roundMusic.play();
        if (control === 0) {
            /*cursorPosX =*/
            paddleProps.posX = field.offsetWidth / 2 + container.offsetLeft - paddle.offsetWidth / 2;
            paddleProps.update();

            ballProps.posX = paddleProps.posX + paddle.offsetWidth / 2 - ball.offsetWidth / 2;
            ballProps.posY = paddle.offsetTop - ball.offsetHeight;
            ballProps.update();

            ballProps.speedX = randomDiap(-4, 4);
            ballProps.speedY = -6;

            control = 1;

            play.style.display = 'none';
        }

        // interval = requestAnimationFrame(begin);

        interval = setInterval(begin, 1000 / 60);

        document.removeEventListener('keydown', hideStartScreen, false);
        document.addEventListener('keydown', pressed, false);
        document.addEventListener('keyup', unpressed, false);
        paddle.addEventListener('touchstart', touchStart, false);
        // document.addEventListener('mousemove', getMousePosition, false);
    }
}

function begin() {
    if (ballProps.speedX === 0) {
        console.log('переподача!');
        // cancelAnimationFrame(interval);
        clearInterval(interval);
        interval = 0;
        start();
    }

    ballProps.posX += ballProps.speedX;

    // коснулся ли ball paddle
    if (ballProps.posX + (ball.offsetHeight / 2) > paddle.offsetLeft &&
        ballProps.posX + (ball.offsetHeight / 2) < paddle.offsetLeft + paddle.offsetWidth * 0.25 &&
        ballProps.posY + ball.offsetHeight > paddle.offsetTop) {

        ballProps.speedY = -ballProps.speedY;
        ballProps.posY = paddle.offsetTop - ball.offsetHeight;
        // navigator.vibrate([100]);
        // console.log('<0.25 ' + ballProps.speedX);
        ballProps.speedX > 0 ? ballProps.speedX = ballProps.speedX + 2 : ballProps.speedX = ballProps.speedX = ballProps.speedX - 2;
        // console.log('<0.25 ' + ballProps.speedX);
    }

    if (ballProps.posX + (ball.offsetHeight / 2) > paddle.offsetLeft + paddle.offsetWidth * 0.75 &&
        ballProps.posX + (ball.offsetHeight / 2) < paddle.offsetLeft + paddle.offsetWidth &&
        ballProps.posY + ball.offsetHeight > paddle.offsetTop) {

        ballProps.speedY = -ballProps.speedY;
        ballProps.posY = paddle.offsetTop - ball.offsetHeight;
        // navigator.vibrate([100]);
        // ballProps.speedX = -ballProps.speedX;
        // console.log('>0.75 ' + ballProps.speedX);
        ballProps.speedX > 0 ? ballProps.speedX = ballProps.speedX + 2 : ballProps.speedX = ballProps.speedX = ballProps.speedX - 2;
        // console.log('<0.75 ' + ballProps.speedX);
    }

    if (ballProps.posX + (ball.offsetHeight / 2) > paddle.offsetLeft + paddle.offsetWidth * 0.25 &&
        ballProps.posX + (ball.offsetHeight / 2) < paddle.offsetLeft + paddle.offsetWidth * 0.75 &&
        ballProps.posY + ball.offsetHeight > paddle.offsetTop) {

        ballProps.speedY = -ballProps.speedY;
        ballProps.posY = paddle.offsetTop - ball.offsetHeight;
        // navigator.vibrate([100]);
        // ballProps.speedX = -ballProps.speedX;
        // console.log('>0.25 & <0.75 ' + ballProps.speedX);
        if (ballProps.speedX !== 2 && ballProps.speedX !== -2) {
            ballProps.speedX > 0 ? ballProps.speedX = ballProps.speedX - 2 : ballProps.speedX = ballProps.speedX = ballProps.speedX + 2;
        }
        // console.log('>0.25 & <0.75 ' + ballProps.speedX);
    }
    // end

    // вылетел ли мяч правее стены?
    if (ballProps.posX + ball.offsetWidth > field.offsetWidth + container.offsetLeft) {
        ballProps.posX = field.offsetWidth + container.offsetLeft - ball.offsetWidth;
        ballProps.speedX = -ballProps.speedX;
    }

    // вылетел ли мяч левее стены?
    if (ballProps.posX < container.offsetLeft) {
        ballProps.posX = container.offsetLeft;
        ballProps.speedX = -ballProps.speedX;
    }

    ballProps.posY += ballProps.speedY;

    // вылетел ли мяч ниже пола?
    if (ballProps.posY + ball.offsetHeight > container.offsetHeight + container.offsetTop) {
        ballProps.posY = container.offsetHeight + container.offsetTop - ball.offsetHeight;
        // cancelAnimationFrame(interval);
        clearInterval(interval);
        interval = 0;

        control = 0;
        play.style.display = 'block';

        roundMusic.pause();
        roundMusic.currentTime = 0;

        lifesProps.lifes--;
        if (lifesProps.lifes === 0) {
            lifes.innerText = lifesProps.update();
            result.innerText += scoreProps.score;

            records.push(scoreProps.score); // добавление в рекорды
            window.localStorage.setItem('records', JSON.stringify(records));
            console.log(JSON.parse(window.localStorage.getItem('records')));


            endScreen.style.display = 'block';
            endMusic.play();

            setTimeout(() => {
                showRecords();
            }, 3000);
        }
        lifes.innerText = lifesProps.update();
    }

    // вылетел ли мяч выше потолка?
    if (ballProps.posY < field.offsetTop) {
        ballProps.speedY = -ballProps.speedY;
    }

    //столкнулся с кирпичем
    if (ballProps.posY + (ball.offsetHeight / 2) >= brick.offsetLeft) {
        if (ballProps.posY + (ball.offsetHeight / 2) <= brickLast.offsetTop + brickLast.offsetHeight) {
            let row = Math.floor((ballProps.posY - topTabs.offsetHeight - container.offsetTop + (ball.offsetHeight / 2)) / brickHeight);
            let col = Math.floor((ballProps.posX - container.offsetLeft + (ball.offsetHeight / 2)) / brickWidth);

            // console.log('ballProps.posY = ' + ballProps.posY + (ball.offsetHeight / 2), 'ballProps.posX = ' + ballProps.posX + (ball.offsetHeight / 2));
            // console.log('row = ' + row, 'col = ' + col);
            // console.log('brickHeight = ' + brickHeight, 'brickWidth = ' + brickWidth);
            // console.log(bricks[row * 10 + col].className);

            if (!bricks[row * 10 + col].classList.contains('removed')) {
                bricks[row * 10 + col].style.transform = 'scale(1, -1)';
                bricks[row * 10 + col].classList.add('removed');
                scoreProps.score += 100;
                score.innerText = scoreProps.update();
                if (scoreProps.score === 10000) {
                    clearInterval(interval);
                    records.push(scoreProps.score);// добавление в рекорды

                    window.localStorage.setItem('records', JSON.stringify(records));
                    roundMusic.pause();
                    winScreen.style.display = 'block';

                    winMusic.play();
                    console.log(JSON.parse(window.localStorage.getItem('records')));
                    setTimeout(() => {
                        showRecords();
                    }, 3000);

                }
                if (scoreProps.score >= 3300) {
                    ballProps.speedY > 0 ? ballProps.speedY = 9 : ballProps.speedY = -9;
                }
                if (scoreProps.score >= 6600) {
                    ballProps.speedY > 0 ? ballProps.speedY = 11 : ballProps.speedY = -11;
                }
                ballProps.speedY = -ballProps.speedY;
                if (ballProps.speedX < 0 && ((ballProps.posX + (ball.offsetHeight / 2)) % brickWidth < 10 || (ballProps.posX + (ball.offsetHeight / 2)) % brickWidth > 30)) {
                    ballProps.speedX = -ballProps.speedX;
                }
                if (ballProps.speedX > 0 && ((ballProps.posX + (ball.offsetHeight / 2) + brickHeight) % brickWidth < 10 || ((ballProps.posX + (ball.offsetHeight / 2) + brickHeight) % brickWidth > 30))) {
                    ballProps.speedX = -ballProps.speedX;
                }
            }
        }
    }

    ballProps.update();

    //paddle
    /* cursorPosX =*/
    paddleProps.posX += paddleProps.speed;

    //левая стена
    if (paddleProps.posX < container.offsetLeft) {
        /* cursorPosX =*/
        paddleProps.posX = container.offsetLeft;
    }

    //правая стена
    if (paddleProps.posX + paddle.offsetWidth > field.offsetWidth + container.offsetLeft) {
        /*  cursorPosX =*/
        paddleProps.posX = field.offsetWidth + container.offsetLeft - paddle.offsetWidth;
    }

    paddleProps.update();

    // interval = requestAnimationFrame(begin);
}

function hideStartScreen() {
    titleMusic.pause();

    startScreen.style.opacity = 0;
    startScreen.style.display = 'none';
    startScreen.classList.add('hide');
}

function onResize() {
    setTimeout(() => {
        /* cursorPosX =*/
        paddleProps.posX = field.offsetWidth / 2 + container.offsetLeft - paddle.offsetWidth / 2;
        paddleProps.posY = container.offsetTop + container.offsetHeight - paddle.offsetHeight;
        paddleProps.update();

        ballProps.posX = paddleProps.posX + paddle.offsetWidth / 2 - ball.offsetWidth / 2;
        ballProps.posY = paddle.offsetTop - ball.offsetHeight;
        ballProps.update();

        brickHeight = brick.offsetHeight + 2;
        brickWidth = brick.offsetWidth + 2;

        // play.style.top = container.offsetTop + container.offsetHeight / 2 - play.offsetHeight / 2 + 'px';
        // play.style.left = field.offsetWidth / 2 + container.offsetLeft - play.offsetWidth / 2 + 'px';
        // play.style.top = container.offsetTop + container.offsetHeight / 2 - play.offsetHeight / 2 + 'px';
        // play.style.left = container.offsetLeft + container.offsetWidth / 2 - play.offsetWidth / 2 + 'px';
        // play.style.left = field.offsetWidth / 2 + container.offsetLeft - play.offsetWidth / 2 + 'px';
        play.style.top = container.offsetTop + container.offsetHeight / 2 - play.offsetHeight / 2 + 'px';
        play.style.left = container.offsetLeft + container.offsetWidth / 2 - play.offsetWidth / 2 + 'px';
        // leftArrow.style.top = container.offsetHeight - container.offsetHeight / 4 + 'px';
        // leftArrow.style.left = 40 + 'px';
        //
        // rightArrow.style.top = container.offsetHeight - container.offsetHeight / 4 + 'px';
        // rightArrow.style.right = document.getElementById('right').offsetWidth + 40 + 'px';
    }, 200);
}

function pressed(EO) {
    EO = EO || window.event;

    let code = EO.keyCode;

    if (code === 37) {
        paddle.style.background = 'linear-gradient(to bottom, rgba(164, 164, 164, 0.83) 0%, #72950e 100%)';
        paddleProps.speed = -6;
    }

    if (code === 39) {
        paddleProps.speed = 6;
        paddle.style.background = 'linear-gradient(to bottom, rgba(164, 164, 164, 0.83) 0%, #72950e 100%)';
    }

}

function unpressed() {
    paddleProps.speed = 0;
    paddle.style.background = 'linear-gradient(to bottom, rgba(164, 164, 164, 0.83) 0%, #348bb1 100%)';
}

function touchStart(EO) {
    // alert('touchstart');
    EO = EO || window.event;
    EO.preventDefault();
    paddle.style.background = 'linear-gradient(to bottom, rgba(164, 164, 164, 0.83) 0%, #72950e 100%)';
    touchobj = EO.changedTouches[0]; // первая точка прикосновения
    touchPosX = parseInt(touchobj.clientX); // положение точки касания по x, относительно левого края браузера
    console.log(touchPosX + " touchPosX");

    paddle.addEventListener('touchmove', touchMove, false);
    paddle.addEventListener('touchend', touchEnd, false);
}

function touchMove(EO) {
    // alert('touchmove');
    EO = EO || window.event;
    EO.preventDefault();
    touchobj = EO.changedTouches[0];
    let fingerPosX = parseInt(touchobj.clientX);
    dist = fingerPosX - touchPosX;
    touchPosX = fingerPosX;
    console.log(dist + ' dist');
    paddleProps.posX += dist;
    dist = 0;
    paddle.style.left = paddleProps.posX + 'px';
}

function touchEnd() {
    paddle.style.background = 'linear-gradient(to bottom, #cdd 0%, #777 100%)';
}

function soundOff() {
    let audioElems = document.getElementsByTagName('audio');
    for (let i = 0; i < audioElems.length; i++) {
        if (!audioElems[i].classList.contains('mute')) {
            audioElems[i].classList.add('mute');
            sound.classList.add('mute');
            audioElems[i].volume = 0.0;
            document.getElementById('speaker').setAttribute('src', 'img/mute.svg');
        } else {
            audioElems[i].classList.remove('mute');
            audioElems[i].volume = 1.0;
            document.getElementById('speaker').setAttribute('src', 'img/speaker.svg');
        }
    }
}

function pauseGame() {
    if (interval !== 0) {
        control = 1;
        if (!pause.classList.contains('pause')) {
            pause.classList.add('pause');
            clearInterval(interval);
            roundMusic.pause();
            document.getElementById('pause').setAttribute('src', 'img/play.svg');
        } else {
            pause.classList.remove('pause');
            interval = setInterval(begin, 1000 / 60);
            roundMusic.play();
            control = 0;
            document.getElementById('pause').setAttribute('src', 'img/pause.svg');
        }
    }
}

function showRecords() {
    pauseGame();

    recordsScreen.innerHTML = '';

    let span = document.createElement('span');
    span.innerText = 'Records:';
    recordsScreen.appendChild(span);

    records = records.sort(function (a, b) {
        return b - a
    });

    for (let i = 0; i < records.length; i++) {
        let p = document.createElement('p');
        p.innerHTML = i + 1 + '. ' + records[i];
        recordsScreen.appendChild(p);
        if (i > 10) break;
    }

    let cancel = document.createElement('img');
    cancel.src = 'img/cancel.svg';
    cancel.id = 'cancel';
    cancel.onclick = () => {
        recordsScreen.style.display = 'none';
    };
    recordsScreen.appendChild(cancel);

    recordsScreen.style.display = 'block';
}

// function getMousePosition(EO) {
//     cursorPosX = paddleProps.posX;
//     if (EO.pageX > field.offsetLeft + field.offsetWidth - paddle.offsetWidth) {
//         paddleProps.posX = cursorPosX = field.offsetLeft + field.offsetWidth - paddle.offsetWidth;
//     } else if (EO.pageX <= field.offsetLeft) {
//         paddleProps.posX = cursorPosX = field.offsetLeft;
//     } else {
//         paddleProps.posX = cursorPosX = EO.pageX;
//     }
//
//     paddle.style.left = cursorPosX + 'px';
// }

function randomDiap(n, m) {
    return Math.floor(Math.random() * (m - n + 1)) + n;
}
