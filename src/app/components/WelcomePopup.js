import { useState } from 'react';
import { saveSession, loadSession } from '../../utils/sessionManager';
import { flags as initialFlags } from '../../flags';
import WalkthroughPopup from './WalkthroughPopup';

export default function WelcomePopup({ onClose }) {
    const [username, setUsername] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showWalkthrough, setShowWalkthrough] = useState(false);
    const [isNewUser, setIsNewUser] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (!username.trim()) {
            setError('Vul een gebruikersnaam in');
            setIsLoading(false);
            return;
        }

        if (!code.trim() || !/^\d{4}$/.test(code)) {
            setError('Vul een geldige 4-cijferige code in');
            setIsLoading(false);
            return;
        }

        try {
            // Probeer eerst in te loggen met bestaande gebruiker
            const sessionData = await loadSession(username);
            
            if (sessionData && sessionData.code === code) {
                // Bestaande gebruiker gevonden, laad voortgang
                localStorage.setItem('username', username);
                
                // Sla alle voortgang op in sessionStorage
                if (sessionData.flags && sessionData.flags.length > 0) {
                    // Merge saved flags with initial flags to ensure all flags are present
                    const mergedFlags = initialFlags.map(initialFlag => {
                        const savedFlag = sessionData.flags.find(f => f.id === initialFlag.id);
                        return savedFlag || initialFlag;
                    });
                    sessionStorage.setItem('foundFlags', JSON.stringify(mergedFlags));
                } else {
                    sessionStorage.setItem('foundFlags', JSON.stringify(initialFlags));
                }
                
                if (sessionData.gameProgress) {
                    sessionStorage.setItem('gameProgress', JSON.stringify(sessionData.gameProgress));
                }
                if (sessionData.categories) {
                    sessionStorage.setItem('categories', JSON.stringify(sessionData.categories));
                }
                if (sessionData.hints) {
                    sessionStorage.setItem('hints', JSON.stringify(sessionData.hints));
                }
                
                setIsLoading(false);
                onClose();
            } else {
                // Geen bestaande gebruiker gevonden, maak nieuw account aan
                const initialData = {
                    username,
                    code,
                    flags: initialFlags,
                    gameProgress: {
                        completedChallenges: [],
                        unlockedCategories: [],
                        lastPlayed: new Date().toISOString()
                    },
                    categories: [],
                    hints: [],
                    createdAt: new Date().toISOString()
                };

                await saveSession(username, initialData);
                localStorage.setItem('username', username);
                
                // Initialiseer sessionStorage met lege data
                sessionStorage.setItem('foundFlags', JSON.stringify(initialFlags));
                sessionStorage.setItem('gameProgress', JSON.stringify(initialData.gameProgress));
                sessionStorage.setItem('categories', JSON.stringify([]));
                sessionStorage.setItem('hints', JSON.stringify([]));
                
                setIsLoading(false);
                setIsNewUser(true);
                setShowWalkthrough(true);
            }
        } catch (error) {
            console.error('Error during login/signup:', error);
            setError('Er is een fout opgetreden bij het verwerken van je account');
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
                    Maak een account aan met een gebruikersnaam en een geheime code van 4 cijfers.
                    Als je al een account hebt, log dan in om verder te gaan met je avontuur!
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                            Gebruikersnaam
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Voer gebruikersnaam in"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
                            4-cijferige code
                        </label>
                        <input
                            type="password"
                            id="code"
                            value={code}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                                setCode(value);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Voer 4-cijferige code in"
                            maxLength={4}
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
                        {isLoading ? 'Bezig...' : 'Doorgaan'}
                    </button>
                </form>
            </div>
        </div>
    );
} 