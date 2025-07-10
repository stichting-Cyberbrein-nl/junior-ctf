import { flags } from '../../../flags';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json(flags);
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
    const { flagValue } = data;
    
    // Zoeken naar de flag
    const flagFound = flags.find(flag => flag.value.toLowerCase() === flagValue.toLowerCase());
    
    if (flagFound) {
      return NextResponse.json({ 
        valid: true, 
        flagId: flagFound.id,
        flagName: flagFound.flagName
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