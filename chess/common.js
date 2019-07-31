'use strict';

var chessboard = [0, 0, 0, 0, 0, 0, 0, 0];
var solutions = [];
var index = 0;

do {
    if (checking()) {
        if (index === 7) {
            var tmp = [];
            for (let i = 0; i < 8; i++) {
                tmp.push(chessboard[i]);
            }
            solutions.push(tmp);
            chessboard[index]++;
        } else {
            index++;
        }
    } else {
        chessboard[index]++;
    }
} while (chessboard[0] < 8);

let p = document.getElementById('sol');
p.innerText = 'Найдено ' + solutions.length + ' решения';

function f() {
    var n = +prompt('Введите номер решения');
    return show(solutions[n]);
}

function checking() {
    if (index === 0) {
        return true;
    }

    if (chessboard[index] > 7) {
        chessboard[index] = 0;
        index--;
        return false;
    }

    for (let i = 0; i < index; i++) {
        if ((chessboard[index] === chessboard[i]) || ((Math.abs(chessboard[index] - chessboard[i])) === (index - i))) {
            return false;
        }
    }

    return true;
}

function show(arr) {
    let divBoard = document.createElement('div');
    divBoard.className = 'board';
    document.body.appendChild(divBoard);

    for (let row = 0; row < arr.length; row++) {
        for (let column = 0; column < arr.length; column++) {
            let tmp = document.createElement('div');
            tmp.className = 'cell ' + ((row + column) % 2 ? 'black' : 'white');
            tmp.innerHTML = arr[column] === row ? "&#9819;" : " ";
            divBoard.appendChild(tmp);
        }
        let br = document.createElement('br');
        divBoard.appendChild(br);
    }
}