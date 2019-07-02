let str = prompt("Введите строку");

alert(deleteSpaces(str));

function deleteSpaces(str) {
    let newStr = str;

    while (newStr.charCodeAt(0) === 32) {
        newStr = newStr.slice(1);
    }

    while (newStr.charCodeAt(newStr.length - 1) === 32) {
        newStr = newStr.slice(0, -1);
    }

    return newStr;
}

