'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// Quiz vragen (kan later uit een API worden gehaald)
const quizQuestions = [
  {
    id: 1,
    question: "Wat is encryptie?",
    options: [
      "Een type computervirus",
      "Het proces om gegevens te versleutelen zodat alleen bevoegde personen ze kunnen lezen",
      "Een programmeerprotocol",
      "Een type internetverbinding"
    ],
    correctAnswer: 1, // 0-gebaseerde index
    explanation: "Encryptie is het proces waarbij leesbare gegevens worden omgezet in een gecodeerde vorm, zodat alleen mensen met de juiste sleutel deze kunnen lezen."
  },
  {
    id: 2,
    question: "Welke van de volgende is een voorbeeld van een Caesar Cipher?",
    options: [
      "ABC → 123",
      "ABC → QWE",
      "ABC → DEF",
      "ABC → CBA"
    ],
    correctAnswer: 2,
    explanation: "De Caesar Cipher verschuift elke letter in het alfabet een vast aantal posities. ABC → DEF is een voorbeeld van een verschuiving van 3 posities."
  },
  {
    id: 3,
    question: "Wat is het doel van een wachtwoord?",
    options: [
      "Om je gebruikersnaam te onthouden",
      "Om toegang te verlenen tot je account",
      "Om je identiteit te verifiëren en alleen jou toegang te geven",
      "Om je e-mail te verzenden"
    ],
    correctAnswer: 2,
    explanation: "Wachtwoorden dienen om je identiteit te verifiëren en ervoor te zorgen dat alleen jij toegang hebt tot je accounts en gegevens."
  },
  {
    id: 4,
    question: "Wat is 'phishing'?",
    options: [
      "Een hackertechniek om wachtwoorden te kraken",
      "Een poging om gevoelige informatie te stelen door zich voor te doen als een betrouwbare entiteit",
      "Een methode om sterke wachtwoorden te maken",
      "Een type encryptie"
    ],
    correctAnswer: 1,
    explanation: "Phishing is een vorm van social engineering waarbij aanvallers zich voordoen als betrouwbare entiteiten om persoonlijke gegevens zoals wachtwoorden of creditcardnummers te stelen."
  },
  {
    id: 5,
    question: "Wat betekent 'https://' in een webadres?",
    options: [
      "High Transfer Protocol System",
      "Hypertext Transfer Protocol Secure - de verbinding is beveiligd met encryptie",
      "Host Transfer Protocol Standard",
      "Het betekent niets speciaals"
    ],
    correctAnswer: 1,
    explanation: "HTTPS staat voor Hypertext Transfer Protocol Secure. Het geeft aan dat de verbinding tussen jouw browser en de website is versleuteld voor veiligheid."
  },
  {
    id: 6,
    question: "Welke van de volgende is het sterkste wachtwoord?",
    options: [
      "123456",
      "wachtwoord",
      "Mijn$H0nd8IsL1ef!",
      "geboortedatum"
    ],
    correctAnswer: 2,
    explanation: "Een sterk wachtwoord bevat een mix van hoofdletters, kleine letters, cijfers en speciale tekens. Het derde wachtwoord voldoet hier het beste aan."
  },
  {
    id: 7,
    question: "Wat is een 'cyberaanval'?",
    options: [
      "Een computerspel",
      "Een poging om toegang te krijgen tot, schade toe te brengen aan of informatie te stelen uit een computersysteem",
      "Een soort antivirusprogramma",
      "Een internetverbinding"
    ],
    correctAnswer: 1,
    explanation: "Een cyberaanval is een kwaadaardige poging om toegang te krijgen tot computersystemen, netwerken of gegevens om schade aan te richten of informatie te stelen."
  },
  {
    id: 8,
    question: "Wat is een &apos;flag&apos; in een cybersecurity-context?",
    options: [
      "Een land van herkomst",
      "Een type virus",
      "Een geheime tekst of code die je vindt als bewijs dat je een uitdaging hebt voltooid",
      "Een type firewall"
    ],
    correctAnswer: 2,
    explanation: "In cybersecurity-wedstrijden en CTF (Capture The Flag) spellen zijn flags geheime codes die deelnemers moeten vinden om te bewijzen dat ze een bepaalde uitdaging hebben opgelost."
  },
  {
    id: 9,
    question: "Wat moet je doen als je een verdachte e-mail ontvangt?",
    options: [
      "Op alle links klikken om te zien wat er gebeurt",
      "Je wachtwoord direct veranderen en in de e-mail invoeren",
      "De bijlagen downloaden om te zien wat erin zit",
      "De e-mail niet openen, verwijderen of rapporteren als spam"
    ],
    correctAnswer: 3,
    explanation: "Bij verdachte e-mails is het beste om ze niet te openen, direct te verwijderen, en ze te rapporteren als spam of phishing. Klik nooit op links of download bijlagen uit verdachte e-mails."
  },
  {
    id: 10,
    question: "Wat is 'twee-factor authenticatie'?",
    options: [
      "Twee verschillende wachtwoorden gebruiken",
      "Een extra beveiligingslaag die naast je wachtwoord nog een verificatiemethode vereist",
      "Twee keer inloggen op hetzelfde account",
      "Een type encryptie"
    ],
    correctAnswer: 1,
    explanation: "Twee-factor authenticatie (2FA) voegt een extra beveiligingslaag toe aan het inlogproces. Naast iets wat je weet (wachtwoord), heb je ook iets wat je bezit (zoals een telefoon) nodig om in te loggen."
  }
];

