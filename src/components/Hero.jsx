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
        <section id="hero-section">
            <div id="hero-row">
                <div id="hero-col-1">
                    <h1 id="welcome-opening">Welcome 2,<br />
                        <span id="welcome-title">E4Ellis.net</span>
                    </h1>
                    <p id="welcome-text">This website contains personal projects made by Ellis Mark Hughes</p>
                    <span id="fun-fact-title">Fun Fact</span>
                    <span id="fun-fact-text" aria-live="polite">you have spent {timer} seconds looking at The Cow MOO!</span>
                </div>
                <div id="hero-col-2">
                    <img id="dancing-cow" src="assets/gifs/dancing-cow.gif" alt="dancing cow animation" loading="lazy"/>
                </div>
            </div>
        </section>
    )
}