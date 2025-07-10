'use client';

import { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Link from 'next/link';

/**
 * Een herbruikbare FlagPopup component die op verschillende plekken in het platform kan worden gebruikt
 * om flags te tonen.
 * 
 * @param {Object} props - Component properties
 * @param {string} props.flagName - De naam van de flag (bijv. "FLAG_1")
 * @param {string} props.flagValue - De waarde van de flag (bijv. "FLAG{waarde}")
 * @param {string} props.triggerElement - Het element dat de popup triggert (bijv. een emoji of tekst)
 * @param {string} props.triggerStyle - CSS classes voor het trigger element
 * @param {boolean} props.hideAfterFound - Of de trigger verborgen moet worden na het vinden
 */
export default function FlagPopup({ 
  flagName, 
  flagValue, 
  triggerElement, 
  triggerStyle = "cursor-pointer hover:opacity-75",
  hideAfterFound = true
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFlagFound, setIsFlagFound] = useState(false);
  
  // Check bij het laden van de component of de flag al gevonden is
  useEffect(() => {
    const savedFlags = sessionStorage.getItem('foundFlags');
    if (savedFlags) {
      try {
        const flags = JSON.parse(savedFlags);
        const flagFound = flags.find(flag => 
          flag.flagName === flagName || 
          flag.value === flagValue
        );
        if (flagFound && flagFound.found) {
          setIsFlagFound(true);
        }
      } catch (error) {
        console.error('Error parsing flags from sessionStorage:', error);
      }
    }
  }, [flagName, flagValue]);
  
  const handleFlagFound = () => {
    // Controleer of de flag al in sessionStorage staat
    const savedFlags = sessionStorage.getItem('foundFlags');
    if (savedFlags) {
      try {
        const flags = JSON.parse(savedFlags);
        
        // Vind de flag op basis van flagName of op basis van value als fallback
        const flagFound = flags.find(flag => 
          flag.flagName === flagName || 
          flag.value === flagValue
        );
        
        if (flagFound && flagFound.found) {
          // Flag is al gevonden
          return true;
        } else if (flagFound) {
          // Flag nog niet gevonden, update de flags in sessionStorage
          const updatedFlags = flags.map(flag => 
            (flag.flagName === flagName || flag.value === flagValue) 
              ? { ...flag, found: true } 
              : flag
          );
          sessionStorage.setItem('foundFlags', JSON.stringify(updatedFlags));
          
          // Update de lokale state
          setIsFlagFound(true);
          return false;
        }
      } catch (error) {
        console.error('Error parsing flags from sessionStorage:', error);
      }
    }
    return false;
  };

  const handleOpen = () => {
    const alreadyFound = handleFlagFound();
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // Als de flag al gevonden is en we moeten hem verbergen
  if (isFlagFound && hideAfterFound) {
    return (
      <Popup open={isOpen} onClose={handleClose} modal>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">Je hebt een flag gevonden! 🎉</h2>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
            <p className="font-mono text-lg break-all dark:text-white">{flagValue}</p>
          </div>
          
          <p className="mb-4 dark:text-white">
            De flag is automatisch opgeslagen. Ga naar de <Link href="/flags" className="text-blue-600 dark:text-blue-400 hover:underline">flags pagina</Link> om je voortgang te bekijken.
          </p>
          
          <button
            onClick={handleClose}
            className="w-full p-3 mt-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition duration-200 ease-in-out"
          >
            Sluiten
          </button>
        </div>
      </Popup>
    );
  }

  return (
    <>
      <span 
        onClick={handleOpen} 
        className={triggerStyle}
        title="Klik voor een geheime flag"
      >
        {triggerElement}
      </span>
      
      <Popup open={isOpen} onClose={handleClose} modal>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">Je hebt een flag gevonden! 🎉</h2>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
            <p className="font-mono text-lg break-all dark:text-white">{flagValue}</p>
          </div>
          
          <p className="mb-4 dark:text-white">
            De flag is automatisch opgeslagen. Ga naar de <Link href="/flags" className="text-blue-600 dark:text-blue-400 hover:underline">flags pagina</Link> om je voortgang te bekijken.
          </p>
          
          <button
            onClick={handleClose}
            className="w-full p-3 mt-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition duration-200 ease-in-out"
          >
            Sluiten
          </button>
        </div>
      </Popup>
    </>
  );
} 