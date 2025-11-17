var durationInterval;

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
    let totalSeconds = duration * 60;
    tournament.playGames();
    durationInterval = setInterval(() => {
        minutesDisplay.textContent = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        secondsDisplay.textContent = (totalSeconds % 60).toString().padStart(2, '0');
        if(totalSeconds <= 0) {
            resetTimer();
        }
        totalSeconds--;
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
    let rerollBtn = document.getElementById('generate-teams-btn');
    rerollBtn.classList.remove('inactive');
    rerollBtn.disabled = false;
    document.getElementById('start-game-btn').onclick = startGames;
}