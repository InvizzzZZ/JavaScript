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

alert(transform("ЛИСА", "ЛОСЬ"));
alert(transform("МУХА", "СЛОН"));

function transform(wordBegin, wordEnd) {

    let dictionary = [
        "ТАРА", "ЛИПА", "ТУРА", "ЛУЖА", "ПАРК", "ЛОЖЬ", "ЛУПА", "ПЛОТ",
        "МУРА", "ПАУК", "ПАУТ", "ПЛУТ", "ЛОЖА", "СЛОТ", "ПАРА"
    ];

    let str = wordBegin; //цепочка от начального слова до конечного

    for (var i = 0; i < dictionary.length; i++) {

        //если текущее слово и слово, которое надо получить отличаются на 1 букву, то функция завершает работу
        if (checkWord(wordBegin, wordEnd) === 1) {
            str += '-' + wordEnd;
            break;
        }

        //если текущее слово и проверяемое слово из словаря отличаются на 1 букву
        if (checkWord(wordBegin, dictionary[i]) === 1) {

            wordBegin = dictionary[i];  //меняем теущее слово на проверяемое из словаря для дальнейшей проверки
            str += '-' + dictionary[i]; //добавляем подходящее слово в цепочку
            dictionary.splice(i, 1);    //удаляем проверяемое слово из словаря
            i = -1;                     //изменяем индекс, чтоб проверка началась с 0-ого элемента
        }
    }

    return str;

    //функция подсчитывает кол-во несовпадений букв в двух словах
    function checkWord(wordFirst, wordSecond) {

        let wordFirstArr = wordFirst.split('');

        let wordSecondArr = wordSecond.split('');

        let count = 0;

        for (let i = 0; i < wordFirstArr.length; i++) {
            if (wordFirstArr[i] !== wordSecondArr[i]) {
                count++;
            }
        }

        return count; // кол-во несовпадений
    }
}