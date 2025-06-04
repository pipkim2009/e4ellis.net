import { useState } from 'react';

export function Blackjack() {

    const [active, setActive] = useState(false);

    return (
        <>
            <h1>Blackjack</h1>
            <button onClick={() => setActive(!active)}>
                {active ? "Stop" : "Play"}
            </button>
        </>
    )
}