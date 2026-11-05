import { encryptions } from '../../../encryptions';

// Haal alle encryptiemodellen op
export async function GET() {
  return new Response(JSON.stringify(encryptions), { status: 200 });
}
