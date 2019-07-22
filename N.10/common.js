/*
Доработать проект MOOD (слайды N.10) так, чтобы цвета не повторялись.
Для контроля повторения цветов использовать хэш.
 */

"use strict";

mood(3);

function mood(colorsCount) {
    var colors = ['', 'красный', 'оранжевый', 'жёлтый', 'зелёный', 'голубой', 'синий', 'фиолетовый'];
    let colorsHash = {};

    console.log('цветов: ' + colorsCount);

    for (var i = 1; i <= 7; i++) {

        var n = randomDiap(1, 7);
        var colorName = colors[n];

        if (!(colorName in colorsHash)) {
            colorsHash[colorName] = true;
        } else {
            i--; //чтобы избежать ситуации, когда цикл for закончится из-за i >= 8,
        }        // а в хэше еще нет 3-х эелемнтов

        if (countElements(colorsHash) >= colorsCount) {

            for (let color in colorsHash) {
                console.log(color);
            }

            break;
        }
    }
}

function randomDiap(n, m) {
    return Math.floor(Math.random() * (m - n + 1)) + n;
}

function countElements(hash) { //подсчет эелементов в хэше
    let count = 0;

    for (let el in hash) {
        count++;
    }
    return count;
}