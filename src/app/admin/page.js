"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [showFlag, setShowFlag] = useState(false);
  const [flagMarked, setFlagMarked] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(3);
  const router = useRouter();

  useEffect(() => {
    // Check if we've shown the authorized message before
    const authState = sessionStorage.getItem('admin-authorized');
    if (authState === 'true') {
      setAccessGranted(true);
    }

    // Check if the flag has already been found
    const savedFlags = sessionStorage.getItem('foundFlags');
    if (savedFlags) {
      try {
        const flags = JSON.parse(savedFlags);
        const flag8Found = flags.some(flag => flag.flagName === 'FLAG_8' && flag.found);
        setFlagMarked(flag8Found);
      } catch (error) {
        console.error('Fout bij het controleren van flags in sessionStorage:', error);
      }
    }
  }, []);

  // Countdown effect to redirect after showing the message
  useEffect(() => {
    let timer;
    if (accessGranted && !showFlag && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (accessGranted && countdown === 0 && !showFlag) {
      setShowFlag(true);
    }

    return () => clearTimeout(timer);
  }, [accessGranted, countdown, showFlag]);

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (password.toLowerCase() === 'cyberbrein') {
      setAccessGranted(true);
      setError('');
      sessionStorage.setItem('admin-authorized', 'true');
    } else {
      setError('Onjuist wachtwoord. Probeer opnieuw.');
    }
  };

  const markFlagAsFound = () => {
    if (flagMarked) return;

    const savedFlags = sessionStorage.getItem('foundFlags');
    if (savedFlags) {
      try {
        const flags = JSON.parse(savedFlags);
        const updatedFlags = flags.map(flag => 
          flag.flagName === 'FLAG_8' ? { ...flag, found: true } : flag
        );
        sessionStorage.setItem('foundFlags', JSON.stringify(updatedFlags));
        setFlagMarked(true);
      } catch (error) {
        console.error('Fout bij het updaten van flags in sessionStorage:', error);
      }
    }
  };

  const goToBackend = () => {
    router.push('/backend');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Beheerders Panel</h1>

      {!accessGranted && (
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-center">Login Vereist</h2>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Beheerders Wachtwoord
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Voer het wachtwoord in"
                required
              />
            </div>
            
            {error && (
              <div className="text-red-500 text-sm py-1">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors"
            >
              Inloggen
            </button>
          </form>
          
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>Hint: Het wachtwoord vind je in een van de flags</p>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <Link href="/" className="text-indigo-600 hover:underline">
              Terug naar Home
            </Link>
          </div>
        </div>
      )}

      {accessGranted && !showFlag && (
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 text-center">
          <svg className="w-16 h-16 mx-auto text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h2 className="text-xl font-semibold mb-2">Toegang Verleend!</h2>
          <p className="mb-4">Je wordt doorgestuurd naar het beheerders paneel...</p>
          <p className="text-lg font-semibold">{countdown}</p>
        </div>
      )}

      {showFlag && (
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-6">
            <span className="inline-block text-4xl mb-2">🏁</span>
            <h2 className="text-xl font-semibold">Flag Gevonden!</h2>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <p className="font-mono text-center text-lg break-all">FLAG_8&#123;administrator_access&#125;</p>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            Gefeliciteerd! Je hebt de admin pagina ontdekt en de bijbehorende flag gevonden.
          </p>
          
          <button
            onClick={markFlagAsFound}
            className={`w-full p-3 rounded-lg transition-colors mb-4 ${
              flagMarked 
                ? 'bg-green-500 hover:bg-green-400 cursor-default'
                : 'bg-indigo-600 hover:bg-indigo-500'
            } text-white`}
            disabled={flagMarked}
          >
            {flagMarked ? "Flag Opgeslagen!" : "Flag Opslaan"}
          </button>

          <button
            onClick={goToBackend}
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Ga naar Backend Paneel
          </button>
          
          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <Link href="/" className="text-indigo-600 hover:underline">
              Terug naar Home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}