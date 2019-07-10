let year = prompt("Введите год");

alert(returnCentury(year));

function returnCentury(year){

    return "Век, к которому относится введнный год - " + Math.ceil(year / 100);
}