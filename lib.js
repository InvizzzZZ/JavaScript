//Если необходимо узнать реальный класс объекта, можно использовать следующую функцию:
function getClassName(obj) {
    if (obj.constructor && obj.constructor.name) {
        return obj.constructor.name;
    }
    var c = Object.prototype.toString.apply(obj);
    return c.substring(8, c.length - 1);
}

// получение целого случайного числа в заданном диапазоне
function randomDiap(n, m) {
    return Math.floor(Math.random() * (m - n + 1)) + n;
}

// округление до произвольного модуля
function roundMod(n, m) {
    return Math.round(n / m) * m;
}

/*
Напишите функцию sum, которая будет работать так:
sum(1)(2) == 3; // 1 + 2
sum(1)(2)(3) == 6; // 1 + 2 + 3
sum(5)(-1)(2) == 6
sum(6)(-1)(-2)(-3) == 0
sum(0)(1)(2)(3)(4)(5) == 15
 */

function sum(a) {

    var currentSum = a;

    function f(b) {
        currentSum += b;
        return f;
    }

    f.toString = function () {
        return currentSum;
    };

    return f;
}