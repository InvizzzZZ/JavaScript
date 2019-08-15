'use strict';

var elems = document.querySelectorAll('img');

for (let i = 0; i < elems.length; i++) {
    elems[i].addEventListener('mousedown', _mouseDown, false);
}

var index = 1;

function _mouseDown(EO) {
    EO = EO || window.event;
    let elem = EO.target;

    EO.preventDefault();

    var elems = document.querySelectorAll('img');

    for (let i = elems.length - 1; i >= 0; i--) {
        elems[i].style.position = 'absolute';
        elems[i].style.top = Math.round(+elems[i].offsetTop) + 'px';
        elems[i].style.left = Math.round(+elems[i].offsetLeft) + 'px';
    }

    var coords = getCoords(elem);
    var shiftX = Math.round(EO.pageX - coords.left);
    var shiftY = Math.round(EO.pageY - coords.top);

    elem.style.zIndex = index++;

    // elem.addEventListener('mousemove', _mouseMove, false);
    document.addEventListener('mousemove', _mouseMove, false);

    function _mouseMove(EO) {
        EO = EO || window.event;

        EO.preventDefault();

        elem.style.left = Math.round(EO.pageX - shiftX) + 'px';
        elem.style.top = Math.round(EO.pageY - shiftY) + 'px';
    }

    elem.addEventListener('mouseup', _mouseUp, false);

    function _mouseUp(EO) {
        EO = EO || window.event;

        EO.preventDefault();

        // elem.removeEventListener('mousemove', _mouseMove, false);
        document.removeEventListener('mousemove', _mouseMove, false);
        elem.removeEventListener('mouseup', _mouseUp, false);
    }
}

function getCoords(elem) {
    var box = elem.getBoundingClientRect();
    return {
        top: Math.round(box.top + pageYOffset),
        left: Math.round(box.left + pageXOffset)
    };
}