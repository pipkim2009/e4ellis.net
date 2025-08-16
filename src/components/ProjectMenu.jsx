export function ProjectMenu({ setProjectState }) {
    return (
        <section className="flex flex-col items-center justify-center text-center bg-gray-100 text-gray-900 min-h-[calc(100vh-8rem)] lg:min-h-[calc(100vh-10rem)] p-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl lg:text-5xl font-bold mb-6">BlackJack</h1>
                <p className="text-base lg:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                    Blackjack is a popular card game played in casinos around the world. The objective is to beat the dealer by having a hand value closer to 21 without exceeding it.
                </p>
                <button 
                    className="border-2 border-blue-500 bg-transparent text-blue-500 rounded-lg py-4 px-8 text-xl lg:text-3xl font-bold hover:bg-blue-500 hover:text-gray-100 transition-colors duration-200 w-full max-w-xs" 
                    onClick={() => setProjectState("play")}
                >
                    Play
                </button>
            </div>
        </section>
    )
}