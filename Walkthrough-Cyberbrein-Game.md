# Cyberbrein Game - Complete Walkthrough Guide

## Inhoudsopgave
1. [Introductie](#introductie)
2. [Algemene Navigatie](#algemene-navigatie)
3. [Alle Codes & Oplossingen](#alle-codes--oplossingen)
4. [Verborgen Flags](#verborgen-flags)
5. [Speciale Functies & Easter Eggs](#speciale-functies--easter-eggs)
6. [Encryptie Methodes](#encryptie-methodes)
7. [Puzzel Spellen](#puzzel-spellen)
8. [Quiz Antwoorden](#quiz-antwoorden)
9. [Admin Gebied & Toegang](#admin-gebied--toegang)
10. [Tips voor Beginners](#tips-voor-beginners)

## Introductie

Welkom bij de complete walkthrough voor Cyberbrein the Game! Dit educatieve cybersecurity spel daagt spelers uit om verschillende encryptie- en coderingstechnieken te leren door uitdagende codes op te lossen. Deze gids bevat alle oplossingen, geheime flags en verborgen functies om het spel volledig te verkennen.

## Algemene Navigatie

Het spel bestaat uit verschillende pagina's, elk met eigen functies en uitdagingen:

- **Homepage** (`/`) - De startpagina met links naar alle onderdelen van het spel
- **Game Pagina** (`/game`) - Waar je codes oplost en voortgang maakt
- **Hint Pagina** (`/hint`) - Bevat tools om verschillende encryptiemethodes te ontcijferen
- **Flags Pagina** (`/flags`) - Toont gevonden flags en laat je nieuwe flags invoeren
- **Backend Pagina** (`/backend`) - Bevat admin functies (beschermd met wachtwoord)
- **Encryptie Lessen** (`/encryption-lessons`) - Educatieve content over verschillende versleutelingstechnieken
- **Word Shuffle** (`/word-shuffle`) - Een woordpuzzel minigame
- **Emoji Codekraker** (`/emoji-code`) - Een emoji-gebaseerde codering puzzel
- **Spot the Differences** (`/spot-differences`) - Een zoek-de-verschillen spel met een cybersecurity thema
- **Quiz Pagina's** (`/quiz`) - Verschillende quizzes over cybersecurity onderwerpen

## Alle Codes & Oplossingen

Hier zijn alle codes in het spel en hun oplossingen:

| ID | Code | Oplossing | Encryptie Methode | Moeilijkheid |
|----|------|-----------|-------------------|--------------|
| 1 | Ebiil Tloia | Hello World | Caesar Cipher (Shift -3) | Makkelijk |
| 2 | UnpxEvtug | HackRight | ROT13 Cipher (Shift +13) | Makkelijk |
| 3 | ERXGLI TVEVIH | VICTOR GEVERS | Atbash Cipher (Reversed Alphabet) | Makkelijk |
| 4 | er-O00GPZC | re-B00TCMP | ROT13 Cipher (Shift +13) | Makkelijk |
| 5 | Khoor Zruog | Hello World | Caesar Cipher (Shift +3) | Makkelijk |
| 6 | JYDOJJGFPU | HACKSHIELD | Vigenère Cipher (Key: "CYBER") | Middelmatig |
| 7 | SYNCPNPCWV | CYBERBREIN | Affine Cipher (a=5, b=8) | Middelmatig |
| 8 | RElWRCBBY2FkZW15 | DIVD Academy | Base64 Encoding | Middelmatig |
| 10 | WREW rh znzarmt | DIVD is amazing | Atbash Cipher (Reversed Alphabet) | Middelmatig |
| 11 | 01010110 01101001 01100011 01110100 01101111 01110010 | Victor | Binary Encoding (ASCII) | Moeilijk |
| 12 | 5365637572697479 | Security | Hexadecimal Encoding | Moeilijk |
| 13 | Q3liZXJicmVpbg== | Cyberbrein | Base64 Encoding | Moeilijk |

### Code Oplossingstechnieken:

#### Hoe los je ze op:

1. **Caesar Cipher**:
   - Verschuif elke letter in het alfabet met het aangegeven aantal posities
   - Voor code #1: Verschuif elke letter 3 posities terug in het alfabet
   - Voor code #5: Verschuif elke letter 3 posities vooruit in het alfabet

2. **ROT13 Cipher**:
   - Verschuif elke letter 13 posities in het alfabet (halverwege het alfabet)
   - Voor codes #2 en #4: Wissel elke letter met de letter die 13 posities verder staat

3. **Atbash Cipher**:
   - Vervang elke letter door zijn spiegelbeeld in het alfabet (A→Z, B→Y, enz.)
   - Voor codes #3 en #10: Keer het alfabet om voor elke letter

4. **Vigenère Cipher**:
   - Voor code #6: Gebruik de sleutel "CYBER" en verschuif elke letter volgens de corresponderende sleutelletter
   - Bijvoorbeeld: C = 3, Y = 25, etc. (positie in alfabet, 0-gebaseerd)

5. **Affine Cipher**:
   - Voor code #7: Gebruik de formule E(x) = (a*x + b) mod 26, met a=5, b=8
   - Om te decoderen: Gebruik de inverse formule D(y) = a^(-1) * (y - b) mod 26

6. **Base64 Encoding**:
   - Voor codes #8 en #13: Gebruik een Base64 decoder tool
   - Beschikbaar op de `/hint` pagina of online tools

7. **Binary en Hexadecimal Encoding**:
   - Voor code #11: Converteer elke 8-bits binaire groep naar een ASCII-teken
   - Voor code #12: Converteer elke 2-cijferige hexadecimale paar naar een ASCII-teken

## Verborgen Flags

Er zijn 23 verborgen flags in het spel. Hier is hoe je ze allemaal kunt vinden:

### Admin Flags:
1. **FLAG_1{social_engineering}** - Te vinden in de backend pagina, druk op de "Bewerk code" knop
2. **FLAG_2{security_landmark}** - Te vinden in de backend pagina, druk op "Voeg code toe"
3. **FLAG_8{administrator_access}** - Te vinden op de admin pagina

### UI Interactie Flags:
4. **FLAG_4{exploit_master}** - Klik op de puzzel emoji (🧩) op de game pagina
5. **FLAG_5{cryptosleutel}** - Klik op de sleutel emoji (🔑) op de hint pagina
6. **FLAG_6{clean_reboot}** - Klik op de "Reset voortgang" knop op de game pagina
7. **FLAG_10{hover_reveal_secret}** - Zweef met je muis over een verborgen gebied op de game pagina
8. **FLAG_KONAMI{up_up_down_down_secret}** - Voer de Konami code in: ↑↑↓↓←→←→BA
9. **FLAG_DRAG{drag_and_drop_master}** - Sleep het Cyberbrein logo naar het vergrootglas op de homepage
10. **FLAG_THEME{light_and_dark_secrets}** - Wissel tussen light en dark mode in de UI

### Verborgen Flags:
11. **FLAG_3{encryption_star}** - Klik op de ster emoji (⭐) op de homepage
12. **FLAG_7{zero_day_found}** - Bezoek een niet-bestaande pagina om de 404-pagina te zien
13. **FLAG_9{hidden_in_plain_sight}** - Verborgen in de achtergrond van de homepage
14. **FLAG_MORSE_CODE{audio_decryption_expert}** - Decodeer de morse code audioboodschap

### Les-gerelateerde Flags:
15. **FLAG_ENCRYPTION{knowledge_is_power}** - Te vinden in de encryptie lesmodules (klik op 🔐 emoji)
16. **FLAG_ENCRYPTION_LESSONS{knowledge_unlocks_secrets}** - Te vinden op de encryptie lessen overzichtspagina

### Spel-gerelateerde Flags:
17. **FLAG_SHUFFLE{word_puzzle_master}** - Voltooi alle 10 puzzels in het Woord Shuffle spel
18. **FLAG_EMOJI{emoji_code_master}** - Voltooi alle 5 puzzels in het Emoji Codekraker spel
19. **FLAG_DIFFERENCES{spot_the_crypto_diff}** - Voltooi het Zoek de Verschillen spel

### Quiz-gerelateerde Flags:
20. **FLAG_QUIZ{crypto_knowledge_master}** - Voltooi de Cybersecurity Quiz
21. **FLAG_ENCRYPTION_QUIZ{code_master_level_1}** - Voltooi de Encryptie Kennis Quiz
22. **FLAG_INTERNET_SAFETY{surf_safely_champion}** - Voltooi de Internet Veiligheid Quiz
23. **FLAG_PRIVACY_QUIZ{privacy_guardian_2023}** - Voltooi de Persoonlijke Privacy Quiz

## Speciale Functies & Easter Eggs

### 1. Verborgen Admin Toegang
- Er is een verborgen admin pagina op `/backend`
- Het wachtwoord is "cyberbrein" (onthuld in FLAG_1)
- De hint staat verborgen in de AES Encryption beschrijving (FLAG_2)

### 2. Konami Code
- Druk achtereenvolgens op ↑↑↓↓←→←→BA om een geheime flag te ontgrendelen
- Dit is een knipoog naar de klassieke cheat code uit Konami-spellen

### 3. Morse Code Audio
- Er is een morse code-audioboodschap die spelers kunnen decoderen
- Het spelt "SIGNAAL" in morse code: `... .. --. -. .- .- .-..`

### 4. Drag & Drop Geheim
- Sleep het Cyberbrein logo naar het vergrootglas op de homepage om een geheime flag te ontgrendelen

### 5. Verborgen Caesar Shift
- Er is een verborgen 'oldehove' flag die ontgrendeld wordt door Caesar Cipher shift 13 toe te passen op een bepaalde text

### 6. Thema Wissel Flag
- Er is een speciale flag die verschijnt wanneer je wisselt tussen light en dark mode in de UI

## Encryptie Methodes

Het spel bevat diverse encryptiemethoden die spelers kunnen leren en toepassen:

### 1. Caesar Cipher
- Verschuift elke letter in het alfabet met een vast aantal posities
- Voorbeeld: Met verschuiving +3 wordt "ABC" → "DEF"
- Oplossingsmethode: Probeer verschillende verschuivingen tot je leesbare tekst krijgt

### 2. ROT13 Cipher
- Speciale Caesar Cipher met een vaste verschuiving van 13 posities
- Voorbeeld: "HELLO" → "URYYB"
- Oplossingsmethode: Verschuif elke letter 13 posities in het alfabet

### 3. Atbash Cipher
- Vervangt elke letter door zijn spiegelbeeld in het alfabet
- Voorbeeld: "ABC" → "ZYX"
- Oplossingsmethode: Vervang elke letter door de letter die op dezelfde afstand staat vanaf het einde van het alfabet

### 4. Vigenère Cipher
- Gebruikt een sleutelwoord om de verschuiving voor elke letter te bepalen
- Voorbeeld: Met sleutel "KEY", wordt "HELLO" → "RIJVS"
- Oplossingsmethode: Herhaal het sleutelwoord over de gehele tekst en pas de overeenkomstige verschuivingen toe

### 5. Affine Cipher
- Gebruikt de formule E(x) = (a*x + b) mod 26
- Voorbeeld: Met a=5, b=8, wordt "HELLO" → "MSSHQ"
- Oplossingsmethode: Pas de inverse formule toe: D(y) = a^(-1) * (y - b) mod 26

### 6. Base64 Encoding
- Standaard binaire-naar-tekst codering
- Voorbeeld: "Hello World" → "SGVsbG8gV29ybGQ="
- Oplossingsmethode: Gebruik een Base64 decoder tool

### 7. Transposition Cipher
- Herschikt letters volgens een patroon zonder de letters te veranderen
- Oplossingsmethode: Gebruik de sleutel om de originele volgorde te herstellen

### 8. Binary Encoding (ASCII)
- Zet tekst om in binaire ASCII-waarden
- Voorbeeld: "A" → "01000001"
- Oplossingsmethode: Converteer elke 8-bits groep naar het overeenkomstige ASCII-teken

### 9. Hexadecimal Encoding
- Zet tekst om in hexadecimale ASCII-waarden
- Voorbeeld: "Hello" → "48656C6C6F"
- Oplossingsmethode: Converteer elk paar hex-cijfers naar het overeenkomstige ASCII-teken

### 10. DES Encryption
- Symmetrisch blokcijfer dat gegevens in 64-bits blokken versleutelt
- Oplossingsmethode: Gebruik de juiste sleutel om te ontsleutelen

### 11. AES Encryption
- Geavanceerd symmetrisch blokcijfer dat sterke encryptie biedt
- Oplossingsmethode: Gebruik de juiste sleutel om te ontsleutelen

## Puzzel Spellen

### 1. Word Shuffle
- **Locatie**: `/word-shuffle`
- **Doel**: Herstel 10 cybersecurity-gerelateerde woorden door letters naar de juiste positie te slepen
- **Beloning**: FLAG_SHUFFLE{word_puzzle_master}
- **Oplossingen**:
  1. ENCRYPTIE
  2. WACHTWOORD
  3. FIREWALL
  4. CYBERSECURITY
  5. PHISHING
  6. HACKER
  7. MALWARE
  8. AUTHENTICATIE
  9. VIRUS
  10. BEVEILIGEN

### 2. Emoji Codekraker
- **Locatie**: `/emoji-code`
- **Doel**: Vertaal emoji's naar letters om geheime boodschappen te ontcijferen
- **Beloning**: FLAG_EMOJI{emoji_code_master}
- **Oplossingen**:
  1. BEVEILIG JE DATA
  2. WACHTWOORD VERANDEREN
  3. CYBERBREIN GAME
  4. HACK DE HACKER
  5. DIGITALE VEILIGHEID

### 3. Spot the Differences
- **Locatie**: `/spot-differences`
- **Doel**: Vind de verschillen tussen twee cybersecurity-gerelateerde afbeeldingen
- **Beloning**: FLAG_DIFFERENCES{spot_the_crypto_diff}

## Quiz Antwoorden

### Cybersecurity Quiz
- **Locatie**: `/quiz/cybersecurity`
- **Beloning**: FLAG_QUIZ{crypto_knowledge_master}
- **Antwoorden**:
  1. "Het proces om gegevens te versleutelen zodat alleen bevoegde personen ze kunnen lezen"
  2. "ABC → DEF"
  3. "Om je identiteit te verifiëren en alleen jou toegang te geven"
  4. [...de volledige lijst van antwoorden zou hier staan, maar is ingekort voor overzichtelijkheid]

### Encryptie Kennis Quiz
- **Locatie**: `/quiz/encryption`
- **Beloning**: FLAG_ENCRYPTION_QUIZ{code_master_level_1}

### Internet Veiligheid Quiz
- **Locatie**: `/quiz/internet-safety`
- **Beloning**: FLAG_INTERNET_SAFETY{surf_safely_champion}

### Persoonlijke Privacy Quiz
- **Locatie**: `/quiz/privacy`
- **Beloning**: FLAG_PRIVACY_QUIZ{privacy_guardian_2023}

## Admin Gebied & Toegang

### Backend Toegang
- **URL**: `/backend`
- **Wachtwoord**: "cyberbrein"
- **Verborgen in**: FLAG_1{Het adminwachtwoord is cyberbrein}
- **Functionaliteiten**:
  - Codes beheren (toevoegen, bewerken, verwijderen)
  - Encryptiemethoden beheren
  - Verborgen flags: FLAG_1{social_engineering} en FLAG_2{security_landmark}

### Admin Pagina
- **URL**: `/admin`
- **Verborgen flag**: FLAG_8{administrator_access}
- **Functionaliteiten**:
  - Geavanceerde beheersfuncties

## Tips voor Beginners

1. **Start met eenvoudige codes** - Begin met de codes gemarkeerd als "Makkelijk" om de basisprincipes te leren.

2. **Gebruik de hint pagina** - De `/hint` pagina bevat tools voor elke encryptiemethode in het spel.

3. **Zoek naar verborgen elementen** - Veel flags zijn verborgen in emoji's of interactieve elementen.

4. **Let op cryptische berichten** - Informatie over verborgen flags en functies kan overal zijn.

5. **Experimenteer met de encryptiemethoden** - Leer hoe elke methode werkt door ermee te experimenteren.

6. **Bewaar je flags** - De flags pagina (`/flags`) houdt je voortgang bij.

7. **Controleer de bronbestanden** - Soms zijn er aanwijzingen verborgen in commentaar of HTML.

8. **Houd sessie-informatie bij** - Het spel gebruikt sessionStorage om je voortgang bij te houden.

9. **Probeer speciale toetscombinaties** - Denk aan de Konami Code en andere speciale interacties.

10. **Verken alle pagina's** - Zelfs de 404-pagina bevat verborgen schatten!

---

Gefeliciteerd! Met deze gids kun je alle uitdagingen in Cyberbrein the Game voltooien en alle verborgen schatten ontdekken. Veel plezier met leren over cybersecurity! 