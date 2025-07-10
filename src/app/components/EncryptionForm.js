"use client";

import { useState } from 'react';
import axios from 'axios';

const EncryptionForm = ({ onAdd }) => {
  const [newEncryption, setNewEncryption] = useState({ name: '', description: '' });
  const [message, setMessage] = useState('');

  const handleAddEncryption = async () => {
    try {
      await axios.post('/api/encryptions', newEncryption); // Verstuur het nieuwe encryptiemodel naar de API
      setMessage('✅ Encryptiemodel toegevoegd!');
      setNewEncryption({ name: '', description: '' }); // Reset het formulier
      onAdd(); // Haal de bijgewerkte encryptielijst opnieuw op
    } catch (error) {
      setMessage('❌ Fout bij het toevoegen van het encryptiemodel.');
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-2xl font-semibold mb-4">Voeg een nieuw encryptiemodel toe</h2>
      <input
        type="text"
        name="name"
        placeholder="Naam van encryptiemodel"
        value={newEncryption.name}
        onChange={(e) => setNewEncryption({ ...newEncryption, name: e.target.value })}
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <textarea
        name="description"
        placeholder="Beschrijving van encryptiemodel"
        value={newEncryption.description}
        onChange={(e) => setNewEncryption({ ...newEncryption, description: e.target.value })}
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      ></textarea>
      <button
        onClick={handleAddEncryption}
        className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-200 ease-in-out"
      >
        Voeg Encryptiemodel Toe
      </button>
      {message && <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">{message}</div>}
    </div>
  );
};

export default EncryptionForm;