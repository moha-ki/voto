var durationInterval;
var halfDuration;

function startGames() {
    let rerollBtn = document.getElementById('generate-teams-btn');
    rerollBtn.classList.add('inactive');
    rerollBtn.disabled = true;
    let startBtn = document.getElementById('start-game-btn');
    startBtn.textContent = "Reset";
    startBtn.onclick = resetTimer;
    let duration = parseInt(document.getElementById('timer-input').value);
    let minutesDisplay = document.getElementById('current-minutes');
    let secondsDisplay = document.getElementById('current-seconds');
    let currentSeconds = duration * 60;
    halfDuration = Math.floor(currentSeconds / 2);
    console.log("current:", currentSeconds, "half:", halfDuration);
    tournament.playGames();
    durationInterval = setInterval(() => {
        minutesDisplay.textContent = Math.floor(currentSeconds / 60).toString().padStart(2, '0');
        secondsDisplay.textContent = (currentSeconds % 60).toString().padStart(2, '0');
        if(currentSeconds < halfDuration) {
            rerollBtn.classList.remove('inactive');
            rerollBtn.disabled = false;
            halfDuration = -1; // Ensure this block only runs once
        }
        if(currentSeconds <= 0) {
            resetTimer();
        }
        currentSeconds--;
    }, 1000);

}

function resetTimer() {
    clearInterval(durationInterval);
    let minutesDisplay = document.getElementById('current-minutes');
    let secondsDisplay = document.getElementById('current-seconds');
    let duration = parseInt(document.getElementById('timer-input').value);
    minutesDisplay.textContent = duration.toString().padStart(2, '0');
    secondsDisplay.textContent = "00";
    document.getElementById('start-game-btn').textContent = "Start";
    document.getElementById('start-game-btn').onclick = startGames;
    // this is only needed if we cancel the timer before half the duration is passed
    let rerollBtn = document.getElementById('generate-teams-btn');
    if(rerollBtn.classList.contains('inactive')) {
        rerollBtn.classList.remove('inactive');
        rerollBtn.disabled = false;
    }
}

function updateDuration() {
    let duration = parseInt(document.getElementById('timer-input').value);
    let minutesDisplay = document.getElementById('current-minutes');
    minutesDisplay.textContent = duration.toString().padStart(2, '0');
}