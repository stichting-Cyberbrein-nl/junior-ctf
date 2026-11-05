// Haalt de publieke flaglijst op (zonder flag-waardes) voor de voortgang in sessionStorage
export async function fetchPublicFlags() {
  const response = await fetch('/api/flags');
  if (!response.ok) {
    throw new Error('Kon de flags niet ophalen');
  }
  return response.json();
}
