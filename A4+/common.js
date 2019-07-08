"use strict";

let userStr = prompt("Введите фразу на проверку на палиндром");

alert(`${userStr} ${checkPalindrom(userStr.toLowerCase().replace(/[^а-яё]/g, '')).replace('ё', 'е').replace('ъ', 'ь') ? ' - является палиндромом' : ' - не является палиндромом'}`);

function checkPalindrom(str) {
    if ((str.charAt(0) !== str.charAt(str.length - 1)) || str.length === 0) {
        return false;

    } else {
        let _str_ = str.slice(1, str.length - 1);
        if (_str_.length > 0) {
            return checkPalindrom(_str_);
        } else {
            return true;
        }
    }
}