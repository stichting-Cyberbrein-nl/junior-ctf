'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// Emoji legende: emoji naar letter vertaling
const emojiMapping = {
  '🍏': 'A', '⭐': 'B', '🐱': 'C', '🐶': 'D', '🦊': 'E',
  '🐼': 'F', '🐸': 'G', '🦁': 'H', '🦄': 'I', '🐝': 'J',
  '🦋': 'K', '🦖': 'L', '🐞': 'M', '🐠': 'N', '🦉': 'O',
  '🐧': 'P', '👑': 'Q', '🦜': 'R', '🐍': 'S', '🦆': 'T',
  '🐢': 'U', '🦇': 'V', '🐳': 'W', '🦚': 'X', '🐙': 'Y',
  '⚡': 'Z', '🌈': ' ', // Regenboog voor spatie
};

// Omgekeerde mapping voor de weergave
const letterToEmojiMapping = {};
Object.entries(emojiMapping).forEach(([emoji, letter]) => {
  letterToEmojiMapping[letter] = emoji;
});

// Lijst met gecodeerde berichten voor het spel
const puzzles = [
  {
    id: 1,
    encodedMessage: '🐱🐙⭐🦊🦜',
    hint: 'TIP: 🐱=C, 🐙=Y',
    solution: 'CYBER',
    difficulty: 'Makkelijk',
    hint2: 'Online veiligheid'
  },
  {
    id: 2,
    encodedMessage: '🦇🦄🦜🐢🐍',
    hint: 'TIP: 🦇=V, 🦄=I',
    solution: 'VIRUS',
    difficulty: 'Makkelijk',
    hint2: 'Infecteert computers'
  },
  {
    id: 3,
    encodedMessage: '🐧🦁🦄🐍🦁🦄🐠🐸',
    hint: 'TIP: 🐧=P, 🦁=H, 🦄=I',
    solution: 'PHISHING',
    difficulty: 'Gemiddeld',
    hint2: 'Nep e-mails die gegevens stelen'
  },
  {
    id: 4,
    encodedMessage: '🦁🍏🐱🦋',
    hint: 'TIP: 🦁=H, 🍏=A',
    solution: 'HACK',
    difficulty: 'Makkelijk',
    hint2: 'Inbreken in computersystemen'
  },
  {
    id: 5,
    encodedMessage: '🐳🍏🐱🦁🦆🐳🦉🦉🦜🐶',
    hint: 'TIP: 🐳=W, 🍏=A, 🦉=O',
    solution: 'WACHTWOORD',
    difficulty: 'Moeilijk',
    hint2: 'Geheime code om in te loggen'
  }
];

