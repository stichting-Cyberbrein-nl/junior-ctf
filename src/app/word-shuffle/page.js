'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FlagPopup from '../components/FlagPopup';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// Lijst met cybersecurity-gerelateerde woorden voor het spel
const words = [
  { id: 1, word: 'ENCRYPTIE', difficulty: 'Gemiddeld', hint: 'Versleuteling van gegevens' },
  { id: 2, word: 'FIREWALL', difficulty: 'Makkelijk', hint: 'Beschermt je netwerk' },
  { id: 3, word: 'WACHTWOORD', difficulty: 'Gemiddeld', hint: 'Geheime toegangscode' },
  { id: 4, word: 'MALWARE', difficulty: 'Makkelijk', hint: 'Kwaadaardige software' },
  { id: 5, word: 'PHISHING', difficulty: 'Gemiddeld', hint: 'Vissen naar gegevens' }
  // { id: 6, word: 'AUTHENTICATIE', difficulty: 'Moeilijk', hint: 'Verifiëren wie je bent' },
  // { id: 7, word: 'VIRUS', difficulty: 'Makkelijk', hint: 'Infecteert je computer' },
  // { id: 8, word: 'RANSOMWARE', difficulty: 'Moeilijk', hint: 'Gijzelsoftware' },
  // { id: 9, word: 'HACKER', difficulty: 'Makkelijk', hint: 'Breekt in computersystemen in' },
  // { id: 10, word: 'TWEEFACTOR', difficulty: 'Moeilijk', hint: 'Extra beveiligingslaag' }
];

