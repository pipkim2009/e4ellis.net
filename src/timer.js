export function calculateTime(setTimer) {
    let currentTimer = Number(localStorage.getItem('timer')) + 1;
    setTimer(currentTimer);
    localStorage.setItem('timer', currentTimer);
}