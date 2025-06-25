import { useState, useEffect } from 'react';
import { ProjectMenu } from '../components/ProjectMenu.jsx';
import { hit } from '../blackjack.js';

export function Blackjack() {

    const [active, setActive] = useState(false);
    const [deck ,setDeck] = useState([]);
    const [playerHand, setPlayerHand] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);
    const [playerScore, setPlayerScore] = useState(0);
    const [dealerScore, setDealerScore] = useState(0);
    const [usedCards, setUsedCards] = useState([]);

    useEffect(() => {
        fetch('assets/json//deck.json')
            .then(response => response.json())
            .then(setDeck);
    }, []);

    useEffect(() => {
        if (deck.length === 52 && playerHand.length === 0 && dealerHand.length === 0) {
            hit(deck, playerHand, setPlayerHand, 2, usedCards, setUsedCards, playerScore, setPlayerScore);
            hit(deck, dealerHand, setDealerHand, 2, usedCards, setUsedCards, dealerScore, setDealerScore);
        } else return;
    }, [deck]);

    return (
        <>
            {active ?

            <section id="bj-section">
                <h1 id="project-title">BlackJack</h1>
                <div id="bj-button-row">
                    <button id="bj-deal-button">Hit</button>
                    <button id="bj-hit-button">Restart</button>
                    <button id="bj-stand-button">Stand</button>
                </div>
                <div id="bj-col-row">
                    <div id="bj-player-col">
                        <span id="bj-player-title">Player</span>
                        <span id="bj-player-score-elm">Score: {playerScore}</span>
                        <div id="bj-player-hand-container">
                            <span id="bj-hand-span">Hand:</span>
                            {playerHand.map((i) => (
                                <img src={i.path}></img>
                            ))}
                        </div>
                    </div>
                    <div id="bj-dealer-col">
                        <span id="bj-dealer-title">Dealer</span>
                        <span id="bj-dealer-score-elm">Score: {dealerScore}</span>
                        <div id="bj-dealer-hand-container">
                            <span id="bj-hand-span">Hand:</span>
                            {dealerHand.map((i) => (
                                <img src={i.path}></img>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            : <ProjectMenu setActiveL={setActive} />}
        </>
    )
}