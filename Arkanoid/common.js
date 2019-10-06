'use strict';

var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

window.addEventListener('resize', onResize, false);

// setInterval
let interval = 0;
let control = 0;
let cursorPosX = 0;

// visual elements
let container = document.getElementById('container');
let field = document.getElementById('field');
let score_lifes = document.getElementById('topTabs');
let score = document.getElementById('scoreNode');
let lifes = document.getElementById('lifesNode');
let paddle = document.getElementById('paddle');
let ball = document.getElementById('ball');

// begin game
let play = document.getElementById('play');
play.addEventListener('click', start, false);

// sound
let sound = document.getElementById('sound');
sound.addEventListener('click', soundOff, false);

let pause = document.getElementById('pause_resume');
pause.addEventListener('click', pauseGame, false);

// screens
let startScreen = document.getElementById('startScreen');
startScreen.addEventListener('click', hideStartScreen, false);
document.addEventListener('keydown', hideStartScreen, false);
let endScreen = document.getElementById('endScreen');
let winScreen = document.getElementById('winScreen');
let result = document.getElementById('result');

let titleMusic = document.getElementById('titleMusic');
let roundMusic = document.getElementById('roundMusic');
let endMusic = document.getElementById('endMusic');
let winMusic = document.getElementById('winMusic');


window.onload = () => {
    play.style.top = container.offsetHeight / 2 - play.offsetHeight / 2 + 'px';
    play.style.left = container.offsetWidth / 2 + container.offsetLeft - play.offsetWidth / 2 + 'px';
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
    posY: container.offsetTop + container.offsetHeight - paddle.offsetHeight - 5,

    speed: 0,

    update: function () {
        paddle.style.left = this.posX + "px";
        paddle.style.top = this.posY + "px";
        console.error(container.offsetHeight + '   fsdfsd');
        console.error(container.offsetWidth + '   fsdfsd');
    }
};

