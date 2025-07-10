import { encryptions } from '../../../encryptions'; // Vervang dit door een database als je die gebruikt

// Haal alle encryptiemodellen op
export async function GET() {
  return new Response(JSON.stringify(encryptions), { status: 200 });
}

// Voeg een nieuw encryptiemodel toe
export async function POST(req) {
  const { name, description } = await req.json();

  // Voeg de nieuwe encryptiemodel toe aan de lijst (voor nu in-memory, later mogelijk in een database)
  const newEncryption = { id: encryptions.length + 1, name, description };
  encryptions.push(newEncryption);

  return new Response(JSON.stringify({ success: true, newEncryption }), { status: 201 });
}

// Verwijder een encryptiemodel
export async function DELETE(req) {
  const { id } = await req.json();
  const index = encryptions.findIndex((item) => item.id === id);

  if (index !== -1) {
    encryptions.splice(index, 1); // Verwijder het encryptiemodel uit de lijst
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ success: false, message: 'Encryptiemodel niet gevonden' }), { status: 404 });
  }
}
