import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function Header() {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <header>
            <Link id="header-title" to="/">E4Ellis.net</Link>
            <button
                id="theme-toggle-button"
                onClick={() => setTheme(t => (t === 'light' ? 'dark' : 'light'))}
                aria-label="Toggle dark mode"
            >
                {theme === 'light' ? '🌙' : '☀️'}
            </button>
        </header>
    )
}
