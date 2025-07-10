'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function NotFound() {
  const [showFlagInfo, setShowFlagInfo] = useState(false);
  const flagValue = 'FLAG_7{zero_day_found}';
  
  // Markeer de flag als gevonden wanneer deze pagina wordt bezocht
  useEffect(() => {
    // Wait a bit to ensure the sessionStorage is loaded
    const timer = setTimeout(() => {
      const savedFlags = sessionStorage.getItem('foundFlags');
      if (savedFlags) {
        try {
          const flags = JSON.parse(savedFlags);
          const updatedFlags = flags.map(flag => 
            flag.flagName === 'FLAG_7' ? { ...flag, found: true } : flag
          );
          sessionStorage.setItem('foundFlags', JSON.stringify(updatedFlags));
        } catch (error) {
          console.error('Error updating flags in sessionStorage:', error);
        }
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-6">Pagina niet gevonden</h2>
        
        <p className="text-lg mb-8">
          Oeps! De pagina die je zoekt bestaat niet. Maar je hebt wel een geheime flag gevonden!
        </p>
        
        <button 
          onClick={() => setShowFlagInfo(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
        >
          <span className="mr-2">🚩</span> Toon Flag
        </button>
        
        <div className="mt-6">
          <Link href="/">
            <button className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition-colors duration-300">
              Terug naar Home
            </button>
          </Link>
        </div>
        
        <div className="mt-12 p-4 bg-gray-100 rounded-lg text-left">
          <h3 className="text-lg font-semibold mb-2">Tip:</h3>
          <p>
            Soms leiden verloren paden naar onverwachte ontdekkingen. 
            Deze 404 pagina bevat een flag die je kunt toevoegen aan je verzameling.
          </p>
        </div>
      </div>
      
      {/* Popup voor flag informatie */}
      <Popup open={showFlagInfo} onClose={() => setShowFlagInfo(false)} modal>
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Je hebt een flag gevonden! 🎉</h2>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <p className="font-mono text-lg break-all">{flagValue}</p>
          </div>
          <p className="mb-4">
            Deze flag is automatisch toegevoegd aan je verzameling. Ga naar de{' '}
            <Link href="/flags" className="text-blue-600 hover:underline">
              flags pagina
            </Link>{' '}
            om je voortgang te bekijken.
          </p>
          <button
            onClick={() => setShowFlagInfo(false)}
            className="w-full p-3 mt-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition duration-200 ease-in-out"
          >
            Sluiten
          </button>
        </div>
      </Popup>
    </div>
  );
} 