'use strict';

class HashStorage {
    constructor() {

    }

    #storage = {};

    addValue(key, value) {
        this.#storage[key] = value;
    }

    getValue(key) {
        return this.#storage[key];
    }

    deleteValue(key) {
        if (key in this.#storage) {
            delete this.#storage[key];
            return true;
        }

        return false;
    }

    getKeys() {
       return Object.keys(this.#storage).join(', ');
    }
}

let drinkStorage = new HashStorage();
drinkStorage.addValue('Северное сияние', {'alcoholic': true, 'recipe': 'смешать водку и шампанское'});
drinkStorage.addValue('Кровавая мэри', {'alcoholic': true, 'recipe': 'смешать водку и томатный сок'});

function getAllDrinks() {
    alert(drinkStorage.getKeys());
}

function deleteDrink() {
    let drink = prompt('Введите название напитка, который нужно удалить');
    if (drink === null) {
        return alert('Операция прервана');
    }
    let result = (drinkStorage.deleteValue(drink) ? 'напиток удален' : 'напитка нет в базе');
    alert(result);
}

function addDrink() {
    let name = prompt('Введите название напитка');
    if(name === null){
        return alert('Ввод прерван');
    }
    let alcoholic = confirm('Напиток алкогольный?');
    let recipe = prompt('Введите рецепт приготовления напитка');

    drinkStorage.addValue(name, {'alcoholic' : alcoholic, 'recipe' : recipe});
}

function getInfo() {
    let drink = prompt('Введите название напитка, чтобы получить информацию');

    let info = drinkStorage.getValue(drink);

    if(info === undefined){return alert('Такого напитка нет в базе')}

    let str =`напиток ${drink}\nалкогольный: ${info.alcoholic ? 'да' : 'нет'}\nрецепт приготовления:\n${info.recipe}`;

    return alert(str);
}
