import { codes } from '../../../codes'; // Zorg ervoor dat het pad correct is

export async function GET() {
  const randomIndex = Math.floor(Math.random() * codes.length);
  const randomCode = codes[randomIndex];

  return new Response(JSON.stringify(randomCode), { status: 200 });
}
