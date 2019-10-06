(function (fld, pF, px, dx, dy, lifes, score) {
    console.log(fld);
    var cycle = setInterval(function () {
        var bx = pF(ball.style.left = pF(ball.style.left) + dx + 'px') | 0,
            by = pF(ball.style.top = pF(ball.style.top) + dy + 'px') | 0,
            row = ((by - 30) / 14) | 0, col = (bx / 32) | 0;
            // console.log('row ' + row);
            // console.log('col ' + col);

        if (bx < 0 && dx < 0 || bx >= 314 && dx > 0) dx *= -1;
        if (bx + 6 >= px && bx <= px + 58 && by >= 259 && by <= 264) {
            dy *= -1;
            if (bx <= px + 15) dx = -6;
            else if (bx >= px + 37) dx = 6;
            else if (Math.abs(dx) === 6) dx = (dx * 2 / 3) | 0;
        }
        if (by < 0) dy *= -1;
        if (by >= 288 && !--lifes) clearInterval(cycle), alert('Game over!');
        if (by >= 288 && lifes) dy *= -1, lifesNode.innerHTML = lifes;
        if (by >= 18 && by <= 100 && fld[row * 10 + col].className != 'removed') {
            debugger;
            dy *= -1, fld[row * 10 + col].className = 'removed';
            if (dx < 0 && (bx % 32 < 10 || bx % 32 > 22)) dx *= -1;
            if (dx > 0 && ((bx + 12) % 32 < 10 || (bx + 12) % 32 > 22)) dx *= -1;
            scoreNode.innerHTML = ++score;
            if (score == 50) clearInterval(cycle), alert('Victory!');
        }
    }, 1000 / 60);

    document.addEventListener('mousemove', function (e) {
        px = (e.pageX > 40) ? ((e.pageX < 290) ? e.pageX - 40 : 256) : 0;
        paddle.style.left = px + 'px';
    }, false);
}(field.children, parseFloat, 129, -4, -4, 3, 0));