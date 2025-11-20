import { Link } from 'react-router-dom';

export function Header() {
    return (
        <header className="header">
            <div className="container header-container">
                <Link className="header-link" to="/">
                    E4Ellis.net
                </Link>
                <nav className="header-nav">
                    <Link className="nav-link" to="/projects">Projects</Link>
                </nav>
            </div>
        </header>
    )
}