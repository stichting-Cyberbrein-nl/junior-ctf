'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import FlagPopup from '../../components/FlagPopup';

export default function EncryptionLessonsManagement() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [showPopup, setShowPopup] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [isNewLesson, setIsNewLesson] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    author: '',
    duration: '',
    difficulty: '',
    videoUrl: '',
    relatedLinks: [],
    content: '',
  });

  // Voor het beheren van de gerelateerde links
  const [newLinkTitle, setNewLinkTitle] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');

  useEffect(() => {
    fetchLessons();
  }, []);

  async function fetchLessons() {
    try {
      const response = await fetch('/api/encryption-lessons');
      if (!response.ok) {
        throw new Error('Fout bij het ophalen van de lessen');
      }
      const data = await response.json();
      setLessons(data);
      setLoading(false);
    } catch (err) {
      console.error('Fout bij het laden van lessen:', err);
      setError('Kon de lessen niet laden. Probeer het later opnieuw.');
      setLoading(false);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddLink = () => {
    if (!newLinkTitle || !newLinkUrl) {
      alert('Vul zowel een titel als URL in voor de link');
      return;
    }

    const newLink = { title: newLinkTitle, url: newLinkUrl };
    setFormData({
      ...formData,
      relatedLinks: [...formData.relatedLinks, newLink]
    });
    
    // Reset de formuliervelden
    setNewLinkTitle('');
    setNewLinkUrl('');
  };

  const handleRemoveLink = (index) => {
    const updatedLinks = [...formData.relatedLinks];
    updatedLinks.splice(index, 1);
    setFormData({
      ...formData,
      relatedLinks: updatedLinks
    });
  };

  const handleAddLesson = () => {
    setIsNewLesson(true);
    setCurrentLesson(null);
    setFormData({
      title: '',
      description: '',
      author: 'Team Cyberbrein',
      duration: '',
      difficulty: 'Beginner',
      videoUrl: '',
      relatedLinks: [],
      content: '',
    });
    setShowPopup(true);
  };

  const handleEditLesson = (lesson) => {
    setIsNewLesson(false);
    setCurrentLesson(lesson);
    setFormData({
      title: lesson.title,
      description: lesson.description || '',
      author: lesson.author || 'Team Cyberbrein',
      duration: lesson.duration || '',
      difficulty: lesson.difficulty || 'Beginner',
      videoUrl: lesson.videoUrl || '',
      relatedLinks: lesson.relatedLinks || [],
      content: lesson.content,
    });
    setShowPopup(true);
  };

  const handleDeleteLesson = async (id) => {
    if (!confirm('Weet je zeker dat je deze les wilt verwijderen?')) {
      return;
    }

    try {
      const response = await fetch(`/api/encryption-lessons?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Fout bij het verwijderen van de les');
      }

      setLessons(lessons.filter(lesson => lesson.id !== id));
    } catch (err) {
      console.error('Fout bij het verwijderen van de les:', err);
      alert('Er is een fout opgetreden bij het verwijderen van de les.');
    }
  };

  const handleSubmit = async () => {
    try {
      if (!formData.title || !formData.content) {
        alert('Titel en inhoud zijn verplicht.');
        return;
      }

      const method = isNewLesson ? 'POST' : 'PUT';
      const url = isNewLesson 
        ? '/api/encryption-lessons' 
        : `/api/encryption-lessons?id=${currentLesson.id}`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Fout bij het ${isNewLesson ? 'toevoegen' : 'bijwerken'} van de les`);
      }

      const savedLesson = await response.json();
      
      if (isNewLesson) {
        setLessons([...lessons, savedLesson]);
      } else {
        setLessons(lessons.map(l => l.id === savedLesson.id ? savedLesson : l));
      }

      setShowPopup(false);
    } catch (err) {
      console.error(`Fout bij het ${isNewLesson ? 'toevoegen' : 'bijwerken'} van de les:`, err);
      alert(`Er is een fout opgetreden bij het ${isNewLesson ? 'toevoegen' : 'bijwerken'} van de les.`);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'gevorderd':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen p-8 pb-20 flex justify-center items-center font-[family-name:var(--font-geist-sans)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 pb-20 flex flex-col items-center font-[family-name:var(--font-geist-sans)]">
      {/* Header met navigatie en flag */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-8">
        <Link href="/backend" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Terug naar admin
        </Link>
        <div className="flex items-center">
          <h1 className="text-2xl sm:text-3xl font-bold dark:text-white">Encryptie Lessen Beheer</h1>
          <FlagPopup
            flagName="FLAG_ENCRYPTION_ADMIN"
            flagValue="FLAG_ENCRYPTION_ADMIN{teacher_mode}"
            triggerElement="🏫"
            triggerStyle="text-3xl ml-4 cursor-pointer hover:opacity-75 transition-opacity"
            hideAfterFound={true}
          />
        </div>
      </div>

      {/* Foutmelding als er iets mis gaat */}
      {error && (
        <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded w-full max-w-6xl mb-6">
          <p>{error}</p>
        </div>
      )}

      {/* Acties */}
      <div className="w-full max-w-6xl mb-6">
        <button
          onClick={handleAddLesson}
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-green-600 text-white hover:bg-green-500 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        >
          Nieuwe Les Toevoegen
        </button>
      </div>

      {/* Tabel met lessen */}
      <div className="w-full max-w-6xl overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="border border-gray-300 dark:border-gray-600 p-4 dark:text-white">ID</th>
              <th className="border border-gray-300 dark:border-gray-600 p-4 dark:text-white">Titel</th>
              <th className="border border-gray-300 dark:border-gray-600 p-4 dark:text-white">Omschrijving</th>
              <th className="border border-gray-300 dark:border-gray-600 p-4 dark:text-white">Niveau</th>
              <th className="border border-gray-300 dark:border-gray-600 p-4 dark:text-white">Video</th>
              <th className="border border-gray-300 dark:border-gray-600 p-4 dark:text-white">Acties</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson) => (
              <tr key={lesson.id} className="text-center dark:bg-gray-800 dark:border-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 p-4 dark:text-gray-200">{lesson.id}</td>
                <td className="border border-gray-300 dark:border-gray-600 p-4 dark:text-gray-200">{lesson.title}</td>
                <td className="border border-gray-300 dark:border-gray-600 p-4 text-left dark:text-gray-200">
                  {lesson.description?.length > 50 
                    ? `${lesson.description.substring(0, 50)}...` 
                    : lesson.description || '-'}
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-4">
                  {lesson.difficulty && (
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${getDifficultyColor(lesson.difficulty)}`}>
                      {lesson.difficulty}
                    </span>
                  )}
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-4">
                  {lesson.videoUrl ? (
                    <span className="text-green-600 dark:text-green-400">✓</span>
                  ) : (
                    <span className="text-red-600 dark:text-red-400">✗</span>
                  )}
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-4">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleEditLesson(lesson)}
                      className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-500 text-white hover:bg-blue-400 text-sm h-10 px-4"
                    >
                      Bewerken
                    </button>
                    <button
                      onClick={() => handleDeleteLesson(lesson.id)}
                      className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-red-500 text-white hover:bg-red-400 text-sm h-10 px-4"
                    >
                      Verwijderen
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {lessons.length === 0 && (
              <tr>
                <td colSpan="6" className="border border-gray-300 p-4 text-center">
                  Geen lessen gevonden. Maak een nieuwe les aan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Popup voor het toevoegen/bewerken van lessen */}
      <Popup open={showPopup} onClose={() => setShowPopup(false)} modal>
        <div className="p-6 bg-white rounded-lg shadow-lg max-w-3xl mx-auto max-h-[90vh] overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-4">
            {isNewLesson ? 'Nieuwe Les Toevoegen' : 'Les Bewerken'}
          </h2>

          <div className="flex flex-col gap-4">
            {/* Basisgegevens */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Titel <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Voer de titel van de les in"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Omschrijving
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Korte beschrijving van de lesinhoud"
              />
            </div>

            {/* Auteur, Duur en Niveau */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="author" className="block text-sm font-medium mb-1">
                  Auteur
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Naam van de auteur"
                />
              </div>
              
              <div>
                <label htmlFor="duration" className="block text-sm font-medium mb-1">
                  Duur
                </label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="bijv. 20 minuten"
                />
              </div>
              
              <div>
                <label htmlFor="difficulty" className="block text-sm font-medium mb-1">
                  Niveau
                </label>
                <select
                  id="difficulty"
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Gevorderd">Gevorderd</option>
                </select>
              </div>
            </div>

            {/* Video URL */}
            <div>
              <label htmlFor="videoUrl" className="block text-sm font-medium mb-1">
                Video URL
              </label>
              <input
                type="text"
                id="videoUrl"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="bijv. https://www.youtube.com/embed/VIDEO_ID"
              />
              <p className="text-sm text-gray-500 mt-1">
                Gebruik de embed URL van YouTube (bijv. https://www.youtube.com/embed/VIDEO_ID)
              </p>
            </div>

            {/* Gerelateerde links */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Gerelateerde Links
              </label>
              
              <div className="mb-4">
                <div className="flex flex-col md:flex-row gap-2 mb-2">
                  <input
                    type="text"
                    value={newLinkTitle}
                    onChange={(e) => setNewLinkTitle(e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Link titel"
                  />
                  <input
                    type="text"
                    value={newLinkUrl}
                    onChange={(e) => setNewLinkUrl(e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="URL (https://...)"
                  />
                  <button
                    type="button"
                    onClick={handleAddLink}
                    className="md:w-auto w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-colors"
                  >
                    Link Toevoegen
                  </button>
                </div>
              </div>
              
              {/* Lijst van links */}
              {formData.relatedLinks && formData.relatedLinks.length > 0 ? (
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-3">Titel</th>
                        <th className="p-3">URL</th>
                        <th className="p-3 w-16">Acties</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.relatedLinks.map((link, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-3">{link.title}</td>
                          <td className="p-3 text-blue-600 truncate">{link.url}</td>
                          <td className="p-3">
                            <button
                              type="button"
                              onClick={() => handleRemoveLink(index)}
                              className="text-red-500 hover:text-red-700 font-medium"
                            >
                              Verwijder
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 italic">Geen gerelateerde links toegevoegd</p>
              )}
            </div>

            {/* Lesinhoud */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-1">
                Inhoud (Markdown) <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows="12"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                placeholder="# Titel

## Subtitel

Dit is een voorbeeld van markdown inhoud. Je kunt **vet** en *cursief* gebruiken.

### Video les
Hier kun je video's insluiten met een iframe:

<iframe width='560' height='315' src='https://www.youtube.com/embed/VIDEO_ID' frameborder='0' allowfullscreen></iframe>"
              />
            </div>

            <div className="flex gap-4 mt-4">
              <button
                onClick={handleSubmit}
                className="flex-1 p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition duration-200 ease-in-out"
              >
                {isNewLesson ? 'Toevoegen' : 'Bijwerken'}
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="flex-1 p-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-200 transition duration-200 ease-in-out"
              >
                Annuleren
              </button>
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
} 