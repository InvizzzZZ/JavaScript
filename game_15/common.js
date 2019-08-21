function newGame(){
    var f = document.myForm.elements;
    var masNum = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15," "];
    masNum.sort(function() { return Math.random()-.5; });

    for (var  i = 0; i < 16; i ++){
        f[i].value = masNum[i];//задаем значение для кнопки с номером
    }

}

function myChange(n, m){
    //меняются местами значения на кнопках n и m
    var f = document.myForm.elements;
    //alert(f[0].value);
    var f0 = f[n].value;
    f[n].value = f[m].value;
    f[m].value = f0;
}
///////////////////////////////////////////////////////////////

function game(n){
    var f = document.myForm.elements;

    if ((n % 4 != 3) && (f[n + 1].value == ' ')) myChange(n, n + 1); //проверяем кнопку справа если она есть
    if ((n % 4 != 0) && (f[n - 1].value == ' ')) myChange(n, n - 1); //проверяем кнопку слева если она есть
    if ((n <= 11) && (f[n + 4].value == ' ')) myChange(n, n + 4); //проверяем кнопку внизу
    if ((n >= 4) && (f[n - 4].value == ' ')) myChange(n, n - 4); //проверяем кнопку вверху
}
        