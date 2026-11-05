import { leaderboard } from '../../../leaderboard';

const MAX_ENTRIES = 500;
const MAX_NAME_LENGTH = 30;
const MAX_SCORE = 100000;

export async function GET(req) {
  try {
    return new Response(JSON.stringify(leaderboard), { status: 200 });
  } catch (error) {
    console.error('Fout in GET leaderboard:', error); // Log de fout in de console
    return new Response(JSON.stringify({ error: 'Er is iets misgegaan bij het ophalen van het leaderboard.' }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { player, score } = await req.json();

    const name = typeof player === 'string' ? player.trim() : '';
    const points = Number(score);

    if (!name || name.length > MAX_NAME_LENGTH || !Number.isInteger(points) || points < 0 || points > MAX_SCORE) {
      return new Response(JSON.stringify({ error: `Geef een naam (max ${MAX_NAME_LENGTH} tekens) en een score tussen 0 en ${MAX_SCORE}.` }), { status: 400 });
    }

    if (leaderboard.length >= MAX_ENTRIES) {
      return new Response(JSON.stringify({ error: 'Het leaderboard is vol.' }), { status: 409 });
    }

    // Voeg een nieuwe speler en score toe
    const newEntry = {
      id: leaderboard.length + 1, // Nieuwe ID is lengte van de array + 1
      player: name,
      score: points,
    };

    leaderboard.push(newEntry);

    return new Response(JSON.stringify({ success: true, newEntry }), { status: 201 });
  } catch (error) {
    console.error('Fout in POST leaderboard:', error); // Log de fout in de console
    return new Response(JSON.stringify({ error: 'Er is iets misgegaan bij het toevoegen van een speler en score.' }), { status: 500 });
  }
}
