export function ProjectMenu({ setProjectState }) {
    return (
        <section id="project-menu-section">
            <h1 id="project-title">BlackJack</h1>
            <p id="project-menu-info">Blackjack is a popular card game played in casinos around the world. The objective is to beat the dealer by having a hand value closer to 21 without exceeding it.</p>
            <button id="project-menu-play-button" onClick={() => setProjectState("play")} >Play</button>
        </section>
    )
}