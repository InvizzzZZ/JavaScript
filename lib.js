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

// Итак, синтаксис ООП в прототипном стиле в общем виде (пока без наследования):
//
// function ИмяРодитКласса() {
//     this.свойство1=значение1;
// }
//
// ИмяРодитКласса.prototype.метод1=function() {
// ...this.свойство1... // обращаемся к своим свойствам через this
// ...this.метод1()... // вызываем свои методы через this
// }
//
// Синтаксис ООП-наследования в прототипном стиле:
//
//     function ИмяУнаследКласса() {
//         ИмяРодитКласса.call(this); // явно вызываем конструктор родителя
//         // чтобы в этом this появились все свойства и методы родителя
//
//         this.свойство2=значение2;
//     }
// // наследуемся
// ИмяУнаследКласса.prototype=Object.create(ИмяРодитКласса.prototype);
// ИмяУнаследКласса.prototype.constructor=ИмяУнаследКласса; // рекомендуется
//
// ИмяУнаследКласса.prototype.метод2=function() {
// ...this.свойство2... // обращаемся к своим свойствам через this
// ...this.метод2()... // вызываем свои методы через this
// ...this.свойство1... // обращаемся к свойствам родителя через this
// ...this.метод1()... // вызываем методы родителя через this
// }

// получение координат элемента относительно верхнего левого угла страницы
function getElementPos(elem) {
    var bbox=elem.getBoundingClientRect();
    return {
        left: bbox.left+window.pageXOffset,
        top: bbox.top+window.pageYOffset
    };
}

// то же, кроссбраузерный вариант (в т.ч. для IE8-)
function getElementPos(elem) {
    var bbox=elem.getBoundingClientRect();

    var body=document.body;
    var docEl=document.documentElement;

    var scrollTop=window.pageYOffset||docEl.scrollTop||body.scrollTop;
    var scrollLeft=window.pageXOffset||docEl.scrollLeft||body.scrollLeft;

    var clientTop=docEl.clientTop||body.clientTop||0;
    var clientLeft=docEl.clientLeft||body.clientLeft||0;

    var top=bbox.top+scrollTop-clientTop;
    var left=bbox.left+scrollLeft-clientLeft;

    return {
        left: left,
        top: top
    };
}

//Получить или изменить состояние чекбокса (птички) можно так:
    var isChecked=элемент.checked; // получаем состояние checkbox
элемент.checked=false; // устанавливаем новое состояние checkbox

//форматирует переданную дату-время в формате дд.мм.гггг чч:мм:сс
function formatDateTime(dt) {
    var hours = dt.getHours();
    var minutes = dt.getMinutes();
    var seconds = dt.getSeconds();
    return str0l(hours, 2) + ':' + str0l(minutes, 2) + ':' + str0l(seconds, 2);
}

//дополняет строку val слева нулями до длины Len
function str0l(val, len) {
    var strVal = val.toString();
    while (strVal.length < len)
        strVal = '0' + strVal;
    return strVal;
}

