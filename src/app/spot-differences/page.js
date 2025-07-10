'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function SpotDifferences() {
  const { width, height } = useWindowSize();
  const [foundDifferences, setFoundDifferences] = useState([]);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [showFlagPopup, setShowFlagPopup] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  
  // Aantal verschillen dat gevonden moet worden
  const totalDifferences = 5;
  
  // Geheimschrift voor niveau 1 (emoji's)
  const level1 = {
    image1: [
      "🔒 🔑 📧 🔐 📝 🔍",
      "📲 🌐 👁️ 💾 📡 🔗",
      "⚠️ 🔄 🔌 📶 🔋 🖥️",
      "📊 🔒 📁 🔑 📂 📱",
      "🔍 🌐 🔐 📊 📧 🔄",
      "💻 🔌 🛡️ 🔋 📶 🔍"
    ],
    image2: [
      "🔒 🔑 📧 🔐 📝 🔍",
      "📲 🌐 👁️ 💾 📡 🔗",
      "⚠️ 🔄 🔌 📶 🔓 🖥️",  // verschil: 🔓 in plaats van 🔋
      "📊 🔒 📁 🔑 📂 📱",
      "🔍 🌐 🔐 📊 🛡️ 🔄",  // verschil: 🛡️ in plaats van 📧
      "💻 🔌 🛡️ 🔋 📶 👨‍💻"  // verschil: 👨‍💻 in plaats van 🔍
    ],
    differences: [
      { row: 2, col: 4, original: "🔋", changed: "🔓" },
      { row: 4, col: 4, original: "📧", changed: "🛡️" },
      { row: 5, col: 5, original: "🔍", changed: "👨‍💻" }
    ]
  };

  // Geheimschrift voor niveau 2 (codetekens)
  const level2 = {
    image1: [
      "@#$& !%*+ ^$-~ ¥£€¢",
      "01010 10101 01010 10101",
      "|-|3|_|_0 \\/\\/0|2|_|)",
      "RΘTΣΠ ςΩ∂∑ βτΛ ∂∑χ",
      "≈≈≈≈≈ ≠≠≠≠≠ ≤≥≤≥≤≥"
    ],
    image2: [
      "@#$& !%*+ ^$-~ ¥£€¢",
      "01110 10101 01010 10101", // verschil: 01110 in plaats van 01010
      "|-|3|_|_0 \\/\\/0|2|_|)",
      "RΘTΣΠ ςΩ∂∑ βτΓ ∂∑χ",    // verschil: Γ in plaats van Λ
      "≈≈≈≈≈ ≠≠≠≠≠ ≤≥≤≥≤≥"
    ],
    differences: [
      { row: 1, col: 0, original: "01010", changed: "01110" },
      { row: 3, col: 2, original: "Λ", changed: "Γ" }
    ]
  };

  // Check if the flag is already found when component mounts
  useEffect(() => {
    // Check if flag is already found in sessionStorage
    const savedFlags = sessionStorage.getItem('foundFlags');
    if (savedFlags) {
      try {
        const flags = JSON.parse(savedFlags);
        const foundFlag = flags.find(flag => flag.flagName === 'FLAG_DIFFERENCES' && flag.found);
        if (foundFlag) {
          console.log('FLAG_DIFFERENCES was already found');
          setIsGameComplete(true);
        }
      } catch (error) {
        console.error('Error checking flags:', error);
      }
    }
  }, []);

  // Geef huidige niveau data terug
  const getCurrentLevel = () => {
    return currentLevel === 1 ? level1 : level2;
  };

  // Controleer of een verschil is gevonden
  const checkDifference = (row, col) => {
    const levelData = getCurrentLevel();
    const difference = levelData.differences.find(
      diff => diff.row === row && diff.col === col
    );
    
    if (difference && !foundDifferences.some(
      found => found.row === row && found.col === col
    )) {
      const newFoundDifferences = [...foundDifferences, { row, col }];
      setFoundDifferences(newFoundDifferences);
      
      // Als alle verschillen van het huidige niveau zijn gevonden
      if (newFoundDifferences.length >= (currentLevel === 1 ? 3 : 2)) {
        if (currentLevel === 1) {
          // Ga naar het volgende niveau
          setCurrentLevel(2);
          setFoundDifferences([]);
        } else {
          // Spel voltooid
          setIsGameComplete(true);
          setShowFlagPopup(true);
          
          // Update de flags in sessionStorage
          const savedFlags = sessionStorage.getItem('foundFlags');
          if (savedFlags) {
            try {
              const flags = JSON.parse(savedFlags);
              const updatedFlags = flags.map(flag => 
                flag.flagName === 'FLAG_DIFFERENCES' ? { ...flag, found: true } : flag
              );
              sessionStorage.setItem('foundFlags', JSON.stringify(updatedFlags));
              console.log('FLAG_DIFFERENCES is now set to found!');
            } catch (error) {
              console.error('Error updating flags:', error);
            }
          } else {
            console.log('No foundFlags in sessionStorage');
          }
        }
      }
    }
  };

  // Reset het spel
  const resetGame = () => {
    setFoundDifferences([]);
    setIsGameComplete(false);
    setCurrentLevel(1);
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Terug naar Home
          </Link>
          <span className="bg-purple-200 dark:bg-purple-900 text-purple-800 dark:text-purple-200 py-1 px-3 rounded-full text-sm font-medium">
            Niveau {currentLevel}/2 - Gevonden: {foundDifferences.length}/{currentLevel === 1 ? 3 : 2}
          </span>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-center mb-4 text-purple-600 dark:text-purple-400">
            Zoek de Verschillen
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-center mb-8">
            Kun jij alle verschillen vinden tussen deze twee geheimschriften? Klik op een verschil wanneer je het vindt!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Originele code */}
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-3 text-center">Geheimschrift A</h2>
              <div className="font-mono text-center">
                {getCurrentLevel().image1.map((line, rowIndex) => (
                  <div key={`img1-${rowIndex}`} className="mb-2">
                    {line.split(' ').map((segment, colIndex) => (
                      <span 
                        key={`img1-${rowIndex}-${colIndex}`}
                        className="inline-block mx-1 p-1"
                      >
                        {segment}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Gewijzigde code */}
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-3 text-center">Geheimschrift B</h2>
              <div className="font-mono text-center">
                {getCurrentLevel().image2.map((line, rowIndex) => (
                  <div key={`img2-${rowIndex}`} className="mb-2">
                    {line.split(' ').map((segment, colIndex) => (
                      <span 
                        key={`img2-${rowIndex}-${colIndex}`}
                        className={`inline-block mx-1 p-1 cursor-pointer transition-all
                          ${foundDifferences.some(diff => diff.row === rowIndex && diff.col === colIndex) 
                            ? 'bg-green-200 dark:bg-green-800 rounded-md transform scale-110' 
                            : 'hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md'}`}
                        onClick={() => checkDifference(rowIndex, colIndex)}
                      >
                        {segment}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={resetGame}
              className="py-2 px-6 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition duration-200"
            >
              Spel opnieuw starten
            </button>
          </div>
        </div>

        {/* Instructies */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-purple-600 dark:text-purple-400">
            Hoe te spelen
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Vergelijk de twee geheimschriften zorgvuldig.</li>
            <li>Zoek naar verschillen tussen Geheimschrift A en Geheimschrift B.</li>
            <li>Klik op een verschil in Geheimschrift B wanneer je het vindt.</li>
            <li>Vind alle verschillen om naar het volgende niveau te gaan.</li>
            <li>Voltooi beide niveaus om een speciale flag te verdienen!</li>
          </ul>
          <div className="mt-4 text-center">
            <button 
              className="text-xs text-gray-300 hover:text-gray-400 dark:text-gray-600 dark:hover:text-gray-500"
              onClick={() => {
                // Manually force the flag to be found (for debugging)
                setIsGameComplete(true);
                setShowFlagPopup(true);
                
                const savedFlags = sessionStorage.getItem('foundFlags');
                if (savedFlags) {
                  try {
                    const flags = JSON.parse(savedFlags);
                    const updatedFlags = flags.map(flag => 
                      flag.flagName === 'FLAG_DIFFERENCES' ? { ...flag, found: true } : flag
                    );
                    sessionStorage.setItem('foundFlags', JSON.stringify(updatedFlags));
                    console.log('FLAG_DIFFERENCES manually set to found!');
                  } catch (error) {
                    console.error('Error updating flags:', error);
                  }
                }
              }}
            >
              [Debug]
            </button>
          </div>
        </div>
      </div>

      {/* Confetti bij voltooiing */}
      {isGameComplete && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
        />
      )}

      {/* Flag popup */}
      <Popup open={showFlagPopup} onClose={() => setShowFlagPopup(false)} modal>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Gefeliciteerd! 🎉</h2>
          <p className="mb-4">Je hebt alle verschillen gevonden en een flag verdiend!</p>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
            <p className="font-mono text-lg break-all">FLAG_DIFFERENCES&#123;spot_the_crypto_diff&#125;</p>
          </div>
          <p className="mb-4">
            De flag is automatisch opgeslagen. Ga naar de <Link href="/flags" className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 hover:underline">flags pagina</Link> om je voortgang te bekijken.
          </p>
          <button
            onClick={() => {
              setShowFlagPopup(false);
              // Verberg de flag na het vinden
              const savedFlags = sessionStorage.getItem('foundFlags');
              if (savedFlags) {
                try {
                  const flags = JSON.parse(savedFlags);
                  const updatedFlags = flags.map(flag => 
                    flag.flagName === 'FLAG_DIFFERENCES' ? { ...flag, found: true, hidden: true } : flag
                  );
                  sessionStorage.setItem('foundFlags', JSON.stringify(updatedFlags));
                } catch (error) {
                  console.error('Error updating flags:', error);
                }
              }
            }}
            className="w-full p-3 mt-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 ease-in-out"
          >
            Sluiten
          </button>
        </div>
      </Popup>
    </div>
  );
} 