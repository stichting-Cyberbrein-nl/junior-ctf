This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install all dependencies
Clone to local
npm install

Then, run the development server:



```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
Hier is een overzicht van het spel "Cyberbrein the Game", inclusief de verschillende componenten, de manier waarop data wordt opgeslagen, en mogelijke verbeteringen voor de toekomst.

---

### **Overzicht van het Spel**
"Cyberbrein the Game" is een educatief spel gericht op het verkennen van versleutelingstechnieken. Spelers moeten verschillende codes oplossen met behulp van hints en decryptietools die beschikbaar zijn op een overzichtelijke hintpagina. Elke voltooide code brengt de speler dichter bij de eindopdracht, waar een pop-up spelers uitnodigt om hun resultaat in te dienen en op het leaderboard te verschijnen.

---

### **Componenten van het Spel**

#### 1. **Game**
   - **Omschrijving**: Dit is de hoofdcomponent waar spelers de codes zien, hints kunnen aanvragen, en oplossingen invoeren.
   - **Belangrijke functies**:
     - `handleSubmit`: Verwerkt de invoer van de speler en controleert of deze overeenkomt met de verwachte oplossing.
     - `handleNextCode`: Verplaatst de speler naar de volgende code als de huidige code correct is opgelost.
     - `handleShowHint`: Toont hints op basis van beschikbare hintcredits.
     - `handlePopupSubmit`: Verwerkt het eindantwoord en onthult extra opties na voltooiing van het spel.
   - **Verbonden componenten**:
     - `CodeList`, `CodeInput`, `EncryptionList`, `EncryptionInfo`, `Popup`

#### 2. **CodeList**
   - **Omschrijving**: Toont een lijst van alle beschikbare codes in het spel. Spelers kunnen op een code klikken om deze in te voeren en te proberen op te lossen.
   - **Belangrijke functies**:
     - `handleSelectCode`: Verwerkt de code-selectie van de speler.

#### 3. **CodeInput**
   - **Omschrijving**: Bevat het invoerveld waar spelers hun ontcijferde oplossing kunnen invoeren.
   - **Belangrijke functies**:
     - `setInput`: Houdt de actuele invoer van de speler bij.

#### 4. **EncryptionList**
   - **Omschrijving**: Een lijst van beschikbare encryptiemethoden, zoals ROT13, Caesar Cipher, etc., met een korte uitleg en interactieve tools voor spelers om te experimenteren met verschillende encrypties.
   - **Belangrijke functies**:
     - `handleShowEncryptionInfo`: Geeft meer informatie over het geselecteerde encryptiemodel.

#### 5. **EncryptionInfo**
   - **Omschrijving**: Toont gedetailleerde informatie over een geselecteerd encryptiemodel en geeft uitleg aan de speler.

#### 6. **Popup**
   - **Omschrijving**: Een pop-up die verschijnt nadat de speler alle codes heeft opgelost. De speler voert hier een laatste antwoord in om het spel af te ronden.
   - **Belangrijke functies**:
     - `handlePopupSubmit`: Controleert of het laatste antwoord correct is en geeft verdere instructies, zoals het invullen van het leaderboard.

---

### **Dataopslag en -beheer**

#### **1. State Management**:
   - Alle relevante gegevens van de speler, zoals `input`, `result`, `showHint`, `solvedCodes`, en `hintCount`, worden beheerd door **React State**. Dit zorgt ervoor dat het spel direct reageert op de invoer van de speler.

#### **2. Session Storage**:
   - **Session Storage** wordt gebruikt om gegevens op te slaan die bewaard moeten blijven tijdens de sessie, zoals:
     - `hintCount`: Houdt bij hoeveel hints een speler heeft gebruikt tijdens de huidige sessie.
     - `solvedCodes`: Bevat een lijst met de ID's van de opgeloste codes, zodat de voortgang van de speler behouden blijft bij een herlaadactie.

#### **3. API-EndPoints**:
   - Verschillende API's zijn opgezet om data op te halen en toe te voegen.
     - **/api/codes**: Haalt de lijst van beschikbare codes op.
     - **/api/encryptions**: Haalt de lijst van beschikbare encryptiemethoden op.
     - **/api/leaderboard**: Verwerkt de leaderboard-functionaliteit, inclusief het toevoegen van een score aan het leaderboard en het ophalen van bestaande scores.

#### **4. Lokale Data-bestanden**:
   - **codes.js** en **encryptions.js** bevatten de basisgegevens voor het spel. Codes en encryptiemodellen worden hierin opgeslagen als JSON-objecten en zijn beschikbaar in de backend en frontend.

---

### **Mogelijke Verbeteringen**

1. **Verbeterde beveiliging en authenticatie**:
   - Voeg authenticatie toe voor de **admin- en leaderboardpagina** om te voorkomen dat ongewenste wijzigingen worden aangebracht.

2. **Persistente opslag**:
   - Vervang de huidige **session storage** en **in-memory opslag** met een database zoals **MongoDB** of **Firebase** om gegevens permanent op te slaan en het spel online toegankelijk te maken voor meerdere gebruikers.

3. **Dynamische hintsysteem**:
   - Ontwikkel een dynamisch hintsysteem waarbij hints moeilijker worden naarmate de speler meer hints gebruikt, of bied verschillende hints afhankelijk van de moeilijkheidsgraad van de code.

4. **Scoreberekening op basis van moeilijkheidsgraad en tijd**:
   - Bereken scores op basis van de moeilijkheidsgraad van de codes en de tijd die nodig is om een code op te lossen, zodat er een meer competitief element in het spel komt.

5. **Meer geavanceerde encryptie-methoden**:
   - Voeg complexere encryptiemethoden toe, zoals **AES** en **RSA**, om spelers uit te dagen naarmate ze verder in het spel komen.

6. **Cross-platform ondersteuning**:
   - Maak het spel geschikt voor verschillende apparaten, inclusief mobiele versies en mogelijk een desktop-app, zodat meer gebruikers kunnen spelen.

7. **Leaderboard met seizoensgebonden uitdagingen**:
   - Introduceer een **periodieke reset** van het leaderboard (bijv. per maand of kwartaal) met speciale uitdagingen, zodat spelers regelmatig nieuwe uitdagingen kunnen aangaan en zich opnieuw kunnen kwalificeren.

8. **Meertaligheid**:
   - Voeg ondersteuning toe voor meerdere talen zodat het spel toegankelijker wordt voor een breder publiek.

Met deze verbeteringen kun je "Cyberbrein the Game" blijven ontwikkelen en uitbreiden tot een uitgebreid, uitdagend en leerzaam spel voor jonge cyberliefhebbers.

# Cyberbrein the Game

## Morse Code Uitdaging

De morse code uitdaging maakt gebruik van een audiobestand genaamd `morse.wav` dat zich bevindt in de `/public` map. De applicatie is ingesteld om dit bestand te gebruiken voor het afspelen van de morse code.

### De morse code voor referentie

De morse code voor SIGNAAL is: 
```
... .. --. -. .- .- .-..
```

S (...)  I (..)  G (--)  N (-.)  A (.-)  A (.-)  L (..-.)

Als het audiobestand niet correct wordt geladen, zal de applicatie alsnog werken maar dan alleen met de visuele weergave van de morse code.
