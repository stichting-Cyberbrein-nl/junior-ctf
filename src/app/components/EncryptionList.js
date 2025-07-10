"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

const EncryptionList = () => {
  const [encryptions, setEncryptions] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Haal de encryptiemodellen op bij het laden van de component
  useEffect(() => {
    fetchEncryptions();
  }, []);

  // Functie om encryptiemodellen op te halen
  const fetchEncryptions = async () => {
    try {
      const response = await axios.get('/api/encryptions'); // Haal encryptiemodellen op van de API
      setEncryptions(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Fout bij het ophalen van de encryptiemodellen:', error);
      setError('Er is een fout opgetreden bij het ophalen van encryptiemodellen');
      setLoading(false);
    }
  };

  // Functie om een encryptiemodel te updaten
  const handleUpdateEncryption = async (id) => {
    const encryptionToUpdate = encryptions.find((encryption) => encryption.id === id);
    try {
      await axios.put(`/api/encryptions/${id}`, encryptionToUpdate); // Verstuur bijgewerkte data naar de API
      setMessage('✅ Encryptiemodel bijgewerkt!');
      fetchEncryptions(); // Haal opnieuw de lijst met encryptiemodellen op
    } catch (error) {
      setMessage('❌ Fout bij het bijwerken van het encryptiemodel.');
      console.error(error);
    }
  };

  // Functie om een encryptiemodel te verwijderen
  const handleDeleteEncryption = async (id) => {
    try {
      await axios.delete('/api/encryptions', { data: { id } }); // Verstuur verwijderingsverzoek naar de API
      setMessage('✅ Encryptiemodel verwijderd!');
      fetchEncryptions(); // Haal opnieuw de lijst met encryptiemodellen op
    } catch (error) {
      setMessage('❌ Fout bij het verwijderen van het encryptiemodel.');
      console.error(error);
    }
  };

  if (loading) {
    return <p>Gegevens laden...</p>; // Laadindicator
  }

  if (error) {
    return <p>{error}</p>; // Foutmelding
  }

  if (encryptions.length === 0) {
    return <p>Geen encryptiemodellen gevonden.</p>;
  }

  return (
    <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Beheer Encryptiemodellen</h2>
      <ul className="space-y-4">
        {encryptions.map((encryption) => (
          <li
            key={encryption.id}
            className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200"
          >
            <div className="w-2/3">
              <input
                type="text"
                value={encryption.name}
                onChange={(e) =>
                  setEncryptions((prevState) =>
                    prevState.map((enc) =>
                      enc.id === encryption.id ? { ...enc, name: e.target.value } : enc
                    )
                  )
                }
                className="p-2 w-full mb-2 border border-gray-300 rounded-lg"
              />
              <textarea
                value={encryption.description}
                onChange={(e) =>
                  setEncryptions((prevState) =>
                    prevState.map((enc) =>
                      enc.id === encryption.id ? { ...enc, description: e.target.value } : enc
                    )
                  )
                }
                className="p-2 w-full border border-gray-300 rounded-lg"
              ></textarea>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleUpdateEncryption(encryption.id)}
                className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-400"
              >
                Bijwerken
              </button>
              <button
                onClick={() => handleDeleteEncryption(encryption.id)}
                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-400"
              >
                Verwijderen
              </button>
            </div>
          </li>
        ))}
      </ul>
      {message && <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">{message}</div>}
    </div>
  );
};

export default EncryptionList;