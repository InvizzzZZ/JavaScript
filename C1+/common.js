'use strict';
//номера месяцев принимаются в общепринятом формате, т.е. январь 1, а не 0.

let year = prompt("Введите год");
let month = prompt("Введите номер месяца. Январь - 1, февраль - 2 и т.п.");

alert(getLastDate(year, month));


function getLastDate(year, month){
    let date = new Date(Number(year), Number(month), 0);

    return date.getDate();
}


