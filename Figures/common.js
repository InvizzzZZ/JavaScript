let buttonDraw = document.createElement('play');
buttonDraw.innerText = 'Нарисовать фигуры';
buttonDraw.style.display = 'block';
buttonDraw.style.margin = '10px';
buttonDraw.setAttribute('onclick', 'draw()');
document.body.appendChild(buttonDraw);

let buttonTop = document.createElement('play');
buttonTop.innerText = 'Сверху';
buttonTop.style.display = 'inline-block';
buttonTop.style.margin = '10px';
buttonTop.setAttribute('onclick', 'setTop()');
document.body.appendChild(buttonTop);

let buttonRight = document.createElement('play');
buttonRight.innerText = 'Справа';
buttonRight.style.display = 'inline-block';
buttonRight.style.margin = '10px';
buttonRight.setAttribute('onclick', 'setRight()');
document.body.appendChild(buttonRight);

let buttonBottom = document.createElement('play');
buttonBottom.innerText = 'Снизу';
buttonBottom.style.display = 'inline-block';
buttonBottom.style.margin = '10px';
buttonBottom.setAttribute('onclick', 'setBottom()');
document.body.appendChild(buttonBottom);

let buttonLeft = document.createElement('play');
buttonLeft.innerText = 'Слева';
buttonLeft.style.display = 'inline-block';
buttonLeft.style.margin = '10px';
buttonLeft.setAttribute('onclick', 'setLeft()');
document.body.appendChild(buttonLeft);

let buttonGO = document.createElement('play');
buttonGO.innerText = 'Побежали';
buttonGO.style.display = 'block';
buttonGO.style.margin = '10px';
buttonGO.setAttribute('onclick', 'GO()');
document.body.appendChild(buttonGO);

var divRed;
var divGreen;

function draw() {
    divGreen = document.createElement('div');
    divGreen.style.width = '100px';
    divGreen.style.height = '100px';
    divGreen.style.backgroundColor = 'green';
    divGreen.style.display = 'inline-block';
    divGreen.style.position = 'absolute';
    divGreen.style.top = '200px';
    divGreen.style.left = '200px';
    document.body.appendChild(divGreen);

    divRed = document.createElement('div');
    divRed.style.width = '40px';
    divRed.style.height = '40px';
    divRed.style.backgroundColor = 'red';
    divRed.style.display = 'inline-block';
    divRed.style.position = 'absolute';
    document.body.appendChild(divRed);


}

function setTop() {
    divRed.style.top = divGreen.offsetTop - divRed.offsetHeight + 'px';
    divRed.style.left = divGreen.offsetLeft + divGreen.offsetWidth/2 - divRed.offsetWidth/2 + 'px';
}

function setRight() {
    divRed.style.top = divGreen.offsetTop + divGreen.offsetHeight/2 - divRed.offsetHeight/2 + 'px';
    divRed.style.left = divGreen.offsetLeft + divGreen.offsetWidth + 'px';
}

function setBottom() {
    divRed.style.top = divGreen.offsetTop + divGreen.offsetHeight + 'px';
    divRed.style.left = divGreen.offsetLeft + divGreen.offsetWidth/2 - divRed.offsetWidth/2 + 'px';
}

function setLeft() {
    divRed.style.top = divGreen.offsetTop + divGreen.offsetHeight/2 - divRed.offsetHeight/2 + 'px';
    divRed.style.left = divGreen.offsetLeft - divRed.offsetWidth + 'px';
}


