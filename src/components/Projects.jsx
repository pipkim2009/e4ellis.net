import { Link } from 'react-router-dom';

export function Projects() {
    return (
        <section id="projects-section">
            <h3 id="projects-title">Projects</h3>
            <div id="projects-row">
                <div id="projects-col-1">
                    <Link id="project-btn-1" to="/Blackjack">BlackJack!</Link>
                </div>
                <div id="projects-col-2">
                    <Link id="project-btn-2" to="/">Coming Soon!</Link>
                </div>
                <div id="projects-col-3">
                    <Link id="project-btn-3" to="/">Coming Soon!</Link>
                </div>
            </div>
        </section>
    )
}