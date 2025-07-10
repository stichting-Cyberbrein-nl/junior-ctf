'use client'; // Dit zorgt ervoor dat het een client-side component is

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import FlagPopup from './components/FlagPopup';
import KonamiCode from './components/KonamiCode';
import MorseCodeChallenge from './components/MorseCode';
import WelcomePopup from './components/WelcomePopup';
import { quizzes } from '../quizzes'; // Importeer de quizzes

export default function Home() {
  const [showAdminLink, setShowAdminLink] = useState(false); // State om te bepalen of admin link zichtbaar is
  const [passwordInput, setPasswordInput] = useState(''); // Voor het invoeren van het wachtwoord
  const [passwordError, setPasswordError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [dropSuccess, setDropSuccess] = useState(false);
  const [showFlagPopup, setShowFlagPopup] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const logoRef = useRef(null);
  const dropZoneRef = useRef(null);

  // State voor quiz filtering
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  
  // Filter quizzes op moeilijkheidsgraad
  const filteredQuizzes = selectedDifficulty === 'all' 
    ? quizzes 
    : quizzes.filter(quiz => quiz.difficulty === selectedDifficulty);

  // Kleurcodes voor difficulty badges
  const difficultyColors = {
    beginners: "bg-green-100 text-green-800",
    gemiddeld: "bg-yellow-100 text-yellow-800",
    expert: "bg-red-100 text-red-800",
  };

  // Check for existing username on component mount
  useEffect(() => {
    const username = localStorage.getItem('username');
    if (!username) {
      setShowWelcomePopup(true);
    }
  }, []);

  const handlePasswordSubmit = () => {
    const adminPassword = 'cyberbrein'; // Hier kun je een sterk wachtwoord instellen
    if (passwordInput === adminPassword) {
      setShowAdminLink(true);
    } else {
      setPasswordError('wachtwoord komt niet overeen met ploreoerva');
      console.log('wachtwoord komt niet overeen met ploreoerva');
    }
  };

  // Drag & Drop functionaliteit
  const handleDragStart = (e) => {
    setIsDragging(true);
    // Voor Firefox is dit nodig om het element te kunnen slepen
    if (e.dataTransfer) {
      e.dataTransfer.setData('text/plain', 'logo');
      e.dataTransfer.effectAllowed = 'move';
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'move';
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    if (data === 'logo') {
      setDropSuccess(true);
      setShowFlagPopup(true);
      
      // Update de flags in sessionStorage om FLAG_DRAG te markeren als gevonden
      const savedFlags = sessionStorage.getItem('foundFlags');
      if (savedFlags) {
        const flags = JSON.parse(savedFlags);
        const updatedFlags = flags.map(flag => 
          flag.flagName === 'FLAG_DRAG' ? { ...flag, found: true } : flag
        );
        sessionStorage.setItem('foundFlags', JSON.stringify(updatedFlags));
      }
    }
  };

  return (
    <div className="min-h-screen p-6 pb-16 font-[family-name:var(--font-geist-sans)] bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Welcome Popup */}
      {showWelcomePopup && (
        <WelcomePopup onClose={() => setShowWelcomePopup(false)} />
      )}

      {/* Konami Code easter egg */}
      <KonamiCode />
      
      {/* Morse Code Challenge */}
      <MorseCodeChallenge />
      
      {/* Flags emoji in de rechterbovenhoek */}
      <div className="absolute top-4 right-4">
        <Link href="/flags" className="text-3xl hover:opacity-75 transition-opacity" title="Vlaggen verzamelen">
          🚩
        </Link>
      </div>
      
      {/* Verborgen flag in het sterretje */}
      <div className="absolute top-4 left-4">
        <FlagPopup
          flagName="FLAG_3"
          flagValue="FLAG_3{encryption_star}"
          triggerElement="⭐"
          triggerStyle="text-3xl cursor-pointer hover:opacity-75 transition-opacity"
          hideAfterFound={true}
        />
      </div>
      
      {/* Verborgen flag in achtergrond kleur */}
      <div className="absolute top-1/2 left-4">
        <FlagPopup
          flagName="FLAG_9"
          flagValue="FLAG_9{hidden_in_plain_sight}"
          triggerElement={
            <div className="text-blue-50 hover:text-blue-600 dark:text-white dark:opacity-5 dark:hover:opacity-100 dark:hover:text-blue-400 transition-colors duration-300 select-none">
              FLAG_9{"{hidden_in_plain_sight}"}
            </div>
          }
          triggerStyle=""
          hideAfterFound={true}
        />
      </div>
      
      {/* Flag popup voor wanneer het logo correct wordt gedropt */}
      <Popup open={showFlagPopup} onClose={() => setShowFlagPopup(false)} modal>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">Je hebt een flag gevonden! 🎉</h2>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
            <p className="font-mono text-lg break-all dark:text-white">FLAG_DRAG&#123;drag_and_drop_master&#125;</p>
          </div>
          <p className="mb-4 dark:text-white">
            De flag is automatisch opgeslagen. Ga naar de <Link href="/flags" className="text-blue-600 dark:text-blue-400 hover:underline">flags pagina</Link> om je voortgang te bekijken.
          </p>
          <button
            onClick={() => setShowFlagPopup(false)}
            className="w-full p-3 mt-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition duration-200 ease-in-out"
          >
            Sluiten
          </button>
        </div>
      </Popup>
      
      <main className="max-w-4xl mx-auto mt-12 flex flex-col items-center">
        {/* Drag and Drop Section */}
        <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="md:w-1/2">
              <h1 className="text-3xl sm:text-5xl font-bold mb-8 text-blue-600 dark:text-blue-400">
                Welkom bij Cyberbrein the Game!
              </h1>
              <h2 className="text-xl font-bold mb-3 text-purple-600 dark:text-purple-400">Wat is Cyberbrein?</h2>
              <p className="text-lg mb-4">
                Cyberbrein is een spannend spel waar je leert over computercodes en geheime boodschappen! 
                Je kunt puzzels oplossen en digitale vlaggen verzamelen. 🎮
              </p>
              <h2 className="text-xl font-bold mb-3 text-purple-600 dark:text-purple-400">Hoe werkt het?</h2>
              <p className="text-lg">
                Los raadsels op, verzamel vlaggen en word een cyberheld! Als je vastloopt, kun je altijd een 
                <Link href="/hint" className="mx-1 font-bold text-blue-600 dark:text-blue-400 hover:underline">HINT</Link> 
                gebruiken.
              </p>
            </div>
            <div className="md:w-1/2 flex flex-col items-center">
              {/* Cyberbrein logo (sleepbaar) */}
              <div
                ref={logoRef}
                draggable="true"
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                className={`relative transition-transform duration-200 ${isDragging ? 'opacity-50 scale-105' : ''} ${dropSuccess ? 'hidden' : ''} cursor-grab active:cursor-grabbing`}
              >
                <Image
                  src="/cyberbrein-logo.png"
                  alt="Cyberbrein Logo"
                  width={180}
                  height={38}
                  className="mb-6"
                  priority
                />
                {!isDragging && !dropSuccess && (
                  <div className="text-xs text-center text-gray-400 mt-1 animate-pulse">
                    Sleep mij...
                  </div>
                )}
              </div>
              
              {/* Vervangende tekst als het logo is gedropt */}
              {dropSuccess && (
                <div className="flex flex-col items-center mb-6">
                  <div className="text-xl font-bold text-green-600 dark:text-green-400 mb-2">
                    Logo gedropt!
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Flag ontgrendeld
                  </div>
                </div>
              )}
              
              {/* Vergrootglas div als dropzone */}
              <div 
                ref={dropZoneRef}
                className={`w-64 h-64 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center 
                  transition-all duration-300 
                  ${isDragging ? 'ring-4 ring-yellow-300 scale-105 animate-pulse' : ''} 
                  ${dropSuccess ? 'from-green-400 to-green-500' : ''}`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div className={`text-8xl transition-transform ${isDragging ? 'scale-125' : ''} ${dropSuccess ? 'rotate-360' : ''}`}>
                  {dropSuccess ? '✅' : '🔍'}
                </div>
                {isDragging && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-sm bg-black bg-opacity-60 px-2 py-1 rounded-lg whitespace-nowrap">
                    Drop hier om de flag te ontgrendelen
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Spellen Sectie */}
        <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">Spellen</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/game" className="w-full">
              <button className="w-full py-4 rounded-xl border-4 border-solid border-green-500 transition-colors flex items-center justify-center bg-green-500 text-white hover:bg-green-400 hover:border-green-400 text-xl font-bold shadow-lg">
                <span className="mr-2">🔐</span> Encryptie Spel
              </button>
            </Link>
            <Link href="/word-shuffle" className="w-full">
              <button className="w-full py-4 rounded-xl border-4 border-solid border-purple-500 transition-colors flex items-center justify-center bg-purple-500 text-white hover:bg-purple-400 hover:border-purple-400 text-xl font-bold shadow-lg">
                <span className="mr-2">🔤</span> Woord Shuffle
              </button>
            </Link>
            <Link href="/emoji-code" className="w-full">
              <button className="w-full py-4 rounded-xl border-4 border-solid border-pink-500 transition-colors flex items-center justify-center bg-pink-500 text-white hover:bg-pink-400 hover:border-pink-400 text-xl font-bold shadow-lg">
                <span className="mr-2">😀</span> Emoji Codekraker
              </button>
            </Link>
            <Link href="/spot-differences" className="w-full">
              <button className="w-full py-4 rounded-xl border-4 border-solid border-blue-500 transition-colors flex items-center justify-center bg-blue-500 text-white hover:bg-blue-400 hover:border-blue-400 text-xl font-bold shadow-lg">
                <span className="mr-2">👁️</span> Zoek de Verschillen
              </button>
            </Link>
          </div>
        </div>

        {/* Lessen Sectie */}
        <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">Lessen</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/encryption-lessons" className="w-full">
              <button className="w-full py-4 rounded-xl border-4 border-solid border-blue-500 transition-colors flex items-center justify-center bg-blue-500 text-white hover:bg-blue-400 hover:border-blue-400 text-xl font-bold shadow-lg">
                <span className="mr-2">📖</span> Encryptie Lessen
              </button>
            </Link>
            <Link href="/encryption-lessons/7" className="w-full">
              <button className="w-full py-4 rounded-xl border-4 border-solid border-blue-400 transition-colors flex items-center justify-center bg-blue-400 text-white hover:bg-blue-300 hover:border-blue-300 text-xl font-bold shadow-lg">
                <span className="mr-2">🔄</span> Caesar Wiel
              </button>
            </Link>
          </div>
        </div>

        {/* Quiz Sectie */}
        <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Quiz</h2>
            <Link href="/quiz" className="text-blue-600 dark:text-blue-400 hover:underline">
              Bekijk alle quizzes
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {quizzes.map((quiz) => (
              <Link key={quiz.id} href={`/quiz/${quiz.id}`} className="w-full">
                <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{quiz.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[quiz.difficulty]}`}>
                      {quiz.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{quiz.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      
      {/* Admin link at the bottom of the page */}
      {showAdminLink && (
        <div className="fixed bottom-4 right-4">
          <Link href="/backend" className="text-3xl hover:opacity-75 transition-opacity" title="Beheerder">
            🔑
          </Link>
        </div>
      )}

      <div className="text-center mt-8">
        <Link href="/backend" className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400 transition-colors">
          Beheerders
        </Link>
      </div>
    </div>
  );
}