// ball
let ballProps = {
    posX: paddleProps.posX + paddle.offsetWidth / 2 - ball.offsetWidth / 2,
    posY: container.offsetTop + container.offsetHeight - paddle.offsetHeight - 5 - ball.offsetHeight,

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
            cursorPosX = paddleProps.posX = field.offsetWidth / 2 + container.offsetLeft - paddle.offsetWidth / 2;
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
        document.addEventListener('mousemove', getMousePosition, false);
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
        console.log('<0.25 ' + ballProps.speedX);
        ballProps.speedX > 0 ? ballProps.speedX = ballProps.speedX + 2 : ballProps.speedX = ballProps.speedX = ballProps.speedX - 2;
        console.log('<0.25 ' + ballProps.speedX);
    }

    if (ballProps.posX + (ball.offsetHeight / 2) > paddle.offsetLeft + paddle.offsetWidth * 0.75 &&
        ballProps.posX + (ball.offsetHeight / 2) < paddle.offsetLeft + paddle.offsetWidth &&
        ballProps.posY + ball.offsetHeight > paddle.offsetTop) {

        ballProps.speedY = -ballProps.speedY;
        console.log('>0.75 ' + ballProps.speedX);
        ballProps.speedX > 0 ? ballProps.speedX = ballProps.speedX + 2 : ballProps.speedX = ballProps.speedX = ballProps.speedX - 2;
        console.log('<0.75 ' + ballProps.speedX);
    }

    if (ballProps.posX + (ball.offsetHeight / 2) > paddle.offsetLeft + paddle.offsetWidth * 0.25 &&
        ballProps.posX + (ball.offsetHeight / 2) < paddle.offsetLeft + paddle.offsetWidth * 0.75 &&
        ballProps.posY + ball.offsetHeight > paddle.offsetTop) {

        ballProps.speedY = -ballProps.speedY;
        console.log('>0.25 & <0.75 ' + ballProps.speedX);
        if (ballProps.speedX !== 2 && ballProps.speedX !== -2) {
            ballProps.speedX > 0 ? ballProps.speedX = ballProps.speedX - 2 : ballProps.speedX = ballProps.speedX = ballProps.speedX + 2;
        }
        console.log('>0.25 & <0.75 ' + ballProps.speedX);
    }
    // end

    // вылетел ли мяч правее стены?
    if (ballProps.posX + ball.offsetWidth > field.offsetWidth + container.offsetLeft) {
        ballProps.speedX = -ballProps.speedX;
    }

    // вылетел ли мяч левее стены?
    if (ballProps.posX < container.offsetLeft) {
        ballProps.speedX = -ballProps.speedX;
    }

    ballProps.posY += ballProps.speedY;

    // вылетел ли мяч ниже пола?
    if (ballProps.posY + ball.offsetHeight > container.offsetHeight) {
        ballProps.posY = container.offsetHeight - ball.offsetHeight;
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
            endScreen.style.display = 'block';
            endMusic.play();
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
            let row = Math.floor((ballProps.posY - score_lifes.offsetHeight + (ball.offsetHeight / 2)) / brickHeight);
            let col = Math.floor((ballProps.posX - container.offsetLeft + (ball.offsetHeight / 2)) / brickWidth);

            console.log('ballProps.posY = ' + ballProps.posY + (ball.offsetHeight / 2), 'ballProps.posX = ' + ballProps.posX + (ball.offsetHeight / 2));
            console.log('row = ' + row, 'col = ' + col);
            console.log('brickHeight = ' + brickHeight, 'brickWidth = ' + brickWidth);
            console.log(bricks[row * 10 + col].className);

            if (!bricks[row * 10 + col].classList.contains('removed')) {
                bricks[row * 10 + col].style.transform = 'scale(1, -1)';
                bricks[row * 10 + col].classList.add('removed');
                scoreProps.score += 100;
                score.innerText = scoreProps.update();
                if (scoreProps.score === 200) {
                    clearInterval(interval);
                    roundMusic.pause();
                    winScreen.style.display = 'block';
                    winMusic.play();

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
    cursorPosX = paddleProps.posX += paddleProps.speed;

    //левая стена
    if (paddleProps.posX < container.offsetLeft) {
        cursorPosX = paddleProps.posX = container.offsetLeft;
    }

    //правая стена
    if (paddleProps.posX + paddle.offsetWidth > field.offsetWidth + container.offsetLeft) {
        cursorPosX = paddleProps.posX = field.offsetWidth + container.offsetLeft - paddle.offsetWidth;
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
        cursorPosX = paddleProps.posX = field.offsetWidth / 2 + container.offsetLeft - paddle.offsetWidth / 2;
        paddleProps.update();

        ballProps.posX = paddleProps.posX + paddle.offsetWidth / 2 - ball.offsetWidth / 2;
        ballProps.posY = paddle.offsetTop - ball.offsetHeight;
        ballProps.update();

        brickHeight = brick.offsetHeight + 2;
        brickWidth = brick.offsetWidth + 2;

        play.style.top = container.offsetHeight / 2 - play.offsetHeight / 2 + 'px';
        play.style.left = container.offsetWidth / 2 + container.offsetLeft - play.offsetWidth / 2 + 'px';
    }, 200);
}

function pressed(EO) {
    EO = EO || window.event;

    let code = EO.keyCode;

    if (code === 37) {
        paddleProps.speed = -6;
    }

    if (code === 39) {
        paddleProps.speed = 6;
    }

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

function unpressed() {
    paddleProps.speed = 0;
}

function getMousePosition(EO) {
    cursorPosX = paddleProps.posX;
    if (EO.pageX > field.offsetLeft + field.offsetWidth - paddle.offsetWidth) {
        paddleProps.posX = cursorPosX = field.offsetLeft + field.offsetWidth - paddle.offsetWidth;
    } else if (EO.pageX <= field.offsetLeft) {
        paddleProps.posX = cursorPosX = field.offsetLeft;
    } else {
        paddleProps.posX = cursorPosX = EO.pageX;
    }

    paddle.style.left = cursorPosX + 'px';
}

function randomDiap(n, m) {
    return Math.floor(Math.random() * (m - n + 1)) + n;
}
