// while(true){
//     var expression = prompt("Введите выражение.");
//
//     if (expression.match(/[0-9()\+\.\-\*\//]/g)) {
//         evaluate();
//         break;
//     }
//
//     alert("Вы ввели некорректное выражение");
// }
//
// function evaluate() {
//     let s = document.createElement("script");
//     s.textContent = 'alert(' + expression + ');';
//     document.head.appendChild(s);
// }
//
// let stringExpression = prompt("Введите выражение");

let stringExpression = prompt("Введите выражение");

alert(find(stringExpression));
//----------------------------------------------------------------------------------------------------------------------
// функция выделяет из строки выражения в скобках и вычисляет их, либо при отсуствии скобок сразу вычисляет выражение

function find(str) {
    str = str.replace(/\s/g, '');

    if (!str.match(/^[0-9()\+\/\-\*\.]*$/g)) {
        return "Вы ввели некорректное выражение";
    }

    if(Number(str)){
        return Number(str);
    }

    while (true) {
        var result;
        let begin = str.lastIndexOf('(');
        let end = str.indexOf(')', begin);

        if (begin === -1) {
            result = str.substring(0, str.length);
            result = createArray(result);

            result = calculateArray(result);
            return result;
        }

        result = str.substring(begin + 1, end);
        result = createArray(result);

        result = calculateArray(result);

        str = str.replace(str.substring(begin, end + 1), result.toString());
    }

//----------------------------------------------------------------------------------------------------------------------
//функция создает массив из выражения в скобках

    function createArray(strRoundBrackets) { //создается массив из найденного выражения в скобках
        var arrExpression = [];
        var count = 0;

        while (strRoundBrackets.length > 0) {

            arrExpression[count] = parseFloat(strRoundBrackets);
            strRoundBrackets = strRoundBrackets.replace(arrExpression[count].toString(), '');
            count++;

            if (strRoundBrackets.length > 0) {
                arrExpression[count] = strRoundBrackets.substring(0, 1);
                strRoundBrackets = strRoundBrackets.replace(arrExpression[count], '');
                count++;
            }
        }
        return arrExpression;
    }

//----------------------------------------------------------------------------------------------------------------------
// функция подсчета выражения переданного в массиве

    function calculateArray(arr) {
        var elem = 0;

        var position = findIndex(arr, '*');

        while (position !== -1) {
            elem = arr[position - 1] * arr[position + 1];
            arr.splice(position - 1, 3, elem);

            if(arr.length === 1){
                return arr[0];
            }

            position = findIndex(arr, '*');
        }

        position = findIndex(arr, '/');

        while (position !== -1) {
            elem = arr[position - 1] / arr[position + 1];
            arr.splice(position - 1, 3, elem);

            if(arr.length === 1){
                return arr[0];
            }

            position = findIndex(arr, '*');
        }

        position = findIndex(arr, '+');

        while (position !== -1) {
            elem = arr[position - 1] + arr[position + 1];
            arr.splice(position - 1, 3, elem);

            if(arr.length === 1){
                return arr[0];
            }

            position = findIndex(arr, '+');
        }

        position = findIndex(arr, '-');

        while (position !== -1) {
            elem = arr[position - 1] - arr[position + 1];
            arr.splice(position - 1, 3, elem);

            if(arr.length === 1){
                return arr[0];
            }

            position = findIndex(arr, '-');
        }
    }

//----------------------------------------------------------------------------------------------------------------------
// функция получения индекса операции в массиве

    function findIndex(arr, operator) {
        return arr.indexOf(operator);
    }
}






