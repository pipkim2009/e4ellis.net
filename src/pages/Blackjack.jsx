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
            <section className="bg-gray-100 text-gray-900 min-h-[calc(100vh-8rem)] lg:min-h-[calc(100vh-10rem)] p-4">
                <div className="container mx-auto max-w-6xl">
                    <h1 className="text-3xl lg:text-4xl font-bold text-center mb-6">BlackJack</h1>
                    
                    {outcomeMessage != "" &&
                        <div className="mx-auto text-blue-700 bg-blue-100 w-full max-w-4xl p-4 text-base lg:text-lg border-2 border-blue-500 rounded-lg mb-6 text-center">
                            {outcomeMessage}
                        </div>
                    }
                    
                    {/* Vertical Layout (Mobile/Tablet Portrait) */}
                    <div className="flex flex-col gap-4 mb-8 lg:hidden">
                        {projectState === "play" &&
                        <>
                            <button 
                                className="border-2 border-blue-500 bg-transparent text-blue-500 rounded-lg py-3 px-6 text-lg font-bold hover:bg-blue-500 hover:text-gray-100 transition-colors duration-200" 
                                onClick={() => hit(deck, setDeck, playerHand, setPlayerHand, setPlayerScore)}
                            >
                                Hit
                            </button>
                            <button 
                                className="border-2 border-blue-500 bg-transparent text-blue-500 rounded-lg py-3 px-6 text-lg font-bold hover:bg-blue-500 hover:text-gray-100 transition-colors duration-200" 
                                onClick={() => stand(deck, setDeck, dealerHand, setDealerHand, setDealerScore, playerScore, setOutcomeMessage, setProjectState)}
                            >
                                Stand
                            </button>
                        </>
                        }
                        {projectState === "end" &&
                        <button 
                            className="border-2 border-blue-500 bg-transparent text-blue-500 rounded-lg py-3 px-6 text-lg font-bold hover:bg-blue-500 hover:text-gray-100 transition-colors duration-200" 
                            onClick={() => resetGame(setDeck, setPlayerHand, setDealerHand, setPlayerScore, setDealerScore, setOutcomeMessage, setProjectState)}
                        >
                            Restart
                        </button>
                        }
                    </div>

                    {/* Landscape Layout (Desktop/Landscape Devices) */}
                    <div className="hidden lg:flex lg:justify-center lg:gap-8">
                        {projectState === "play" &&
                        <>
                            <button 
                                className="border-2 border-blue-500 bg-transparent text-blue-500 rounded-lg py-4 px-8 text-xl font-bold hover:bg-blue-500 hover:text-gray-100 transition-colors duration-200 w-48" 
                                onClick={() => hit(deck, setDeck, playerHand, setPlayerHand, setPlayerScore)}
                            >
                                Hit
                            </button>
                            <button 
                                className="border-2 border-blue-500 bg-transparent text-blue-500 rounded-lg py-4 px-8 text-xl font-bold hover:bg-blue-500 hover:text-gray-100 transition-colors duration-200 w-48" 
                                onClick={() => stand(deck, setDeck, dealerHand, setDealerHand, setDealerScore, playerScore, setOutcomeMessage, setProjectState)}
                            >
                                Stand
                            </button>
                        </>
                        }
                        {projectState === "end" &&
                        <button 
                            className="border-2 border-blue-500 bg-transparent text-blue-500 rounded-lg py-4 px-8 text-xl font-bold hover:bg-blue-500 hover:text-gray-100 transition-colors duration-200 w-48" 
                            onClick={() => resetGame(setDeck, setPlayerHand, setDealerHand, setPlayerScore, setDealerScore, setOutcomeMessage, setProjectState)}
                        >
                            Restart
                        </button>
                        }
                    </div>
                    
                    {/* Vertical Layout (Mobile/Tablet Portrait) */}
                    <div className="flex flex-col gap-8 lg:hidden">
                        <div className="flex flex-col items-center text-center">
                            <h2 className="text-2xl font-bold mb-2">Player</h2>
                            <p className="text-xl mb-4">Score: {playerScore}</p>
                            <div className="relative w-full h-56 flex justify-center">
                                {playerHand.map((card, i) => (
                                    <img 
                                        key={i} 
                                        className="absolute w-28 h-auto object-contain" 
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
                        
                        <div className="flex flex-col items-center text-center">
                            <h2 className="text-2xl font-bold mb-2">Dealer</h2>
                            <p className="text-xl mb-4">Score: {dealerScore}</p>
                            <div className="relative w-full h-56 flex justify-center">
                                {dealerHand.map((card, i) => (
                                    projectState === "play" && i === 0
                                    ? <img 
                                        key={i} 
                                        className="absolute w-28 h-auto object-contain" 
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
                                        className="absolute w-28 h-auto object-contain" 
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
                    <div className="hidden lg:flex lg:justify-between">
                        <div className="flex-1 flex flex-col items-center text-center">
                            <h2 className="text-2xl lg:text-3xl font-bold mb-2">Player</h2>
                            <p className="text-xl lg:text-2xl mb-4">Score: {playerScore}</p>
                            <div className="relative w-full h-80 flex justify-center">
                                {playerHand.map((card, i) => (
                                    <img 
                                        key={i} 
                                        className="absolute w-36 h-auto object-contain" 
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
                        
                        <div className="flex-1 flex flex-col items-center text-center">
                            <h2 className="text-2xl lg:text-3xl font-bold mb-2">Dealer</h2>
                            <p className="text-xl lg:text-2xl mb-4">Score: {dealerScore}</p>
                            <div className="relative w-full h-80 flex justify-center">
                                {dealerHand.map((card, i) => (
                                    projectState === "play" && i === 0
                                    ? <img 
                                        key={i} 
                                        className="absolute w-36 h-auto object-contain" 
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
                                        className="absolute w-36 h-auto object-contain" 
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