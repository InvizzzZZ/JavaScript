'use strict';

let keyboard = document.createElement('div');
keyboard.classList.add('keyboard');
document.body.appendChild(keyboard);

let map_row1 = new Map([
    ['192', '~'],
    ['49', '1'],
    ['50', '2'],
    ['51', '3'],
    ['52', '4'],
    ['53', '5'],
    ['54', '6'],
    ['55', '7'],
    ['56', '8'],
    ['57', '9'],
    ['48', '0'],
    ['189', '-'],
    ['187', '='],
    ['8', 'Backspace']
]);

let row1 = document.createElement('div');
row1.classList.add('row');
keyboard.appendChild(row1);

for (let [name, value] of map_row1) {
    let key = document.createElement('div');
    key.classList.add('key');
    key.id = name;
    key.innerHTML = value;
    row1.appendChild(key);
}

document.getElementById('8').style.width = 100 + 'px';

let map_row2 = new Map([
    ['9', 'Tab'],
    ['81', 'Q'],
    ['87', 'W'],
    ['69', 'E'],
    ['82', 'R'],
    ['84', 'T'],
    ['89', 'Y'],
    ['85', 'U'],
    ['73', 'I'],
    ['79', 'O'],
    ['80', 'P'],
    ['219', '['],
    ['221', ']']
]);

let row2 = document.createElement('div');
row2.classList.add('row');
keyboard.appendChild(row2);


for (let [name, value] of map_row2) {
    let key = document.createElement('div');
    key.classList.add('key');
    key.id = name;
    key.innerHTML = value;
    row2.appendChild(key);
}

document.getElementById('9').style.width = 100 + 'px';

let map_row3 = new Map([
    ['20', 'CapsLock'],
    ['65', 'A'],
    ['83', 'S'],
    ['68', 'D'],
    ['70', 'F'],
    ['71', 'G'],
    ['72', 'H'],
    ['74', 'J'],
    ['75', 'K'],
    ['76', 'L'],
    ['186', ';'],
    ['222', "'"],
    ['220', '\\']
]);

let row3 = document.createElement('div');
row3.classList.add('row');
keyboard.appendChild(row3);


for (let [name, value] of map_row3) {
    let key = document.createElement('div');
    key.classList.add('key');
    key.id = name;
    key.innerHTML = value;
    row3.appendChild(key);
}

document.getElementById('20').style.width = 100 + 'px';

let map_row4 = new Map([
    ['16', 'Shift'],
    ['226', '<'],
    ['90', 'Z'],
    ['88', 'X'],
    ['67', 'C'],
    ['86', 'V'],
    ['66', 'B'],
    ['78', 'N'],
    ['77', 'M'],
    ['188', ','],
    ['190', '.'],
    ['191', "/"],
    ['16', 'Shift']
]);

let row4 = document.createElement('div');
row4.classList.add('row');
keyboard.appendChild(row4);


for (let [name, value] of map_row4) {
    let key = document.createElement('div');
    key.classList.add('key');
    key.id = name;
    key.innerHTML = value;
    row4.appendChild(key);
}

document.getElementById('16').style.width = 100 + 'px';

let map_row5 = new Map([
    ['17', 'Ctrl'],
    ['91', 'Win'],
    ['18', 'Alt'],
    ['32', ' '],
    ['18', 'Alt'],
    ['37', 'Left'],
    ['39', 'Right'],
    ['38', 'Up'],
    ['40', 'Down']
]);

let row5 = document.createElement('div');
row5.classList.add('row');
keyboard.appendChild(row5);

for (let [name, value] of map_row5) {
    let key = document.createElement('div');
    key.classList.add('key');
    key.id = name;
    key.innerHTML = value;
    row5.appendChild(key);
}

document.getElementById('17').style.width = 100 + 'px';
document.getElementById('32').style.width = 270 + 'px';

document.addEventListener('keydown', pressed, false);
document.addEventListener('keyup', unpressed, false);

function pressed(EO) {
    EO = EO || window.event;
    let code = EO.keyCode;
    if (EO.shiftKey && EO.keyCode) {
        EO.preventDefault();
        let elem = document.getElementById(code);
        let shift = document.getElementById(16);
        elem.classList.add('pressed');
        shift.classList.add('pressed');
    }
    if (EO.ctrlKey && EO.keyCode) {
        EO.preventDefault();
        let elem = document.getElementById(code);
        let ctrl = document.getElementById(17);
        elem.classList.add('pressed');
        ctrl.classList.add('pressed');
    }

    let elem = document.getElementById(code);
    elem.classList.add('pressed');
}

function unpressed(EO) {
    EO = EO || window.event;
    let code = EO.keyCode;
    let elem = document.getElementById(code).classList.remove('pressed');
    let shift = document.getElementById(16).classList.remove('pressed');
    let ctrl = document.getElementById(17).classList.remove('pressed');
    let alt = document.getElementById(18).classList.remove('pressed');
}