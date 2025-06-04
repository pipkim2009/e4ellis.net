export function Hero() {
    return (
        <section id="hero-section">
            <div id="hero-row">
                <div id="hero-col-1">
                    <h1 id="welcome-opening">Welcome 2,<br />
                        <span id="welcome-title">E4Ellis.net</span>
                    </h1>
                    <p id="welcome-text">This website contains personal projects made by Ellis Mark Hughes</p>
                    <span id="fun-fact-title">Fun Fact</span>
                    <span id="fun-fact-text" aria-live="polite">Your device is so bad that not even this fact can load.</span>
                </div>
                <div id="hero-col-2">
                    <img id="dancing-cow" src="/src/assets/gifs/dancing-cow.gif" alt="dancing cow animation" loading="lazy"/>
                </div>
            </div>
        </section>
    )
}