    let str = prompt("Введите строку");

    alert(deleteSpaces(str));

    function deleteSpaces(str) {
        let newStr = str;
        let beginSlice = 0;
        let endSlice = newStr.length - 1;

        while (newStr.charAt(beginSlice) === ' ') {
            beginSlice++;
        }

        if (beginSlice - 1 !== endSlice) {
            while (newStr.charAt(endSlice) === ' ') {
                endSlice--;
            }
        }

        if (beginSlice !== 0 || endSlice !== newStr.length - 1) {
            newStr = newStr.slice(beginSlice, endSlice + 1);
        }

        return newStr;
    }

