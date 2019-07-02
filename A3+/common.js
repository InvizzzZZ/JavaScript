let str = prompt("Введите строку для проверки на палиндром");

if (checkPalindrom(str)) {
    alert(str + " явлется палиндромом");
} else {
    alert(str + " не явлется палиндромом");
}

function checkPalindrom(str) {
    let newStr = str.toLowerCase();
    newStr = newStr.replace(/\s+/g, '');
    newStr = newStr.replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g, '');
    newStr = newStr.replace(/ё/g, 'е');
    newStr = newStr.replace(/ъ/g, 'ь');

    return newStr === newStr.split('').reverse().join('');
}




