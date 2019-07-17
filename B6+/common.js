/*
Доработайте функцию для оборачивания текста в тег из задания B5+, чтобы в вызове функции можно было, при желании, указывать атрибуты в виде хэша.
Функция должна учитывать, что некоторые символы надо замеменять на HTML-мнемоники.
var wrapH1=buildWrapper("H1"); // строим функцию для оборачивания текста в тег H1
var wrapP=buildWrapper("P");   // строим функцию для оборачивания текста в тег P
console.log( wrapH1("СТИХИ",{align:"center",title:"M&M's"}) );
// в консоль выводится строка "<H1 align='center' title='M&amp;M&apos;s'>СТИХИ</H1>"
console.log( wrapP("Однажды в <студёную> зимнюю пору") );
// в консоль выводится строка "<P>Однажды в &lt;студёную&gt; зимнюю пору</P>"
*/

'use strict';

var wrapH1 = buildWrapper("H1");

console.log(wrapH1("СТИХИ"));

var wrapP = buildWrapper("P");

console.log(wrapP("Однажды в студёную зимнюю пору"));

console.log(wrapP("Вкусные M&M's"));

var wrapH1 = buildWrapper("H1");

console.log(wrapH1("СТИХИ", {align: "center", title: "M&M's"}));


function buildWrapper(tag) {

    return (function (str, options) {

        let strStyles = '';

        // замена & на мнемонику
        str = str.split('&').join('&amp;');

        // хэш, в котором ключи это символы,
        // которые должны заменяться на HTML-мнемоники(значения) кроме &
        let mnemonics = {
            "'": '&apos;',
            '"': '&quot;',
            "<": '&lsaquo;',
            ">": '&rsaquo;'
        };

        for (let elem in mnemonics) {
            str = str.split(elem).join(mnemonics[elem]);
        }

        if (options) {
            strStyles =' ' + createStyles(options);
        }

        return '<' + tag + strStyles + '>' + str + '</' + tag + '>';

        //создание строки, которая содержит стили
        function createStyles(options) {

            let arrOption = [];

            for (let key in options) {

                options[key] = options[key].split('&').join('&amp;');

                for (let el in mnemonics) {

                    options[key] = options[key].split(el).join(mnemonics[el]);

                }

                arrOption.push(key + "='" + options[key] + "'");
            }

            return arrOption.join(" ");
        }
    });
}