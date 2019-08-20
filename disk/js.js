let disk = document.createElement('div');
disk.classList.add('disk');
disk.id = 'disk';
document.body.appendChild(disk);

let center = document.createElement('div');
center.classList.add('center');
disk.appendChild(center);
center.style.left = (disk.offsetWidth / 2) - (center.offsetWidth / 2) + 'px';
center.style.top = (disk.offsetHeight / 2) - (center.offsetHeight / 2) + 'px';

let time = document.createElement('span');
time.id = 'time';
time.innerHTML = '00:00:000';
time.style.display = 'none';
time.classList.add('time');
document.body.appendChild(time);

let button = document.createElement('button');
button.classList.add('button');
button.textContent = 'Play';
document.body.appendChild(button);

let audio = document.createElement('audio');
audio.style.display = 'none';
audio.src = '1.mp3';
document.body.appendChild(audio);

let track = document.getElementById('track');
track.addEventListener('change', fff, false);

function fff() {
    if (track.value === '1') {
        audio.src = '1.mp3';
    } else {
        audio.src = '2.mp3';
    }
    if (audio.classList.contains('clicked')) {
        audio.classList.remove('clicked');
        audio.pause();
        audio.currentTime = 0;
        button.textContent = 'Play';
        disk.style.transform = 'none';
    }
}

button.addEventListener('click', play, false);

function play() {
    if (!audio.classList.contains('clicked')) {
        audio.classList.add('clicked');
        audio.play();
        time.style.display = 'inline';
        disk.style.transform = 'rotate(1080deg)';
        disk.style.transitionDuration = audio.duration + 's';
        button.textContent = 'Pause';

        setInterval(() => {
            let minute = Math.floor(audio.currentTime / 60);
            let sec = Math.floor(audio.currentTime) % 60;
            let str = audio.currentTime + "";
            let miliSec = str.slice(str.indexOf('.'), str.indexOf('.') + 4).replace('.', '');
            time.innerHTML = str0l(minute, 2) + ":" + str0l(sec, 2) + ":" + str0l(miliSec, 3);

            if (audio.ended) {
                audio.classList.remove('clicked');
                disk.style.transform = 'none';
                button.textContent = 'Play';
            }

        }, 1000);
    } else {
        audio.pause();
        audio.classList.remove('clicked');
        disk.style.transform = 'none';
    }

}

function str0l(val, len) {
    var strVal = val.toString();
    while (strVal.length < len)
        strVal = '0' + strVal;
    return strVal;
}