import { Link } from 'react-router-dom';

export function Projects() {
    return (
        <section id="projects-section">
            <h3 id="projects-title">Projects</h3>
            <div id="projects-row">
                <div id="projects-col-1">
                    <Link id="project-btn-1" to="/blackjack">BlackJack!</Link>
                </div>
                <div id="projects-col-2">
                    <a id="project-btn-2" href="https://keplear.com" target="_blank" rel="noopener noreferrer">keplear.com</a>
                </div>
                <div id="projects-col-3">
                    <Link id="project-btn-3" to="/music-tools">Music Tools</Link>
                </div>
            </div>
        </section>
    )
}