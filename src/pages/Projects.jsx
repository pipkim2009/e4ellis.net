import { Link } from 'react-router-dom';

export function Projects() {
    return (
        <section className="projects-page">
            <div className="container">
                <h1 className="projects-page-title">Projects</h1>
                <p className="projects-page-description">A collection of projects I've worked on</p>

                {/* Vertical Layout (Mobile/Tablet Portrait) */}
                <div className="projects-page-grid-mobile">
                    <div className="projects-page-item-container">
                        <Link className="project-button project-button-secondary" to="/">
                            Coming Soon!
                        </Link>
                    </div>
                </div>

                {/* Landscape Layout (Desktop/Landscape Devices) */}
                <div className="projects-page-grid-desktop">
                    <div className="projects-page-item-container">
                        <Link className="project-button project-button-secondary" to="/">
                            Coming Soon!
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
