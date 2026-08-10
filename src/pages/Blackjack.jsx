import { useState, useEffect } from 'react';
import { ProjectMenu } from '../components/ProjectMenu.jsx';
import { calculateScore, endCheck, hit } from '../blackjack.js';
import { initialHit } from '../blackjack.js';
import { stand } from '../blackjack.js';
import { resetGame } from '../blackjack.js';

export function Blackjack() {

    const [projectState, setProjectState] = useState("menu");
    const [deck ,setDeck] = useState([]);
    const [playerHand, setPlayerHand] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);
    const [playerScore, setPlayerScore] = useState(0);
    const [dealerScore, setDealerScore] = useState(0);
    const [outcomeMessage, setOutcomeMessage] = useState("");
    
    useEffect(() => {
        if (projectState === "menu") {
            fetch('assets/json//deck.json')
                .then(response => response.json())
                .then(setDeck);
        }
    }, [projectState]);

    useEffect(() => {
        if (projectState === "play" && deck.length === 52 && playerHand.length === 0 && dealerHand.length === 0) {
            initialHit(deck, setDeck, playerHand, setPlayerHand, dealerHand, setDealerHand, setPlayerScore, setDealerScore);
        }
    }, [deck, projectState]);

    useEffect(() => {
        if (projectState === "play") {
            endCheck("hit", playerScore, dealerScore, setOutcomeMessage, setProjectState, dealerHand, setDealerScore);
        }
    }, [playerScore, dealerScore])

    useEffect(() => {
        if (dealerHand.length > 2) {
            stand(deck, setDeck, dealerHand, setDealerHand, setDealerScore, playerScore, setOutcomeMessage, setProjectState);
        }
    }, [dealerHand])

    return (
        <>
            {projectState != "menu" &&
            <section id="bj-section">
                <h1 id="project-title">BlackJack</h1>
                {outcomeMessage != "" &&
                    <div id="bj-outcome-display">{outcomeMessage}</div>
                }
                <div id="bj-button-row">
                    {projectState === "play" &&
                    <>
                        <button id="bj-hit-button" onClick={() => hit(deck, setDeck, playerHand, setPlayerHand, setPlayerScore)}>Hit</button>
                        <button id="bj-stand-button" onClick={() => stand(deck, setDeck, dealerHand, setDealerHand, setDealerScore, playerScore, setOutcomeMessage, setProjectState)}>Stand</button>
                    </>
                    }
                    {projectState === "end" &&
                    <button id="bj-restart-button" onClick={() => resetGame(setDeck, setPlayerHand, setDealerHand, setPlayerScore, setDealerScore, setOutcomeMessage, setProjectState)}>Restart</button>
                    }
                </div>
                <div id="bj-hand-row">
                    <div id="bj-player-col">
                        <span id="bj-player-title">Player</span>
                        <span id="bj-player-score-elm">Score: {playerScore}</span>
                        <div id="bj-player-hand-container">
                            {playerHand.map((card, i) => (
                                <img key={i} style={{ transform: `rotate(${i * 15}deg)`, zIndex: i }} src={card.path}></img>
                            ))}
                        </div>
                    </div>
                    <div id="bj-dealer-col">
                        <span id="bj-dealer-title">Dealer</span>
                        <span id="bj-dealer-score-elm">Score: {dealerScore}</span>
                        <div id="bj-dealer-hand-container">
                            {dealerHand.map((card, i) => (
                                projectState === "play" && i === 0
                                ? <img key={i} style={{ transform: `rotate(${i * 15}deg)`, zIndex: i }} src="assets/images/cards/hidden-card.png"/>
                                : <img key={i} style={{ transform: `rotate(${i * 15 }deg)`, zIndex: i }} src={card.path}/>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            }

            {projectState === "menu" &&
            <ProjectMenu setProjectState={setProjectState} />
            }
        </>
    )
}