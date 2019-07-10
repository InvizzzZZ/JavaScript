let year = prompt("Введите год");

alert(returnCentury(year));

function returnCentury(year){

    return `${year} год - это ${Math.ceil(year / 100)} век`;
}