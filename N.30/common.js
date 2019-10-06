'use strict';

window.addEventListener('load', updateIMG, false);

function updateIMG(){
    var elems = document.querySelectorAll('img');
    for (let i = elems.length - 1; i >= 0; i--) {
        elems[i].style.position = 'absolute';
        elems[i].style.top = elems[i].offsetTop + 'px';
        elems[i].style.left = elems[i].offsetLeft + 'px';
        elems[i].addEventListener('mousedown', _mouseDown, false);
    }
}

var index = 1;

function _mouseDown(EO) {
    EO = EO || window.event;
    let elem = EO.target;

    EO.preventDefault();

    var coords = getCoords(elem);
    var shiftX = EO.pageX - coords.left;
    var shiftY = EO.pageY - coords.top;

    elem.style.zIndex = index++;

    // elem.addEventListener('mousemove', _mouseMove, false);
    document.addEventListener('mousemove', _mouseMove, false);

    function _mouseMove(EO) {
        EO = EO || window.event;

        EO.preventDefault();

        elem.style.left = EO.pageX - shiftX + 'px';
        elem.style.top = EO.pageY - shiftY + 'px';
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
    // var box = elem.getBoundingClientRect();
    // return {
    //     top: box.top + pageYOffset,
    //     leftArrow: box.leftArrow + pageXOffset
    // };

    var bbox=elem.getBoundingClientRect();

    var body=document.body;
    var docEl=document.documentElement;

    var scrollTop=window.pageYOffset||docEl.scrollTop||body.scrollTop;
    var scrollLeft=window.pageXOffset||docEl.scrollLeft||body.scrollLeft;

    var clientTop=docEl.clientTop||body.clientTop||0;
    var clientLeft=docEl.clientLeft||body.clientLeft||0;

    var top=bbox.top+scrollTop-clientTop;
    var left=bbox.left+scrollLeft-clientLeft;

    return {
        left: left,
        top: top
    };
}