// Functie om letters te shufflen
const shuffleLetters = (word) => {
  const shuffled = word.split('');
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function WordShufflePage() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [shuffledLetters, setShuffledLetters] = useState([]);
  const [placedLetters, setPlacedLetters] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedLetter, setDraggedLetter] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [solvedWords, setSolvedWords] = useState([]);
  const [showFlagPopup, setShowFlagPopup] = useState(false);
  const [showFlagMessage, setShowFlagMessage] = useState(false);

  // Initialiseren van het spel
  useEffect(() => {
    startNewWord(currentWordIndex);
    
    // Laad opgeloste woorden uit sessionStorage
    const savedWords = sessionStorage.getItem('solvedWords');
    if (savedWords) {
      setSolvedWords(JSON.parse(savedWords));
    }
  }, [currentWordIndex]);

  // Save solved words to sessionStorage
  useEffect(() => {
    if (solvedWords.length > 0) {
      sessionStorage.setItem('solvedWords', JSON.stringify(solvedWords));
    }
  }, [solvedWords]);

  // Effect to check if all words are solved
  useEffect(() => {
    if (solvedWords.length === words.length && words.length > 0) {
      setShowFlagMessage(true);
      
      // Update the flags in sessionStorage
      const savedFlags = sessionStorage.getItem('foundFlags');
      if (savedFlags) {
        const flags = JSON.parse(savedFlags);
        const updatedFlags = flags.map(flag => 
          flag.flagName === 'FLAG_SHUFFLE' ? { ...flag, found: true } : flag
        );
        sessionStorage.setItem('foundFlags', JSON.stringify(updatedFlags));
      }
    }
  }, [solvedWords]);

  const startNewWord = (index) => {
    const currentWord = words[index].word;
    setShuffledLetters(shuffleLetters(currentWord).map((letter, i) => ({ id: `source-${i}`, letter })));
    setPlacedLetters(Array(currentWord.length).fill(null));
    setShowHint(false);
    setMessage('');
    setMessageType('');
  };

  const handleDragStart = (e, letter, index, isSource) => {
    setIsDragging(true);
    setDraggedLetter({ letter, index, isSource });
    
    // Voor Firefox is dit nodig om het element te kunnen slepen
    if (e.dataTransfer) {
      e.dataTransfer.setData('text/plain', letter.letter);
    }
    
    // Voorkom standaard drag afbeelding in sommige browsers
    if (e.dataTransfer.setDragImage) {
      const dragIcon = document.createElement('div');
      dragIcon.style.backgroundColor = '#4F46E5';
      dragIcon.style.color = 'white';
      dragIcon.style.padding = '8px 16px';
      dragIcon.style.borderRadius = '4px';
      dragIcon.style.fontSize = '18px';
      dragIcon.style.fontWeight = 'bold';
      dragIcon.innerHTML = letter.letter;
      dragIcon.style.position = 'absolute';
      dragIcon.style.top = '-1000px';
      document.body.appendChild(dragIcon);
      e.dataTransfer.setDragImage(dragIcon, 25, 25);
      setTimeout(() => {
        document.body.removeChild(dragIcon);
      }, 0);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedLetter(null);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'move';
    }
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    
    if (!draggedLetter) return;
    
    const { letter, index, isSource } = draggedLetter;
    
    // Maak kopieën van de arrays
    const newShuffledLetters = [...shuffledLetters];
    const newPlacedLetters = [...placedLetters];
    
    // Als we slepen vanaf bron letters
    if (isSource) {
      // Verwijder letter uit bron
      newShuffledLetters[index] = null;
      
      // Als doelplaats al bezet is, wissel de letters
      if (newPlacedLetters[targetIndex] !== null) {
        // Plaats de verdrongen letter terug in bron
        const firstNullIndex = newShuffledLetters.findIndex(item => item === null);
        if (firstNullIndex !== -1) {
          newShuffledLetters[firstNullIndex] = newPlacedLetters[targetIndex];
        } else {
          newShuffledLetters.push(newPlacedLetters[targetIndex]);
        }
      }
      
      // Plaats letter op doelpositie
      newPlacedLetters[targetIndex] = letter;
    } else {
      // Slepen vanaf geplaatste letters naar een andere plaatspositie
      // Wissel de twee letters
      newPlacedLetters[index] = newPlacedLetters[targetIndex];
      newPlacedLetters[targetIndex] = letter;
    }
    
    // Filter nulls uit bron letters en update state
    setShuffledLetters(newShuffledLetters.filter(item => item !== null));
    setPlacedLetters(newPlacedLetters);
    
    // Check voor volledig woord en correctheid
    checkWord(newPlacedLetters);
  };

  const handleDropBackToSource = (e, letter, index) => {
    e.preventDefault();
    
    if (!draggedLetter || draggedLetter.isSource) return;
    
    // Maak kopieën van de arrays
    const newShuffledLetters = [...shuffledLetters];
    const newPlacedLetters = [...placedLetters];
    
    // Verwijder letter uit geplaatste letters
    newPlacedLetters[draggedLetter.index] = null;
    
    // Voeg letter toe aan bron letters
    newShuffledLetters.push(draggedLetter.letter);
    
    // Update states
    setShuffledLetters(newShuffledLetters);
    setPlacedLetters(newPlacedLetters);
  };

  const checkWord = (placedLetters) => {
    // Controleer of alle posities zijn gevuld
    if (placedLetters.some(letter => letter === null)) return;
    
    const currentWord = words[currentWordIndex].word;
    const formedWord = placedLetters.map(letter => letter.letter).join('');
    
    if (formedWord === currentWord) {
      // Woord is correct!
      const newSolvedWords = [...solvedWords];
      if (!newSolvedWords.includes(currentWordIndex)) {
        newSolvedWords.push(currentWordIndex);
        setSolvedWords(newSolvedWords);
      }
      
      setMessage(`Goed gedaan! &quot;${currentWord}&quot; is correct!`);
      setMessageType('success');
      
      // Als alle woorden zijn opgelost, toon de flag
      if (newSolvedWords.length === words.length) {
        // Toon de flag popup na een korte vertraging
        setTimeout(() => {
          setShowFlagPopup(true);
        }, 1000);
      }
    } else {
      setMessage('Niet correct. Probeer de letters te herschikken.');
      setMessageType('error');
    }
  };

  const handleNextWord = () => {
    const nextIndex = (currentWordIndex + 1) % words.length;
    setCurrentWordIndex(nextIndex);
    startNewWord(nextIndex);
  };

  const resetWord = () => {
    startNewWord(currentWordIndex);
  };

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  return (
    <div className="min-h-screen p-6 pb-16 font-[family-name:var(--font-geist-sans)] bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Terug naar Home link */}
      <div className="absolute top-4 left-4">
        <Link href="/" className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Terug naar Home
        </Link>
      </div>
      
      <main className="max-w-4xl mx-auto mt-16 flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-blue-600 dark:text-blue-400">
          Woord Shuffle
        </h1>
        
        <div className="mb-4 w-full">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Woord #{currentWordIndex + 1}: <span className="text-purple-600">{words[currentWordIndex].difficulty}</span></h2>
            <div className="text-sm">
              Opgelost: <span className="font-bold">{solvedWords.length}/{words.length}</span>
            </div>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 transition-all duration-500 ease-in-out"
              style={{ width: `${(solvedWords.length / words.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          {/* Shuffle Game Interface */}
          <div className="mb-6">
            <button
              onClick={toggleHint}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition duration-200 ease-in-out mb-2"
            >
              {showHint ? 'Verberg hint' : 'Toon hint'}
            </button>
            
            {showHint && (
              <div className="p-3 bg-yellow-100 text-yellow-800 rounded-lg">
                <p><strong>Hint:</strong> {words[currentWordIndex].hint}</p>
              </div>
            )}
          </div>
          
          {/* Doelgebied voor geplaatste letters */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-2">Maak het woord:</h3>
            <div className="flex flex-wrap justify-center gap-2 min-h-20">
              {placedLetters.map((letter, index) => (
                <div
                  key={`target-${index}`}
                  className={`w-14 h-14 flex items-center justify-center text-xl font-bold border-2 rounded-lg transition-all duration-200 ${
                    letter 
                      ? 'bg-blue-500 text-white border-blue-600' 
                      : 'border-dashed border-gray-300 bg-gray-50 dark:bg-gray-700'
                  } ${isDragging ? 'ring-2 ring-blue-300' : ''}`}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                  draggable={letter !== null}
                  onDragStart={(e) => letter && handleDragStart(e, letter, index, false)}
                  onDragEnd={handleDragEnd}
                >
                  {letter ? letter.letter : ''}
                </div>
              ))}
            </div>
          </div>
          
          {/* Brongebied voor beschikbare letters */}
          <div>
            <h3 className="text-lg font-medium mb-2">Beschikbare letters:</h3>
            <div 
              className="flex flex-wrap justify-center gap-2 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg min-h-16"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDropBackToSource}
            >
              {shuffledLetters.map((letter, index) => (
                <div
                  key={letter.id}
                  className="w-12 h-12 flex items-center justify-center text-xl font-bold bg-purple-500 text-white rounded-lg cursor-grab shadow-md hover:bg-purple-400 transition-all duration-200"
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, letter, index, true)}
                  onDragEnd={handleDragEnd}
                >
                  {letter.letter}
                </div>
              ))}
            </div>
          </div>
          
          {/* Feedback bericht */}
          {message && (
            <div className={`mt-6 p-3 rounded-lg ${
              messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {message}
            </div>
          )}
          
          {/* Actieknoppen */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <button
              onClick={resetWord}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-400 transition duration-200 ease-in-out"
            >
              Reset woord
            </button>
            
            <button
              onClick={handleNextWord}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-200 ease-in-out"
            >
              Volgend woord
            </button>
          </div>
        </div>
        
        {/* Instructies */}
        <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Hoe te spelen:</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Sleep de letters van beneden naar de vakjes bovenaan.</li>
            <li>Plaats de letters in de juiste volgorde om het woord te vormen.</li>
            <li>Je kunt letters ook onderling verwisselen door ze te slepen.</li>
            <li>Sleep letters terug naar beneden om ze te verwijderen.</li>
            <li>Als je vastloopt, gebruik dan de hint knop voor een aanwijzing.</li>
            <li>Los alle 10 woorden op om een speciale &quot;flag&quot; te verdienen!</li>
          </ol>
        </div>
      </main>
      
      {/* Flag popup */}
      <Popup open={showFlagPopup} onClose={() => setShowFlagPopup(false)} modal>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Je hebt een flag gevonden! 🎉</h2>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
            <p className="font-mono text-lg break-all">FLAG_SHUFFLE{"{word_puzzle_master}"}</p>
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
                    flag.flagName === 'FLAG_SHUFFLE' ? { ...flag, found: true, hidden: true } : flag
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