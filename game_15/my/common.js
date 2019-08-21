'use strict';

let size = 4;

let board = document.createElement('div');
board.classList.add('board');
board.style.width = 150 * size + 'px';
board.id = 'board';
document.body.appendChild(board);

let x = 1;
let y = 1;

for (let i = 0; i < Math.pow(size, 2); i++) {
    let cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-posX', x);
    cell.setAttribute('data-posY', y);
    cell.addEventListener('click', check, false);

    y++;
    if (y === size + 1) {
        y = 1;
        x++;
    }

    board.appendChild(cell);
}

let numbers = [];
for (let i = 1; i < Math.pow(size, 2); i++) {
    numbers[i] = i;
}

numbers.push('Hole');

let tmpArray = [].concat(numbers);
let solved = tmpArray.some(function (item, i) {
    if (item === 'Hole') {
        item = 0;
    }
    return item > 0 && item - 1 !== i;
});

console.log(solved);

if (!solved) {
    alert('решений нет!')
}


numbers.sort(function () {
    return Math.random() - .5;
});

let elems = board.children;
for (let i = 0; i < elems.length; i++) {
    elems[i].innerHTML = numbers[i];
}

function check(EO) {
    EO = EO || window.event;
    let elem = EO.target;
    let x = elem.getAttribute('data-posX');
    let y = elem.getAttribute('data-posY');

    let checkedElem1 = document.querySelector('[data-posX = "' + (+x - 1) + '"]' + '[data-posY = "' + +y + '"]');
    let checkedElem2 = document.querySelector('[data-posX = "' + (+x + 1) + '"]' + '[data-posY = "' + +y + '"]');
    let checkedElem3 = document.querySelector('[data-posX = "' + +x + '"]' + '[data-posY = "' + (+y + 1) + '"]');
    let checkedElem4 = document.querySelector('[data-posX = "' + +x + '"]' + '[data-posY = "' + (+y - 1) + '"]');

    findHole(checkedElem1);
    findHole(checkedElem2);
    findHole(checkedElem3);
    findHole(checkedElem4);


    function findHole(checkedElem) {
        debugger;
        if (checkedElem) {
            if (checkedElem.textContent === 'Hole') {
                let tmp = 'Hole';
                checkedElem.textContent = elem.textContent;
                elem.textContent = tmp;
            }
        }
    }
}