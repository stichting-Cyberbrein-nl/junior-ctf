'use client';

import { useState, useRef, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Link from 'next/link';

// Morse code mapping
const morseCodeMap = {
  ".-": "A", "-...": "B", "-.-.": "C", "-..": "D", ".": "E",
  "..-.": "F", "--.": "G", "....": "H", "..": "I", ".---": "J",
  "-.-": "K", ".-..": "L", "--": "M", "-.": "N", "---": "O",
  ".--.": "P", "--.-": "Q", ".-.": "R", "...": "S", "-": "T",
  "..-": "U", "...-": "V", ".--": "W", "-..-": "X", "-.--": "Y",
  "--..": "Z", ".----": "1", "..---": "2", "...--": "3", "....-": "4",
  ".....": "5", "-....": "6", "--...": "7", "---..": "8", "----.": "9",
  "-----": "0"
};

// Het geheime woord dat in morse code zit
const SECRET_MORSE_CODE = "... .. --. -. .- .- .-.."; // "SIGNAAL" in morse code
const SECRET_WORD = "SIGNAAL";

export default function MorseCodeChallenge() {
  const [showPopup, setShowPopup] = useState(false);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [flagFound, setFlagFound] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [showVisualMorse, setShowVisualMorse] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const audioRef = useRef(null);
  
  useEffect(() => {
    // Check of deze flag al eerder gevonden is
    const savedFlags = sessionStorage.getItem('foundFlags');
    if (savedFlags) {
      const flags = JSON.parse(savedFlags);
      const isMorseFlagFound = flags.some(f => f.flagName === 'FLAG_MORSE_CODE' && f.found);
      setFlagFound(isMorseFlagFound);
    }
  }, []);
  
  const playMorseCode = () => {
    if (audioRef.current) {
      try {
        audioRef.current.currentTime = 0;
        
        // Toevoegen van event listeners voor foutafhandeling
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          setIsPlaying(true);
          
          playPromise.catch(error => {
            console.error('Error playing audio:', error);
            setIsPlaying(false);
            
            // Toon visuele morse code als audio niet kan worden afgespeeld
            setShowVisualMorse(true);
            setFeedback("Audio kon niet worden afgespeeld. Je kunt de visuele morse code gebruiken.");
          });
          
          // Zet isPlaying terug naar false wanneer audio is afgelopen
          audioRef.current.onended = () => {
            setIsPlaying(false);
          };
        }
      } catch (error) {
        console.error('Error initializing audio:', error);
        setIsPlaying(false);
        setShowVisualMorse(true);
        setFeedback("Audio kon niet worden afgespeeld. Je kunt de visuele morse code gebruiken.");
      }
    } else {
      // Als audioRef.current niet beschikbaar is, toon dan visuele morse code
      setShowVisualMorse(true);
      setFeedback("Audio speler niet beschikbaar. Je kunt de visuele morse code gebruiken.");
    }
  };
  
  const checkAnswer = () => {
    const normalizedAnswer = answer.trim().toUpperCase();
    
    if (normalizedAnswer === SECRET_WORD) {
      setFeedback('Correct! Je hebt de morse code succesvol ontcijferd!');
      setFlagFound(true);
      
      // Update de flags in sessionStorage
      try {
        const savedFlags = sessionStorage.getItem('foundFlags');
        if (savedFlags) {
          const flags = JSON.parse(savedFlags);
          
          // Controleer of FLAG_MORSE_CODE al bestaat in de flags array
          const morseFlagExists = flags.some(flag => flag.flagName === 'FLAG_MORSE_CODE');
          
          if (morseFlagExists) {
            // Update de bestaande flag
            const updatedFlags = flags.map(flag => 
              flag.flagName === 'FLAG_MORSE_CODE' ? { ...flag, found: true } : flag
            );
            sessionStorage.setItem('foundFlags', JSON.stringify(updatedFlags));
          } else {
            // Voeg de nieuwe flag toe als deze nog niet bestaat
            const newFlag = {
              id: 21,
              flagName: 'FLAG_MORSE_CODE',
              description: 'Flag ontgrendeld door het kraken van de morse code',
              value: 'FLAG_MORSE_CODE{audio_decryption_expert}',
              found: true,
              category: 'Verborgen'
            };
            const updatedFlags = [...flags, newFlag];
            sessionStorage.setItem('foundFlags', JSON.stringify(updatedFlags));
          }
        } else {
          // Als er nog geen flags in sessionStorage zijn, maak een nieuwe array
          const initialFlags = [{
            id: 21,
            flagName: 'FLAG_MORSE_CODE',
            description: 'Flag ontgrendeld door het kraken van de morse code',
            value: 'FLAG_MORSE_CODE{audio_decryption_expert}',
            found: true,
            category: 'Verborgen'
          }];
          sessionStorage.setItem('foundFlags', JSON.stringify(initialFlags));
        }
      } catch (error) {
        console.error('Fout bij het updaten van flags:', error);
      }
    } else {
      setAttemptsLeft(prev => prev - 1);
      
      if (attemptsLeft <= 1) {
        setFeedback('Geen pogingen meer over. Maar geef niet op! Luister nog eens goed en probeer het nog een keer.');
        setAttemptsLeft(3);
        setShowHint(true);
      } else {
        setFeedback(`Niet correct. Je hebt nog ${attemptsLeft - 1} pogingen over.`);
      }
    }
  };
  
  const toggleVisualMorse = () => {
    setShowVisualMorse(!showVisualMorse);
  };
  
  return (
    <>
      {/* Verborgen emoji op de pagina - verplaatst naar linksonder */}
      <span 
        className="cursor-pointer absolute bottom-12 left-12 opacity-20 hover:opacity-100 transition-opacity duration-300"
        onClick={() => setShowPopup(true)}
        title="Muzieknoot"
      >
        🎵
      </span>
      
      {/* Morse Code Popup */}
      <Popup open={showPopup} onClose={() => setShowPopup(false)} modal>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-center">Morse Code Uitdaging</h2>
          
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
            <p className="text-center">Luister naar het morse code bericht en ontcijfer de geheime boodschap.</p>
          </div>
          
          <div className="mb-6 flex flex-col items-center">
            <audio 
              ref={audioRef} 
              src="/morse.wav" 
              preload="auto"
              onError={(e) => {
                console.error("Audio error:", e);
                setShowVisualMorse(true);
                setFeedback("Audio bestand kon niet worden geladen. Je kunt de visuele morse code gebruiken.");
              }}
            >
              Je browser ondersteunt het audio-element niet.
            </audio>
            
            <button
              onClick={playMorseCode}
              disabled={isPlaying}
              className={`px-4 py-2 flex items-center gap-2 rounded-lg transition-colors ${
                isPlaying 
                  ? 'bg-gray-400 text-white cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-500'
              }`}
            >
              {isPlaying ? (
                <>
                  <span className="animate-pulse">▶</span>
                  <span>Afspelen...</span>
                </>
              ) : (
                <>
                  <span>▶</span>
                  <span>Morse code afspelen</span>
                </>
              )}
            </button>
            
            <div className="mt-4">
              <button 
                onClick={toggleVisualMorse} 
                className="text-sm text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 bg-white dark:bg-gray-800 px-3 py-1 rounded"
              >
                {showVisualMorse ? 'Verberg visuele morse code' : 'Toon visuele morse code (hint)'}
              </button>
            </div>
            
            {showVisualMorse && (
              <div className="mt-2 p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <p className="font-mono text-center">{SECRET_MORSE_CODE}</p>
              </div>
            )}
          </div>
          
          {!flagFound ? (
            <div className="mb-4">
              <label className="block text-lg font-medium mb-2">Jouw ontcijfering:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Typ het woord hier..."
                  onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                />
                <button
                  onClick={checkAnswer}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors"
                >
                  Controleer
                </button>
              </div>
            </div>
          ) : (
            <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-lg text-center">
              <p className="font-bold mb-2">Gefeliciteerd! Je hebt de flag gevonden!</p>
              <p className="font-mono text-lg break-all">FLAG_MORSE_CODE{"{audio_decryption_expert}"}</p>
              <p className="mt-4">
                Ga naar de <Link href="/flags" className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300">flags pagina</Link> om je voortgang bij te houden.
              </p>
            </div>
          )}
          
          {feedback && !flagFound && (
            <div className={`mb-4 p-3 rounded-lg ${
              feedback.includes('Correct') 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' 
                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
            }`}>
              <p>{feedback}</p>
            </div>
          )}
          
          {showHint && !flagFound && (
            <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200 rounded-lg">
              <p><strong>Hint:</strong> Het woord heeft te maken met communicatie.</p>
              <p className="mt-2">
                <strong>Morse code referentie:</strong>
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-2 text-xs">
                {Object.entries(morseCodeMap).map(([morse, letter]) => (
                  <div key={morse} className="border border-yellow-200 dark:border-yellow-700 p-1 rounded flex justify-between">
                    <span className="font-mono">{morse}</span>
                    <span className="font-bold">{letter}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-end mt-4">
            <button
              onClick={() => setShowPopup(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-400 transition-colors"
            >
              Sluiten
            </button>
          </div>
        </div>
      </Popup>
    </>
  );
} 