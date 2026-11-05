import crypto from 'crypto';
import { NextResponse } from 'next/server';

// Controleert de x-admin-token header tegen de ADMIN_TOKEN env-variabele.
// Zonder ADMIN_TOKEN zijn alle beheer-acties uitgeschakeld.
export function requireAdmin(request) {
  const expected = process.env.ADMIN_TOKEN;
  const given = request.headers.get('x-admin-token') || '';

  if (!expected || expected.length < 16) {
    return NextResponse.json({ error: 'Beheer is uitgeschakeld' }, { status: 403 });
  }

  const a = crypto.createHash('sha256').update(given).digest();
  const b = crypto.createHash('sha256').update(expected).digest();
  if (!crypto.timingSafeEqual(a, b)) {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 });
  }

  return null;
}
