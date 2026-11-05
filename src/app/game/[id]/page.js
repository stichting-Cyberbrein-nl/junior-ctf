'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // Gebruik useParams voor het dynamisch ophalen van de id

export default function GameCode() {
  const params = useParams();
  const { id } = params; // Haal de id op uit de URL-parameters
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [codeData, setCodeData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Haal de specifieke code (zonder oplossing) op basis van de id
  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    fetch(`/api/codes?id=${encodeURIComponent(id)}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((foundCode) => {
        if (foundCode) {
          setCodeData(foundCode);
        } else {
          setResult('❌ Code niet gevonden. flag 5: byqrbibr.');
        }
      })
      .catch(() => setResult('❌ Code niet gevonden. flag 5: byqrbibr.'))
      .finally(() => setLoading(false)); // Stop met laden, ongeacht of de code gevonden is
  }, [id]);

  // De oplossing wordt op de server gecontroleerd
  const handleSubmit = async () => {
    if (!codeData) return;

    try {
      const response = await fetch('/api/check-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: input.trim(), id: codeData.id }),
      });
      const data = await response.json();
      setResult(data.valid ? '✅ Correcte code!' : '❌ Onjuiste code, probeer opnieuw.');
    } catch {
      setResult('❌ Er ging iets mis, probeer opnieuw.');
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
