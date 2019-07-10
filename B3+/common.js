while(true){
    var expression = prompt("Введите выражение.");

    if (expression.match(/[0-9()\+\.\-\*\//]/g)) {
        evaluate();
        break;
    }

    alert("Вы ввели некорректное выражение");
}

function evaluate() {
    let s = document.createElement("script");
    s.textContent = 'alert(' + expression + ');';
    document.head.appendChild(s);
}

