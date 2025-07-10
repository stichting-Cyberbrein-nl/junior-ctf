"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

const CodeForm = ({ onAdd }) => {
  const [newCode, setNewCode] = useState({ code: '', solution: '', difficulty: 'Makkelijk', encryption: '' });
  const [message, setMessage] = useState('');
  const [encryptions, setEncryptions] = useState([]); // Houd encryptiemodellen bij

  // Haal encryptiemodellen op bij het laden van het formulier
  useEffect(() => {
    const fetchEncryptions = async () => {
      try {
        const response = await axios.get('/api/encryptions');
        setEncryptions(response.data); // Sla de encryptiemodellen op
      } catch (error) {
        console.error('Fout bij het ophalen van encryptiemodellen:', error);
      }
    };

    fetchEncryptions();
  }, []);

  const handleAddCode = async () => {
    try {
      await axios.post('/api/codes', newCode); // Stuur de nieuwe code naar je backend API
      setMessage('✅ Code toegevoegd!');
      setNewCode({ code: '', solution: '', difficulty: 'Makkelijk', encryption: '' });
      onAdd(); // Roep de onAdd-functie aan om de code-lijst bij te werken in het bovenliggende component
    } catch (error) {
      setMessage('❌ Fout bij het toevoegen van de code.');
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-2xl font-semibold mb-4">Voeg een nieuwe code toe</h2>
      <input
        type="text"
        name="code"
        placeholder="Code"
        value={newCode.code}
        onChange={(e) => setNewCode({ ...newCode, code: e.target.value })}
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="text"
        name="solution"
        placeholder="Oplossing"
        value={newCode.solution}
        onChange={(e) => setNewCode({ ...newCode, solution: e.target.value })}
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <select
        name="difficulty"
        value={newCode.difficulty}
        onChange={(e) => setNewCode({ ...newCode, difficulty: e.target.value })}
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="Makkelijk">Makkelijk</option>
        <option value="Middelmatig">Middelmatig</option>
        <option value="Moeilijk">Moeilijk</option>
      </select>

      {/* Dropdown voor encryptiemodellen */}
      <select
        name="encryption"
        value={newCode.encryption}
        onChange={(e) => setNewCode({ ...newCode, encryption: e.target.value })}
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">Kies een encryptiemodel</option>
        {encryptions.map((encryption) => (
          <option key={encryption.id} value={encryption.name}>
            {encryption.name}
          </option>
        ))}
      </select>

      <button
        onClick={handleAddCode}
        className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-200 ease-in-out"
      >
        Voeg Code Toe
      </button>
      {message && <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">{message}</div>}
    </div>
  );
};

export default CodeForm;