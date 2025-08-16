import { Link } from 'react-router-dom';

export function Header() {
    return (
        <header className="flex bg-gray-900 h-16 lg:h-20 items-center shadow-lg">
            <div className="container mx-auto px-4">
                <Link 
                    className="text-gray-100 no-underline text-xl lg:text-3xl font-black hover:text-blue-500 transition-colors duration-200" 
                    to="/"
                >
                    E4Ellis.net
                </Link>
            </div>
        </header>
    )
}