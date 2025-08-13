'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import FlagPopup from '../../components/FlagPopup';
import Image from 'next/image';

export default function EncryptionLessonDetail({ params }) {
  const { id } = params;
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchLesson() {
      try {
        const response = await fetch(`/api/encryption-lessons?id=${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            router.push('/encryption-lessons');
            return;
          }
          throw new Error('Fout bij het ophalen van de les');
        }
        const data = await response.json();
        setLesson(data);
        setLoading(false);
      } catch (err) {
        console.error('Fout bij het laden van de les:', err);
        setError('Kon de les niet laden. Probeer het later opnieuw.');
        setLoading(false);
      }
    }

    if (id) {
      fetchLesson();
    }
  }, [id, router]);

  // Functie voor navigatie naar vorige/volgende les
  const navigateToLesson = (lessonId) => {
    router.push(`/encryption-lessons/${lessonId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded">
          <p>{error}</p>
          <Link href="/encryption-lessons" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mt-2 inline-block">
            Terug naar lessen
          </Link>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return null;
  }

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Terug naar lessen knop en flag */}
      <div className="flex justify-between mb-8">
        <Link href="/encryption-lessons" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Terug naar lessen
        </Link>
        <FlagPopup
          flagName="FLAG_ENCRYPTION"
          flagValue="FLAG_ENCRYPTION{knowledge_is_power}"
          triggerElement="🔐"
          triggerStyle="text-3xl cursor-pointer hover:opacity-75 transition-opacity"
          hideAfterFound={true}
        />
      </div>

      <article className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {/* Header met titel, auteur en flag */}
        <header className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 dark:border-gray-700">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold dark:text-white">{lesson.title}</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {lesson.description}
              </p>
            </div>
          </div>
        </header>

        {/* Metagegevens */}
        <div className="bg-gray-50 dark:bg-gray-700 p-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center">
            <span className="font-medium mr-2 dark:text-white">Auteur:</span> 
            <span className="dark:text-gray-300">{lesson.author || "Team Cyberbrein"}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium mr-2 dark:text-white">Duur:</span> 
            <span className="dark:text-gray-300">{lesson.duration || "Onbekend"}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium mr-2 dark:text-white">Niveau:</span> 
            <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 rounded-full text-xs">{lesson.difficulty || "Beginner"}</span>
          </div>
        </div>

        {/* Video sectie indien beschikbaar */}
        {lesson.videoUrl && (
          <div className="p-6 border-b dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Video Lesmateriaal</h2>
            <div className="relative pb-[56.25%] h-0 overflow-hidden max-w-full">
              <iframe 
                className="absolute top-0 left-0 w-full h-full"
                src={lesson.videoUrl}
                title={`${lesson.title} video`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {/* Content sectie */}
        <div className="p-6 markdown-content">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]} 
            components={{
              h1: ({node, ...props}) => <h1 className="text-3xl font-bold my-4 dark:text-white" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-2xl font-bold my-3 dark:text-white" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-xl font-bold my-2 dark:text-white" {...props} />,
              h4: ({node, ...props}) => <h4 className="text-lg font-bold my-2 dark:text-white" {...props} />,
              p: ({node, ...props}) => <p className="my-2 dark:text-gray-200" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-6 my-2 dark:text-gray-200" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal pl-6 my-2 dark:text-gray-200" {...props} />,
              li: ({node, ...props}) => <li className="my-1 dark:text-gray-200" {...props} />,
              blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-2 my-2 text-gray-700 dark:text-gray-300" {...props} />,
              code: ({node, inline, ...props}) => inline 
                ? <code className="bg-gray-100 dark:bg-gray-700 text-red-600 dark:text-red-400 px-1 rounded text-sm" {...props} />
                : <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded my-2 overflow-x-auto"><code className="text-sm dark:text-gray-200" {...props} /></pre>,
              a: ({node, ...props}) => <a className="text-blue-600 dark:text-blue-400 hover:underline" {...props} />,
              table: ({node, ...props}) => <div className="overflow-x-auto my-4"><table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700" {...props} /></div>,
              thead: ({node, ...props}) => <thead className="bg-gray-100 dark:bg-gray-800" {...props} />,
              tbody: ({node, ...props}) => <tbody className="dark:text-gray-200" {...props} />,
              tr: ({node, ...props}) => <tr className="border-b border-gray-300 dark:border-gray-700" {...props} />,
              th: ({node, ...props}) => <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left dark:text-white" {...props} />,
              td: ({node, ...props}) => <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 dark:text-gray-200" {...props} />,
              img: ({node, ...props}) => {
                return (
                  <div className="my-4">
                    <Image 
                      src={props.src || ''} 
                      alt={props.alt || 'Lesmateriaal afbeelding'} 
                      width={800}
                      height={450}
                      className="rounded-lg w-full max-w-full h-auto dark:filter dark:brightness-90"
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                );
              },
              // Sta HTML toe in de markdown voor o.a. iframes
              div: ({node, ...props}) => <div {...props} />,
              iframe: ({node, ...props}) => <div className="my-4"><iframe className="max-w-full" {...props} /></div>,
            }}
          >
            {lesson.content || ''}
          </ReactMarkdown>
        </div>

        {/* Gerelateerde links indien beschikbaar */}
        {/* {lesson.relatedLinks && lesson.relatedLinks.length > 0 && (
          <div className="p-6 bg-gray-50 dark:bg-gray-700 border-t dark:border-gray-600">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Gerelateerde Bronnen</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lesson.relatedLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 border dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:text-gray-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  {link.title || link.url}
                </a>
              ))}
            </div>
          </div>
        )} */}

        {/* Navigatieknoppen */}
        <div className="p-6 border-t flex justify-between">
          {lesson.id > 1 && (
            <button 
              onClick={() => navigateToLesson(lesson.id - 1)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Vorige les
            </button>
          )}
          
          <button 
            onClick={() => navigateToLesson(parseInt(id) + 1)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center ml-auto"
          >
            Volgende les
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </article>
    </div>
  );
} 