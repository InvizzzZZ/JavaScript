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
