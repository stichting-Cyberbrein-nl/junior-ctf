import { NextResponse } from 'next/server';
import { 
  getAllLessons, 
  getLessonById, 
  addLesson, 
  updateLesson, 
  deleteLesson,
  reorderLessons
} from '../../../encryptionLessons';

// GET /api/encryption-lessons - Alle lessen ophalen
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    const lesson = getLessonById(id);
    if (!lesson) {
      return NextResponse.json({ error: 'Les niet gevonden' }, { status: 404 });
    }
    return NextResponse.json(lesson);
  }

  const lessons = getAllLessons();
  return NextResponse.json(lessons);
}

// POST /api/encryption-lessons - Nieuwe les toevoegen
export async function POST(request) {
  try {
    const data = await request.json();
    if (!data.title || !data.content) {
      return NextResponse.json({ error: 'Titel en inhoud zijn verplicht' }, { status: 400 });
    }

    const newLesson = addLesson(data);
    return NextResponse.json(newLesson, { status: 201 });
  } catch (error) {
    console.error('Fout bij het maken van een nieuwe les:', error);
    return NextResponse.json({ error: 'Kan de les niet toevoegen' }, { status: 500 });
  }
}

// PUT /api/encryption-lessons - Les bijwerken
export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID is verplicht' }, { status: 400 });
    }

    const data = await request.json();
    const updatedLesson = updateLesson(id, data);

    if (!updatedLesson) {
      return NextResponse.json({ error: 'Les niet gevonden' }, { status: 404 });
    }

    return NextResponse.json(updatedLesson);
  } catch (error) {
    console.error('Fout bij het bijwerken van de les:', error);
    return NextResponse.json({ error: 'Kan de les niet bijwerken' }, { status: 500 });
  }
}

// DELETE /api/encryption-lessons - Les verwijderen
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID is verplicht' }, { status: 400 });
    }

    const success = deleteLesson(id);
    if (!success) {
      return NextResponse.json({ error: 'Les niet gevonden' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Fout bij het verwijderen van de les:', error);
    return NextResponse.json({ error: 'Kan de les niet verwijderen' }, { status: 500 });
  }
}

// PATCH /api/encryption-lessons/reorder - Volgorde van lessen bijwerken
export async function PATCH(request) {
  try {
    const data = await request.json();
    
    if (!Array.isArray(data)) {
      return NextResponse.json({ error: 'Ongeldig dataformaat' }, { status: 400 });
    }

    reorderLessons(data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Fout bij het herschikken van lessen:', error);
    return NextResponse.json({ error: 'Kan de volgorde niet bijwerken' }, { status: 500 });
  }
} 