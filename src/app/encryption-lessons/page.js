'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FlagPopup from '../components/FlagPopup';
import Image from 'next/image';
import HintPopup from '../components/HintPopup';

export default function EncryptionLessons() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isHintPopupOpen, setIsHintPopupOpen] = useState(false);
  const router = useRouter();

  // Function to fetch lessons
  const fetchLessons = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/encryption-lessons');
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setLessons(data);
    } catch (err) {
      console.error('Error fetching lessons:', err);
      setError('Er is een fout opgetreden bij het laden van de lessen. Probeer het later opnieuw.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const getDifficultyColor = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300';
      case 'gevorderd':
        return 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300';
    }
  };

  return (
    <div className="min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto">
        {/* Terug naar home knop */}
        <div className="mb-8">
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center w-fit">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Terug naar home
          </Link>
        </div>

        {/* Header met flag */}
        <header className="mb-8 text-center relative">
          <div className="absolute top-0 right-0">
            <FlagPopup
              flagName="FLAG_ENCRYPTION_LESSONS"
              flagValue="FLAG_ENCRYPTION_LESSONS{knowledge_unlocks_secrets}"
              triggerElement="🔐"
              triggerStyle="text-2xl cursor-pointer hover:opacity-75 transition-opacity"
              hideAfterFound={true}
            />
          </div>
          <h1 className="text-3xl font-bold mb-2 dark:text-white">Encryptie Lessen</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Leer alles over encryptie en hoe je deze kennis kunt toepassen in het spel.
            Ontdek verschillende encryptie technieken en word een cyber-expert!
          </p>
        </header>

        {/* Encryptie Tool Button */}
        <div className="mb-8 text-center">
          <button
            onClick={() => setIsHintPopupOpen(true)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-colors flex items-center mx-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Open Encryptie Tool
          </button>
        </div>

        {/* Informatie blok */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Waarom encryptie leren?</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            Encryptie is een fundamentele techniek in cybersecurity die je helpt om:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 ml-2">
            <li>Berichten veilig te versturen</li>
            <li>Geheimen te verbergen en te ontcijferen</li>
            <li>Historische en moderne versleutelingsmethoden te begrijpen</li>
            <li>Nieuwe flags te ontdekken in het Cyberbrein spel!</li>
          </ul>
        </div>
        
        {/* Laadstatus en fouten */}
        {loading ? (
          <div className="text-center py-12 flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="ml-4 text-gray-600 dark:text-gray-400">Lessen worden geladen...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-6">
            <h3 className="font-bold mb-2">Fout bij het laden van lessen</h3>
            <p>{error}</p>
            <button 
              onClick={fetchLessons} 
              className="mt-4 bg-red-100 dark:bg-red-800 hover:bg-red-200 dark:hover:bg-red-700 text-red-800 dark:text-red-300 font-medium py-2 px-4 rounded-md transition flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Probeer opnieuw
            </button>
          </div>
        ) : (
          <>
            {lessons.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {lessons.map((lesson) => (
                  <Link 
                    href={`/encryption-lessons/${lesson.id}`} 
                    key={lesson.id}
                    className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700"
                  >
                    {/* Thumbnail indien beschikbaar */}
                    {lesson.thumbnailUrl ? (
                      <div className="h-40 overflow-hidden">
                        <Image 
                          src={lesson.thumbnailUrl}
                          alt={`${lesson.title} thumbnail`}
                          width={400}
                          height={225}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-40 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 flex items-center justify-center">
                        <span className="text-blue-800 dark:text-blue-300 text-lg font-medium">Encryptie Les {lesson.id}</span>
                      </div>
                    )}
                    
                    <div className="p-5 flex-grow flex flex-col">
                      <h2 className="text-xl font-semibold mb-2 dark:text-white">{lesson.title}</h2>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                        {lesson.description || "Ontdek meer over deze encryptie techniek in deze les."}
                      </p>
                      
                      <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                        <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(lesson.difficulty)}`}>
                          {lesson.difficulty || "Beginner"}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 text-sm flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {lesson.duration || "15-30 min"}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center mb-8 border border-gray-100 dark:border-gray-700">
                <div className="text-5xl mb-4">📚</div>
                <h3 className="font-bold text-lg mb-2 dark:text-white">Geen lessen beschikbaar</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Er zijn momenteel geen lessen beschikbaar in onze bibliotheek.</p>
                <button
                  onClick={fetchLessons}
                  className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Vernieuwen
                </button>
              </div>
            )}
          </>
        )}

        {/* Call to action */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center border border-gray-100 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Heb je alle lessen doorgenomen? Test je kennis in een quiz of speel een encryptie-gerelateerde minigame!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/quiz" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-md transition">
              Ga naar Quiz Centrum
            </Link>
            <Link href="/" className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-md transition">
              Ontdek Minigames
            </Link>
          </div>
        </div>

        {/* Hint Popup */}
        <HintPopup
          isOpen={isHintPopupOpen}
          onClose={() => setIsHintPopupOpen(false)}
        />
      </div>
    </div>
  );
} 