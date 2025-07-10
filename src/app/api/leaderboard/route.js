import { leaderboard } from '../../../leaderboard';

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

    if (!player || !score) {
      return new Response(JSON.stringify({ error: 'Speler en score zijn vereist.' }), { status: 400 });
    }

    // Voeg een nieuwe speler en score toe
    const newEntry = {
      id: leaderboard.length + 1, // Nieuwe ID is lengte van de array + 1
      player,
      score: parseInt(score),
    };

    leaderboard.push(newEntry);

    return new Response(JSON.stringify({ success: true, newEntry }), { status: 201 });
  } catch (error) {
    console.error('Fout in POST leaderboard:', error); // Log de fout in de console
    return new Response(JSON.stringify({ error: 'Er is iets misgegaan bij het toevoegen van een speler en score.' }), { status: 500 });
  }
}
