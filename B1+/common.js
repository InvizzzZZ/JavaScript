let year = prompt("Введите год");

alert(returnCentury(year));

function returnCentury(year){

    return Math.ceil(year / 100);
}