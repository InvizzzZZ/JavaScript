"use strict";

let userStr = prompt("Введите фразу на проверку на палиндром");

alert(userStr + checkPalindrom(userStr)? ' - является палиндромом' : ' - не является палиндромом');

function checkPalindrom(str) {
    
    str = str.toLowerCase().replace(/[^а-яё]/g, '');

    if (str.charAt(0) !== str.charAt(str.length - 1)) {
        return false;

    } else {
        return checkPalindrom(str.slice(1, str.length - 1));
    }
}