'use client';

import { useEffect, useState } from "react";
import FlagPopup from './components/FlagPopup';

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  // Bij het laden van de pagina, check systeemvoorkeur of opgeslagen thema
  useEffect(() => {
    setMounted(true);
    // Check localStorage
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    } else {
      // Check systeemvoorkeur
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', prefersDark);
    }
    
    // Voeg toggle functie toe aan window object voor eenvoudige toegang
    window.toggleTheme = () => {
      setTheme(prevTheme => {
        const newTheme = prevTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        return newTheme;
      });
    };
  }, []);

  // Voorkom hydration mismatch door alleen te renderen na client-side mount
  if (!mounted) return <>{children}</>;

  return (
    <>
      {/* Theme toggle button - rechtsonder op alle pagina's, nu met flag */}
      <div className="fixed bottom-4 right-4 z-50">
        <FlagPopup
          flagName="FLAG_THEME"
          flagValue="FLAG_THEME{light_and_dark_secrets}"
          triggerElement={
            <button 
              onClick={() => window.toggleTheme()} 
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              aria-label="Toggle dark mode"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          }
          triggerStyle=""
          hideAfterFound={false}
        />
      </div>
      {children}
    </>
  );
} 