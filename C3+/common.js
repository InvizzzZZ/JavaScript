/*
С3+
Напишите функцию deepComp для глубокого сравнения переданных ей значений.
Значения могут быть числами, строками, хэшами, массивами, в т.ч. любого уровня вложения.
Учтите, что цикл for..in не гарантирует перебора ключей хэша в каком-либо порядке.
*/
var H1 = {a: 5, b: {b1: 6, b2: 7}};
var H2 = {b: {b1: 6, b2: 7}, a: 5};
var H3 = {a: 5, b: {b1: 6}};
var H4 = {a: 5, b: {b1: 66, b2: 7}};
var H5 = {a: 5, b: {b1: 6, b2: 7, b3: 8}};
var H6 = {a: null, b: undefined, c: Number.NaN};
var H7 = {c: Number.NaN, b: undefined, a: null};
var H8 = {a: 5, b: 6};
var H9 = {c: 5, d: 6};
var H10 = {a: 5};
var A1 = [5, 7];
var A2 = [5, 5, 7];
var A3 = [5, 8, 7];

if (deepComp(H1, H2)) {
    console.log('тест 1 пройден')
} else {
    console.log('ТЕСТ 1 НЕ ПРОЙДЕН')
}
if (!deepComp(H1, H3)) {
    console.log('тест 2 пройден')
} else {
    console.log('ТЕСТ 2 НЕ ПРОЙДЕН')
}
if (!deepComp(H1, H4)) {
    console.log('тест 3 пройден')
} else {
    console.log('ТЕСТ 3 НЕ ПРОЙДЕН')
}
if (!deepComp(H1, H5)) {
    console.log('тест 4 пройден')
} else {
    console.log('ТЕСТ 4 НЕ ПРОЙДЕН')
}
if (deepComp(H6, H7)) {
    console.log('тест 5 пройден')
} else {
    console.log('ТЕСТ 5 НЕ ПРОЙДЕН')
}
if (!deepComp(H8, H9)) {
    console.log('тест 6 пройден')
} else {
    console.log('ТЕСТ 6 НЕ ПРОЙДЕН')
}
if (!deepComp(H8, H10)) {
    console.log('тест 7 пройден')
} else {
    console.log('ТЕСТ 7 НЕ ПРОЙДЕН')
}
if (!deepComp(null, H10)) {
    console.log('тест 8 пройден')
} else {
    console.log('ТЕСТ 8 НЕ ПРОЙДЕН')
}
if (!deepComp(H10, null)) {
    console.log('тест 9 пройден')
} else {
    console.log('ТЕСТ 9 НЕ ПРОЙДЕН')
}
if (deepComp(null, null)) {
    console.log('тест 10 пройден')
} else {
    console.log('ТЕСТ 10 НЕ ПРОЙДЕН')
}
if (!deepComp(null, undefined)) {
    console.log('тест 11 пройден')
} else {
    console.log('ТЕСТ 11 НЕ ПРОЙДЕН')
}
if (!deepComp(5, "5")) {
    console.log('тест 12 пройден')
} else {
    console.log('ТЕСТ 12 НЕ ПРОЙДЕН')
}
if (!deepComp(5, H1)) {
    console.log('тест 13 пройден')
} else {
    console.log('ТЕСТ 13 НЕ ПРОЙДЕН')
}
if (!deepComp(A1, H1)) {
    console.log('тест 14 пройден')
} else {
    console.log('ТЕСТ 14 НЕ ПРОЙДЕН')
}
if (!deepComp(A2, A3)) {
    console.log('тест 15 пройден')
} else {
    console.log('ТЕСТ 15 НЕ ПРОЙДЕН')
}

function deepComp(par1, par2) { //если разные типы, то сразу false
    if (typeof par1 !== typeof par2) {
        return false;
    }

    if (typeof par1 !== 'object') {//если примитивные типы, то строгое сравнение
        if (isNaN(par1) && isNaN(par2)) {
            return true;
        }
        return par1 === par2;
    }

    if (par1 === null || par2 === null) {
        return par1 === par2;
    }

    if (Array.isArray(par1)) {//если массив, то перебор элементов и рекурсия
        if (par1.length !== par2.length) {//не совпадают размеры массивов => false
            return false;
        }
        for (let i = 0; i < par1.length; i++) {
            if (!(deepComp(par1[i], par2[i]))) {
                return false;
            }
        }
        return true;
    } else {//значит хэш
        // let keysPar1 = Object.keys(par1);//массив ключей первого параметра
        // let keysPar2 = Object.keys(par2);//массив ключей второго параметра
        //
        // if (keysPar1.length !== keysPar2.length) {//не совпадает кол-во ключей в хэшах => false
        //     return false;
        // }
        //
        // keysPar1 = keysPar1.sort();//сортированный массив ключей первого параметра
        // keysPar2 = keysPar2.sort();//сортированный массив ключей второго параметра
        //
        // for (let i = 0; i < keysPar1.length; i++) {
        //     if (keysPar1[i] !== keysPar2[i]) { //не совпадают ключи => false
        //         return false;
        //     }
        //     let ElPar1 = par1[keysPar1[i]];
        //     let ElPar2 = par2[keysPar2[i]];
        //
        //     if (!(deepComp(ElPar1, ElPar2))) {
        //         return false;
        //     }
        // }
        // return true;
        if (Object.keys(par1).length !== Object.keys(par2).length) {
            return false;
        }
        for (let key in par1) {
            if (key in par2) {
                if(!deepComp(par1[key], par2[key])){
                    return false;
                }
            } else {
                return false;
            }
        }
        return true;
    }
}