# Cyberbrein Game - Projectdocumentatie

## Inhoudsopgave
1. [Projectoverzicht](#projectoverzicht)
2. [Applicatiestructuur](#applicatiestructuur)
3. [Pagina's en Componenten](#paginas-en-componenten)
4. [Flags en Hidden Challenges](#flags-en-hidden-challenges)
5. [Encryptie Methoden](#encryptie-methoden)
6. [API Routes](#api-routes)
7. [Gameflow](#gameflow)

## Projectoverzicht

Cyberbrein the Game is een educatieve cybersecurity game waarin spelers verschillende encryptie- en coderingstechnieken leren door uitdagende codes op te lossen. Het spel is gebouwd met Next.js en biedt een interactieve ervaring die spelers helpt hun kennis van cybersecurity en cryptografie te verbeteren.

De game bevat meerdere verborgen 'flags' die spelers kunnen verzamelen als bewijs van hun vaardigheden en voortgang. Het is gericht op basisschoolleerlingen om hen kennis te laten maken met basisprincipes van cybersecurity op een leuke en interactieve manier.

## Applicatiestructuur

Het project is gebouwd met Next.js en heeft de volgende hoofdstructuur:

```
src/
├── app/               # Next.js app directory (pagina's en routes)
│   ├── api/           # API routes voor server-side functionaliteit
│   ├── components/    # Herbruikbare React componenten
│   ├── game/          # Game functionaliteit en UI
│   ├── hint/          # Hint pagina met encryptie hulpmiddelen
│   ├── flags/         # Flag verzamelingspagina
│   ├── backend/       # Admin/backend interface
│   ├── encryption-lessons/  # Educatieve lesmateriaal
│   ├── word-shuffle/  # Woord shuffle spel
│   ├── emoji-code/    # Emoji codekraker spel
│   ├── EndPage/       # Einde spel pagina
│   ├── admin/         # Admin interface
│   └── page.js        # Homepage
├── codes.js           # Database van codes/puzzels
├── encryptions.js     # Database van encryptiemethoden
└── flags.js           # Database van flags
```

## Pagina's en Componenten

### Hoofdpagina's

1. **Homepage (`/`)** - Welkomstpagina met uitleg over het spel en navigatieknoppen.
   - Biedt toegang tot het spel, encryptielessen en (verborgen) admin functies
   - Bevat een verborgen flag (FLAG_3) in de sterretje emoji

2. **Game Pagina (`/game`)** - De hoofdpagina van het spel waar spelers codes kunnen ontcijferen.
   - Toont een lijst van beschikbare codes
   - Biedt een interface om oplossingen in te voeren
   - Bevat een puzzel emoji (🧩) met FLAG_4
   - Ondersteunt hints met een limiet van 10 per sessie

3. **Hint Pagina (`/hint`)** - Biedt hulpmiddelen voor het ontcijferen van codes.
   - Bevat verschillende encryptie/decryptie tools
   - Ondersteunt meerdere encryptiemethoden (ROT13, Caesar, Base64, etc.)
   - Bevat een verborgen flag (FLAG_5) in de sleutel emoji

4. **Flags Pagina (`/flags`)** - Toont alle verzamelde flags en biedt mogelijkheid om nieuwe in te voeren.
   - Toont voortgang (aantal gevonden flags)
   - Ontgrendelt speciale functies bij het vinden van alle flags

5. **Backend Pagina (`/backend`)** - Admin interface voor beheer van codes.
   - Vereist een wachtwoord voor toegang
   - Bevat twee verborgen flags (FLAG_1 en FLAG_2)
   - Biedt beheer van codes en encryptielessen

6. **Encryption Lessons (`/encryption-lessons`)** - Educatieve pagina over verschillende encryptiemethoden.
   - Biedt uitleg over encryptietechnieken
   - Bevat praktische voorbeelden

7. **Word Shuffle Pagina (`/word-shuffle`)** - Interactieve woordpuzzel game.
   - Spelers slepen letters naar de juiste positie om woorden te vormen
   - Bevat 10 cybersecurity-gerelateerde woorden met verschillende moeilijkheidsgraden
   - Heeft een hint-systeem voor extra hulp
   - Onthult een speciale flag (FLAG_SHUFFLE) bij het oplossen van alle woorden

8. **Emoji Codekraker (`/emoji-code`)** - Interactief substitutiepuzzel spel.
   - Spelers vertalen emoji's naar letters om geheime boodschappen te ontcijferen
   - Bevat 5 uitdagende puzzels met oplopende moeilijkheidsgraad
   - Inclusief tips en een gedeeltelijke legende om het decoderen te helpen
   - Onthult een speciale flag (FLAG_EMOJI) bij het oplossen van alle puzzels

9. **404 Pagina** - Aangepaste 404-pagina met een verborgen flag (FLAG_7).
   - Wordt automatisch getoond bij niet-bestaande routes
   - Biedt een extra speelse uitdaging

### Componenten

1. **FlagPopup** - Herbruikbare component voor het tonen en verzamelen van flags.
   - Ondersteunt verschillende triggers (emoji's, buttons)
   - Slaat flags automatisch op in sessionStorage

2. **CodeList** - Toont beschikbare codes in het spel.
   - Markeert opgeloste codes
   - Biedt selectie functionaliteit

3. **EncryptionList/EncryptionInfo** - Toont informatie over encryptiemethoden.
   - Biedt educatieve uitleg over verschillende technieken

## Flags en Hidden Challenges

Het spel bevat 10 verborgen flags die spelers kunnen verzamelen:

| ID | Flag Naam | Flag Waarde | Locatie/Trigger | Beschrijving |
|----|-----------|-------------|-----------------|--------------|
| 1 | FLAG_1 | FLAG_1{social_engineering} | Backend pagina, bewerk code knop | Eerste flag in backend pagina |
| 2 | FLAG_2 | FLAG_2{security_landmark} | Backend pagina, voeg code toe | Tweede flag in backend pagina |
| 3 | FLAG_3 | FLAG_3{encryption_star} | Homepage (⭐ emoji) | Derde flag - verborgen hint |
| 4 | FLAG_4 | FLAG_4{exploit_master} | Game pagina (🧩 emoji) | Vierde flag - puzzel emoji op game pagina |
| 5 | FLAG_5 | FLAG_5{cryptosleutel} | Hint pagina (🔑 emoji) | Vijfde flag - sleutel emoji op hint pagina |
| 6 | FLAG_6 | FLAG_6{clean_reboot} | Game pagina, reset knop | Zesde flag - reset voortgang knop |
| 7 | FLAG_7 | FLAG_7{zero_day_found} | 404 pagina | Zevende flag - 404 pagina |
| 8 | FLAG_8 | FLAG_8{administrator_access} | Admin pagina | Achtste flag - admin pagina |
| 9 | FLAG_9 | FLAG_9{hidden_in_plain_sight} | Homepage (verborgen in achtergrond) | Negende flag - verborgen in achtergrond van homepage |
| 10 | FLAG_10 | FLAG_10{hover_reveal_secret} | Game pagina (hover element) | Tiende flag - verschijnt bij hover op game pagina |
| 11 | FLAG_KONAMI | FLAG_KONAMI{up_up_down_down_secret} | Konami Code (speciale toetsencombinatie) | Geheime flag voor retro gamers |
| 12 | FLAG_DRAG | FLAG_DRAG{drag_and_drop_master} | Homepage (sleep het logo naar het vergrootglas) | Sleep het logo naar het vergrootglas om deze flag te onthullen |
| 13 | FLAG_ENCRYPTION | FLAG_ENCRYPTION{knowledge_is_power} | Encryptie lesmodules (🔐 emoji) | Flag te vinden in de encryptie lesmodules |
| 14 | FLAG_SHUFFLE | FLAG_SHUFFLE{word_puzzle_master} | Woord Shuffle spel | Los alle 10 puzzelwoorden op om deze flag te onthullen |
| 15 | FLAG_EMOJI | FLAG_EMOJI{emoji_code_master} | Emoji Codekraker spel | Los alle 5 emoji puzzels op om deze flag te onthullen |
| Special | FLAG_ADMIN | FLAG_ADMIN{secure_administration} | Backend pagina (🔑 emoji) | Admin flag op backend pagina |

Daarnaast bevat het spel de volgende verborgen uitdagingen:

1. Admin wachtwoord in FLAG{Het adminwachtwoord is cyberbrein}
2. Backend pad hint in FLAG{het adminpanel vind je op /backend}
3. Verborgen 'oldehove' flag in de hint pagina (wordt ontgrendeld bij Caesar Cipher shift 13)
4. Konami Code: Druk achtereenvolgens op ↑ ↑ ↓ ↓ ← → ← → B A om een geheime flag te ontgrendelen
5. Drag & Drop: Sleep het Cyberbrein logo naar het vergrootglas in de hoofdsectie van de homepage
6. Emoji Codekraker: Decodeer emoji reeksen naar normale tekst om geheime berichten te ontcijferen

## Encryptie Methoden

Het spel omvat meerdere encryptie- en coderingstechnieken die spelers moeten begrijpen en toepassen:

1. **Caesar Cipher** - Verplaatst letters in het alfabet met een vaste verschuiving
2. **ROT13 Cipher** - Caesar Cipher met een vaste verschuiving van 13 posities
3. **Atbash Cipher** - Vervangt letters door hun spiegelbeeld in het alfabet
4. **Vigenère Cipher** - Polyalfabetische substitutie met een sleutelwoord
5. **Affine Cipher** - Wiskundige transformatie met formule E(x) = (a * x + b) mod 26
6. **Base64 Encoding** - Standaard binaire-naar-tekst codering
7. **Transposition Cipher** - Herschikt letters volgens een patroon
8. **Binary Encoding (ASCII)** - Representeert tekst als binaire ASCII-waarden
9. **Hexadecimal Encoding** - Representeert tekst als hexadecimale ASCII-waarden
10. **DES Encryption** - Data Encryption Standard block cipher
11. **AES Encryption** - Advanced Encryption Standard block cipher
12. **Substitution Cipher** - Vervangt tekens door andere tekens, zoals in het Emoji Codekraker spel

## API Routes

Het spel gebruikt verschillende API routes voor functionaliteit:

1. **/api/codes**
   - GET: Haalt alle beschikbare codes op
   - POST: Voegt nieuwe codes toe

2. **/api/check-code**
   - POST: Controleert of een ingevoerde oplossing correct is

3. **/api/encryptions**
   - GET: Haalt alle encryptiemethoden op
   - POST: Voegt een nieuwe encryptiemethode toe
   - DELETE: Verwijdert een encryptiemethode

4. **/api/flags**
   - GET: Haalt alle flags op
   - POST: Controleert of een ingevoerde flag geldig is

5. **/api/encryption-lessons**
   - GET: Haalt alle encryptielessen op
   - GET (met id): Haalt een specifieke les op

## Gameflow

1. De speler begint op de homepage en navigeert naar het spel
2. In het spel worden verschillende codes gepresenteerd om te ontcijferen
3. De speler kan hints gebruiken om erachter te komen welke encryptiemethode is gebruikt
4. Spelers kunnen de hint-pagina gebruiken om codes te decoderen
5. Bij het correct oplossen van codes ontgrendelt de speler voortgang en soms flags
6. Spelers kunnen hun verzamelde flags bekijken op de flags pagina
7. Verborgen flags kunnen worden gevonden door te zoeken naar geheime elementen
8. Als alle codes zijn opgelost, kan de speler naar de eindopdracht gaan
9. Na het voltooien van het spel, bereikt de speler de EndPage

---

**Opmerking**: Dit document dient als overzicht van het Cyberbrein Game project. Voor ontwikkelaars en beheerders biedt het een handig referentiepunt voor alle functies, flags en gamestructuren. Voor educatieve doeleinden kan het gebruikt worden om het spel te begrijpen zonder de verrassingen te bederven. 