export default function EncryptionQuiz() {
  const { width, height } = useWindowSize();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showFlagPopup, setShowFlagPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconden per vraag
  const [isTimerActive, setIsTimerActive] = useState(true);
  
  // Define handleTimeUp with useCallback to prevent it from changing on every render
  const handleTimeUp = useCallback(() => {
    setIsTimerActive(false);
    setIsAnswerCorrect(false);
    setShowExplanation(true);
  }, []);
  
  // Timer effect
  useEffect(() => {
    if (!isTimerActive || quizCompleted) return;
    
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleTimeUp();
    }
  }, [timeLeft, isTimerActive, quizCompleted, handleTimeUp]);
  
  // Reset timer on new question
  useEffect(() => {
    setTimeLeft(30);
    setIsTimerActive(true);
  }, [currentQuestionIndex]);
  
  const currentQuestion = quizQuestions[currentQuestionIndex];
  
  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
  };
  
  const handleAnswer = (optionIndex) => {
    setIsTimerActive(false);
    
    // Als tijd op is en geen optie is geselecteerd
    if (optionIndex === null && selectedOption === null) {
      setIsAnswerCorrect(false);
      setShowExplanation(true);
      return;
    }
    
    // Gebruik geselecteerde optie als er geen is doorgegeven
    const selectedIndex = optionIndex !== null ? optionIndex : selectedOption;
    
    // Controleer antwoord
    const isCorrect = selectedIndex === currentQuestion.correctAnswer;
    setIsAnswerCorrect(isCorrect);
    if (isCorrect) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };
  
  const goToNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswerCorrect(null);
    setShowExplanation(false);
    
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz is voltooid
      setQuizCompleted(true);
      
      // Als de score voldoende is, toon de flag
      if (score >= 7) { // 70% correct
        setShowFlagPopup(true);
        
        // Update de flags in sessionStorage
        const savedFlags = sessionStorage.getItem('foundFlags');
        if (savedFlags) {
          const flags = JSON.parse(savedFlags);
          const updatedFlags = flags.map(flag => 
            flag.flagName === 'FLAG_QUIZ' ? { ...flag, found: true } : flag
          );
          sessionStorage.setItem('foundFlags', JSON.stringify(updatedFlags));
        }
      }
    }
  };
  
  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerCorrect(null);
    setScore(0);
    setShowExplanation(false);
    setQuizCompleted(false);
    setTimeLeft(30);
    setIsTimerActive(true);
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
          {!quizCompleted && (
            <div className="flex items-center gap-4">
              <div className="text-sm font-medium">
                Vraag {currentQuestionIndex + 1} van {quizQuestions.length}
              </div>
              <div className={`py-1 px-3 rounded-full text-sm font-medium ${
                timeLeft > 10 
                  ? "bg-green-200 text-green-800" 
                  : timeLeft > 5 
                    ? "bg-yellow-200 text-yellow-800" 
                    : "bg-red-200 text-red-800 animate-pulse"
              }`}>
                Tijd: {timeLeft}s
              </div>
            </div>
          )}
        </div>

        {!quizCompleted ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-green-600 dark:text-green-400">
              Encryptie & Cybersecurity Quiz
            </h1>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                {currentQuestionIndex + 1}. {currentQuestion.question}
              </h2>
              
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    disabled={showExplanation}
                    className={`p-4 border dark:border-gray-600 rounded text-left transition-colors w-full mb-2
                      ${
                        selectedOption === index
                          ? "bg-green-100 dark:bg-green-800 border-green-500 dark:border-green-300"
                          : "hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                  >
                    <div className="flex items-start">
                      <div className={`flex-shrink-0 h-5 w-5 mr-2 mt-0.5 rounded-full border ${
                        selectedOption === index 
                          ? "border-green-500 bg-green-500" 
                          : "border-gray-300 dark:border-gray-600"
                      } ${
                        showExplanation && index === currentQuestion.correctAnswer
                          ? "border-green-500 bg-green-500"
                          : ""
                      }`}>
                        {(selectedOption === index || (showExplanation && index === currentQuestion.correctAnswer)) && (
                          <svg className="h-full w-full text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {!showExplanation ? (
              <div className="flex justify-end">
                <button
                  onClick={() => handleAnswer(selectedOption)}
                  disabled={selectedOption === null}
                  className={`py-2 px-6 rounded-lg font-medium transition-colors ${
                    selectedOption !== null 
                      ? "bg-green-600 text-white hover:bg-green-700" 
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  Controleer antwoord
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className={`p-4 rounded-lg ${
                  isAnswerCorrect 
                    ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200" 
                    : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200"
                }`}>
                  <div className="font-semibold mb-2">
                    {isAnswerCorrect 
                      ? "✅ Correct!" 
                      : "❌ Helaas, dat is niet juist."
                    }
                  </div>
                  <p>{currentQuestion.explanation}</p>
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={goToNextQuestion}
                    className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white"
                  >
                    {currentQuestionIndex < quizQuestions.length - 1 
                      ? "Volgende vraag" 
                      : "Bekijk resultaat"
                    }
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
            <h1 className="text-3xl font-bold text-center mb-4 text-green-600 dark:text-green-400">
              Quiz Voltooid!
            </h1>
            
            <div className="text-center mb-8">
              <div className="text-6xl font-bold mb-2">
                {score} / {quizQuestions.length}
              </div>
              <div className="text-lg">
                {score >= 9 
                  ? "Geweldig! Je bent een echte cybersecurity expert!" 
                  : score >= 7 
                    ? "Goed gedaan! Je weet veel over encryptie en cybersecurity." 
                    : score >= 5 
                      ? "Niet slecht! Je hebt basiskennis van cybersecurity." 
                      : "Je kunt nog wat leren over cybersecurity. Probeer het nog eens!"
                }
              </div>
            </div>
            
            {score >= 7 && (
              <div className="p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg text-center mb-8">
                <div className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2">
                  🏆 Je hebt een speciale &quot;flag&quot; verdiend!
                </div>
                <div className="text-sm">
                  De flag is automatisch opgeslagen. Ga naar de <Link href="/flags" className="text-green-600 hover:underline">flags pagina</Link> om je voortgang te bekijken.
                </div>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={restartQuiz}
                className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white"
              >
                Probeer opnieuw
              </button>
              <Link href="/">
                <button className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 text-white">
                  Terug naar Home
                </button>
              </Link>
            </div>
          </div>
        )}
        
        {/* Uitleg van de quiz */}
        {!quizCompleted && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-green-600 dark:text-green-400">
              Over de Quiz
            </h2>
            <div className="text-gray-700 dark:text-gray-300 space-y-2">
              <p>Deze quiz test je kennis over encryptie en cybersecurity.</p>
              <p>Elke vraag heeft een tijdslimiet van 30 seconden.</p>
              <p>Beantwoord minstens 7 van de 10 vragen correct om een speciale &quot;flag&quot; te verdienen!</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Confetti bij hoge score */}
      {quizCompleted && score >= 7 && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={300}
        />
      )}
      
      {/* Flag popup */}
      <Popup open={showFlagPopup} onClose={() => setShowFlagPopup(false)} modal>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Gefeliciteerd! 🎉</h2>
          <p className="mb-4">Je hebt de cybersecurity quiz gehaald en een flag verdiend!</p>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
            <p className="font-mono text-lg break-all">FLAG_QUIZ&#123;crypto_knowledge_master&#125;</p>
          </div>
          <p className="mb-4">
            De flag is automatisch opgeslagen. Ga naar de <Link href="/flags" className="text-green-600 hover:underline">flags pagina</Link> om je voortgang te bekijken.
          </p>
          <button
            onClick={() => setShowFlagPopup(false)}
            className="w-full p-3 mt-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition duration-200 ease-in-out"
          >
            Sluiten
          </button>
        </div>
      </Popup>
    </div>
  );
} 