import { useState, useEffect, useCallback } from 'react';

const NOTES = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
const CHORD_QUALITIES = ['maj', 'min', '7', 'nin 7', 'maj 7', 'power(5)'];
const CHORD_FORMS = ['E', 'A', 'D', 'G', 'C'];

const CHORD_FILTERS_KEY = 'musicToolsChordFilters';

const randomOf = (arr) => arr[Math.floor(Math.random() * arr.length)];

const randomFretboardNote = () => randomOf(NOTES);

const randomChordFrom = (filters) => {
    const base = `${randomOf(filters.roots)} ${randomOf(filters.qualities)}`;
    return filters.forms.length ? `${base} (${randomOf(filters.forms)} form)` : base;
};

const defaultChordFilters = () => ({ roots: [...NOTES], qualities: [...CHORD_QUALITIES], forms: [...CHORD_FORMS] });

function loadChordFilters() {
    try {
        const parsed = JSON.parse(localStorage.getItem(CHORD_FILTERS_KEY));
        if (parsed?.roots?.length && parsed?.qualities?.length && Array.isArray(parsed?.forms)) {
            return parsed;
        }
    } catch {
        // fall through to defaults
    }
    return defaultChordFilters();
}

function speak(text, enabled) {
    if (!enabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
}

function usePersistedToggle(key) {
    const [enabled, setEnabled] = useState(() => localStorage.getItem(key) === 'true');

    const toggle = useCallback((e) => {
        e.stopPropagation();
        setEnabled(v => {
            const next = !v;
            localStorage.setItem(key, String(next));
            return next;
        });
    }, [key]);

    return [enabled, toggle];
}

function FlashcardDrill({ generateItem, onExit }) {
    const [value, setValue] = useState(generateItem);
    const [count, setCount] = useState(1);
    const [speechEnabled, toggleSpeech] = usePersistedToggle('musicToolsSpeech');
    const [voiceControlEnabled, toggleVoiceControl] = usePersistedToggle('musicToolsVoiceControl');

    const advance = useCallback(() => {
        setValue(generateItem());
        setCount(c => c + 1);
    }, [generateItem]);

    useEffect(() => {
        window.addEventListener('keydown', advance);
        return () => window.removeEventListener('keydown', advance);
    }, [advance]);

    useEffect(() => {
        speak(value, speechEnabled);
        return () => window.speechSynthesis?.cancel();
    }, [value, speechEnabled]);

    useEffect(() => {
        if (!voiceControlEnabled) return;

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return;

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        let triggered = false;

        recognition.onresult = (event) => {
            const latest = event.results[event.results.length - 1];
            const said = latest[0].transcript.trim().toLowerCase();
            if (!triggered && said.includes('next')) {
                triggered = true;
                advance();
                recognition.abort();
            }
        };

        recognition.onend = () => {
            triggered = false;
            recognition.start();
        };
        recognition.start();

        return () => {
            recognition.onend = null;
            recognition.abort();
        };
    }, [voiceControlEnabled, advance]);

    return (
        <section id="flashcard-section" onClick={advance}>
            <button id="flashcard-exit-button" onClick={(e) => { e.stopPropagation(); onExit(); }}>
                Back
            </button>
            <div id="flashcard-toggle-row">
                <button
                    className={`flashcard-toggle-button ${speechEnabled ? 'flashcard-toggle-button-active' : ''}`}
                    onClick={toggleSpeech}
                    aria-label="Toggle read-aloud"
                >
                    🔊
                </button>
                <button
                    className={`flashcard-toggle-button ${voiceControlEnabled ? 'flashcard-toggle-button-active' : ''}`}
                    onClick={toggleVoiceControl}
                    aria-label="Toggle voice-activated next"
                >
                    🎤
                </button>
            </div>
            <div id="flashcard-count">{count}</div>
            <div id="flashcard-value">{value}</div>
        </section>
    );
}

function ChordSettings({ filters, onChange, onStart, onBack }) {
    const canStart = filters.roots.length > 0 && filters.qualities.length > 0;

    const toggle = (key, item) => {
        onChange({
            ...filters,
            [key]: filters[key].includes(item)
                ? filters[key].filter(x => x !== item)
                : [...filters[key], item],
        });
    };

    const group = (title, key, options) => (
        <div className="chord-settings-group">
            <h2 className="chord-settings-group-title">{title}</h2>
            <div className="chord-settings-options">
                {options.map(option => (
                    <label className="chord-settings-option" key={option}>
                        <input
                            type="checkbox"
                            checked={filters[key].includes(option)}
                            onChange={() => toggle(key, option)}
                        />
                        {option}
                    </label>
                ))}
            </div>
        </div>
    );

    return (
        <section id="chord-settings-section">
            <h1 id="project-title">Chord Learner Settings</h1>
            <div id="chord-settings-groups">
                {group('Roots', 'roots', NOTES)}
                {group('Chord Types', 'qualities', CHORD_QUALITIES)}
                {group('Forms (optional)', 'forms', CHORD_FORMS)}
            </div>
            <div id="chord-settings-button-row">
                <button id="chord-settings-back-button" onClick={onBack}>Back</button>
                <button id="chord-settings-start-button" onClick={onStart} disabled={!canStart}>Start</button>
            </div>
        </section>
    );
}

export function MusicTools() {
    const [screen, setScreen] = useState('select');
    const [chordFilters, setChordFilters] = useState(loadChordFilters);

    useEffect(() => {
        localStorage.setItem(CHORD_FILTERS_KEY, JSON.stringify(chordFilters));
    }, [chordFilters]);

    if (screen === 'fretboard') {
        return <FlashcardDrill generateItem={randomFretboardNote} onExit={() => setScreen('select')} />;
    }

    if (screen === 'chord-settings') {
        return (
            <ChordSettings
                filters={chordFilters}
                onChange={setChordFilters}
                onStart={() => setScreen('chords')}
                onBack={() => setScreen('select')}
            />
        );
    }

    if (screen === 'chords') {
        return <FlashcardDrill generateItem={() => randomChordFrom(chordFilters)} onExit={() => setScreen('select')} />;
    }

    return (
        <section id="music-tools-select-section">
            <h1 id="project-title">Music Tools</h1>
            <div id="music-tools-select-row">
                <button className="music-tool-select-button" onClick={() => setScreen('fretboard')}>Fretboard Learner</button>
                <button className="music-tool-select-button" onClick={() => setScreen('chord-settings')}>Chord Learner</button>
            </div>
        </section>
    );
}
