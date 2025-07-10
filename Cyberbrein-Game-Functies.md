# Cyberbrein Game - Functionaliteiten & Technische Documentatie

## Inhoudsopgave
1. [Inleiding en Overzicht](#inleiding-en-overzicht)
2. [Technische Architectuur](#technische-architectuur)
3. [Pagina's en Componenten](#paginas-en-componenten)
4. [Spelmechanismen](#spelmechanismen)
5. [Data Management](#data-management)
6. [Encryptie Functionaliteiten](#encryptie-functionaliteiten)
7. [Flags en Beloningen Systeem](#flags-en-beloningen-systeem)
8. [Mini-Games](#mini-games)
9. [Quiz Mechanismen](#quiz-mechanismen)
10. [Admin en Backend Functionaliteiten](#admin-en-backend-functionaliteiten)
11. [Gebruikersinstellingen](#gebruikersinstellingen)
12. [Easter Eggs en Verborgen Functies](#easter-eggs-en-verborgen-functies)

## Inleiding en Overzicht

Cyberbrein the Game is een educatief cybersecurity spel ontwikkeld in Next.js. Het doel is om spelers op een interactieve manier te leren over verschillende encryptie- en coderingstechnieken, terwijl ze uitdagende puzzels oplossen en verborgen flags verzamelen.

Het spel omvat:
- Een hoofdgame waar spelers gecodeerde berichten moeten ontcijferen
- Een uitgebreide hint-pagina met tools voor verschillende encryptiemethoden
- Meerdere mini-games gericht op verschillende aspecten van cryptografie
- Educatieve content over encryptietechnieken
- Een systeem van verborgen flags die spelers kunnen verzamelen
- Quiz modules over cybersecurity onderwerpen

## Technische Architectuur

### Ontwikkelingstechnologieën
- **Frontend Framework**: Next.js (React)
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (useState, useEffect)
- **Routing**: Next.js App Router
- **Data Opslag**: Session Storage, lokale JSON bestanden

### Projectstructuur
```
src/
├── app/               # Next.js app directory
│   ├── api/           # API routes voor server-side functionaliteit
│   ├── components/    # React componenten
│   ├── game/          # Game functionaliteit en UI
│   ├── hint/          # Hint pagina met tools
│   ├── flags/         # Flag verzamelingspagina
│   ├── backend/       # Admin interface
│   ├── encryption-lessons/  # Educatieve content
│   ├── word-shuffle/  # Woord shuffle spel
│   ├── emoji-code/    # Emoji codekraker spel
│   ├── spot-differences/  # Zoek de verschillen spel
│   ├── quiz/          # Quiz modules
│   ├── EndPage/       # Einde spel pagina
│   ├── admin/         # Admin interface
│   └── page.js        # Homepage
├── codes.js           # Database van codes/puzzels
├── encryptions.js     # Database van encryptiemethoden
├── flags.js           # Database van flags
├── quizzes.js         # Database van quiz vragen
├── encryptionLessons.js # Database van lessen
└── leaderboard.js     # Leaderboard data
```

## Pagina's en Componenten

### Core Pagina's en Functionaliteiten

#### 1. Homepage (`/`)
- **Functionaliteit**: Centrale hub voor navigatie naar alle spelonderdelen
- **Componenten**:
  - Navigatieknoppen naar spel, hint-pagina en andere onderdelen
  - Introductietekst en speluitleg
  - Verborgen interactieve elementen (flags)
  - Drag & drop functionaliteit voor het logo
  - Theme switcher (light/dark mode)

#### 2. Game Pagina (`/game`)
- **Functionaliteit**: Hoofdspelomgeving waar spelers codes oplossen
- **Componenten**:
  - `CodeList`: Weergeeft alle beschikbare codes, markeert opgeloste codes
  - `CodeInput`: Invoerveld voor oplossingen met validatie
  - Hint systeem met beperkte hints (10 per sessie)
  - Voortgangstracking met sessiegegevens
  - Reset functie voor spelvoortgang
  - Verborgen interactieve elementen
  - Hover-elementen voor verborgen flags

#### 3. Hint Pagina (`/hint`)
- **Functionaliteit**: Tools en uitleg voor verschillende encryptiemethoden
- **Componenten**:
  - `EncryptionList`: Toont beschikbare encryptiemethoden
  - `EncryptionInfo`: Gedetailleerde uitleg over geselecteerde methode
  - Interactieve tools voor elke encryptiemethode:
    - Caesar Cipher tool met verschuivingsinstelling
    - ROT13 encoder/decoder
    - Atbash Cipher tool
    - Vigenère Cipher tool met sleutelinvoer
    - Affine Cipher tool met a/b parameters
    - Base64 encoder/decoder
    - Binary/ASCII converter
    - Hexadecimal converter
  - Verborgen interactieve elementen (emoji's)

#### 4. Flags Pagina (`/flags`)
- **Functionaliteit**: Overzicht van gevonden flags en input voor nieuwe flags
- **Componenten**:
  - Flag display grid met gevonden/niet-gevonden status
  - Invoerveld voor flag codes
  - Validatie systeem voor flag codes
  - Voortgangsindicator (x/23 flags gevonden)
  - Flag categorieën filter

#### 5. Encryption Lessons (`/encryption-lessons`)
- **Functionaliteit**: Educatieve content over encryptiemethoden
- **Componenten**:
  - Lesmodules voor elke encryptiemethode
  - Interactieve voorbeelden
  - Praktische oefeningen
  - Verborgen flags in de lesinhoud

### Mini-Game Pagina's

#### 6. Word Shuffle (`/word-shuffle`)
- **Functionaliteit**: Woordpuzzel waar letters in de juiste volgorde moeten worden gesleept
- **Componenten**:
  - Drag & drop interface voor letters
  - 10 cybersecurity-gerelateerde woorden
  - Progressie tracking
  - Hint-systeem
  - Flag beloning bij voltooiing

#### 7. Emoji Codekraker (`/emoji-code`)
- **Functionaliteit**: Substitutie-puzzel met emoji's die naar letters vertaald moeten worden
- **Componenten**:
  - 5 emoji-gecodeerde berichten
  - Gedeeltelijke legende voor emoji-naar-letter vertaling
  - Oplossingsvalidatie
  - Flag beloning bij voltooiing

#### 8. Spot the Differences (`/spot-differences`)
- **Functionaliteit**: Zoek de verschillen tussen twee cybersecurity-gerelateerde afbeeldingen
- **Componenten**:
  - Interactieve afbeeldingen
  - Verschil detectie op klik
  - Voortgangsindicator
  - Timer (optioneel)
  - Flag beloning bij voltooiing

### Admin en Speciale Pagina's

#### 9. Backend Pagina (`/backend`)
- **Functionaliteit**: Admin interface beschermd met wachtwoord
- **Componenten**:
  - Login formulier
  - Code beheersinterface (toevoegen/bewerken/verwijderen)
  - Encryptie methoden beheer
  - Verborgen flags

#### 10. Admin Pagina (`/admin`)
- **Functionaliteit**: Geavanceerde admin functionaliteiten
- **Componenten**:
  - Uitgebreide beheersfuncties
  - Systeem statistieken
  - Verborgen flag

#### 11. 404 Pagina
- **Functionaliteit**: Aangepaste foutpagina met verborgen flag
- **Componenten**:
  - Foutmelding
  - Navigatie terug naar homepage
  - Verborgen flag (FLAG_7)

#### 12. EndPage (`/EndPage`)
- **Functionaliteit**: Pagina die wordt getoond na het voltooien van alle codes
- **Componenten**:
  - Eindopdracht
  - Popup voor eindantwoord
  - Leaderboard formulier

## Spelmechanismen

### 1. Code Oplossysteem
- **Functionaliteit**: Controleert ingevoerde oplossingen tegen de juiste antwoorden
- **Implementatie**:
  ```javascript
  // Pseudo-code voor handleSubmit functie
  const handleSubmit = (input, currentCodeId) => {
    const currentCode = codes.find(code => code.id === currentCodeId);
    if (input.toLowerCase() === currentCode.solution.toLowerCase()) {
      // Markeer code als opgelost in sessionStorage
      // Toon succes bericht
      // Voeg code ID toe aan solvedCodes array
    } else {
      // Toon foutmelding
    }
  };
  ```

### 2. Hint Systeem
- **Functionaliteit**: Geeft spelers hints over hoe codes op te lossen met beperkte credits
- **Implementatie**:
  - Een hintCount in sessionStorage houdt bij hoeveel hints er zijn gebruikt
  - Spelers hebben maximaal 10 hints per sessie
  - Hints geven informatie over de gebruikte encryptiemethode en mogelijke sleutels

### 3. Voortgang Tracking
- **Functionaliteit**: Houdt bij welke codes zijn opgelost en bewaart de voortgang
- **Implementatie**:
  - Gebruik van sessionStorage om voortgang te bewaren tussen paginavernieuwingen
  - Automatisch markeren van opgeloste codes in de UI
  - Reset functionaliteit om voortgang te wissen

### 4. Flag Verzamelsysteem
- **Functionaliteit**: Stelt spelers in staat verborgen flags te vinden en te claimen
- **Implementatie**:
  - Flags worden geactiveerd door verschillende triggers (klikken op emoji's, voltooien van taken)
  - Gevonden flags worden opgeslagen in de sessionStorage
  - Flag statusses worden getoond op de flags pagina

## Data Management

### 1. Lokale Data Bestanden
- **codes.js**: Bevat alle codes, oplossingen en encryptiemethoden
- **encryptions.js**: Bevat informatie over verschillende encryptiemethoden
- **flags.js**: Bevat alle flags, hun waarden en beschrijvingen
- **quizzes.js**: Bevat alle quiz vragen, antwoorden en uitleg
- **encryptionLessons.js**: Bevat lesmateriaal over encryptiemethoden
- **leaderboard.js**: Bevat informatie over de leaderboard functionaliteit

### 2. State Management
- **React State**: Houdt de huidige spelstatus bij binnen componenten
- **Session Storage**: Bewaart gegevens tussen paginavernieuwingen
  - solvedCodes: Array met IDs van opgeloste codes
  - hintCount: Aantal gebruikte hints
  - foundFlags: Array met IDs van gevonden flags

### 3. API Routes
- **/api/codes**: GET en POST routes voor codes beheer
- **/api/check-code**: POST route voor het valideren van oplossingen
- **/api/encryptions**: GET, POST en DELETE routes voor encryptiemethoden
- **/api/flags**: GET en POST routes voor flags beheer
- **/api/encryption-lessons**: GET routes voor lesmateriaal

## Encryptie Functionaliteiten

Voor elke encryptiemethode biedt het spel zowel educatieve content als functionele tools:

### 1. Caesar Cipher
- **Tool Functionaliteit**: Interactieve verschuiving van -25 tot +25
- **Implementatie**:
  ```javascript
  const caesarCipher = (text, shift) => {
    return text.split('').map(char => {
      if (!/[A-Za-z]/.test(char)) return char;
      const code = char.charCodeAt(0);
      const isUpperCase = code >= 65 && code <= 90;
      const offset = isUpperCase ? 65 : 97;
      return String.fromCharCode(((code - offset + shift) % 26 + 26) % 26 + offset);
    }).join('');
  };
  ```

### 2. ROT13 Cipher
- **Tool Functionaliteit**: Vaste verschuiving van 13 posities
- **Implementatie**: Afgeleide van Caesar Cipher met shift=13

### 3. Atbash Cipher
- **Tool Functionaliteit**: Omgekeerd alfabet substitutie
- **Implementatie**:
  ```javascript
  const atbashCipher = (text) => {
    return text.split('').map(char => {
      if (!/[A-Za-z]/.test(char)) return char;
      const code = char.charCodeAt(0);
      const isUpperCase = code >= 65 && code <= 90;
      const offset = isUpperCase ? 65 : 97;
      return String.fromCharCode(25 - (code - offset) + offset);
    }).join('');
  };
  ```

### 4. Vigenère Cipher
- **Tool Functionaliteit**: Polyalfabetische substitutie met sleutelwoord
- **Implementatie**: Sleutelletter bepaalt de verschuiving voor elke letter

### 5. Affine Cipher
- **Tool Functionaliteit**: Wiskundige transformatie met formule E(x) = (a*x + b) mod 26
- **Implementatie**: Configurable parameters voor a en b waarden

### 6. Base64 Encoding/Decoding
- **Tool Functionaliteit**: Standaard binaire-naar-tekst codering
- **Implementatie**: Gebruikmakend van browser's built-in btoa() en atob() functies

### 7. Binary/ASCII Conversion
- **Tool Functionaliteit**: Vertaalt tussen binaire waarden en ASCII tekst
- **Implementatie**: Conversie van/naar binaire 8-bits groepen

### 8. Hexadecimal Encoding
- **Tool Functionaliteit**: Vertaalt tussen hexadecimale waarden en tekst
- **Implementatie**: ASCII naar hex conversie en vice versa

## Flags en Beloningen Systeem

### 1. Flag Typen en Categorieën
- **Admin Flags**: Verborgen in admin gedeelten (3 flags)
- **UI Interactie Flags**: Verkregen door interactie met UI elementen (7 flags)
- **Verborgen Flags**: Verstopt op diverse plaatsen (4 flags)
- **Les-gerelateerde Flags**: Te vinden in educatieve content (2 flags)
- **Spel-gerelateerde Flags**: Beloningen voor het voltooien van mini-games (3 flags)
- **Quiz-gerelateerde Flags**: Beloningen voor het voltooien van quizzes (4 flags)

### 2. Flag Popup Component
- **Functionaliteit**: Toont gevonden flags en slaat ze op
- **Implementatie**:
  ```jsx
  const FlagPopup = ({ flagName, flagValue, onClose }) => {
    useEffect(() => {
      // Sla flag op in sessionStorage
      const foundFlags = JSON.parse(sessionStorage.getItem('foundFlags') || '[]');
      if (!foundFlags.includes(flagName)) {
        foundFlags.push(flagName);
        sessionStorage.setItem('foundFlags', JSON.stringify(foundFlags));
      }
    }, [flagName]);
    
    return (
      <div className="flag-popup">
        <h3>Flag Gevonden!</h3>
        <p>{flagValue}</p>
        <button onClick={onClose}>Sluiten</button>
      </div>
    );
  };
  ```

## Mini-Games

### 1. Word Shuffle
- **Functionaliteit**: Spelers moeten letters in de juiste volgorde slepen
- **Implementatie**:
  - Drag & drop interface met React DnD
  - Woorden worden initieel geshuffled weergegeven
  - Validatie controleert of de letters in de juiste volgorde staan
  - Bij voltooiing van alle 10 woorden wordt FLAG_SHUFFLE ontgrendeld

### 2. Emoji Codekraker
- **Functionaliteit**: Spelers decoderen emoji-reeksen naar tekst
- **Implementatie**:
  - Elke emoji vertegenwoordigt een letter (substitutie cipher)
  - Gedeeltelijke legende wordt gegeven als startpunt
  - Spelers voeren de gedecodeerde tekst in
  - Bij voltooiing van alle 5 puzzels wordt FLAG_EMOJI ontgrendeld

### 3. Spot the Differences
- **Functionaliteit**: Spelers vinden verschillen tussen afbeeldingen
- **Implementatie**:
  - Interactieve afbeeldingen met klikbare gebieden
  - Verschillen worden gemarkeerd wanneer gevonden
  - Voortgang wordt bijgehouden (x/10 verschillen gevonden)
  - Bij het vinden van alle verschillen wordt FLAG_DIFFERENCES ontgrendeld

## Quiz Mechanismen

### 1. Quiz Structuur
- **Functionaliteit**: Meerkeuze quizzen over verschillende cybersecurity onderwerpen
- **Implementatie**:
  - Vragen worden sequentieel gepresenteerd
  - Antwoorden worden direct gevalideerd
  - Uitleg wordt getoond na elk antwoord
  - Score wordt bijgehouden

### 2. Quiz Typen
- **Cybersecurity Quiz**: Algemene cybersecurity kennis
- **Encryptie Kennis Quiz**: Specifiek over encryptiemethoden
- **Internet Veiligheid Quiz**: Veilig gedrag online
- **Persoonlijke Privacy Quiz**: Privacy bescherming

### 3. Progressie en Beloning
- **Functionaliteit**: Bijhouden van quiz voortgang en uitreiking van flags
- **Implementatie**:
  - Passing score ingesteld voor elke quiz (bijv. 7/10 correct)
  - Bij het halen van de passing score wordt een flag ontgrendeld
  - Quizresultaten worden opgeslagen in sessionStorage

## Admin en Backend Functionaliteiten

### 1. Backend Toegangscontrole
- **Functionaliteit**: Beschermt admin functies met wachtwoord
- **Implementatie**:
  - Wachtwoordverificatie op de frontend
  - Verdere routes beschermd via sessionStorage token

### 2. Code Management
- **Functionaliteit**: Interface voor het beheren van codes
- **Implementatie**:
  - Formulieren voor het toevoegen, bewerken en verwijderen van codes
  - API endpoints voor CRUD operaties

### 3. Encryptie Methoden Beheer
- **Functionaliteit**: Interface voor het beheren van encryptiemethoden
- **Implementatie**:
  - Formulieren voor het toevoegen, bewerken en verwijderen van encryptiemethoden
  - API endpoints voor CRUD operaties

## Gebruikersinstellingen

### 1. Thema Schakeling (Light/Dark Mode)
- **Functionaliteit**: Stelt gebruikers in staat te schakelen tussen light en dark mode
- **Implementatie**:
  ```jsx
  // Pseudo-code voor theme provider
  export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');
    
    const toggleTheme = () => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      
      // Flag onthullen bij thema wissel
      if (shouldRevealFlag()) {
        // Toon FLAG_THEME
      }
    };
    
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  };
  ```

### 2. Game Reset
- **Functionaliteit**: Stelt gebruikers in staat hun voortgang te resetten
- **Implementatie**:
  - Reset knop die alle voortgang uit sessionStorage wist
  - Onthult FLAG_6 bij gebruik

## Easter Eggs en Verborgen Functies

### 1. Konami Code
- **Functionaliteit**: Speciale toetsencombinatie die een geheime flag onthult
- **Implementatie**:
  ```javascript
  useEffect(() => {
    let keys = [];
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                         'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    const handleKeyDown = (e) => {
      keys.push(e.key);
      keys = keys.slice(-10); // Bewaar alleen de laatste 10 toetsaanslagen
      
      if (JSON.stringify(keys) === JSON.stringify(konamiCode)) {
        // Onthul FLAG_KONAMI
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  ```

### 2. Morse Code Audio
- **Functionaliteit**: Speelt morse code audio af die gedecodeerd kan worden
- **Implementatie**:
  - Audio bestand in `/public/morse.wav`
  - Morse code voor "SIGNAAL": `... .. --. -. .- .- .-..`
  - FLAG_MORSE_CODE wordt onthuld bij correcte decodering

### 3. Drag & Drop Logo
- **Functionaliteit**: Verborgen interactie op de homepage
- **Implementatie**:
  - Sleepbaar Cyberbrein logo
  - Vergrootglas als doelgebied
  - Onthult FLAG_DRAG bij correcte plaatsing

### 4. Verborgen Hover Element
- **Functionaliteit**: Element dat alleen zichtbaar wordt bij hover
- **Implementatie**:
  - CSS hover effect op een verborgen element
  - Onthult FLAG_10 bij mouse-over

---

Deze documentatie biedt een uitgebreid overzicht van alle functionaliteiten, technische implementaties, en interacties binnen het Cyberbrein Game. Het kan dienen als een referentie voor ontwikkelaars, beheerders, of geïnteresseerde spelers die willen begrijpen hoe het spel is opgebouwd en werkt. 