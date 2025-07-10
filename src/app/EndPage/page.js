'use client';

import Link from "next/link";

export default function EndPage() {
  return (
    <div className="min-h-screen p-8 pb-20 flex flex-col items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl sm:text-5xl font-bold mb-8 text-center">Bedankt voor het meedoen!</h1>
      <p className="text-lg mb-6 text-center">
        Gefeliciteerd met het voltooien van Cyberbrein the Game! Als je een prijs hebt gewonnen, kun je contact opnemen met:
      </p>
      <ul className="text-lg mb-8 text-center">
        <li>Henk van Ee</li>
        <li>Mats Dekker</li>
      </ul>
      <p className="text-lg mb-8 text-center">
         Vermeld het volgende codewoord: I hacked cyberbrein and all i got was this lousy t-shirt.
      </p>
      <Link href="/">
        <button className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors bg-blue-500 text-white hover:bg-blue-400 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
          Terug naar Homepagina
        </button>
      </Link>
    </div>
  );
}
