"use strict";

let userStr = prompt("Введите фразу на проверку на палиндром");

alert(`${userStr} ${checkPalindrom(userStr.toLowerCase().replace(/[^а-яё]/g, '')) ? ' - является палиндромом' : ' - не является палиндромом'}`);

function checkPalindrom(str) {
    if (str.charAt(0) !== str.charAt(str.length - 1)) {
        return false;

    } else {
        if (str.slice(1, str.length - 1).length > 0) {
            return checkPalindrom(str.slice(1, str.length - 1));
        } else {
            return true;
        }
    }
}