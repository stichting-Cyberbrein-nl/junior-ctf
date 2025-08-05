import { useState } from 'react';
import { flags as initialFlags } from '../../flags';
import WalkthroughPopup from './WalkthroughPopup';

export default function WelcomePopup({ onClose }) {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showWalkthrough, setShowWalkthrough] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (!username.trim()) {
            setError('Vul een gebruikersnaam in');
            setIsLoading(false);
            return;
        }

        try {
            // Sla gebruikersnaam op in localStorage
            localStorage.setItem('username', username);
            
            // Initialiseer flags in sessionStorage (alleen browser opslag)
            sessionStorage.setItem('foundFlags', JSON.stringify(initialFlags));
            
            // Initialiseer andere game data in sessionStorage
            sessionStorage.setItem('gameProgress', JSON.stringify({
                completedChallenges: [],
                unlockedCategories: [],
                lastPlayed: new Date().toISOString()
            }));
            sessionStorage.setItem('categories', JSON.stringify([]));
            sessionStorage.setItem('hints', JSON.stringify([]));
            sessionStorage.setItem('hintCount', JSON.stringify(0));
            sessionStorage.setItem('solvedCodes', JSON.stringify([]));
            
            setIsLoading(false);
            setShowWalkthrough(true);
        } catch (error) {
            console.error('Error during setup:', error);
            setError('Er is een fout opgetreden bij het instellen van je account');
            setIsLoading(false);
        }
    };

    const handleWalkthroughClose = () => {
        setShowWalkthrough(false);
        onClose();
    };

    if (showWalkthrough) {
        return <WalkthroughPopup onClose={handleWalkthroughClose} />;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
                <h2 className="text-2xl font-bold mb-4">Welkom bij Cyberbrein!</h2>
                <p className="mb-4">
                    Hallo! Welkom bij Cyberbrein, jouw spannende avontuur in de wereld van computers en internet.
                    Hier ga je op zoek naar verstopte vlaggetjes (flags) en leer je spelenderwijs over veilig internetten!
                </p>
                <p className="mb-6">
                    Voer je naam in om te beginnen met je avontuur. Je voortgang wordt opgeslagen in je browser. Je kunt op de flag pagina een certificaat krijgen voor je vindingen!
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                            Je naam
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Voer je naam in"
                            disabled={isLoading}
                        />
                        {error && (
                            <p className="mt-2 text-sm text-red-600">{error}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                        {isLoading ? 'Bezig...' : 'Start je avontuur!'}
                    </button>
                </form>
            </div>
        </div>
    );
} 