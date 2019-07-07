let letters = {
                "а" : 0, "е" : 0, "ё" : 0, "и" : 0, "о" : 0,
                "ы" : 0, "у" : 0, "э" : 0, "ю" : 0, "я" : 0
              };

let userStr = prompt("Ввведите строку для подсчета гласных букв");

let count = 0;

alert(`Кол-во гласных букв в "${userStr}" равно ${countLetters(userStr)}`);

function countLetters(str) {
   for(let i = 0; i < str.length; i++){
       if(str.toLowerCase().charAt(i) in letters){
           count++;
       }
   }
   return count;
}