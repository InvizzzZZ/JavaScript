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

    for (var i = 1; i <= colorsCount; i++) {

        var n = randomDiap(1, 7);
        var colorName = colors[n];

        if (!(colorName in colorsHash)) {
            colorsHash[colorName] = true;
            console.log(colorName);
        } else {
            i--; //чтобы избежать ситуации, когда цикл for закончится из-за i > colorsCount ,
        }        // а в хэше еще нет colorsCount эелемнтов

    }
}

function randomDiap(n, m) {
    return Math.floor(Math.random() * (m - n + 1)) + n;
}