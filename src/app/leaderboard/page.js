'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [player, setPlayer] = useState('');
  const [score, setScore] = useState('');
  const [message, setMessage] = useState('');

  // Haal het leaderboard op bij het laden van de pagina
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('/api/leaderboard');
        setLeaderboard(response.data);
      } catch (error) {
        console.error('Fout bij het ophalen van het leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  // Verwerk het toevoegen van een nieuwe speler en score
  const handleSubmit = async () => {
    if (!player || !score) {
      setMessage('Vul zowel een speler als een score in.');
      return;
    }

    try {
      const response = await axios.post('/api/leaderboard', { player, score });
      if (response.data.success) {
        setLeaderboard([...leaderboard, response.data.newEntry]);
        setMessage('Speler en score succesvol toegevoegd!');
        setPlayer('');
        setScore('');
      }
    } catch (error) {
      console.error('Fout bij het toevoegen van een speler en score:', error);
      setMessage('Er is iets fout gegaan.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>

      {/* Tabel voor het leaderboard */}
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Speler</th>
              <th className="px-4 py-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry) => (
              <tr key={entry.id} className="border-t">
                <td className="px-4 py-2">{entry.id}</td>
                <td className="px-4 py-2">{entry.player}</td>
                <td className="px-4 py-2">{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formulier om een nieuwe speler en score toe te voegen */}
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg mt-6">
        <h2 className="text-2xl font-semibold mb-4">Voeg een speler toe</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Speler:</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={player}
            onChange={(e) => setPlayer(e.target.value)}
            placeholder="Voer de naam van de speler in"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Score:</label>
          <input
            type="number"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            placeholder="Voer de score in"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
        >
          Voeg speler toe
        </button>

        {message && <p className="mt-4 text-green-600">{message}</p>}
      </div>
    </div>
  );
}
