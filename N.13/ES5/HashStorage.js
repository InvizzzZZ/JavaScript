/*
1.
Разработать класс HashStorage (в файле HashStorage.js) для хранения в хэше произвольных пар ключ-значение.
Ключ может быть любой строкой; значение может иметь любой тип, в том числе векторный (хэш, массив и т.д.)
Класс должен иметь следующий интерфейс (т.е. иметь следующие публичные методы):
addValue(key,value) — сохраняет указанное значение под указанным ключом;
getValue(key) — возвращает значение по указанному ключу либо undefined;
deleteValue(key) — удаляет значение с указанным ключом, возвращает true если значение было удалено и false
если такого значения не было в хранилище; getKeys() — возвращает массив, состоящий из одних ключей.
Класс должен быть чистым (не должен использовать никаких глобальных переменных, не, должен «пачкать экран»). 
Класс должен быть универсальным, т.е. не зависеть ни от структуры хранимых данных, ни от способа их последующего
использования (в т.ч. не должен содержать никаких ссылок на DOM, т.к. может использоваться и вообще без веб-страницы).
 */

'use strict';

let drinkStorage = new HashStorage();

drinkStorage.addValue('Северное сияние', {'alcoholic': true, 'recipe': 'смешать водку и шампанское'});
drinkStorage.addValue('Кровавая мэри', {'alcoholic': true, 'recipe': 'смешать водку и томатный сок'});

function getAllDrinks() {
    alert(drinkStorage.getKeys().join(', '));
}

function deleteDrink() {
    let drink = prompt('Введите название напитка, который нужно удалить');
    if (drink === null) {
        return alert('Операция прервана');
    }
    alert(drinkStorage.deleteValue(drink) ? 'напиток удален' : 'напитка нет в базе');
}

function addDrink() {
    let name = prompt('Введите название напитка');
    if(name === null){
        return alert('Ввод прерван');
    }
    let alcoholic = confirm('Напиток алкогольный?');
    let recipe = prompt('Введите рецепт приготовления напитка');

    drinkStorage.addValue(name, {'alcoholic': alcoholic, 'recipe': recipe});
}

function getInfo() {
    let drink = prompt('Введите название напитка, чтобы получить информацию');

    let info = drinkStorage.getValue(drink);

    if(info === undefined){return alert('Такого напитка нет в базе')}

    let str = `напиток ${drink}\nалкогольный: ${info.alcoholic ? 'да' : 'нет'}\nрецепт приготовления:\n${info.recipe}`;

    return alert(str);
}

function HashStorage() {
    var self = this;

    self.addValue = function (key, value) {
        self[key] = value;
    };

    self.getValue = function (key) {
        return self[key];
    };

    self.deleteValue = function (key) {
        if (key in self) {
            delete self[key];
            return true;
        }

        return false;
    };

    self.getKeys = function () {
        let keysArr = [];
        for (let el in self) {
            if (el === 'addValue' || el === 'getValue' || el === 'deleteValue' || el === 'getKeys') continue;
            keysArr.push(el);
        }
        return keysArr;
    }
}