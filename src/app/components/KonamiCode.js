'use client';

import { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import Link from 'next/link';
import FlagPopup from './FlagPopup';

const KonamiCode = () => {
  const [keys, setKeys] = useState([]);
  const [showSecret, setShowSecret] = useState(false);
  const [flagFound, setFlagFound] = useState(false);
  
  const konamiCode = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ];

  useEffect(() => {
    // Update sessionStorage om de flag als gevonden te markeren
    const markFlagAsFound = () => {
      const savedFlags = sessionStorage.getItem('foundFlags');
      if (savedFlags) {
        try {
          const flags = JSON.parse(savedFlags);
          // Controleer of de flag al gevonden is
          const flagAlreadyFound = flags.some(flag => 
            flag.flagName === 'FLAG_KONAMI' && flag.found
          );
          
          if (flagAlreadyFound) {
            setFlagFound(true);
          } else {
            // Zoek FLAG_KONAMI in de lijst
            const konamiFlag = flags.find(flag => flag.flagName === 'FLAG_KONAMI');
            if (konamiFlag) {
              // Update de flag
              const updatedFlags = flags.map(flag => 
                flag.flagName === 'FLAG_KONAMI' ? { ...flag, found: true } : flag
              );
              sessionStorage.setItem('foundFlags', JSON.stringify(updatedFlags));
            } else {
              // Voeg de flag toe als deze nog niet bestaat
              const updatedFlags = [...flags, {
                id: flags.length + 1,
                flagName: 'FLAG_KONAMI',
                description: 'Geheime Konami Code flag',
                value: 'FLAG_KONAMI{up_up_down_down_secret}',
                found: true
              }];
              sessionStorage.setItem('foundFlags', JSON.stringify(updatedFlags));
            }
            setFlagFound(true);
          }
        } catch (error) {
          console.error('Fout bij updaten van flags:', error);
        }
      }
    };

    const handleKeyDown = (e) => {
      // Voeg de laatst ingedrukte toets toe aan de array
      const newKeys = [...keys, e.key.toLowerCase()];
      
      // Houd alleen de laatste X ingedrukte toetsen bij, waarbij X de lengte van de Konami Code is
      if (newKeys.length > konamiCode.length) {
        newKeys.shift();
      }
      
      setKeys(newKeys);
      
      // Controleer of de sequences overeenkomen (case-insensitive)
      const isKonamiCode = newKeys.length === konamiCode.length && 
        newKeys.every((key, index) => key.toLowerCase() === konamiCode[index].toLowerCase());
      
      if (isKonamiCode) {
        console.log('Konami Code geactiveerd!');
        setShowSecret(true);
        markFlagAsFound();
      }
    };
    
    // Event listener toevoegen
    window.addEventListener('keydown', handleKeyDown);
    
    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [keys, konamiCode]);

  return (
    <>
      {/* Popup voor het geheime bericht */}
      <Popup open={showSecret} onClose={() => setShowSecret(false)} modal>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">🎮 Je hebt de Konami Code ontgrendeld! 🎮</h2>
          
          <div className="my-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-lg font-mono break-all">FLAG_KONAMI{"{up_up_down_down_secret}"}</p>
          </div>
          
          <p className="mb-4">
            De Konami Code is een beroemde cheat code uit oude videogames! 
            Deze code werd oorspronkelijk gebruikt in Konami games zoals Contra.
          </p>
          
          <p className="mb-4">
            De flag is automatisch opgeslagen. Bekijk je flags op de{' '}
            <Link href="/flags" className="text-blue-600 hover:underline">
              flags pagina
            </Link>.
          </p>
          
          <button
            onClick={() => {
              setShowSecret(false);
              // Verberg de flag na het vinden
              const savedFlags = sessionStorage.getItem('foundFlags');
              if (savedFlags) {
                try {
                  const flags = JSON.parse(savedFlags);
                  const updatedFlags = flags.map(flag => 
                    flag.flagName === 'FLAG_KONAMI' ? { ...flag, found: true, hidden: true } : flag
                  );
                  sessionStorage.setItem('foundFlags', JSON.stringify(updatedFlags));
                } catch (error) {
                  console.error('Error updating flags:', error);
                }
              }
            }}
            className="w-full p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition duration-200 ease-in-out"
          >
            Sluiten
          </button>
        </div>
      </Popup>
    </>
  );
};

export default KonamiCode; 