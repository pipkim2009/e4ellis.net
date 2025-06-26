export function initialHit(deck, setDeck, playerHand, setPlayerHand, dealerHand, setDealerHand, setPlayerScore, setDealerScore) {
    let newDeck = [...deck]; // create a copy of the deck array
    let newPlayerHand = [...playerHand]; // create a copy of the player hand array
    let newDealerHand = [...dealerHand]; // create a copy of the dealer hand array
    let deckIndex = 0;
    for (let i = 0; i < 2; i++) {
        deckIndex = Math.floor(Math.random() * newDeck.length);
        newPlayerHand.push(newDeck[deckIndex]); // add a card from the newDeck to the newPlayerHand
        newDeck.splice(deckIndex, 1); // remove the card from the newDeck

        deckIndex = Math.floor(Math.random() * newDeck.length);
        newDealerHand.push(newDeck[deckIndex]); // add a card from the newDeck to the newDealerHand
        newDeck.splice(deckIndex, 1); // remove the card from the newDeck
    }
    setPlayerHand(newPlayerHand); // update the state with the new player hand
    setDealerHand(newDealerHand); // update the state with the new dealer hand
    setDeck(newDeck); // update the state with the new deck
    calculateScore(newPlayerHand, setPlayerScore); // calculate the score of the new player hand
    calculateScore(newDealerHand, setDealerScore, true); // calculate the score of the new dealer
}

export function hit(deck, setDeck, hand, setHand, setScore) {
    let deckIndex = 0
    let newHand = [...hand] // create a copy of the hand array
    let newDeck = [...deck] // create a copy of the deck array

    deckIndex = Math.floor(Math.random() * newDeck.length)
    newHand.push(newDeck[deckIndex]); // add a card from the newDeck to the newHand
    newDeck.splice(deckIndex, 1) // remove the card from the newDeck

    setDeck(newDeck); // update the state with the new deck
    setHand(newHand); // update the state with the new hand
    calculateScore(newHand, setScore); // calculate the score of the new hand
}

export function calculateScore(hand, setScore, hide) {
    let score = 0
    for (let i = 0; i < hand.length; i++) {
        if (hand[i].value.length === 2) {
            if (score + hand[i].value[1] > 21) {
                score += hand[i].value[0];
            } else {
                score += hand[i].value[1];
            }
        } else {
            score += hand[i].value[0]
        }
    }
    if (hide === true) {
        score -= hand[0].value[0]; // Hide the first card of the dealer
    }
    setScore(score);
}

export function stand(deck, setDeck, dealerHand, setDealerHand, dealerScore, setDealerScore) {
    if (dealerScore <= 17) {
        setTimeout(() => {hit(deck, setDeck, dealerHand, setDealerHand, setDealerScore)}, 10);
    }
}

export function endCheck(cause, playerScore, dealerScore, setOutcomeMessage, setProjectState, dealerHand, setDealerScore) {
    if (cause === "hit") {
        if (playerScore > 21) {
           setOutcomeMessage(() =>  "Player busts! Dealer wins!");
           setProjectState(() => "end");
           calculateScore(dealerHand, setDealerScore);
        } else if (dealerScore > 21) {
           setOutcomeMessage(() => "Dealer busts! Player wins!");
           setProjectState(() => "end");
        } else if (playerScore === 21) {
           setOutcomeMessage(() => "Player wins with Blackjack!");
           setProjectState(() => "end");
        } else if (dealerScore === 21) {
           setOutcomeMessage(() => "Dealer wins with Blackjack!");
           setProjectState(() => "end");
        }
    } else if (cause === "stand") {
        if (playerScore === dealerScore) {
           setOutcomeMessage(() => "It's a tie!");
           setProjectState(() => "end");
        } else if (playerScore > dealerScore) {
           setOutcomeMessage(() => "Player wins!");
           setProjectState(() => "end");
        } else {
           setOutcomeMessage(() => "Dealer wins!");
           setProjectState(() => "end");
        }
    }
}

export function resetGame(setDeck, setPlayerHand, setDealerHand, setPlayerScore, setDealerScore, setOutcomeMessage, setProjectState) {
    setDeck([]);
    setPlayerHand([]);
    setDealerHand([]);
    setPlayerScore(0);
    setDealerScore(0);
    setOutcomeMessage("");
    setProjectState("menu");
}