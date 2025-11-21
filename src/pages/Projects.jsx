import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Projects() {
    const { user, profile, loading } = useAuth();

    if (loading) {
        return (
            <section className="projects-page">
                <div className="container">
                    <h1 className="projects-page-title">Loading...</h1>
                </div>
            </section>
        );
    }

    if (!user) {
        return (
            <section className="projects-page">
                <div className="container">
                    <h1 className="projects-page-title">Projects</h1>
                    <p className="projects-page-description">Please log in to an approved account.</p>
                </div>
            </section>
        );
    }

    if (profile && !profile.approved) {
        return (
            <section className="projects-page">
                <div className="container">
                    <h1 className="projects-page-title">Projects</h1>
                    <p className="projects-page-description">Please log in to an approved account.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="projects-page">
            <div className="container">
                <h1 className="projects-page-title">Projects</h1>
                <p className="projects-page-description">A collection of projects I've worked on</p>

                {/* Vertical Layout (Mobile/Tablet Portrait) */}
                <div className="projects-page-grid-mobile">
                    <div className="projects-page-item-container">
                        <a className="project-button" href="https://keplear.com" target="_blank" rel="noopener noreferrer">
                            keplear.com
                        </a>
                    </div>
                </div>

                {/* Landscape Layout (Desktop/Landscape Devices) */}
                <div className="projects-page-grid-desktop">
                    <div className="projects-page-item-container">
                        <a className="project-button" href="https://keplear.com" target="_blank" rel="noopener noreferrer">
                            keplear.com
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
