"use strict";

let userStr = prompt("Введите фразу на проверку на палиндром");

alert(userStr + checkPalindrom(userStr));

function checkPalindrom(str, beginStr, endStr) {
    str = str.toLowerCase().replace(/[^а-яё]/g, '');

    beginStr = beginStr || 0;
    endStr = endStr || str.length - 1;

    let result = true;

    if (beginStr < endStr) {
        if (str.charAt(beginStr) === str.charAt(endStr)) {
            checkPalindrom(str, beginStr + 1, endStr - 1);
        } else {
            result = false;
        }
    } else {
        result = false;
    }

    return result ? ' - является палиндромом' : ' - не является палиндромом';
}