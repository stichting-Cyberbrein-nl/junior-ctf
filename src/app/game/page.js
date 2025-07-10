'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import CodeList from './CodeList';
import CodeInput from './CodeInput';
import EncryptionList from './EncryptionList';
import EncryptionInfo from './EncryptionInfo';
import Popup from 'reactjs-popup';
import Link from "next/link";
import FlagPopup from '../components/FlagPopup';
import KonamiCode from '../components/KonamiCode';
import HintPopup from '../components/HintPopup';

const Game = () => {
  const [codes, setCodes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [solvedCodes, setSolvedCodes] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [hintCount, setHintCount] = useState(0); // Voeg een hint teller toe
  const [correctAnswer, setCorrectAnswer] = useState(false); // Houdt bij of de code correct is
  const [encryptions, setEncryptions] = useState([]);
  const [selectedEncryption, setSelectedEncryption] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupInput, setPopupInput] = useState('');
  const [popupError, setPopupError] = useState('');
  const [isHintPopupOpen, setIsHintPopupOpen] = useState(false);
  const maxHints = 10; // Maximaal aantal hints
  const [showFlagPopup, setShowFlagPopup] = useState(false);
  const [showAllCodesSolvedPopup, setShowAllCodesSolvedPopup] = useState(false);

  // Haal de codes en encryptiemodellen op
  useEffect(() => {
    const fetchCodesAndEncryptions = async () => {
      try {
        const codesResponse = await axios.get('/api/codes');
        setCodes(codesResponse.data);

        const encryptionsResponse = await axios.get('/api/encryptions');
        setEncryptions(encryptionsResponse.data);

        // Haal hintCount op uit sessionStorage
        const savedHintCount = sessionStorage.getItem('hintCount');
        if (savedHintCount) {
          setHintCount(JSON.parse(savedHintCount));
        }

        const savedSolvedCodes = sessionStorage.getItem('solvedCodes');
        if (savedSolvedCodes) {
          setSolvedCodes(JSON.parse(savedSolvedCodes));
        }
      } catch (error) {
        console.error('Fout bij het ophalen van gegevens:', error);
      }
    };

    fetchCodesAndEncryptions();
  }, []);

  // Reset het resultaat wanneer currentIndex verandert
  useEffect(() => {
    setResult('');
    setInput('');
    setShowHint(false);
    setCorrectAnswer(false);
  }, [currentIndex]);

  // Check of alle codes zijn opgelost
  useEffect(() => {
    if (codes.length > 0 && solvedCodes.length === codes.length) {
      setShowAllCodesSolvedPopup(true);
      
      // Update de flags in sessionStorage om FLAG_14 te markeren als gevonden
      const savedFlags = sessionStorage.getItem('foundFlags');
      if (savedFlags) {
        const flags = JSON.parse(savedFlags);
        const updatedFlags = flags.map(flag => 
          flag.flagName === 'FLAG_14' ? { ...flag, found: true } : flag
        );
        sessionStorage.setItem('foundFlags', JSON.stringify(updatedFlags));
      }
    }
  }, [solvedCodes, codes.length]);

  const handleSubmit = async () => {
    if (!codes[currentIndex]) return;
    
    // Reset vorige resultaten bij een nieuwe poging
    setResult('');

    const response = await axios.post('/api/check-code', { code: input, id: codes[currentIndex].id });
    const data = response.data;

    if (data.valid) {
      setResult(`✅ Correcte code! Moeilijkheidsgraad: ${data.difficulty}`);
      setCorrectAnswer(true); // Markeer de code als correct opgelost
      const updatedSolvedCodes = [...solvedCodes, codes[currentIndex].id];
      setSolvedCodes(updatedSolvedCodes);
      sessionStorage.setItem('solvedCodes', JSON.stringify(updatedSolvedCodes));
    } else {
      setResult('❌ Onjuiste code, probeer opnieuw.');
      setCorrectAnswer(false); // Zorg ervoor dat je niet verder kunt
    }
  };

  const handleNextCode = () => {
    if (currentIndex < codes.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setInput('');
      setResult('');
      setShowHint(false); // Reset de hint
      setCorrectAnswer(false); // Reset correct antwoord
    }
  };

  const handleReset = () => {
    setSolvedCodes([]);
    sessionStorage.removeItem('solvedCodes');
    setCurrentIndex(0);
    setInput('');
    setResult('');
    setHintCount(0); // Reset de hint teller
    setShowHint(false); // Reset de hint
    setCorrectAnswer(false); // Reset correct antwoord
    sessionStorage.removeItem('hintCount'); // Verwijder hints uit sessionStorage
    setIsHintPopupOpen(false); // Reset de hint popup
    console.log('Ga naar /hint voor handige tools');
    
    // Toon de reset flag popup
    setShowFlagPopup(true);
    
    // Update de flags in sessionStorage om FLAG_6 te markeren als gevonden
    const savedFlags = sessionStorage.getItem('foundFlags');
    if (savedFlags) {
      const flags = JSON.parse(savedFlags);
      const updatedFlags = flags.map(flag => 
        flag.flagName === 'FLAG_6' ? { ...flag, found: true } : flag
      );
      sessionStorage.setItem('foundFlags', JSON.stringify(updatedFlags));
    }
  };

  const handleSelectCode = (code) => {
    // Zelfs als dezelfde code wordt geselecteerd, reset de status
    const codeIndex = codes.indexOf(code);
    
    // Reset staat altijd, ook als het dezelfde code is
    setInput('');
    setResult('');
    setShowHint(false);
    setCorrectAnswer(false);
    setIsHintPopupOpen(false); // Reset de hint popup bij het wisselen van codes
    
    // Update de index alleen als het een andere code is
    if (codeIndex !== currentIndex) {
      setCurrentIndex(codeIndex);
    }
  };

  const handleShowEncryptionInfo = (encryption) => {
    setSelectedEncryption(encryption);
  };

  // Functie om hints te tonen, limiet van 5 hints
  const handleShowHint = () => {
    if (hintCount < maxHints) {
      setIsHintPopupOpen(true);
      const newHintCount = hintCount + 1;
      setHintCount(newHintCount);
      sessionStorage.setItem('hintCount', JSON.stringify(newHintCount));
    }
  };

  const handlePopupSubmit = () => {
    if (popupInput === 'oldehove') { // Vervang 'correcte_antwoord' door het juiste antwoord
      setPopupError('<Link href="/leaderboard">Goed gedaan! zet jezelf op het leaderboard</Link>');
    }
       else {
      setPopupError('twdkztge komt niet overeen, heb je alle FLAGS?.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">Cyberbrein the Game</h1>

      {/* Konami Code Component */}
      <KonamiCode />

      {/* Terug naar Home link in de linkerbovenhoek */}
      <div className="absolute top-4 left-4">
        <Link href="/" className="text-lg font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors flex items-center">
          <span className="mr-1">←</span> Home
        </Link>
      </div>

      {/* Puzzel emoji in de rechterbovenhoek die een flag bevat */}
      <div className="absolute top-4 right-12">
        <FlagPopup
          flagName="FLAG_4"
          flagValue="FLAG_4{exploit_master}"
          triggerElement="🧩"
          triggerStyle="text-3xl cursor-pointer hover:opacity-75 transition-opacity"
          hideAfterFound={true}
        />
      </div>
      
      {/* Hover flag die alleen zichtbaar is bij hover - verplaatst naar linksonder */}
      <div className="absolute bottom-4 left-4">
        <FlagPopup
          flagName="FLAG_10"
          flagValue="FLAG_10{hover_reveal_secret}"
          triggerElement={
            <div className="group cursor-pointer w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                🔍
              </span>
            </div>
          }
          triggerStyle=""
          hideAfterFound={true}
        />
      </div>

      <div className="flex flex-col md:flex-row w-full max-w-6xl">
        {/* CodeList Component */}
        <CodeList codes={codes} solvedCodes={solvedCodes} handleSelectCode={handleSelectCode} />

        {/* Game scherm */}
        <div className="w-full md:w-2/3 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg md:ml-6 mt-4 md:mt-0 border border-gray-200 dark:border-gray-700">
          {codes[currentIndex] && (
            <>
              <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">Ontcijfer deze code:</p>
              <p className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">{codes[currentIndex].code}</p>

              {/* Display encryption information */}
              <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">Encryptie:</span> {codes[currentIndex].encryption}
                  {codes[currentIndex].key && (
                    <span className="ml-2">
                      <span className="font-semibold">Sleutel:</span> {codes[currentIndex].key}
                    </span>
                  )}
                </p>
              </div>

              {/* Hint-knop in het game scherm */}
              <button
                onClick={handleShowHint}
                className={`w-full mb-4 p-3 ${
                  hintCount >= maxHints ? 'bg-gray-500 dark:bg-gray-600 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-400 dark:bg-yellow-600 dark:hover:bg-yellow-500'
                } text-white rounded-lg transition duration-200 ease-in-out`}
                disabled={hintCount >= maxHints}
              >
                Toon hint ({hintCount}/{maxHints} gebruikt)
              </button>

              {/* Hint voor het encryptiemodel, alleen zichtbaar na klikken */}
              {showHint && (
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                  <Link href="/hint" className="text-blue-600 dark:text-blue-400 hover:underline">
                    <strong>Hint</strong>
                  </Link>{' '}
                  : Deze code is versleuteld met het{' '}
                  <Link href="/hint" className="text-blue-600 dark:text-blue-400 hover:underline">
                    <strong>{codes[currentIndex].encryption}</strong>
                  </Link>{' '}
                  <strong></strong> model.
                </p>
              )}

              <input
                type="text"
                className="w-full p-3 mb-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Voer je ontcijferde oplossing in"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  if (result) setResult(''); // Reset het resultaat wanneer de gebruiker typt
                }}
              />

              <button
                onClick={handleSubmit}
                className="w-full mt-4 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 transition duration-200 ease-in-out"
              >
                Controleer Oplossing
              </button>

              {result && (
                <div
                  className={`mt-4 p-4 rounded-lg ${
                    result.startsWith('✅') 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' 
                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                  }`}
                >
                  {result}
                </div>
              )}

              {/* Toon de knop voor "Volgende Code" alleen als het antwoord correct is flag3: @ploreorevra */}
              {correctAnswer && currentIndex < codes.length - 1 && (
                <button
                  onClick={handleNextCode}
                  className="w-full mt-4 p-3 bg-green-500 text-white rounded-lg hover:bg-green-400 dark:bg-green-600 dark:hover:bg-green-500 transition duration-200 ease-in-out"
                >
                  Volgende Code
                </button>
              )}

              {/* Toon de link naar de eindpagina als alle codes zijn opgelost */}
              {/* {solvedCodes.length === codes.length && (
                <button
                  onClick={() => setShowPopup(true)}
                  className="w-full mt-4 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 transition duration-200 ease-in-out"
                >
                  Ga naar de eindopdracht
                </button>
              )} */}
            </>
          )}
        </div>
      </div>

      <div className="w-full max-w-6xl mt-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Encryptiemodellen</h2>

        {/* EncryptionList Component */}
        <EncryptionList encryptions={encryptions} handleShowEncryptionInfo={handleShowEncryptionInfo} />

        {/* EncryptionInfo Component */}
        <EncryptionInfo selectedEncryption={selectedEncryption} />
      </div>

      <div className="flex space-x-4 mt-6">
        <button
          onClick={handleReset}
          className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-400 dark:bg-red-600 dark:hover:bg-red-500 transition duration-200 ease-in-out"
        >
          Reset Voortgang
        </button>
      </div>
      
      {/* Custom Popup voor de reset flag */}
      <Popup open={showFlagPopup} onClose={() => setShowFlagPopup(false)} modal>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Je hebt een flag gevonden! 🎉</h2>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
            <p className="font-mono text-lg break-all text-gray-800 dark:text-white">FLAG_6&#123;clean_reboot&#125;</p>
          </div>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            De flag is automatisch opgeslagen. Ga naar de <Link href="/flags" className="text-blue-600 dark:text-blue-400 hover:underline">flags pagina</Link> om je voortgang te bekijken.
          </p>
          <button
            onClick={() => setShowFlagPopup(false)}
            className="w-full p-3 mt-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 transition duration-200 ease-in-out"
          >
            Sluiten
          </button>
        </div>
      </Popup>

      {/* Popup Component voor de eindpagina */}
      <Popup open={showPopup} onClose={() => setShowPopup(false)}>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Controleer Antwoord</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">Voer het juiste antwoord in.</p>
          <input
            type="text"
            className="w-full p-3 mb-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Voer het antwoord in"
            value={popupInput}
            onChange={(e) => setPopupInput(e.target.value)}
          />
          {popupError && <p className="text-red-600 dark:text-red-400 mb-4">{popupError}</p>}
          <button
            onClick={handlePopupSubmit}
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 transition duration-200 ease-in-out"
          >
            Controleer
          </button>
        </div>
      </Popup>

      {/* Popup voor alle codes opgelost */}
      <Popup open={showAllCodesSolvedPopup} onClose={() => setShowAllCodesSolvedPopup(false)} modal>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Je hebt een flag gevonden! 🎉</h2>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
            <p className="font-mono text-lg break-all text-gray-800 dark:text-white">FLAG_14&#123;code_master_2023&#125;</p>
          </div>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Ga naar de <Link href="/flags" className="text-blue-600 dark:text-blue-400 hover:underline">flags pagina</Link> om deze flag op te slaan en je voortgang bij te houden.
          </p>
          <button
            onClick={() => setShowAllCodesSolvedPopup(false)}
            className="w-full p-3 mt-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 transition duration-200 ease-in-out"
          >
            Sluiten
          </button>
        </div>
      </Popup>

      {/* Hint Popup */}
      <HintPopup
        isOpen={isHintPopupOpen}
        onClose={() => setIsHintPopupOpen(false)}
      />
    </div>
  );
};

export default Game;