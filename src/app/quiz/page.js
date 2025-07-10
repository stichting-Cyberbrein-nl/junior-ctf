'use client';

import { useState } from 'react';
import Link from 'next/link';
import { quizzes } from '../../quizzes';

export default function QuizOverview() {
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

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <Link href="/" className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 flex items-center mb-4 md:mb-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Terug naar Home
            </Link>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Quiz Centrum</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Kies een quiz en test je kennis over verschillende cybersecurity-onderwerpen!
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Filter op moeilijkheidsgraad:
            </label>
            <div className="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium border rounded-l-lg ${
                  selectedDifficulty === 'all'
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700'
                }`}
                onClick={() => setSelectedDifficulty('all')}
              >
                Alle
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium border-t border-b border-r ${
                  selectedDifficulty === 'beginners'
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700'
                }`}
                onClick={() => setSelectedDifficulty('beginners')}
              >
                Beginners
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium border-t border-b border-r ${
                  selectedDifficulty === 'gemiddeld'
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700'
                }`}
                onClick={() => setSelectedDifficulty('gemiddeld')}
              >
                Gemiddeld
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium border-t border-b border-r rounded-r-lg ${
                  selectedDifficulty === 'expert'
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700'
                }`}
                onClick={() => setSelectedDifficulty('expert')}
              >
                Expert
              </button>
            </div>
          </div>
        </div>
        
        {filteredQuizzes.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Geen quizzes gevonden voor deze moeilijkheidsgraad.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map((quiz) => (
              <div 
                key={quiz.id} 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105"
              >
                <div className={`h-2 ${quiz.color === 'blue' ? 'bg-blue-500' : quiz.color === 'green' ? 'bg-green-500' : quiz.color === 'red' ? 'bg-red-500' : quiz.color === 'purple' ? 'bg-purple-500' : 'bg-gray-500'}`} />
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl mr-4">{quiz.image}</div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${difficultyColors[quiz.difficulty] || 'bg-gray-100 text-gray-800'}`}>
                      {quiz.difficulty}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">{quiz.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">{quiz.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
                    <div>{quiz.totalQuestions} vragen</div>
                    <div>Score {quiz.passingScore}/{quiz.totalQuestions} om te slagen</div>
                  </div>
                  
                  <Link href={`/quiz/${quiz.id}`}>
                    <button className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                      quiz.color === 'blue' 
                        ? 'bg-blue-600 hover:bg-blue-500 text-white' 
                        : quiz.color === 'green' 
                          ? 'bg-green-600 hover:bg-green-500 text-white'
                          : quiz.color === 'red'
                            ? 'bg-red-600 hover:bg-red-500 text-white'
                            : quiz.color === 'purple'
                              ? 'bg-purple-600 hover:bg-purple-500 text-white'
                              : 'bg-gray-600 hover:bg-gray-500 text-white'
                    }`}>
                      Start Quiz
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Verborgen flags</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Elke quiz bevat een speciale &quot;flag&quot; die je kunt verzamelen als je genoeg kennis hebt. Verzamel alle flags om je cyberkennis te bewijzen!
          </p>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
              <li>Flag verdiend: Je moet minimaal 70% van de vragen correct beantwoorden.</li>
              <li>Moeilijkheidsgraad: Hoe moeilijker de quiz, hoe waardevoller de flag!</li>
              <li>Onbeperkte pogingen: Je kunt de quiz zo vaak proberen als je wilt.</li>
            </ul>
          </div>
        </div>

        {/* Informatie over flags */}
        <div className="mt-12 bg-blue-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-300 mb-3">Verborgen flags</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Bij het voltooien van quizzes kan je &quot;flags&quot; verdienen. Deze flags zijn speciale codes die je kunt verzamelen 
            als bewijs van je kennis en vaardigheid. Bekijk je verzamelde flags op de flags pagina!
          </p>
        </div>
      </div>
    </div>
  );
} 