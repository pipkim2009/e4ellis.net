import { useState, useEffect } from 'react';
import { ProjectMenu } from '../components/ProjectMenu.jsx';
import { endCheck, hit } from '../blackjack.js';
import { initialHit } from '../blackjack.js';

export function Blackjack() {

    const [projectState, setProjectState] = useState("menu");
    const [deck ,setDeck] = useState([]);
    const [playerHand, setPlayerHand] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);
    const [playerScore, setPlayerScore] = useState(0);
    const [dealerScore, setDealerScore] = useState(0);
    const [outcomeMessage, setOutcomeMessage] = useState("");

    useEffect(() => {
        fetch('assets/json//deck.json')
            .then(response => response.json())
            .then(setDeck);
    }, []);

    useEffect(() => {
        if (projectState === "play" && deck.length === 52 && playerHand.length === 0 && dealerHand.length === 0) {
            initialHit(deck, setDeck, playerHand, setPlayerHand, dealerHand, setDealerHand, setPlayerScore, setDealerScore);
        }
    }, [deck, projectState]);

    useEffect(() => {
        if (projectState === "play") {
            endCheck("hit", playerScore, dealerScore, setOutcomeMessage, setProjectState);
        }
    }, [playerScore, dealerScore])

    return (
        <>
            {projectState != "menu" &&
            <section id="bj-section">
                <h1 id="project-title">BlackJack</h1>
                <div id="bj-button-row">
                    {projectState === "play" &&
                    <>
                        <button id="bj-hit-button" onClick={() => hit(deck, setDeck, playerHand, setPlayerHand, setPlayerScore)}>Hit</button>
                        <button id="bj-stand-button">Stand</button>
                    </>
                    }
                    {projectState === "end" &&
                    <button id="bj-restart-button">Restart</button>
                    }
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
            }

            {projectState === "menu" &&
            <ProjectMenu setProjectState={setProjectState} />
            }
        </>
    )
}