/*
B5+
Напишите функцию для оборачивания текста в тег, с которой можно было бы работать в следующем стиле:
var wrapH1=buildWrapper("H1"); // строим функцию для оборачивания текста в тег H1
var wrapP=buildWrapper("P");   // строим функцию для оборачивания текста в тег P
console.log( wrapH1("СТИХИ") );
// в консоль выводится строка "<H1>СТИХИ</H1>"
console.log( wrapP("Однажды в студёную зимнюю пору") );
// в консоль выводится строка "<P>Однажды в студёную зимнюю пору</P>"
Функция должна учитывать, что некоторые символы надо замеменять на HTML-мнемоники:
console.log( wrapP("Вкусные M&M's") );
// в консоль выводится строка "<P>Вкусные M&amp;M&apos;s</P>"
*/

'use strict';


var wrapH1 = buildWrapper("H1");

console.log(wrapH1("СТИХИ"));


var wrapP = buildWrapper("P");

console.log(wrapP("Однажды в студёную зимнюю пору"));


console.log(wrapP("Вкусные M&M's"));


function buildWrapper(tag) {

    return (function (str) {

        // хэш, в котором ключи это символы,
        // которые должны заменяться на HTML-мнемоники(значения)
        let mnemonics = {
            "&": '&amp;',
            "'": '&apos;'
        };

        for (let elem in mnemonics) {
            str = str.split(elem).join(mnemonics[elem]);
        }

        return '<' + tag + '>' + str + '</' + tag + '>';
    });
}