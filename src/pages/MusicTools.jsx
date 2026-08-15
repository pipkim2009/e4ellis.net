import { useState } from 'react';

const NOTES = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
const CHORD_QUALITIES = ['maj', 'min', '7', 'nin7', 'maj7', 'power(5)'];
const CHORD_FORMS = ['E', 'A', 'D', 'G', 'C'];

const randomOf = (arr) => arr[Math.floor(Math.random() * arr.length)];

function generateFretboardList() {
    return Array.from({ length: 12 }, () => randomOf(NOTES));
}

function generateChordList() {
    return Array.from({ length: 12 }, () => {
        const note = randomOf(NOTES);
        const quality = randomOf(CHORD_QUALITIES);
        const form = randomOf(CHORD_FORMS);
        return `${note} ${quality} (${form} form)`;
    });
}

export function MusicTools() {
    const [fretboardNotes] = useState(generateFretboardList);
    const [chords] = useState(generateChordList);

    return (
        <section id="music-tools-section">
            <h1 id="project-title">Music Tools</h1>

            <div id="music-tools-row">
                <div className="music-tool-col">
                    <h2 className="music-tool-title">Fretboard Learner</h2>
                    <div className="music-tool-list">
                        {fretboardNotes.map((note, i) => (
                            <div className="music-tool-list-item" key={i}>{note}</div>
                        ))}
                    </div>
                </div>

                <div className="music-tool-col">
                    <h2 className="music-tool-title">Chord Learner</h2>
                    <div className="music-tool-list">
                        {chords.map((chord, i) => (
                            <div className="music-tool-list-item" key={i}>{chord}</div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
