/*
С2+
Напишите функцию deepCopy для глубокого копирования переданного ей значения.
Функция должна получать число, строку, хэш или массив и возвращать его копию,
включая все подхэши, подмассивы и т.д.
 */
'use strict';

var h1={ a:5, b:{b1:6,b2:7}, c:[33,22], d:null, e:undefined, f:Number.NaN };
var h2=deepCopy(h1);

console.log(`
            var h1={ a:5, b:{b1:6,b2:7}, c:[33,22], d:null, e:undefined, f:Number.NaN };
            var h2=deepCopy(h1);
            ${h1===h2} - h1===h2 будет false
            ${h1.a===h2.a} - h1.a===h2.a будет true
            ${h1.b===h2.b} - h1.b===h2.b будет false
            ${h1.b.b1===h2.b.b1} - h1.b.b1===h2.b.b1 будет true
            ${h1.c===h2.c} - h1.c===h2.c будет false
            ${h1.c[0]===h2.c[0]} - h1.c[0]===h2.c[0] будет true
            ${h1.d===h2.d} - h1.d===h2.d будет true
            ${h1.e===h2.e} - h1.e===h2.e будет true
            ${isNaN(h2.f)} - isNaN(h2.f) будет true
            ${h2.c instanceof Array} - h2.c instanceof Array будет true`
);

console.log('=============================================================================');

var a1 = [5, {b1: 6, b2: 7}, [33, 22], null, undefined, Number.NaN];
var a2 = deepCopy(a1);


console.log(`
            var a1=[ 5, {b1:6,b2:7}, [33,22], null, undefined, Number.NaN];
            var a2=deepCopy(a1);
            ${a1===a2} - a1===a2 будет false
            ${typeof(a2)===typeof(a1)} - typeof(a2)===typeof(a1) будет true
            ${a1[0]===a2[0]} - a1[0]===a2[0] будет true
            ${a1[1]===a2[1]} - a1[1]===a2[1] будет false
            ${a1[1].b1===a2[1].b1} - a1[1].b1===a2[1].b1 будет true
            ${a1[2]===a2[2]} - a1[2]===a2[2] будет false
            ${a1[2][0]===a2[2][0]} - a1[2][0]===a2[2][0] будет true
            ${a1[3]===a2[3]} - a1[3]===a2[3] будет true
            ${a1[4]===a2[4]} - a1[4]===a2[4] будет true
            ${isNaN(a2[5])} - isNaN(a2[5]) будет true
            ${a2[2] instanceof Array} - a2[2] instanceof Array будет true`
);

console.log('=============================================================================');

var v1="sss";
var v2=deepCopy(v1);

console.log(`
            var v1="sss";
            var v2=deepCopy(v1);
            ${typeof(v2)===typeof(v1)} - typeof(v2)===typeof(v1) будет true
            ${v1===v2} - v1===v2 будет true`
);

console.log('=============================================================================');

var z1=null;
var z2=deepCopy(z1);

console.log(`
            var z1=null;
            var z2=deepCopy(z1);
            ${typeof(z2)===typeof(z1)} - typeof(z2)===typeof(z1) будет true
            ${z1===z2} - z1===z2 будет true`
);

console.log('=============================================================================');

var n1=Number.NaN;
var n2=deepCopy(n1);

console.log(`
            var n1=Number.NaN;
            var n2=deepCopy(n1);
            ${typeof(n2)===typeof(n1)} - typeof(n2)===typeof(n1) будет true
            ${isNaN(n2)} - isNaN(n2) будет true`
           );

console.log('=============================================================================');


//---------------------------------------------------------------------

function deepCopy(param) {
    let result = 0;

    if (Array.isArray(param)) {  //массив
        result = [];

        for (let i = 0; i < param.length; i++) {
            result[i] = checkType(param[i]);
        }

        return result;
    }

    if (typeof param === 'object') { //хэш
        result = {};

        for (let elem in param) {
            result[elem] = checkType(param[elem]);
        }

        return result;
    }

    return param;

    //проверка на тип, если примитивный тип, то вернуть значение, если массив или хэш, то рекурсия
    function checkType(el) {
        let result_ = 0;

        if (typeof el === 'string') {
            result_ = el;
            return result_;
        }

        if (typeof el === 'number') {
            result_ = el;
            return result_;
        }

        if (typeof el === 'boolean') {
            result_ = el;
            return result_;
        }

        if (el === null) {
            result_ = null;
            return result_;
        }

        if (typeof el === 'undefined') {
            result_ = undefined;
            return result_;
        }

        return deepCopy(el);
    }
}