export default function EmojiCodePage() {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [userSolution, setUserSolution] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showHint2, setShowHint2] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [revealedEmojis, setRevealedEmojis] = useState({});
  const [solvedPuzzles, setSolvedPuzzles] = useState([]);
  const [showLegende, setShowLegende] = useState(false);
  const [showFlagPopup, setShowFlagPopup] = useState(false);
  
  // Define initPuzzleHints with useCallback BEFORE the useEffect hooks
  const initPuzzleHints = useCallback(() => {
    const puzzle = puzzles[currentPuzzleIndex];
    const initialRevealed = {};
    
    // Parse hints uit de hint string
    if (puzzle.hint) {
      const hintText = puzzle.hint;
      const matches = hintText.match(/🍏=A|⭐=B|🐱=C|🐶=D|🦊=E|🐼=F|🐸=G|🦁=H|🦉=O|🐧=P|other emojis/g); 
      
      if (matches) {
        matches.forEach(match => {
          const [emoji, letter] = match.split('=');
          if (emoji && letter) {
            initialRevealed[emoji] = letter;
          }
        });
      }
    }
    
    setRevealedEmojis(initialRevealed);
  }, [currentPuzzleIndex]);
  
  useEffect(() => {
    // Laad opgeloste puzzels uit sessionStorage
    const savedSolvedPuzzles = sessionStorage.getItem('solvedEmojiPuzzles');
    if (savedSolvedPuzzles) {
      setSolvedPuzzles(JSON.parse(savedSolvedPuzzles));
    }
    
    // Init revealedEmojis voor eerste puzzle
    initPuzzleHints();
  }, [initPuzzleHints]);
  
  useEffect(() => {
    // Update hints wanneer currentPuzzleIndex verandert
    initPuzzleHints();
    setUserSolution('');
    setFeedback('');
    setFeedbackType('');
    setShowHint(false);
    setShowHint2(false);
  }, [currentPuzzleIndex, initPuzzleHints]);
  
  const handleSolutionCheck = () => {
    const currentPuzzle = puzzles[currentPuzzleIndex];
    const normalized = userSolution.trim().toUpperCase();
    
    if (normalized === currentPuzzle.solution) {
      // Correct antwoord!
      setFeedback(`Correct! "${currentPuzzle.solution}" is de juiste oplossing.`);
      setFeedbackType('success');
      
      // Update opgeloste puzzels
      const newSolvedPuzzles = [...solvedPuzzles];
      if (!newSolvedPuzzles.includes(currentPuzzle.id)) {
        newSolvedPuzzles.push(currentPuzzle.id);
        setSolvedPuzzles(newSolvedPuzzles);
        sessionStorage.setItem('solvedEmojiPuzzles', JSON.stringify(newSolvedPuzzles));
      }
      
      // Als alle puzzels zijn opgelost, toon de flag
      if (newSolvedPuzzles.length === puzzles.length) {
        setTimeout(() => {
          setShowFlagPopup(true);
          
          // Update de flags in sessionStorage om FLAG_EMOJI te markeren als gevonden
          try {
            const savedFlags = sessionStorage.getItem('foundFlags');
            if (savedFlags) {
              const flags = JSON.parse(savedFlags);
              const updatedFlags = flags.map(f => 
                f.flagName === 'FLAG_EMOJI' ? { ...f, found: true } : f
              );
              sessionStorage.setItem('foundFlags', JSON.stringify(updatedFlags));
            }
          } catch (error) {
            console.error('Error updating flags in sessionStorage:', error);
          }
        }, 1000);
      }
    } else {
      setFeedback('Niet correct. Probeer het nog eens.');
      setFeedbackType('error');
    }
  };
  
  const toggleHint = () => {
    setShowHint(!showHint);
  };
  
  const toggleHint2 = () => {
    setShowHint2(!showHint2);
  };
  
  const toggleLegende = () => {
    setShowLegende(!showLegende);
  };
  
  const handleNextPuzzle = () => {
    const nextIndex = (currentPuzzleIndex + 1) % puzzles.length;
    setCurrentPuzzleIndex(nextIndex);
  };
  
  const handlePrevPuzzle = () => {
    const prevIndex = (currentPuzzleIndex - 1 + puzzles.length) % puzzles.length;
    setCurrentPuzzleIndex(prevIndex);
  };
  
  const renderEncodedMessage = () => {
    const currentPuzzle = puzzles[currentPuzzleIndex];
    const encodedChars = Array.from(currentPuzzle.encodedMessage);
    
    return (
      <div className="flex flex-wrap justify-center gap-2 text-4xl">
        {encodedChars.map((emoji, index) => (
          <span 
            key={index} 
            className="relative transition-all inline-block"
            data-tooltip={revealedEmojis[emoji] || '?'}
          >
            {emoji}
            {emoji !== '🌈' && revealedEmojis[emoji] && (
              <span className="absolute bottom-0 right-0 text-xs bg-black text-white rounded-full px-1 translate-x-1 translate-y-1">
                {revealedEmojis[emoji]}
              </span>
            )}
          </span>
        ))}
      </div>
    );
  };
  
  const isPuzzleSolved = (puzzleId) => {
    return solvedPuzzles.includes(puzzleId);
  };
  
  return (
    <div className="min-h-screen p-6 pb-16 font-[family-name:var(--font-geist-sans)] bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Terug naar Home link */}
      <div className="absolute top-4 left-4">
        <Link href="/" className="text-lg font-medium text-blue-600 hover:text-blue-800 transition-colors flex items-center">
          <span className="mr-1">←</span> Home
        </Link>
      </div>
      
      <main className="max-w-4xl mx-auto mt-16 flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-blue-600 dark:text-blue-400">
          Emoji Codekraker
        </h1>
        
        <div className="mb-4 w-full">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Puzzel #{currentPuzzleIndex + 1}: <span className="text-purple-600">{puzzles[currentPuzzleIndex].difficulty}</span></h2>
            <div className="text-sm">
              Opgelost: <span className="font-bold">{solvedPuzzles.length}/{puzzles.length}</span>
            </div>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 transition-all duration-500 ease-in-out"
              style={{ width: `${(solvedPuzzles.length / puzzles.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          {/* Emoji Code Interface */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-center">Ontcijfer deze code:</h3>
            <div className="mb-6 py-4 px-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
              {renderEncodedMessage()}
            </div>
            
            <div className="mb-4">
              <label className="block text-lg font-medium mb-2">Jouw oplossing:</label>
              <input
                type="text"
                value={userSolution}
                onChange={(e) => setUserSolution(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Typ hier je oplossing..."
                onKeyPress={(e) => e.key === 'Enter' && handleSolutionCheck()}
              />
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              <button
                onClick={toggleHint}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition duration-200 ease-in-out"
              >
                {showHint ? 'Verberg hint' : 'Toon hint'}
              </button>
              
              <button
                onClick={toggleHint2}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-400 transition duration-200 ease-in-out"
              >
                {showHint2 ? 'Verberg extra hint' : 'Toon extra hint'}
              </button>
              
              <button
                onClick={toggleLegende}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-400 transition duration-200 ease-in-out"
              >
                {showLegende ? 'Verberg legende' : 'Toon legende'}
              </button>
            </div>
            
            {showHint && (
              <div className="p-3 bg-yellow-100 text-yellow-800 rounded-lg mb-3">
                <p className="font-medium">{puzzles[currentPuzzleIndex].hint}</p>
              </div>
            )}
            
            {showHint2 && (
              <div className="p-3 bg-orange-100 text-orange-800 rounded-lg mb-3">
                <p className="font-medium">Extra hint: {puzzles[currentPuzzleIndex].hint2}</p>
              </div>
            )}
            
            {showLegende && (
              <div className="p-3 bg-purple-100 text-purple-800 rounded-lg mb-3 overflow-auto">
                <p className="font-medium mb-2">Emoji Legende (niet allemaal nodig voor elke puzzel):</p>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 text-sm">
                  {Object.entries(emojiMapping).map(([emoji, letter]) => (
                    <div key={emoji} className="flex items-center gap-2 p-1 border border-purple-200 rounded-md">
                      <span className="text-xl">{emoji}</span>
                      <span>=</span>
                      <span className="font-mono font-bold">{letter === ' ' ? 'SPATIE' : letter}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {feedback && (
              <div className={`mt-4 p-3 rounded-lg ${
                feedbackType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                <p>{feedback}</p>
              </div>
            )}
          </div>
          
          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrevPuzzle}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-400 transition duration-200 ease-in-out flex items-center"
            >
              <span className="mr-1">←</span> Vorige puzzel
            </button>
            
            <button
              onClick={handleSolutionCheck}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition duration-200 ease-in-out font-bold"
            >
              Controleer
            </button>
            
            <button
              onClick={handleNextPuzzle}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-400 transition duration-200 ease-in-out flex items-center"
            >
              Volgende puzzel <span className="ml-1">→</span>
            </button>
          </div>
        </div>
        
        {/* Lijst met puzzels en status */}
        <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Puzzels:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {puzzles.map((puzzle, index) => (
              <div 
                key={puzzle.id} 
                className={`p-3 rounded-lg cursor-pointer transition-colors border ${
                  index === currentPuzzleIndex 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50'
                } ${
                  isPuzzleSolved(puzzle.id) 
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700' 
                    : ''
                }`}
                onClick={() => setCurrentPuzzleIndex(index)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">Puzzel #{index + 1}</span>
                  {isPuzzleSolved(puzzle.id) && (
                    <span className="text-green-600 dark:text-green-400">✓</span>
                  )}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{puzzle.difficulty}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Instructies */}
        <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Hoe te spelen:</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Bekijk de emoji code en probeer te achterhalen welke letter bij welke emoji hoort.</li>
            <li>Gebruik de hints om een deel van de emoji-letters te ontcijferen.</li>
            <li>Ontcijfer de boodschap door de emoji&apos;s te vervangen met de juiste letters.</li>
            <li>Typ je oplossing in het tekstveld en klik op &quot;Controleer&quot;.</li>
            <li>Bij een aantal verkeerde antwoorden kun je een extra hint ontvangen.</li>
            <li>Los alle 5 puzzels op om een speciale flag te onthullen!</li>
          </ol>
        </div>
      </main>
      
      {/* Flag popup */}
      <Popup open={showFlagPopup} onClose={() => setShowFlagPopup(false)} modal>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Je hebt een flag gevonden! 🎉</h2>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
            <p className="font-mono text-lg break-all">FLAG_EMOJI&#123;emoji_code_master&#125;</p>
          </div>
          <p className="mb-4">
            De flag is automatisch opgeslagen. Ga naar de <Link href="/flags" className="text-blue-600 hover:underline">flags pagina</Link> om je voortgang te bekijken.
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
                    flag.flagName === 'FLAG_EMOJI' ? { ...flag, found: true, hidden: true } : flag
                  );
                  sessionStorage.setItem('foundFlags', JSON.stringify(updatedFlags));
                } catch (error) {
                  console.error('Error updating flags:', error);
                }
              }
            }}
            className="w-full p-3 mt-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition duration-200 ease-in-out"
          >
            Sluiten
          </button>
        </div>
      </Popup>
    </div>
  );
} 