/*
B7+
Написать чистую функцию для форматирования числа заданной по форматной строке, например:
console.log( formatNumber(2.3,"# ### ###.##") );
// выдаёт "2.30"
console.log( formatNumber(12345.368,"# ### ###.##") );
// выдаёт "12 345.37"
В форматной строке символ "#":
 - после запятой кодирует обязательную цифру, т.е. после запятой в данном примере должно быть ровно два знака, в любом числе;
 - до запятой кодирует НЕобязательную цифру, т.е. до запятой в данном примере должно быть столько знаков, сколько требуется для отображения целой части числа.

 */
'use strict';

console.log(formatNumber(2.3, "# ### ###.##"));

console.log(formatNumber(12345.368, "# ### ###.##"));

function formatNumber(number, pattern) {

    let arrayPattern = pattern.split('.');

    let decimals = arrayPattern[1].length; //кол-во знаков после запятой   .match(/.{1,3}/g).join(" ")

    //округленная десятичная часть с точкой в виде строки
    let strFraction = Number(number).toFixed(decimals);
    strFraction = strFraction.slice(strFraction.indexOf('.'), strFraction.length);

    //массив с шаблоном для вывода
    arrayPattern = arrayPattern[0].split(' ').reverse();

    let strInteger = Math.floor(number).toString(); // целая часть числа в виде строки
    let strIntegerTmp = '';

    for (let i = 0; i < arrayPattern.length; i++) {
        strIntegerTmp = strInteger.substring(strInteger.length - arrayPattern[i].length) + ' ' + strIntegerTmp;
        strInteger = strInteger.substring(0, strInteger.length - arrayPattern[i].length);
    }

    return strIntegerTmp.trim() + strFraction;
}