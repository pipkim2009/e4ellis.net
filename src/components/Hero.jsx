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
        <section className="bg-gray-100 min-h-[50vh] lg:min-h-[60vh] flex items-center">
            <div className="container mx-auto px-4">
                {/* Vertical Layout (Mobile/Tablet Portrait) */}
                <div className="flex flex-col lg:hidden pt-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-normal mb-4">
                            Welcome 2,<br />
                            <span className="text-blue-500 font-black">E4Ellis.net</span>
                        </h1>
                        <p className="text-lg mb-6">This website contains personal projects made by Ellis Mark Hughes</p>
                        <div className="space-y-2">
                            <span className="inline-block bg-blue-500 text-gray-100 rounded px-4 py-2 text-base font-semibold">Fun Fact</span>
                            <p className="text-blue-500 text-base" aria-live="polite">you have spent {timer} seconds looking at The Cow MOO!</p>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <img 
                            className="w-64 h-64 object-contain" 
                            src="assets/gifs/dancing-cow.gif" 
                            alt="dancing cow animation" 
                            loading="lazy"
                        />
                    </div>
                </div>

                {/* Landscape Layout (Desktop/Landscape Devices) */}
                <div className="hidden lg:flex lg:items-center">
                    <div className="flex-1 text-left">
                        <h1 className="text-5xl font-normal mb-6">
                            Welcome 2,<br />
                            <span className="text-blue-500 font-black">E4Ellis.net</span>
                        </h1>
                        <p className="text-xl mb-8 max-w-2xl">This website contains personal projects made by Ellis Mark Hughes</p>
                        <div className="space-y-3">
                            <span className="inline-block bg-blue-500 text-gray-100 rounded px-6 py-3 text-lg font-semibold">Fun Fact</span>
                            <p className="text-blue-500 text-lg" aria-live="polite">you have spent {timer} seconds looking at The Cow MOO!</p>
                        </div>
                    </div>
                    <div className="flex-1 flex justify-end">
                        <img 
                            className="w-96 h-96 object-contain" 
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