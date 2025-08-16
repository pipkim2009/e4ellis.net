import { Link } from 'react-router-dom';

export function Projects() {
    return (
        <section className="bg-gray-900 text-gray-100 py-12">
            <div className="container mx-auto px-4">
                <h3 className="text-3xl lg:text-4xl font-black text-center mb-8">Projects</h3>
                
                {/* Vertical Layout (Mobile/Tablet Portrait) */}
                <div className="flex flex-col gap-6 lg:hidden">
                    <div className="text-center">
                        <Link 
                            className="inline-block w-full max-w-md bg-transparent rounded-lg border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-gray-100 transition-colors duration-200 py-4 px-6 text-xl font-medium whitespace-nowrap text-center" 
                            to="/Blackjack"
                        >
                            BlackJack!
                        </Link>
                    </div>
                    <div className="text-center">
                        <Link 
                            className="inline-block w-full max-w-md bg-transparent rounded-lg border-2 border-gray-100 text-gray-100 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200 py-4 px-6 text-xl font-medium whitespace-nowrap text-center" 
                            to="/"
                        >
                            Coming Soon!
                        </Link>
                    </div>
                    <div className="text-center">
                        <Link 
                            className="inline-block w-full max-w-md bg-transparent rounded-lg border-2 border-gray-100 text-gray-100 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200 py-4 px-6 text-xl font-medium whitespace-nowrap text-center" 
                            to="/"
                        >
                            Coming Soon!
                        </Link>
                    </div>
                </div>

                {/* Landscape Layout (Desktop/Landscape Devices) */}
                <div className="hidden lg:flex lg:justify-center lg:gap-8">
                    <div className="text-center">
                        <Link 
                            className="inline-block w-64 bg-transparent rounded-lg border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-gray-100 transition-colors duration-200 py-4 px-6 text-2xl font-medium whitespace-nowrap text-center" 
                            to="/Blackjack"
                        >
                            BlackJack!
                        </Link>
                    </div>
                    <div className="text-center">
                        <Link 
                            className="inline-block w-64 bg-transparent rounded-lg border-2 border-gray-100 text-gray-100 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200 py-4 px-6 text-2xl font-medium whitespace-nowrap text-center" 
                            to="/"
                        >
                            Coming Soon!
                        </Link>
                    </div>
                    <div className="text-center">
                        <Link 
                            className="inline-block w-64 bg-transparent rounded-lg border-2 border-gray-100 text-gray-100 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200 py-4 px-6 text-2xl font-medium whitespace-nowrap text-center" 
                            to="/"
                        >
                            Coming Soon!
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}