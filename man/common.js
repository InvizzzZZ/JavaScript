'use strict';

let container = document.createElement('div');
container.classList.add('container');
document.body.appendChild(container);

let x = 1;
let y = 1;

for (let i = 1; i <= 49; i++) {
    let cell = document.createElement('div');
    cell.classList.add('cell');

    cell.setAttribute('data-posX', x);
    cell.setAttribute('data-posY', y);
    y++;
    if (y === 8) {
        y = 1;
        x++;
    }
    container.appendChild(cell);
}

function createWall(){
    for(let i = 0; i < 15; i++){
        let x = randomDiap(2, 7);
        let y = randomDiap(2, 7);
        let cell = document.querySelector('[data-posX = "' + x + '"]'+'[data-posY = "' + y + '"]');
        cell.classList.add('wall');
        cell.style.backgroundColor = 'red';

    }
}

createWall();

let man = document.createElement('div');
man.id = 'man';
man.innerHTML = '&#9650;';
man.classList.add('man');

document.querySelector('[data-posX = "' + 7 + '"]'+'[data-posY = "' + 1 + '"]').appendChild(man);

document.addEventListener('keydown', checkKey, false);

function checkKey(e) {
    e = e || window.event;

    let elem = document.getElementById('man');
    let parent = elem.parentNode;
    let x = parent.getAttribute('data-posX');
    let y = parent.getAttribute('data-posY');

    if (e.keyCode == '38') {
        // up arrow
        elem.style.transform = 'rotate(0deg)';
        x = +x - 1;
        if ((x >= 1 && x <= 7)&& !document.querySelector('[data-posX = "' + x + '"]'+'[data-posY = "' + y + '"]').classList.contains('wall')) {
            let target = document.querySelector('[data-posX="' + +x + '"][data-posY="' + +y + '"]');
            elem.style.backgroundColor = '#b79834';
            target.appendChild(elem);
        } else {
            elem.style.backgroundColor = 'red';
        }
    } else if (e.keyCode == '40') {
        // down arrow
        elem.style.transform = 'rotate(180deg)';
        x = +x + 1;
        if ((x >= 1 && x <= 7)&& !document.querySelector('[data-posX = "' + x + '"]'+'[data-posY = "' + y + '"]').classList.contains('wall')) {
            let target = document.querySelector('[data-posX="' + +x + '"][data-posY="' + +y + '"]');
            elem.style.backgroundColor = '#b79834';
            target.appendChild(elem);
        } else {
            elem.style.backgroundColor = 'red';
        }
    } else if (e.keyCode == '37') {
        // leftArrow arrow
        elem.style.transform = 'rotate(270deg)';
        y = +y - 1;
        if ((y >= 1 && y <= 7)&& !document.querySelector('[data-posX = "' + x + '"]'+'[data-posY = "' + y + '"]').classList.contains('wall')) {
            let target = document.querySelector('[data-posX="' + +x + '"][data-posY="' + +y + '"]');
            elem.style.backgroundColor = '#b79834';
            target.appendChild(elem);
        } else {
            elem.style.backgroundColor = 'red';
        }
    } else if (e.keyCode == '39') {
        // rightArrow arrow
        elem.style.transform = 'rotate(90deg)';
        y = +y + 1;
        if ((y >= 1 && y <= 7)&& !document.querySelector('[data-posX = "' + x + '"]'+'[data-posY = "' + y + '"]').classList.contains('wall')) {
            let target = document.querySelector('[data-posX="' + +x + '"][data-posY="' + +y + '"]');
            elem.style.backgroundColor = '#b79834';
            target.appendChild(elem);
        } else {
            elem.style.backgroundColor = 'red';
        }
    }

}

function randomDiap(n, m) {
    return Math.floor(Math.random() * (m - n + 1)) + n;
}