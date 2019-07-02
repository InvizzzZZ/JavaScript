let str = prompt("Введите строку");

alert(deleteSpaces(str));

function deleteSpaces(str) {
    let newStr = str;
    let beginSlice = 0;
    let endSlice = newStr.length - 1;

    while (newStr.charAt(beginSlice) === ' ') {
        beginSlice++;
    }

    while (newStr.charAt(endSlice) === ' ') {
        endSlice--;
    }

    return newStr.slice(beginSlice, endSlice + 1);
}

