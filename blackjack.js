const playerScore = document.getElementById("bj-player-score")
const systemScore = document.getElementById("bj-system-score")
const hitButton = document.getElementById("bj-hit-button")
const restartButton = document.getElementById("bj-restart-button")
const standButton = document.getElementById("bj-stand-button")
const playerCards = document.getElementById("bj-player-cards")
const systemCards = document.getElementById("bj-system-cards")
const alertContainer = document.getElementById("bj-alert-container")
const playButton = document.getElementById("bj-play-button")
const playDisplay = document.getElementById("bj-menu-section")
const gameDisplay = document.getElementById("bj-game-section")

const values = ["a", "2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "q", "k"]
const suits = ["c", "d", "h", "s"]
let usedCards = []

let player = {
    score: 0,
    cards: [],
    aceEleven: 0,
    stackRotate: 0
}

let system = {
    score: 0,
    hiddenPoints: 0,
    cards: [],
    aceEleven: 0,
    stackRotate: 0
}

function hit(user) {
    let value = values[Math.floor(Math.random() * values.length)]
    let suit = suits[Math.floor(Math.random() * suits.length)]

    let card = ""

    card = `${value}${suit}.png`
    
    if (usedCards.includes(card)) {
        return(hit(user))
    } else {
        usedCards.push(card)
    }

    let points = 0

    if (!isNaN(parseInt(value))) {
        points += parseInt(value)
    }
    else if (value != "a") {
        points = 10
    }
    else {
        if (user.score <= 10) {
            points = 11
            user.aceEleven++
        } else {
            points = 1
        }
    }

    user.score += points

    if ((user.score > 21) && (user.aceEleven != 0)) {
        user.score += -10
        user.aceEleven--
    }

    if ((user === system) && (system.cards.length != 0)) {
        system.hiddenPoints += points
    }

    user.cards.push(card)
    winCheck()
}

function stand() {
    if (system.score < 17) {
        hit(system)
        stand()
    } else {
        render(true)
    }
}

function winCheck(stand) {
    // not stand
    if (stand === false) {
        if (player.score === 21) {
            restartButton.style.display = "block"
            return({result: true, win: true, message: "You win, you got blackjack"})
        }
        if (player.score > 21) {
            restartButton.style.display = "block"
            return({result: true, win: false, message: "You lose, you've gone bust!"})
        }
    }

    // stand
    if (stand === true) {
        if (system.score > 21) {
            restartButton.style.display = "block"
            return({result: true, win: true, message: "You win, system has gone bust!"})
        } else if (player.score > system.score) {
            restartButton.style.display = "block"
            return({result: true, win: true, message: "You win, you beat the system!"})
        } else if (player.score === system.score) {
            restartButton.style.display = "block"
            return({result: true, win: false, message: "You draw, it's a push!"})
        } else {
            restartButton.style.display = "block"
            return({result: true, win: false, message: "You lose, the system beat you!"})
        }
    }
    return({result: false})
}

function render(stand) {
    playerCards.innerHTML = ''
    playerScore.textContent = `You: ${player.score}`
    player.stackRotate = 0
    for (let i = 0; i < player.cards.length; i++) {
        playerCards.innerHTML += `<img src='./assets/images/cards/${player.cards[i]}' style='transform: rotate(${player.stackRotate}deg); position: absolute;'/>`
        player.stackRotate += 15
    }

    systemCards.innerHTML = ''
    system.stackRotate = 0
    if (stand === false) {
        systemScore.textContent = `System: ${system.score - system.hiddenPoints}`
        systemCards.innerHTML += `<img src='./assets/images/cards/${system.cards[0]}' style='position: absolute;'/>`
        systemCards.innerHTML += `<img src='./assets/images/cards/hidden-card.png' style='transform: rotate(15deg); position: absolute;'/>`
    } else {
        for (let i = 0; i < system.cards.length; i++) {
            systemScore.textContent = `System: ${system.score}`
            systemCards.innerHTML += `<img src='./assets/images/cards/${system.cards[i]}' style='transform: rotate(${system.stackRotate}deg); position: absolute;'/>`
            system.stackRotate += 15
        }
    }

    let winObj = winCheck(stand)

    if (winObj.result === true) {
        alertContainer.innerHTML = `<div role='alert'>${winObj.message}</div>`
        hitButton.setAttribute("disabled", "")
        hitButton.style.opacity = 0.5
        standButton.setAttribute("disabled", "")
        standButton.style.opacity = 0.5
    }
}

function setup() {
    usedCards = []

    restartButton.style.display = "none"

    alertContainer.innerHTML = ""

    hitButton.removeAttribute("disabled")
    hitButton.style.opacity = 1
    standButton.removeAttribute("disabled")
    standButton.style.opacity = 1

    player = {
        score: 0,
        cards: [],
        aceEleven: 0,
        stackRotate: 0
    }
    system = {
        score: 0,
        hiddenPoints: 0,
        cards: [],
        aceEleven: 0,
        stackRotate: 0
    }

    hit(player)
    hit(player)
    hit(system)
    hit(system)

    render(false)
}

hitButton.addEventListener("click", function() {
    hit(player)
    render(false)
})

standButton.addEventListener("click", function() {
    stand()
})

playButton.addEventListener("click", function() {
    playDisplay.style.display = "none"
    gameDisplay.style.display = "block"
    setup()
})

restartButton.addEventListener("click", function() {
    setup()
})