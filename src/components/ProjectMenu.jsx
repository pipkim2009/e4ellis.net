export function ProjectMenu({ setProjectState }) {
    return (
        <section className="project-menu">
            <div className="project-menu-content">
                <h1 className="project-menu-title">BlackJack</h1>
                <p className="project-menu-description">
                    Blackjack is a popular card game played in casinos around the world. The objective is to beat the dealer by having a hand value closer to 21 without exceeding it.
                </p>
                <button
                    className="project-menu-button"
                    onClick={() => setProjectState("play")}
                >
                    Play
                </button>
            </div>
        </section>
    )
}