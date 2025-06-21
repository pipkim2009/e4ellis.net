import { useState } from 'react';
import { ProjectMenu } from '../components/ProjectMenu.jsx';

export function Blackjack() {

    const [active, setActive] = useState(false);

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
                        <span id="bj-player-hand-elm">Hand: </span>
                        <div id="bj-player-cards-container"></div>
                    </div>
                    <div id="bj-dealer-col">
                        <span id="bj-dealer-title">Dealer</span>
                        <span id="bj-dealer-hand-elm">Hand: </span>
                        <div id="bj-dealer-cards-container"></div>
                    </div>
                </div>
            </section>
            
            : <ProjectMenu setActiveL={setActive} />
            }
        </>
    )
}