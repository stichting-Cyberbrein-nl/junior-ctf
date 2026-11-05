import { codes } from '../../../codes';

// Geef codes terug zonder oplossing; controleren gaat via /api/check-code
const toPublic = ({ solution, ...rest }) => rest;

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (id !== null) {
    const code = codes.find((item) => item.id === parseInt(id, 10));
    if (!code) {
      return new Response(JSON.stringify({ error: 'Code niet gevonden' }), { status: 404 });
    }
    return new Response(JSON.stringify(toPublic(code)), { status: 200 });
  }

  return new Response(JSON.stringify(codes.map(toPublic)), { status: 200 });
}
