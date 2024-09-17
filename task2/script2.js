let startTime, updatedTime, difference, tInterval;
let running = false;

const display = document.querySelector('h1');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function startTimer() {
    if (!running) {
        startTime = Date.now() - difference;
        tInterval = setInterval(getTime, 1000);
        running = true;
    }
}

function stopTimer() {
    if (running) {
        clearInterval(tInterval);
        running = false;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerHTML = '00:00:00';
    lapsContainer.innerHTML = '';
}

function getTime() {
    updatedTime = Date.now() - startTime;
    difference = updatedTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    display.innerHTML = (hours ? (hours > 9 ? hours : '0' + hours) : '00') + ':' +
                        (minutes ? (minutes > 9 ? minutes : '0' + minutes) : '00') + ':' +
                        (seconds > 9 ? seconds : '0' + seconds);
}

function recordLap() {
    if (running) {
        const lapTime = display.innerHTML;
        const lap = document.createElement('li');
        lap.textContent = lapTime;
        lapsContainer.appendChild(lap);
    }
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);
