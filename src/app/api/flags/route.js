import { flags } from '../../../flags';
import { NextResponse } from 'next/server';

// Normaliseer een flag zodat "FLAG_1{abc}", "FLAG{abc}" en "abc" allemaal matchen
const stripPrefix = (value) => value.replace(/^FLAG_?\{?/i, '').replace(/\}$/, '').toLowerCase();

// Publieke lijst: alles behalve de flag-waarde zelf
export async function GET() {
  try {
    return NextResponse.json(flags.map(({ value, ...rest }) => rest));
  } catch (error) {
    return NextResponse.json(
      { error: 'Er is een fout opgetreden bij het ophalen van de flags.' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { flagValue } = data || {};

    if (typeof flagValue !== 'string' || flagValue.length > 200) {
      return NextResponse.json({ valid: false }, { status: 400 });
    }

    const input = flagValue.trim();

    // Zoeken naar de flag, met flexibele matching
    const flagFound = flags.find(flag =>
      flag.value.toLowerCase() === input.toLowerCase() ||
      stripPrefix(flag.value) === stripPrefix(input)
    );

    if (flagFound) {
      return NextResponse.json({
        valid: true,
        flagId: flagFound.id,
        flagName: flagFound.flagName,
        value: flagFound.value
      });
    } else {
      return NextResponse.json({
        valid: false
      });
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Er is een fout opgetreden bij het controleren van de flag.' },
      { status: 500 }
    );
  }
}
