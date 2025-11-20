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
            <section className="blackjack">
                <div className="blackjack-container">
                    <h1 className="blackjack-title">BlackJack</h1>

                    {outcomeMessage != "" &&
                        <div className="blackjack-outcome">
                            {outcomeMessage}
                        </div>
                    }

                    {/* Vertical Layout (Mobile/Tablet Portrait) */}
                    <div className="blackjack-controls-mobile">
                        {projectState === "play" &&
                        <>
                            <button
                                className="blackjack-button"
                                onClick={() => hit(deck, setDeck, playerHand, setPlayerHand, setPlayerScore)}
                            >
                                Hit
                            </button>
                            <button
                                className="blackjack-button"
                                onClick={() => stand(deck, setDeck, dealerHand, setDealerHand, setDealerScore, playerScore, setOutcomeMessage, setProjectState)}
                            >
                                Stand
                            </button>
                        </>
                        }
                        {projectState === "end" &&
                        <button
                            className="blackjack-button"
                            onClick={() => resetGame(setDeck, setPlayerHand, setDealerHand, setPlayerScore, setDealerScore, setOutcomeMessage, setProjectState)}
                        >
                            Restart
                        </button>
                        }
                    </div>

                    {/* Landscape Layout (Desktop/Landscape Devices) */}
                    <div className="blackjack-controls-desktop">
                        {projectState === "play" &&
                        <>
                            <button
                                className="blackjack-button"
                                onClick={() => hit(deck, setDeck, playerHand, setPlayerHand, setPlayerScore)}
                            >
                                Hit
                            </button>
                            <button
                                className="blackjack-button"
                                onClick={() => stand(deck, setDeck, dealerHand, setDealerHand, setDealerScore, playerScore, setOutcomeMessage, setProjectState)}
                            >
                                Stand
                            </button>
                        </>
                        }
                        {projectState === "end" &&
                        <button
                            className="blackjack-button"
                            onClick={() => resetGame(setDeck, setPlayerHand, setDealerHand, setPlayerScore, setDealerScore, setOutcomeMessage, setProjectState)}
                        >
                            Restart
                        </button>
                        }
                    </div>

                    {/* Vertical Layout (Mobile/Tablet Portrait) */}
                    <div className="blackjack-hands-mobile">
                        <div className="blackjack-hand">
                            <h2 className="blackjack-hand-title">Player</h2>
                            <p className="blackjack-hand-score">Score: {playerScore}</p>
                            <div className="blackjack-cards">
                                {playerHand.map((card, i) => (
                                    <img
                                        key={i}
                                        className="blackjack-card"
                                        style={{
                                            transform: `translateX(-50%) rotate(${i * 15}deg)`,
                                            zIndex: i,
                                            top: `${i * 2}px`,
                                            left: '50%'
                                        }}
                                        src={card.path}
                                        alt={`Player card ${i + 1}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="blackjack-hand">
                            <h2 className="blackjack-hand-title">Dealer</h2>
                            <p className="blackjack-hand-score">Score: {dealerScore}</p>
                            <div className="blackjack-cards">
                                {dealerHand.map((card, i) => (
                                    projectState === "play" && i === 0
                                    ? <img
                                        key={i}
                                        className="blackjack-card"
                                        style={{
                                            transform: `translateX(-50%) rotate(${i * 15}deg)`,
                                            zIndex: i,
                                            top: `${i * 2}px`,
                                            left: '50%'
                                        }}
                                        src="assets/images/cards/hidden-card.png"
                                        alt="Hidden dealer card"
                                    />
                                    : <img
                                        key={i}
                                        className="blackjack-card"
                                        style={{
                                            transform: `translateX(-50%) rotate(${i * 15}deg)`,
                                            zIndex: i,
                                            top: `${i * 2}px`,
                                            left: '50%'
                                        }}
                                        src={card.path}
                                        alt={`Dealer card ${i + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Landscape Layout (Desktop/Landscape Devices) */}
                    <div className="blackjack-hands-desktop">
                        <div className="blackjack-hand">
                            <h2 className="blackjack-hand-title">Player</h2>
                            <p className="blackjack-hand-score">Score: {playerScore}</p>
                            <div className="blackjack-cards">
                                {playerHand.map((card, i) => (
                                    <img
                                        key={i}
                                        className="blackjack-card"
                                        style={{
                                            transform: `translateX(-50%) rotate(${i * 15}deg)`,
                                            zIndex: i,
                                            top: `${i * 2}px`,
                                            left: '50%'
                                        }}
                                        src={card.path}
                                        alt={`Player card ${i + 1}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="blackjack-hand">
                            <h2 className="blackjack-hand-title">Dealer</h2>
                            <p className="blackjack-hand-score">Score: {dealerScore}</p>
                            <div className="blackjack-cards">
                                {dealerHand.map((card, i) => (
                                    projectState === "play" && i === 0
                                    ? <img
                                        key={i}
                                        className="blackjack-card"
                                        style={{
                                            transform: `translateX(-50%) rotate(${i * 15}deg)`,
                                            zIndex: i,
                                            top: `${i * 2}px`,
                                            left: '50%'
                                        }}
                                        src="assets/images/cards/hidden-card.png"
                                        alt="Hidden dealer card"
                                    />
                                    : <img
                                        key={i}
                                        className="blackjack-card"
                                        style={{
                                            transform: `translateX(-50%) rotate(${i * 15}deg)`,
                                            zIndex: i,
                                            top: `${i * 2}px`,
                                            left: '50%'
                                        }}
                                        src={card.path}
                                        alt={`Dealer card ${i + 1}`}
                                    />
                                ))}
                            </div>
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