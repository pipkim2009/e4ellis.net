import { useState, useEffect } from 'react';
import { calculateTime } from '../timer.js';

export function Hero() {
    const [timer, setTimer] = useState(() => {
        if (localStorage.getItem('timer') === null) {
            localStorage.setItem('timer', 0);
        }
        return Number(localStorage.getItem('timer'));
    })

    useEffect(() => {
        const interval = setInterval(() => {
            calculateTime(setTimer);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="hero">
            <div className="container">
                {/* Vertical Layout (Mobile/Tablet Portrait) */}
                <div className="hero-layout-mobile">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            Welcome to<br />
                            <span className="hero-title-highlight">E4Ellis.net</span>
                        </h1>
                        <p className="hero-description">This website contains personal projects made by Ellis Mark Hughes</p>
                        <div className="hero-fun-fact">
                            <span className="hero-badge">Fun Fact</span>
                            <p className="hero-timer" aria-live="polite">You have spent {timer} seconds looking at The Cow MOO!</p>
                        </div>
                    </div>
                    <div className="hero-image-container">
                        <img
                            className="hero-image"
                            src="assets/gifs/dancing-cow.gif"
                            alt="dancing cow animation"
                            loading="lazy"
                        />
                    </div>
                </div>

                {/* Landscape Layout (Desktop/Landscape Devices) */}
                <div className="hero-layout-desktop">
                    <div className="hero-content-desktop">
                        <h1 className="hero-title">
                            Welcome to<br />
                            <span className="hero-title-highlight">E4Ellis.net</span>
                        </h1>
                        <p className="hero-description">This website contains personal projects made by Ellis Mark Hughes</p>
                        <div className="hero-fun-fact">
                            <span className="hero-badge">Fun Fact</span>
                            <p className="hero-timer" aria-live="polite">You have spent {timer} seconds looking at The Cow MOO!</p>
                        </div>
                    </div>
                    <div className="hero-image-desktop">
                        <img
                            className="hero-image"
                            src="assets/gifs/dancing-cow.gif"
                            alt="dancing cow animation"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}