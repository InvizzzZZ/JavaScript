var formDef2 =
    [
        {label: 'Фамилия:', kind: 'longtext', name: 'lastname'},
        {label: 'Имя:', kind: 'longtext', name: 'firstname'},
        {label: 'Отчество:', kind: 'longtext', name: 'secondname'},
        {label: 'Возраст:', kind: 'number', name: 'age'},
        {label: 'Зарегистрироваться:', kind: 'submit'},
    ];

createForm('main', formDef2);

var formDef1 =
    [
        {label: 'Название сайта:', kind: 'longtext', name: 'sitename'},
        {label: 'URL сайта:', kind: 'longtext', name: 'siteurl'},
        {label: 'Посетителей в сутки:', kind: 'number', name: 'visitors'},
        {label: 'E-mail для связи:', kind: 'shorttext', name: 'email'},
        {
            label: 'Рубрика каталога:', kind: 'combo', name: 'division',
            variants: [{text: 'здоровье', value: 1}, {text: 'домашний уют', value: 2}, {
                text: 'бытовая техника',
                value: 3
            }]
        },
        {
            label: 'Размещение:', kind: 'radio', name: 'payment',
            variants: [{text: 'бесплатное', value: 1}, {text: 'платное', value: 2}, {text: 'VIP', value: 3}]
        },
        {label: 'Разрешить отзывы:', kind: 'check', name: 'votes'},
        {label: 'Описание сайта:', kind: 'memo', name: 'description'},
        {label: 'Опубликовать:', kind: 'submit'},
    ];

createForm('main2', formDef1);

function createForm(name, arr) { //название формы и массив содержащий объекты элементов формы

    let frm = document.createElement('form');
    frm.setAttribute('name', name);
    frm.setAttribute('method', 'post');
    frm.setAttribute('action', 'http://fe.it-academy.by/TestForm.php');

    for (let i = 0; i < arr.length; i++) { //цикл по переданному в параметрах массиву

        let {label, kind, name, variants} = arr[i]; //сохраняем в переменные свойства из объекта на каждой итерации

        //label
        if (kind !== 'submit') {
            let tmpLabel = document.createElement('label');

            tmpLabel.innerText = label;
            tmpLabel.setAttribute('for', name);

            frm.appendChild(tmpLabel);
        }

        //input
        if (kind === 'longtext' || kind === 'number' || kind === 'shorttext' || kind === 'submit') {
            let tmpInput = document.createElement('input');

            if (kind === 'submit') {
                name = 'button';
                tmpInput.setAttribute('value', label); //отображаемое название кнопки
            }

            tmpInput.setAttribute('id', name);
            tmpInput.setAttribute('type', kind);
            tmpInput.setAttribute('name', name);

            frm.appendChild(tmpInput);
        }

        //select
        if (kind === 'combo') {
            let tmpSelect = document.createElement('select');

            tmpSelect.setAttribute('name', name);

            frm.appendChild(tmpSelect);

            for (let i = 0; i < variants.length; i++) {

                let {text, value} = variants[i];

                var option = document.createElement("option");

                option.setAttribute('label', text);
                option.setAttribute('value', value);

                tmpSelect.add(option);
            }
        }

        //radio
        if (kind === 'radio') {
            for (let i = 0; i < variants.length; i++) {

                let {text, value} = variants[i];

                let tmpInput = document.createElement('input');

                tmpInput.setAttribute('id', name);
                tmpInput.setAttribute('type', kind);
                tmpInput.setAttribute('name', name);
                tmpInput.setAttribute('value', value);

                frm.appendChild(tmpInput);

                let tmpSpan = document.createElement('span');

                tmpSpan.innerText = text;

                frm.appendChild(tmpSpan)
            }
        }

        //checkbox
        if (kind === 'check') {
            let tmpInput = document.createElement('input');

            kind = 'checkbox';

            tmpInput.setAttribute('id', name);
            tmpInput.setAttribute('type', kind);
            tmpInput.setAttribute('name', name);

            frm.appendChild(tmpInput);
        }

        //textarea
        if (kind === 'memo') {
            frm.appendChild(document.createElement('br'));
            let tmpTextArea = document.createElement('TEXTAREA');

            kind = 'TEXTAREA';

            tmpTextArea.setAttribute('id', name);
            tmpTextArea.setAttribute('type', kind);
            tmpTextArea.setAttribute('name', name);

            frm.appendChild(tmpTextArea);
        }

        //разрывы между элементами формы
        frm.appendChild(document.createElement('br'));
    }

    document.body.appendChild(frm);

    //отделить формы друг от друга
    document.body.appendChild(document.createElement('hr'));
}