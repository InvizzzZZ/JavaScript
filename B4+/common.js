/*
B4+
Дан большой массив слов - словарь.
Написать функцию, получающую два слова, и строящую за несколько шагов
из первого слова второе, за каждый шаг меняя не более одной буквы,
так, чтобы на каждом шаге получалось допустимое слово (слово из словаря).
Функция должна вернуть самую короткую цепочку шагов в виде строки.
Например, при работе со следующим словарём:
["ТАРА","ЛИПА","ТУРА","ЛУЖА","ПАРК","ЛОЖЬ","ЛУПА","ПЛОТ","МУРА","ПАУК","ПАУТ","ПЛУТ","ЛОЖА","СЛОТ","ПАРА"]
при вызове со словами "ЛИСА" и "ЛОСЬ", функция должна вернуть строку:
"ЛИСА-ЛИПА-ЛУПА-ЛУЖА-ЛОЖА-ЛОЖЬ-ЛОСЬ"
а при вызове со словами "МУХА" и "СЛОН" - строку:
"МУХА-МУРА-ТУРА-ТАРА-ПАРА-ПАРК-ПАУК-ПАУТ-ПЛУТ-ПЛОТ-СЛОТ-СЛОН"
 */

'use strict';

// debugger;

// alert(f("ЛИСА", "ЛОСЬ"));
alert(f("МУХА", "СЛОН"));

function f(wordBegin, wordEnd) {
    let dictionary = [
        "ТАРА", "ЛИПА", "ТУРА", "ЛУЖА", "ПАРК", "ЛОЖЬ", "ЛУПА", "ПЛОТ",
        "МУРА", "ПАУК", "ПАУТ", "ПЛУТ", "ЛОЖА", "СЛОТ", "ПАРА"
    ];

    let str = wordBegin;

    for(var i = 0; i < dictionary.length; ){

        if(checkWord(wordBegin, wordEnd) === 3){
            str += ' ' + wordEnd;
            break;
        }

        if(checkWord(wordBegin, dictionary[i]) === 3){

            wordBegin = dictionary[i];
            str += ' ' + dictionary[i];
            alert(dictionary.splice(i, 1));
            i = 0;
        }

        i++;
    }

    return str;

    //функция подсчитывает кол-во одинаковых букв в двух словах
    function checkWord(wordFirst, wordSecond) {

        let wordFirstArr = wordFirst.split('');

        let wordSecondArr = wordSecond.split('');

        var countRepeats = {};

        wordFirstArr.forEach(hashLetters);
        wordSecondArr.forEach(hashLetters);

        //функция наполняющая хэш, где ключи это буквы из которых состоят проверяемые слова,
        // а значения кол-во повторений букв в 2-х словах
        function hashLetters(v) {
            if (v in countRepeats) {
                countRepeats[v.toString()]++;
            } else {
                countRepeats[v.toString()] = 1;
            }
        }

        //-------------------------------------------------------------------------------------

        let count = 0;

        for (let elem in countRepeats) {
            if (countRepeats[elem] >= 2) {
                count++;
            }
        }

        return count;
    }
}