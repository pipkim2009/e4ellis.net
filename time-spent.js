const randomFunFact = document.getElementById("fun-fact-text")

const startTime = new Date()
const previousTimeSpent = parseInt(localStorage.getItem("totalTimeSpent")) || 0 // if fails set 0
let sessionTimeSpent = 0
let timeText = ''

setInterval(timeSpentRefresh, 1)

function timeSpentRefresh() {
    sessionTimeSpent = Math.floor(((new Date) - startTime) / 1000)

    let totalTimeSpent = sessionTimeSpent + previousTimeSpent

    if (totalTimeSpent < 60) {
        timeText = `${totalTimeSpent} seconds`
    } else if (totalTimeSpent < 3600) {
        timeText = `${Math.floor(totalTimeSpent/60)} minutes and ${totalTimeSpent%60} seconds`
    } else {
        timeText = `${Math.floor(totalTimeSpent/3600)} hours, ${Math.floor((totalTimeSpent%3600)/60)} minutes and ${totalTimeSpent%60} seconds`
    }

    randomFunFact.textContent = `You have spent ${timeText} watching this cow Moo!`

    if (totalTimeSpent >= 120) {
        randomFunFact.innerHTML += ` <span id="fun-fact-joke">WOW You need help!</span>`
    }

    localStorage.setItem("totalTimeSpent", totalTimeSpent)
}