import { Link } from 'react-router-dom';

export function Header() {
    return (
        <header className="header">
            <div className="container">
                <Link className="header-link" to="/">
                    E4Ellis.net
                </Link>
            </div>
        </header>
    )
}