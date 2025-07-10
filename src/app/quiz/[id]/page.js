'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { quizzes } from '../../../quizzes';

export default function DynamicQuiz() {
  const params = useParams();
  const router = useRouter();
  const { width, height } = useWindowSize();
  
  // State for quiz
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showFlagPopup, setShowFlagPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconden per vraag
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [loading, setLoading] = useState(true);
  
  // Find current quiz data
  const currentQuiz = quizzes.find(quiz => quiz.id === params.id);
  const currentQuestion = currentQuiz?.questions?.[currentQuestionIndex] || null;
  
  // Define handleAnswer with useCallback to prevent dependency changes on every render
  const handleAnswer = useCallback((optionIndex) => {
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
    const isCorrect = selectedIndex === currentQuestion?.correctAnswer;
    setIsAnswerCorrect(isCorrect);
    if (isCorrect) {
      setScore(score => score + 1);
    }
    setShowExplanation(true);
  }, [currentQuestion, selectedOption]);
  
  // Check if quiz exists
  useEffect(() => {
    if (!currentQuiz && params.id) {
      router.push('/');
    }
    setLoading(false);
  }, [currentQuiz, params.id, router]);
  
  // Timer effect
  useEffect(() => {
    if (!isTimerActive || quizCompleted || !currentQuestion) return;
    
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleAnswer(null);
    }
  }, [timeLeft, isTimerActive, quizCompleted, currentQuestion, handleAnswer]);
  
  // Reset timer on new question
  useEffect(() => {
    setTimeLeft(30);
    setIsTimerActive(true);
  }, [currentQuestionIndex]);
  
  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
  };
  
  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-4 mx-auto"></div>
            <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }
  
  // Return if no quiz found
  if (!currentQuiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz niet gevonden</h2>
          <Link href="/quiz" className="text-blue-600 hover:text-blue-800">
            Terug naar quizzes
          </Link>
        </div>
      </div>
    );
  }
  
  const goToNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswerCorrect(null);
    setShowExplanation(false);
    
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz is voltooid
      setQuizCompleted(true);
      
      // Als de score voldoende is, toon de flag
      if (score >= currentQuiz.passingScore - 1) { // De huidige vraag is goed beantwoord maar nog niet meegeteld in de score
        setShowFlagPopup(true);
        
        // Update de flags in sessionStorage
        const savedFlags = sessionStorage.getItem('foundFlags');
        if (savedFlags) {
          const flags = JSON.parse(savedFlags);
          const updatedFlags = flags.map(flag => 
            flag.flagName === currentQuiz.flagName ? { ...flag, found: true } : flag
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
  
  // Style based on quiz color
  const getButtonStyle = () => {
    switch(currentQuiz.color) {
      case 'green': return 'bg-green-600 hover:bg-green-500';
      case 'red': return 'bg-red-600 hover:bg-red-500';
      case 'purple': return 'bg-purple-600 hover:bg-purple-500';
      default: return 'bg-green-600 hover:bg-green-700';
    }
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
                Vraag {currentQuestionIndex + 1} van {currentQuiz.questions.length}
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
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 flex items-center">
                <span className="text-4xl mr-3">{currentQuiz.image}</span>
                {currentQuiz.title}
              </h1>
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                Score: {score}/{currentQuestionIndex + (showExplanation ? 1 : 0)}
              </span>
            </div>
            
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
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedOption === index 
                        ? "border-green-500 bg-white dark:bg-gray-800" 
                        : "border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600 dark:hover:bg-gray-700/50"
                    } ${
                      showExplanation && index === currentQuestion.correctAnswer
                        ? "border-green-500 bg-green-50 dark:bg-green-900/30"
                        : showExplanation && index === selectedOption && index !== currentQuestion.correctAnswer
                          ? "border-red-500 bg-red-50 dark:bg-red-900/30"
                          : ""
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
                      ? getButtonStyle() + " text-white" 
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
                    className={`py-2 px-6 ${getButtonStyle()} text-white rounded-lg transition-colors`}
                  >
                    {currentQuestionIndex < currentQuiz.questions.length - 1 
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
            <h1 className="text-3xl font-bold text-center mb-4 text-gray-800 dark:text-gray-200">
              {currentQuiz.title} Voltooid!
            </h1>
            
            <div className="text-center mb-8">
              <div className="text-6xl font-bold mb-2">
                {score} / {currentQuiz.questions.length}
              </div>
              <div className="text-lg">
                {score >= currentQuiz.passingScore 
                  ? score === currentQuiz.questions.length
                    ? "Perfect! Je hebt alles goed!" 
                    : `Gefeliciteerd! Je hebt de ${currentQuiz.title} quiz gehaald.`
                  : `Je hebt ${currentQuiz.passingScore - score} meer punten nodig om de quiz te halen.`
                }
              </div>
            </div>
            
            {score >= currentQuiz.passingScore && (
              <div className="p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg text-center mb-8">
                <div className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2">
                  🏆 Je hebt een speciale &quot;flag&quot; verdiend!
                </div>
                <div className="text-sm">
                  De flag wordt onthuld als je op de knop klikt.
                </div>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={restartQuiz}
                className={`py-2 px-6 ${getButtonStyle()} text-white rounded-lg transition-colors`}
              >
                Quiz opnieuw spelen
              </button>
              <Link href="/">
                <button className="py-2 px-6 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors">
                  Terug naar Home
                </button>
              </Link>
            </div>
          </div>
        )}
        
        {/* Uitleg van de quiz */}
        {!quizCompleted && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              Over deze Quiz
            </h2>
            <div className="text-gray-600 dark:text-gray-400 space-y-2">
              <p>{currentQuiz.description}</p>
              <p>Elke vraag heeft een tijdslimiet van 30 seconden.</p>
              <p>Beantwoord minstens {currentQuiz.passingScore} van de {currentQuiz.questions.length} vragen correct om een speciale &quot;flag&quot; te verdienen!</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Confetti bij hoge score */}
      {quizCompleted && score >= currentQuiz.passingScore && (
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
          <p className="mb-4">Je hebt de {currentQuiz.title} quiz gehaald en een flag verdiend!</p>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
            <p className="font-mono text-lg break-all">{currentQuiz.flagValue}</p>
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
                    flag.flagName === currentQuiz.flagName ? { ...flag, found: true, hidden: true } : flag
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