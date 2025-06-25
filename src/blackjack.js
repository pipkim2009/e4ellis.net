export function hit(deck, hand, setHand, number, usedCards, setUsedCards, score, setScore) {
    let newHand = [...hand] // create a copy of the hand array

    for (let i = 0; i < number; i++) {
        newHand.push(deck[Math.floor(Math.random() * 52)])
        for (let i = 0; i < usedCards.length; i++) {
            if (newHand[newHand.length - 1] === usedCards[i])
            {
                newHand.pop();
                newHand.push(deck[Math.floor(Math.random() * 52)]);
                i = 0;
            }
        }
        setUsedCards(...usedCards, newHand[newHand.length - 1]);
    }
    setHand(newHand); // update the state with the new hand
    calculateScore(newHand, setScore); // calculate the score of the new hand
}

export function calculateScore(hand, setScore) {
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
    setScore(score);
}