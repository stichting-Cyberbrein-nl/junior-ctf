import { codes } from '../../../codes';

export async function GET() {
  // Retourneer alle codes
  return new Response(JSON.stringify(codes), { status: 200 });
}

export async function POST(req) {
  const { code, solution, difficulty, encryption } = await req.json();

  // Voeg de nieuwe code toe aan de lijst (voor nu gewoon in-memory, maar dit kan later in een database)
  const newCode = { code, solution, difficulty, encryption };
  codes.push(newCode);

  return new Response(JSON.stringify({ success: true, newCode }), { status: 201 });
}

export async function DELETE(req) {
  const { code } = await req.json();
  const index = codes.findIndex((item) => item.code === code);

  if (index !== -1) {
    codes.splice(index, 1);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ success: false, message: 'Code niet gevonden' }), { status: 404 });
  }
}
