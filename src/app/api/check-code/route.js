import { codes } from '../../../codes'; // Zorg ervoor dat het pad correct is

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ valid: false }), { status: 400 });
  }

  const { code, id } = body || {};
  if (typeof code !== 'string' || code.length > 200) {
    return new Response(JSON.stringify({ valid: false }), { status: 400 });
  }

  // Zoek naar de code op basis van de ID en controleer of de oplossing overeenkomt
  const foundCode = codes.find(item => item.id === Number(id) && item.solution === code);

  if (foundCode) {
    return new Response(
      JSON.stringify({
        valid: true,
        difficulty: foundCode.difficulty,
        encryption: foundCode.encryption,
      }),
      { status: 200 }
    );
  } else {
    return new Response(
      JSON.stringify({ valid: false }),
      { status: 200 }
    );
  }
}
