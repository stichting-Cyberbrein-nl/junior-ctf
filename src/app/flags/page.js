'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { flags as initialFlags } from '../../flags';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { generateCertificate } from '../../utils/certificateGenerator';

export default function FlagsPage() {
  const [flags, setFlags] = useState([]);
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [allFlagsFound, setAllFlagsFound] = useState(false);
  const [isGeneratingCertificate, setIsGeneratingCertificate] = useState(false);
  
  // Nieuwe states voor categorisering
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const [progressPerCategory, setProgressPerCategory] = useState({});
  const [categories, setCategories] = useState([]);
  
  // Nieuwe state voor het bijhouden van welke hints worden weergegeven
  const [visibleHints, setVisibleHints] = useState({});

  // Functie om hint zichtbaarheid te togglen
  const toggleHint = (flagId) => {
    setVisibleHints(prev => ({
      ...prev,
      [flagId]: !prev[flagId]
    }));
  };

  // Initialize flags from session storage
  useEffect(() => {
    const savedFlags = sessionStorage.getItem('foundFlags');
    if (savedFlags) {
      try {
        const parsedFlags = JSON.parse(savedFlags);
        setFlags(parsedFlags);
      } catch (error) {
        console.error('Error parsing saved flags:', error);
        setFlags(initialFlags);
      }
    } else {
      setFlags(initialFlags);
    }
  }, []);

  // Auto-save when flags change (only to sessionStorage)
  useEffect(() => {
    if (flags.length > 0) {
      // Save to session storage only
      sessionStorage.setItem('foundFlags', JSON.stringify(flags));
    }
  }, [flags]);

  // Effect om categorieën en voortgang bij te werken wanneer flags veranderen
  useEffect(() => {
    if (flags.length > 0) {
      // Haal unieke categorieën op
      const uniqueCategories = [...new Set(flags.map(flag => flag.category))];
      setCategories(uniqueCategories);
      
      // Bereken voortgang per categorie
      const progress = { 'Alle': 0 };
      let totalFound = 0;
      
      uniqueCategories.forEach(category => {
        const categoryFlags = flags.filter(flag => flag.category === category);
        const foundInCategory = categoryFlags.filter(flag => flag.found).length;
        progress[category] = {
          found: foundInCategory,
          total: categoryFlags.length,
          percentage: Math.round((foundInCategory / categoryFlags.length) * 100)
        };
        totalFound += foundInCategory;
      });
      
      // Voeg "Alle" categorie toe
      progress['Alle'] = {
        found: totalFound,
        total: flags.length,
        percentage: Math.round((totalFound / flags.length) * 100)
      };
      
      setProgressPerCategory(progress);
      
      // Check if all flags are found
      const areAllFlagsFound = flags.every(flag => flag.found);
      setAllFlagsFound(areAllFlagsFound);
    }
  }, [flags]);

  const handleSubmit = () => {
    // Verschillende formaten ondersteunen (met of zonder FLAG_ prefix, accolades, etc.)
    let normalizedInput = input.trim();
    
    // Controleer of de ingevoerde flag overeenkomt met een van de flags, met flexibele matching
    const flagFound = flags.find(flag => {
      // Vergelijk directe match
      if (flag.value.toLowerCase() === normalizedInput.toLowerCase()) {
        return true;
      }
      
      // Check zonder FLAG_ prefix of FLAG{} format
      const flagValueNoPrefix = flag.value.replace(/^FLAG_?\{?/, '').replace(/\}$/, '');
      const inputNoPrefix = normalizedInput.replace(/^FLAG_?\{?/, '').replace(/\}$/, '');
      
      return flagValueNoPrefix.toLowerCase() === inputNoPrefix.toLowerCase();
    });
    
    if (flagFound) {
      if (flagFound.found) {
        setResult(`Je hebt deze flag (${flagFound.flagName}) al gevonden!`);
      } else {
        // Update de flag status
        const updatedFlags = flags.map(flag => 
          flag.id === flagFound.id ? { ...flag, found: true } : flag
        );
        setFlags(updatedFlags);

        // Check of nu alle flags in deze categorie gevonden zijn
        const category = flagFound.category;
        const categoryFlags = updatedFlags.filter(f => f.category === category);
        const allCategoryFound = categoryFlags.every(f => f.found);
        let extraMsg = '';
        if (allCategoryFound) {
          extraMsg = `🎉 Je hebt nu alle flags in de categorie "${category}" gevonden!\n`;
        }
        setPopupMessage(`${extraMsg}Gefeliciteerd! Je hebt flag ${flagFound.flagName} gevonden!`);
        setShowPopup(true);
        setResult(`✅ Flag gevonden: ${flagFound.flagName}`);
      }
    } else {
      setResult('❌ Deze flag komt niet overeen met een bekende flag.');
    }
    
    setInput('');
  };

  const resetProgress = () => {
    try {
      // Reset all flags to not found
      const resetFlags = initialFlags.map(flag => ({ ...flag, found: false }));
      setFlags(resetFlags);
      setAllFlagsFound(false);
      setResult('Alle voortgang is gereset.');
      // Verwijder gebruikersnaam en andere relevante data
      localStorage.removeItem('username');
      sessionStorage.clear();
      // Redirect naar homepage zodat het welkomstscherm verschijnt
      window.location.href = '/';
    } catch (error) {
      console.error('Error resetting flags:', error);
      setResult('Er is een fout opgetreden bij het resetten van de voortgang.');
    }
  };

  const handleDownloadCertificate = async () => {
    const username = localStorage.getItem('username') || 'Anonieme Speler';
    
    setIsGeneratingCertificate(true);
    try {
      await generateCertificate(username, flags);
      setResult('✅ Certificaat succesvol gedownload!');
    } catch (error) {
      console.error('Error downloading certificate:', error);
      setResult('❌ Er is een fout opgetreden bij het downloaden van het certificaat.');
    } finally {
      setIsGeneratingCertificate(false);
    }
  };

  // Filter flags op geselecteerde categorie
  const getFilteredFlags = () => {
    if (selectedCategory === 'Alle') {
      return flags;
    }
    return flags.filter(flag => flag.category === selectedCategory);
  };

  // Kleuren per categorie
  const getCategoryColor = (category) => {
    switch (category) {
      case 'UI Interactie': return { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300', icon: '🖱️' };
      case 'Spellen': return { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300', icon: '🎮' };
      case 'Quiz': return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300', icon: '🧠' };
      case 'Lessen': return { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300', icon: '📚' };
      case 'Verborgen': return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', icon: '🔍' };
      case 'Admin': return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300', icon: '⚙️' };
      default: return { bg: 'bg-indigo-100', text: 'text-indigo-700', border: 'border-indigo-300', icon: '🏁' };
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="w-full max-w-5xl">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">Flags Verzamelen</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Ontdek en verzamel alle verborgen flags in het spel!
            </p>
          </div>
          <Link href="/" className="mt-4 md:mt-0 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Terug naar Home
          </Link>
        </div>

        {/* Voortgangsbalk */}
        <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Voortgang</h2>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {progressPerCategory['Alle']?.found || 0}/{progressPerCategory['Alle']?.total || 0} flags gevonden
            </div>
          </div>
          
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full bg-green-200 text-green-800">
                  {progressPerCategory['Alle']?.percentage || 0}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-100">
              <div 
                style={{ width: `${progressPerCategory['Alle']?.percentage || 0}%` }} 
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-500">
              </div>
            </div>
          </div>

          {/* Categorieën voortgang */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
            {categories.map(category => {
              const { bg, text, icon } = getCategoryColor(category);
              return (
                <div 
                  key={category} 
                  className={`${bg} ${text} rounded-lg p-3 flex items-center justify-between`}
                  onClick={() => setSelectedCategory(category)}
                >
                  <div className="flex items-center space-x-2">
                    <span>{icon}</span>
                    <span className="font-medium">{category}</span>
                  </div>
                  <div className="text-xs font-semibold">
                    {progressPerCategory[category]?.found || 0}/{progressPerCategory[category]?.total || 0}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Flag invoerveld */}
        <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Voer een gevonden flag in
          </h2>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Voer een gevonden flag in (bv. FLAG{tekst})"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              className="md:w-auto p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 ease-in-out"
            >
              Controleer Flag
            </button>
          </div>

          {result && (
            <div
              className={`mt-4 p-4 rounded-lg ${
                result.startsWith('✅') ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
              }`}
            >
              {result}
            </div>
          )}
        </div>

        {/* Categorie tabs */}
        <div className="w-full bg-white dark:bg-gray-800 rounded-t-xl shadow-lg p-6 pb-0 mb-0">
          <div className="flex overflow-x-auto space-x-2 pb-2">
            <button
              onClick={() => setSelectedCategory('Alle')}
              className={`px-4 py-2 whitespace-nowrap rounded-t-lg font-medium border-b-2 transition-all bg-white dark:bg-gray-800 ${
                selectedCategory === 'Alle' 
                  ? 'border-green-500 text-green-600 dark:text-green-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Alle Flags
            </button>
            
            {categories.map(category => {
              const { text } = getCategoryColor(category);
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 whitespace-nowrap rounded-t-lg font-medium border-b-2 transition-all bg-white dark:bg-gray-800 ${
                    selectedCategory === category 
                      ? `border-green-500 ${text}`
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Flag cards */}
        <div className="w-full bg-white dark:bg-gray-800 rounded-b-xl shadow-lg p-6 pt-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getFilteredFlags().map((flag) => {
              const { bg, border, text, icon } = getCategoryColor(flag.category);
              return (
                <div
                  key={flag.id}
                  className={`p-4 rounded-lg border ${
                    flag.found 
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-700' 
                      : `${border} ${bg} dark:bg-gray-700 dark:border-gray-600`
                  } transition-all duration-300 hover:shadow-md`}
                >
                  <div className="flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-xs px-2 py-1 rounded-full mr-2 bg-opacity-50 whitespace-nowrap inline-block mb-2 dark:bg-opacity-30 dark:text-white">
                          {icon} {flag.category}
                        </span>
                        <h3 className={`font-semibold ${flag.found ? 'text-green-700 dark:text-green-400' : text + ' dark:text-gray-300'}`}>
                          {flag.flagName}
                        </h3>
                      </div>
                      
                      {flag.found ? (
                        <span className="px-2 py-1 bg-green-500 text-white rounded-full text-xs whitespace-nowrap">
                          Gevonden ✓
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-300 text-gray-700 rounded-full text-xs dark:bg-gray-600 dark:text-gray-300 whitespace-nowrap">
                          Niet gevonden
                        </span>
                      )}
                    </div>
                    
                    {flag.found ? (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {flag.description}
                      </p>
                    ) : (
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Nog niet ontdekt
                          </p>
                          <button 
                            onClick={() => toggleHint(flag.id)}
                            className="text-xs px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800/60 transition"
                          >
                            {visibleHints[flag.id] ? 'Verberg hint' : 'Toon hint'}
                          </button>
                        </div>
                        
                        {visibleHints[flag.id] && (
                          <div className="bg-gray-100 dark:bg-gray-700/50 p-2 rounded-md mb-2">
                            <p className="text-sm italic text-gray-600 dark:text-gray-400">
                              💡 <span className="text-blue-600 dark:text-blue-400">Hint:</span> {flag.hint}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {flag.found && (
                      <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-xs font-mono break-all text-green-600 dark:text-green-400">{flag.value}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Acties */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <button
            onClick={resetProgress}
            className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-400 transition duration-200 ease-in-out"
          >
            Reset Voortgang
          </button>
          
          <button
            onClick={handleDownloadCertificate}
            disabled={isGeneratingCertificate}
            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-200 ease-in-out flex items-center gap-2 disabled:opacity-50"
          >
            {isGeneratingCertificate ? (
              <>
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Certificaat genereren...
              </>
            ) : (
              <>
                📄 Certificaat Downloaden
              </>
            )}
          </button>
        </div>
      </div>

      {/* Popup voor flag gevonden */}
      <Popup open={showPopup} onClose={() => setShowPopup(false)} modal>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Flag Gevonden! 🎉</h2>
          <div className="text-lg text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {popupMessage}
          </div>
          <button
            onClick={() => setShowPopup(false)}
            className="w-full p-3 mt-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition duration-200 ease-in-out"
          >
            Sluiten
          </button>
        </div>
      </Popup>
    </div>
  );
} 