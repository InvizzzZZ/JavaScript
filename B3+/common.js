let expression = prompt("Введите выражение.");

var s = document.createElement("script");
s.textContent = 'alert(' + expression + ');';
document.head.appendChild(s);
