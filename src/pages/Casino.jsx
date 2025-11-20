import { Link } from 'react-router-dom';

export function Casino() {
    return (
        <section className="casino">
            <div className="container">
                <h1 className="casino-title">E4Ellis Casino</h1>
                <p className="casino-description">This is a suite of casino games I've made</p>

                {/* Vertical Layout (Mobile/Tablet Portrait) */}
                <div className="casino-grid-mobile">
                    <div className="casino-game-container">
                        <Link className="project-button" to="/Blackjack">
                            BlackJack!
                        </Link>
                    </div>
                </div>

                {/* Landscape Layout (Desktop/Landscape Devices) */}
                <div className="casino-grid-desktop">
                    <div className="casino-game-container">
                        <Link className="project-button" to="/Blackjack">
                            BlackJack!
                        </Link>
                    </div>
                </div>

                <p className="casino-note">Sorry but cba making poker too damn complex</p>
            </div>
        </section>
    )
}
