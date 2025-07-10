/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Activeer dark mode en laat het door een CSS class bepalen
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light mode variabelen
        background: "var(--background)",
        foreground: "var(--foreground)",
        
        // Dark mode kleuren
        darkBackground: "#1a1a1a",  // Donkere achtergrondkleur voor dark mode
        darkForeground: "#f5f5f5",  // Lichtere tekstkleur voor dark mode
      },
    },
  },
  plugins: [],
};
