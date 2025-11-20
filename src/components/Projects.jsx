import { Link } from 'react-router-dom';

export function Projects() {
    return (
        <section className="projects">
            <div className="container">
                <h3 className="projects-title">Projects</h3>

                {/* Vertical Layout (Mobile/Tablet Portrait) */}
                <div className="projects-grid-mobile">
                    <div className="project-button-container">
                        <Link className="project-button" to="/Blackjack">
                            BlackJack!
                        </Link>
                    </div>
                    <div className="project-button-container">
                        <Link className="project-button project-button-secondary" to="/">
                            Coming Soon!
                        </Link>
                    </div>
                    <div className="project-button-container">
                        <Link className="project-button project-button-secondary" to="/">
                            Coming Soon!
                        </Link>
                    </div>
                </div>

                {/* Landscape Layout (Desktop/Landscape Devices) */}
                <div className="projects-grid-desktop">
                    <div className="project-button-container">
                        <Link className="project-button" to="/Blackjack">
                            BlackJack!
                        </Link>
                    </div>
                    <div className="project-button-container">
                        <Link className="project-button project-button-secondary" to="/">
                            Coming Soon!
                        </Link>
                    </div>
                    <div className="project-button-container">
                        <Link className="project-button project-button-secondary" to="/">
                            Coming Soon!
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}