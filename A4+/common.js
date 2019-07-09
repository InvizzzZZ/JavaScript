"use strict";

let userStr = prompt("Введите фразу на проверку на палиндром");

alert(`${userStr} ${checkPalindrome(userStr) ? ' - является палиндромом' : ' - не является палиндромом'}`);

function checkPalindrome(str) {
    str.toLowerCase().replace(/[^а-яё]/g, '')
                     .replace('ё', 'е')
                     .replace('ъ', 'ь');

    return isPalindrome(str);

    function isPalindrome(updateStr) {
        if (updateStr.charAt(0) !== updateStr.charAt(updateStr.length - 1)) {
            return false;

        } else {
            let _str_ = updateStr.slice(1, updateStr.length - 1);
            if (_str_.length > 0) {
                return isPalindrome(_str_);
            } else {
                return true;
            }
        }
    }
}