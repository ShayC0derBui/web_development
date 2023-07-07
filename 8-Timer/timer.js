let seconds = 0
let minutes = 0
let hours = 0


let playPauseBtn = document.querySelector('#playPauseBtn');
let resetBtn = document.querySelector('#resetBtn');

function timer() {
    seconds++
    if (seconds / 60 == 1) {
        minutes++
        seconds = 0
        if (minutes / 60 == 1) {
            hours++
            minutes = 0
        }
    }
    let S = seconds;
    let M = minutes;
    let H = hours;
    if (seconds < 10) {
        S = '0' + seconds;
    }
    if (minutes < 10) {
        M = '0' + minutes;
    }
    if (hours < 10) {
        H = '0' + hours;
    }
    document.getElementById('timer').innerText = H + ':' + M + ':' + S
}

let timerStatus = 'stopped'
let timerInterval = null

playPauseBtn.addEventListener('click', function () {
    if (timerStatus == 'stopped') {
        timerInterval = window.setInterval(timer, 1000)
        document.getElementById('playPauseBtn').innerHTML = '<i class="fa-solid fa-pause" id="pause"></i>'
        timerStatus = 'started'
    }
    else {
        window.clearInterval(timerInterval)
        document.getElementById('playPauseBtn').innerHTML = '<i class="fa-solid fa-play" id="play"></i>'
        timerStatus = 'stopped'
    }
})

resetBtn.addEventListener('click', function () {
    window.clearInterval(timerInterval)
    timerStatus = 'stopped'
    seconds = 0
    minutes = 0
    hours = 0
    document.getElementById('playPauseBtn').innerHTML = '<i class="fa-solid fa-play" id="play"></i>'
    document.getElementById('timer').innerText = '00:00:00'
})

