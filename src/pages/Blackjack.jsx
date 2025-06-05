import { useState } from 'react';
import { ProjectMenu } from '../components/ProjectMenu.jsx';

export function Blackjack() {

    const [active, setActive] = useState(false);

    return (
        <>
            {active ? null : <ProjectMenu setActiveL={setActive} />}
        </>
    )
}