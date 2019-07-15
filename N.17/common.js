let userStr = prompt("Ввведите строку для подсчета гласных букв");


alert(`Кол-во гласных букв в "${userStr}" через ForEach равно ${countLettersFoEach(userStr)}`);

alert(`Кол-во гласных букв в "${userStr}" через Filter равно ${countLettersFilter(userStr)}`);

alert(`Кол-во гласных букв в "${userStr}" через Reduce равно ${countLettersReduce(userStr)}`);

//====================================ForEach==========================================================================
function countLettersFoEach(str) {
    let letters = {
        "а": 0, "е": 0, "ё": 0, "и": 0, "о": 0,
        "ы": 0, "у": 0, "э": 0, "ю": 0, "я": 0
    };

    let count = 0;

    str = str.toLowerCase();

    str.split('').forEach(countForEach);


    function countForEach(v) {
        if (v in letters) {
            count++;
        }
    }

    return count;
}

//===================================Filter============================================================================
function countLettersFilter(str) {
    let letters = {
        "а": 0, "е": 0, "ё": 0, "и": 0, "о": 0,
        "ы": 0, "у": 0, "э": 0, "ю": 0, "я": 0
    };

    str = str.toLowerCase();

    let arrayLetters = str.split('').filter(countFilter);

    function countFilter(v) {
        return v in letters;
    }

    return arrayLetters.length;
}

//=================================Reduce==============================================================================
function countLettersReduce(str) {
    let letters = {
        "а": 0, "е": 0, "ё": 0, "и": 0, "о": 0,
        "ы": 0, "у": 0, "э": 0, "ю": 0, "я": 0
    };

    str = str.toLowerCase();

    let result = str.split('').reduce(countReduce, 0);

    function countReduce(r, v) {
        if (v in letters) {
            r++;
        }
        return r;
    }

    return result;
}