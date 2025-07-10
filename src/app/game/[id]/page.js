'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // Gebruik useParams voor het dynamisch ophalen van de id
import { codes } from '../../../codes'; // Importeer de codes direct uit codes.js

export default function GameCode() {
  const params = useParams();
  const { id } = params; // Haal de id op uit de URL-parameters
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [codeData, setCodeData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Voeg debug-log toe om te controleren of de id goed wordt opgehaald
  console.log('Gevonden id:', id);

  // Haal de specifieke code op basis van de id
  useEffect(() => {
    if (id) {
      const numericId = parseInt(id, 10); // Zet de id om naar een getal
      console.log('Omgezet id naar getal:', numericId);

      const foundCode = codes.find((item) => item.id === numericId); // Zoek de code op in codes.js
      console.log('Gevonden code:', foundCode);

      if (foundCode) {
        setCodeData(foundCode);
      } else {
        setResult('❌ Code niet gevonden. flag 5: byqrbibr.');
      }
      setLoading(false); // Stop met laden, ongeacht of de code gevonden is
    } else {
      setLoading(false); // Stop ook als er geen id is
    }
  }, [id]);

  const handleSubmit = () => {
    if (!codeData) return;

    if (input.trim() === codeData.solution) {
      setResult(`✅ Correcte code!`);
    } else {
      setResult('❌ Onjuiste code, probeer opnieuw.');
    }
  };

  if (loading) {
    return <p>Code wordt geladen...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Cyberbrein Code Check</h1>

      {codeData ? (
        <>
          <p className="text-lg mb-4">Ontcijfer deze code: <strong>{codeData.code}</strong></p>
          <input
            type="text"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            placeholder="Voer je ontcijferde oplossing in"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
          >
            Controleer Oplossing
          </button>
          {result && <p className="mt-4">{result}</p>}
        </>
      ) : (
        <p>{result || 'Geen code gevonden. flag 5: byqrbibr'}</p>
      )}
    </div>
  );
}
