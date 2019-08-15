'use strict';

let elems = document.querySelectorAll('img');
let _top = 0;
let _left = 0;

for(let i = 0; i < elems.length; i++){
    elems[i].addEventListener('mousedown', _mouseDown, false);
    elems[i].style.position = 'absolute';
    elems[i].style.top = _top + 'px';
    elems[i].style.left = _left + 'px';
    _top += elems[i].offsetHeight + 20;
    _left += elems[i].offsetWidth + 20;
}

var index = 1;

function _mouseDown(EO) {
    EO = EO || window.event;
    let elem = EO.target;

    var coords = getCoords(elem);
    var shiftX = EO.pageX - coords.left;
    var shiftY = EO.pageY - coords.top;

    elem.style.zIndex = index++;

    elem.addEventListener('mousemove', _mouseMove, false);

    function _mouseMove(EO) {
        EO = EO || window.event;
        let elem = EO.target;

        EO.preventDefault();

        elem.style.left = EO.pageX - shiftX + 'px';
        elem.style.top = EO.pageY - shiftY + 'px';
    }

    elem.addEventListener('mouseup', _mouseUp, false);

    function _mouseUp(EO) {
        EO = EO || window.event;
        let elem = EO.target;

        EO.preventDefault();

        elem.removeEventListener('mousemove', _mouseMove, false);
        elem.removeEventListener('mouseup', _mouseUp, false);
    }
}

function getCoords(elem) {
    var box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}