// Dit bestand bevat de gegevensstructuur voor encryptielessen
// De lessen worden opgeslagen in een array en kunnen worden bewerkt via de beheerinterface

let encryptionLessons = [
  {
    id: 1,
    title: "Wat is geheimschrift?",
    description: "Leer wat geheimschrift is en waarom we het gebruiken om berichten te verstoppen.",
    author: "Team Cyberbrein",
    duration: "5 minuten",
    difficulty: "Beginner",
    videoUrl: "",
    relatedLinks: [
      { title: "Leuke geheimschrift spelletjes", url: "https://www.encryption-kids.com/" },
      { title: "Geheimschrift voor kinderen", url: "https://kidskonnect.com/education/codes-and-ciphers/" }
    ],
    content: `
# Wat is geheimschrift?

Heb je wel eens een geheim willen vertellen aan alleen je beste vriend? Dan kun je **geheimschrift** gebruiken!

## Wat is geheimschrift?

Geheimschrift is een manier om je woorden te veranderen zodat alleen mensen die jouw geheim kennen, het kunnen lezen.

## Waarom gebruiken we geheimschrift?

- Om geheime berichten te sturen naar vrienden
- Om je dagboek te beschermen
- Om wachtwoorden veilig te houden

## Een simpel voorbeeld

Kijk naar dit geheimschrift. We vervangen elke letter door de letter die erna komt in het alfabet:

- A wordt B
- B wordt C
- Z wordt A

Dus "HAI" wordt "IBJ"!

Probeer het zelf:
- **Jouw naam** → ?
- **School** → ?

### Speel een spelletje!

Stuur een geheime boodschap naar een vriend. Vertel hem of haar hoe je elke letter hebt veranderd. Kan je vriend je bericht ontcijferen?
    `,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 1
  },
  {
    id: 2,
    title: "Geheime sleutels",
    description: "Leer over geheime sleutels en hoe je ze gebruikt om berichten te verstoppen en weer terug te lezen.",
    author: "Team Cyberbrein",
    duration: "7 minuten",
    difficulty: "Beginner",
    videoUrl: "",
    relatedLinks: [
      { title: "Caesar Cipher voor kinderen", url: "https://www.dcode.fr/caesar-cipher" },
      { title: "Maak je eigen sleutel", url: "https://www.kidscryptography.com/" }
    ],
    content: `
# Geheime sleutels

## Wat is een geheime sleutel?

Een **sleutel** is het geheim dat je nodig hebt om een geheimschrift te lezen of te maken. 

Het is net als een echte sleutel voor een deur:
- De sleutel laat je naar binnen (het bericht lezen)
- Zonder de sleutel blijf je buiten (je kunt het bericht niet lezen)

## Hoe werkt het?

Stel, je gebruikt dit geheimschrift:
- Verplaats elke letter 3 plaatsen in het alfabet
- De sleutel is dan "3"

**Voorbeeld:**
- "HAI" + sleutel 3 = "KDL"
- Om het weer terug te lezen, doe je "-3"
- "KDL" - sleutel 3 = "HAI"

## Probeer het zelf!

Gebruik sleutel 2:
- "COMPUTER" wordt → ?
- "QEJQQN" wordt → ? (dit is een woord met sleutel 2 versleuteld)

### Tip
Je kunt een sleutel groter of kleiner maken. Probeer sleutel 1, 2, 3 of zelfs 10!
    `,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 2
  },
  {
    id: 3,
    title: "Geheime codes met je vrienden",
    description: "Leer hoe je samen met je vrienden geheime berichten kunt sturen die niemand anders kan lezen.",
    author: "Team Cyberbrein",
    duration: "6 minuten",
    difficulty: "Beginner",
    videoUrl: "",
    relatedLinks: [
      { title: "Maak je eigen codewiel", url: "https://www.instructables.com/Making-a-Caesar-Cipher-Wheel/" },
      { title: "Coole geheimtaal ideeën", url: "https://www.woojr.com/secret-codes-for-kids/" }
    ],
    content: `
# Geheime codes met je vrienden

Wil je geheime berichten sturen die alleen jij en je vrienden kunnen lezen? Dat is super cool!

## Maak jullie eigen geheimtaal

Hier zijn drie manieren om je eigen geheimtaal te maken:

### 1. Spiegelschrift
Schrijf elke letter achterstevoren.
- "HAI" wordt "IAH"

### 2. Letterwissel
Wissel elke letter met een andere letter.
- A = Z
- B = Y
- C = X
- enz.

### 3. Getallen in plaats van letters
Vervang letters door getallen.
- A = 1
- B = 2
- C = 3
- enz.

## Spelletje: Verborgen Bericht

Stuur een geheimschrift naar je vriend. Laat je vriend raden welke code je hebt gebruikt!

## Onthoud!
- Deel je geheime code alleen met vrienden die je vertrouwt
- Bewaar je code op een veilige plaats
- Verander je code soms zodat hij extra geheim blijft
    `,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 3
  },
  {
    id: 4,
    title: "Ontcijfer puzzels",
    description: "Leer hoe je geheime berichten kunt kraken met leuke puzzels en raadsels.",
    author: "Team Cyberbrein",
    duration: "10 minuten",
    difficulty: "Intermediate",
    videoUrl: "",
    relatedLinks: [
      { title: "Puzzels voor kinderen", url: "https://www.kidscodeclub.org/games" },
      { title: "Kraak de code spel", url: "https://www.breakingcodes.net/" }
    ],
    content: `
# Ontcijfer puzzels

Kun jij geheime codes kraken? Laten we het uitproberen!

## Puzzel 1: Alfabet schuif

Dit geheimschrift gebruikt een schuif van 1 letter in het alfabet:
- A wordt B
- B wordt C
- enz.

**Probeer deze te ontcijferen:**
\`\`\`
EF LPNFO NPSFO PN ESJI VVS
\`\`\`

## Puzzel 2: Omgekeerde code

In deze code is elke letter omgekeerd:
- A wordt Z
- B wordt Y
- enz.

**Ontcijfer dit:**
\`\`\`
SVGZI HXSLLO
\`\`\`

## Puzzel 3: Getallen code

Hier staat elke letter voor een getal:
- A = 1
- B = 2
- enz.

**Kraak deze code:**
\`\`\`
8-5-12-12-15
\`\`\`

## Tip voor speurneuzen

Kijk goed naar hoe vaak bepaalde letters voorkomen. In het Nederlands komen de letters E, N, A en T het meeste voor!

### Wist je dat?
Grote mensen gebruiken computers om heel moeilijke codes te kraken. Sommige codes zijn zo moeilijk dat het jaren zou duren om ze met de hand te kraken!
    `,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 4
  },
  {
    id: 5,
    title: "Geheime berichten op het internet",
    description: "Ontdek hoe computers op het internet geheime codes gebruiken om jouw gegevens veilig te houden.",
    author: "Team Cyberbrein",
    duration: "8 minuten",
    difficulty: "Intermediate",
    videoUrl: "",
    relatedLinks: [
      { title: "Internet veiligheid voor kinderen", url: "https://www.internetmatters.org/resources/online-safety-guide/" },
      { title: "Hoe werkt internet?", url: "https://www.bbc.co.uk/bitesize/topics/zs7s4wx" }
    ],
    content: `
# Geheime berichten op het internet

Wist je dat het internet vol zit met geheime berichten? Zo houdt het internet je gegevens veilig!

## Hoe werkt het?

Als je een website bezoekt, worden er geheime codes gebruikt om je gegevens te beschermen:

1. Je computer maakt een geheime sleutel
2. De website krijgt ook een sleutel
3. Jullie sturen berichten die alleen met deze sleutels kunnen worden gelezen
4. Niemand anders kan meelezen!

## Waar zie je beveiligde websites?

Kijk naar de adresbalk van je browser. Als je dit ziet, is de website veilig:

- Een slotje 🔒
- Het adres begint met "https://"

## Wachtwoorden zijn ook geheimschrift!

Als je een wachtwoord maakt, wordt het veranderd in geheimschrift voordat het wordt opgeslagen. Dat is goed, want:

- Niemand kan je wachtwoord stelen
- Zelfs de mensen die de website maken kennen je wachtwoord niet!

## Tips voor veilige wachtwoorden

- Gebruik een lang wachtwoord
- Mix letters, cijfers en tekens (A, b, 7, !)
- Vertel je wachtwoord aan niemand!
- Gebruik niet hetzelfde wachtwoord overal

### Onthoud!
Het internet gebruikt geheimschrift om je te beschermen. Cool hè?
    `,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 5
  },
  {
    id: 6,
    title: "Maak je eigen codewiel",
    description: "Een leuk knutselproject om je eigen codewiel te maken waarmee je berichten kunt versleutelen.",
    author: "Team Cyberbrein",
    duration: "15 minuten",
    difficulty: "Beginner",
    videoUrl: "",
    relatedLinks: [
      { title: "Printbaar codewiel", url: "https://www.braingle.com/cs/caesar.php" },
      { title: "Meer knutselprojecten", url: "https://www.paperzip.co.uk/cryptography/" }
    ],
    content: `
# Maak je eigen codewiel

Een codewiel is een cool hulpmiddel om geheimschrift mee te maken. Laten we er samen één maken!

## Wat heb je nodig?
- 2 ronde stukken stevig papier of karton
- Een schaar
- Een splitpen (of paperclip)
- Een potlood of pen

## Stap 1: De cirkels maken
Knip twee cirkels uit karton. Eén moet iets kleiner zijn dan de andere.

## Stap 2: Het alfabet schrijven
1. Schrijf op de grote cirkel langs de rand het alfabet: A t/m Z
2. Schrijf op de kleine cirkel ook het alfabet: A t/m Z

## Stap 3: In elkaar zetten
1. Maak een gaatje in het midden van beide cirkels
2. Leg de kleine cirkel op de grote cirkel
3. Steek een splitpen door beide gaatjes
4. Vouw de splitpen open aan de achterkant

## Hoe gebruik je je codewiel?
1. Draai de kleine cirkel zodat een letter (bijv. A) wijst naar een letter op de grote cirkel (bijv. D)
2. Dit is je sleutel: A=D
3. Om een bericht te versleutelen, zoek je elke letter van je bericht op de kleine cirkel
4. Schrijf dan de letter die op dezelfde plaats staat op de grote cirkel

## Voorbeeld
Als je A=D hebt ingesteld:
- "HAI" wordt "KDL"
- Om te ontcijferen, doe je het omgekeerd!

## Nu jij!
Maak je codewiel en stuur een geheim bericht naar een vriend!
    `,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 6
  },
  {
    id: 7,
    title: "Maak je eigen Caesar wiel",
    description: "Leer hoe je een Caesar wiel kunt maken om snel berichten te versleutelen en ontcijferen.",
    author: "Team Cyberbrein",
    duration: "15 minuten",
    difficulty: "Intermediate",
    videoUrl: "",
    relatedLinks: [
      { title: "Printbare Caesar wiel template", url: "https://www.education.com/download/worksheet/172964/make-a-caesar-wheel.pdf" },
      { title: "Geschiedenis van de Caesar cipher", url: "https://en.wikipedia.org/wiki/Caesar_cipher" }
    ],
    content: `
# Maak je eigen Caesar wiel

Een Caesar wiel is een geweldig gereedschap om snel berichten te versleutelen en ontcijferen. In deze les leer je hoe je er zelf een kunt maken!

## Wat is een Caesar wiel?

Een Caesar wiel (of 'cipher wheel') bestaat uit twee draaibare schijven:
- Een buitenste schijf met het normale alfabet
- Een binnenste schijf met hetzelfde alfabet, maar die je kunt draaien

Door de binnenste schijf te draaien, kun je snel elke letter vervangen door een andere letter.

## Benodigdheden

Voor het maken van je eigen Caesar wiel heb je nodig:
- 2 ronde stukken karton of stevig papier
- Een schaar
- Een potlood of pen
- Een splitpen of paperclip
- Een liniaal
- Een passer (als je die hebt)

## Stap 1: De cirkels tekenen

1. Teken met de passer twee cirkels:
   - Een grote cirkel met een diameter van ongeveer 10 cm
   - Een kleinere cirkel met een diameter van ongeveer 8 cm
2. Knip beide cirkels uit

Als je geen passer hebt, kun je ook:
- Een rond voorwerp (zoals een bord of beker) gebruiken om de cirkel te tekenen
- Of een sjabloon downloaden van internet

## Stap 2: De letters schrijven

1. Op de grote cirkel (buitenste wiel):
   - Schrijf de letters A t/m Z in hoofdletters langs de rand, met gelijke afstand tussen de letters
   - Begin bovenaan en ga met de klok mee

2. Op de kleine cirkel (binnenste wiel):
   - Schrijf ook de letters A t/m Z in hoofdletters langs de rand
   - Zorg dat de letters precies onder elkaar kunnen staan wanneer je de wielen op elkaar legt

## Stap 3: De wielen samenvoegen

1. Maak een gaatje precies in het midden van beide cirkels
2. Leg de kleine cirkel op de grote cirkel
3. Steek de splitpen door beide gaatjes om de wielen samen te houden
4. Buig de uiteinden van de splitpen om zodat de wielen kunnen draaien maar niet loskomen

Als je geen splitpen hebt, kun je ook een paperclip gebruiken:
- Steek de paperclip door beide gaten
- Buig het uiteinde om zodat de wielen niet loskomen

## Stap 4: Het wiel gebruiken

1. Kies een sleutel (bijvoorbeeld 3)
2. Draai het binnenste wiel zodat de 'A' van het binnenste wiel onder de 'D' (3 plaatsen verder) van het buitenste wiel staat
3. Om een bericht te versleutelen:
   - Zoek elke letter van je bericht op de buitenste schijf
   - Schrijf de letter die eronder staat op het binnenste wiel op
4. Om een bericht te ontcijferen:
   - Zoek elke letter van het versleutelde bericht op de binnenste schijf
   - Schrijf de letter die erboven staat op de buitenste schijf op

## Voorbeeld

Met de sleutel 3 (binnenste 'A' staat onder buitenste 'D'):

**Om te versleutelen**:
- "HAI" wordt "EDL"
  - H op de buitenste schijf → E op de binnenste schijf
  - A op de buitenste schijf → D op de binnenste schijf
  - I op de buitenste schijf → L op de binnenste schijf

**Om te ontcijferen**:
- "EDL" wordt "HAI"
  - E op de binnenste schijf → H op de buitenste schijf
  - D op de binnenste schijf → A op de buitenste schijf
  - L op de binnenste schijf → I op de buitenste schijf

## Uitdaging

Maak je eigen Caesar wiel en verzend geheime berichten naar je vrienden!

1. Kies samen een geheime sleutel (bijvoorbeeld 5)
2. Draai je wiel op de juiste stand
3. Versleutel een boodschap en geef die aan je vriend
4. Kan je vriend het ontcijferen met zijn/haar eigen Caesar wiel?

## Extra tip

Je kunt je Caesar wiel ook versieren of van speciaal materiaal maken zodat het langer meegaat. Sommige mensen maken het zelfs van hout of plastic!

## Conclusie

Met je zelfgemaakte Caesar wiel kun je nu snel en eenvoudig berichten versleutelen en ontcijferen, net zoals Julius Caesar dat meer dan 2000 jaar geleden deed!
    `,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 7
  },
  {
    id: 8,
    title: "Moderne Encrypties",
    description: "Leer over moderne encryptiemethoden die vandaag de dag worden gebruikt om onze digitale wereld veilig te houden.",
    author: "Team Cyberbrein",
    duration: "10 minuten",
    difficulty: "Intermediate",
    videoUrl: "",
    relatedLinks: [
      { title: "Alles over cybersecurity", url: "https://www.kaspersky.com/resource-center/definitions/what-is-cyber-security" },
      { title: "Hoe werkt encryptie?", url: "https://www.cloudflare.com/learning/ssl/what-is-encryption/" }
    ],
    content: `
# Moderne Encrypties: De Digitale Sloten

## Wat zijn moderne encrypties?

Moderne encrypties zijn de geavanceerde methoden die we gebruiken om informatie veilig te houden in onze digitale wereld. Anders dan bij historische methoden zoals het Caesar wiel, gebruiken moderne encrypties complexe wiskundige berekeningen die zelfs met computers moeilijk te kraken zijn.

## Waarom hebben we sterke encryptie nodig?

In ons digitale leven versturen we dagelijks veel persoonlijke informatie:
- Wachtwoorden
- Bankgegevens
- Privéberichten
- Foto's en video's

Zonder goede encryptie kunnen hackers en cybercriminelen deze gegevens stelen!

## Belangrijke moderne encryptiemethoden

### 1. Symmetrische encryptie

Dit lijkt een beetje op de oude methoden zoals het Caesar wiel, maar dan veel geavanceerder:

- Dezelfde sleutel wordt gebruikt voor versleutelen én ontsleutelen
- Iedereen die het bericht wil lezen, moet dezelfde sleutel hebben
- Voorbeeld: AES (Advanced Encryption Standard)

### 2. Asymmetrische encryptie (Public Key)

Dit is een slimme manier waarbij je twee sleutels gebruikt:

- Een **publieke sleutel** die iedereen mag hebben (om berichten te versleutelen)
- Een **privésleutel** die alleen jij hebt (om berichten te ontsleutelen)

Dit is zoals een brievenbus: iedereen kan er iets in stoppen, maar alleen jij hebt de sleutel om het eruit te halen!

### 3. Hashing

Bij hashing wordt informatie omgezet in een unieke code:

- De originele informatie kan niet worden teruggehaald uit de hash
- Dezelfde informatie geeft altijd dezelfde hash
- Wordt gebruikt voor het opslaan van wachtwoorden

Bijvoorbeeld: het wachtwoord "DinoIsCool123" wordt opgeslagen als "7d8f4f7e8a1cf9d3b5a1d3c5e8f7d9a2"

## Waar vind je encryptie in het dagelijks leven?

1. **HTTPS**: Het hangslot in je webbrowser
   - Als je naar een website gaat en je ziet een slotje, dan is je verbinding versleuteld!

2. **WhatsApp en Signal**:
   - Deze apps gebruiken end-to-end encryptie
   - Alleen jij en de ontvanger kunnen de berichten lezen
   - Zelfs de makers van de app kunnen je berichten niet lezen!

3. **Wifi-wachtwoorden**:
   - Je WiFi-wachtwoord wordt versleuteld via WPA2 of WPA3

## Maak je eigen geheime code met een moderne twist!

Laten we een eenvoudige "hybride" encryptie maken die moderne principes gebruikt:

1. **Maak een "public key"** - Dit is een nummer tussen 1-10 dat je aan je vrienden geeft
2. **Houd een "private key"** - Dit is een geheim woord dat alleen jij kent
3. **Om te versleutelen**:
   - Neem elke letter van je bericht
   - Verschuif het aantal plaatsen in het alfabet volgens de public key
   - Voeg een emoji toe na elke letter op basis van je private key

**Voorbeeld:**
- Public key: 3
- Private key: "DINO" (D=4, I=9, N=14, O=15)
- Bericht: "HI"

Versleuteld: 
- H → K (3 plaatsen verder) → K🦋 (4e emoji)
- I → L (3 plaatsen verder) → L🐶 (9e emoji)

Alleen iemand die zowel de public key (3) als je private key ("DINO") kent, kan dit ontcijferen!

## Uitdaging voor jou!

Probeer zelf een bericht te versleutelen met de hybride methode. Kies je eigen public key en private key, en deel alleen de public key met je vriend. Kan jouw vriend het bericht ontcijferen zonder de private key? Waarschijnlijk niet!

## Tot slot

Moderne encryptie is een soort digitaal slot dat onze gegevens veilig houdt. Het werkt met wiskundige puzzels die zo moeilijk zijn dat zelfs krachtige computers er jaren over zouden doen om ze te kraken!

Onthoud: in onze digitale wereld is encryptie een van onze belangrijkste beschermingsmiddelen tegen hackers en internetcriminelen.
    `,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 8
  },
  {
    id: 9,
    title: "Emoji geheimschrift",
    description: "Leer hoe je emoji's kunt gebruiken om geheime berichten te maken!",
    author: "Team Cyberbrein",
    duration: "5 minuten",
    difficulty: "Beginner",
    videoUrl: "",
    relatedLinks: [
      { title: "Emoji taal", url: "https://emojiterra.com/" },
      { title: "Emoji verhalen maken", url: "https://www.emojione.com/blog" }
    ],
    content: `
# Emoji geheimschrift

Emoji's zijn niet alleen leuk, je kunt ze ook gebruiken als geheimschrift! 😎

## Een emoji code maken

Hier is hoe je een emoji code maakt:
1. Kies een emoji voor elke letter van het alfabet
2. Schrijf je bericht door de emoji's te gebruiken in plaats van letters

## Voorbeeld emoji code:
- A = 🍎
- B = 🍌
- C = 🐱
- D = 🦮
- E = 🐘
- ...en zo verder!

## Voorbeeld:
"HAI" wordt dan:
- H = 🏠
- A = 🍎
- I = 🍦

Dus "HAI" is "🏠🍎🍦"

## Probeer het zelf!
Maak met een vriend je eigen emoji code. Je kunt het echt met alles doen:
- Dieren
- Eten
- Sport
- Gezichten
- En nog veel meer!

## Tip:
Je kunt met je vriend een "codeboek" maken waarin je opschrijft welke emoji bij welke letter hoort!

## Uitdaging:
Kun je dit emoji-bericht ontcijferen?
🏫🐘🐢  🍦🐘  🦊🐘🐘🦮🐘🌮

(Hint: 🏫=S, 🐘=E, 🐢=T, 🍦=I, 🦊=L, 🐘=E, 🦮=D, 🌮=N)
    `,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 9
  },
  {
    id: 10,
    title: "Twee-factor authenticatie",
    description: "Leer over twee-factor authenticatie en waarom het zo belangrijk is voor je online veiligheid.",
    author: "Team Cyberbrein",
    duration: "6 minuten",
    difficulty: "Beginner",
    videoUrl: "",
    relatedLinks: [
      { title: "2FA voor beginners", url: "https://www.twofactorauth.org/" },
      { title: "Hoe 2FA werkt", url: "https://www.cloudflare.com/learning/access-management/what-is-two-factor-authentication/" }
    ],
    content: `
# Twee-factor authenticatie: Een extra slot op je digitale deur

## Wat is twee-factor authenticatie?

Twee-factor authenticatie (2FA) is als een extra slot op je digitale deur. Het werkt zo:

1. **Iets wat je weet** (je wachtwoord)
2. **Iets wat je hebt** (je telefoon of een speciale sleutel)

## Waarom is 2FA belangrijk?

- Het maakt het veel moeilijker voor hackers om in je accounts te komen
- Zelfs als iemand je wachtwoord kent, kunnen ze niet inloggen zonder de tweede factor
- Het beschermt je gevoelige gegevens zoals bankrekeningen en persoonlijke berichten

## Hoe werkt het?

1. Je logt in met je wachtwoord
2. Je krijgt een code op je telefoon of via een app
3. Je voert deze code in
4. Nu pas kun je inloggen!

## Verschillende soorten 2FA

### 1. SMS-codes
- Je krijgt een code via SMS
- Makkelijk te gebruiken
- Werkt op elke telefoon

### 2. Authenticator apps
- Apps zoals Google Authenticator of Microsoft Authenticator
- Werkt ook zonder internet
- Veiliger dan SMS

### 3. Fysieke sleutels
- Speciale USB-sleutels
- Zeer veilig
- Handig voor bedrijven

## Probeer het zelf!

1. Installeer een authenticator app op je telefoon
2. Zet 2FA aan voor je e-mailaccount
3. Probeer in te loggen met en zonder 2FA

## Tips voor veilig gebruik

- Gebruik altijd 2FA voor belangrijke accounts
- Bewaar je backup-codes op een veilige plaats
- Vertel nooit je 2FA-codes aan anderen
- Gebruik een authenticator app in plaats van SMS als dat mogelijk is

## Onthoud!
2FA is als een extra slot op je digitale deur - het maakt het veel moeilijker voor hackers om binnen te komen!
    `,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 10
  },
  {
    id: 11,
    title: "Phishing en e-mail veiligheid",
    description: "Leer hoe je phishing e-mails kunt herkennen en wat je moet doen als je er een ontvangt.",
    author: "Team Cyberbrein",
    duration: "7 minuten",
    difficulty: "Beginner",
    videoUrl: "",
    relatedLinks: [
      { title: "Phishing voorbeelden", url: "https://www.phishing.org/" },
      { title: "E-mail veiligheid tips", url: "https://www.consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams" }
    ],
    content: `
# Phishing: De digitale visserij

## Wat is phishing?

Phishing is als een digitale visser die probeert je persoonlijke gegevens te "vangen". Hackers doen zich voor als betrouwbare bedrijven of personen om je te misleiden.

## Hoe herken je phishing?

### 1. Verdachte afzenders
- Onbekende e-mailadressen
- Vreemde domeinnamen
- Spelfouten in het adres

### 2. Dringende taal
- "Je account wordt gesloten!"
- "Direct actie vereist!"
- "Laatste waarschuwing!"

### 3. Vreemde bijlagen
- Onverwachte bestanden
- Rare bestandstypen
- Verdachte links

## Wat moet je doen?

### Als je een verdachte e-mail krijgt:
1. **Niet openen** - Verwijder de e-mail direct
2. **Niet klikken** - Klik nooit op links in verdachte e-mails
3. **Niet downloaden** - Download nooit bijlagen
4. **Rapporteren** - Markeer als spam of phishing

### Als je per ongeluk hebt geklikt:
1. Verander direct je wachtwoord
2. Controleer je account op vreemde activiteit
3. Vertel het aan een volwassene

## Voorbeelden van phishing

### Slecht voorbeeld:
"Beste klant,
Uw account wordt gesloten als u niet direct actie onderneemt.
Klik hier om uw account te verifiëren: http://bank.verdacht.com"

### Goed voorbeeld:
"Beste [jouw naam],
We hebben een nieuwe inlogpoging op je account opgemerkt.
Als dit jij was, kun je deze e-mail negeren.
Als dit niet jij was, log dan in op onze officiële website (niet via deze e-mail) om je wachtwoord te veranderen."

## Oefening: Spot de phishing!

Kun je zien welke van deze e-mails phishing is?

1. Een e-mail van je bank met een link om je wachtwoord te veranderen
2. Een e-mail van een onbekende afzender die zegt dat je een prijs hebt gewonnen
3. Een e-mail van je school met huiswerkopdrachten

## Onthoud!
Als een e-mail verdacht voelt, is het waarschijnlijk phishing. Vertrouw op je gevoel en wees voorzichtig!
    `,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 11
  },
  {
    id: 12,
    title: "Sterke wachtwoorden maken",
    description: "Leer hoe je sterke, veilige wachtwoorden maakt en beheert.",
    author: "Team Cyberbrein",
    duration: "8 minuten",
    difficulty: "Beginner",
    videoUrl: "",
    relatedLinks: [
      { title: "Wachtwoord generator", url: "https://www.lastpass.com/features/password-generator" },
      { title: "Wachtwoord tips", url: "https://www.howtogeek.com/195430/how-to-create-a-strong-password-and-remember-it/" }
    ],
    content: `
# Sterke wachtwoorden: Je digitale sleutel

## Wat maakt een wachtwoord sterk?

Een sterk wachtwoord is als een moeilijk te kraken code. Het heeft:

1. **Lengte** - Minimaal 12 tekens
2. **Variatie** - Hoofdletters, kleine letters, cijfers en symbolen
3. **Uniekheid** - Gebruik nooit hetzelfde wachtwoord twee keer

## Hoe maak je een sterk wachtwoord?

### Methode 1: De zin-methode
1. Kies een zin die je makkelijk kunt onthouden
2. Neem de eerste letter van elk woord
3. Voeg cijfers en symbolen toe

Voorbeeld:
- Zin: "Mijn hond Max is 3 jaar oud en woont in Amsterdam!"
- Wachtwoord: "MhMi3jaewiA!"

### Methode 2: Het wachtwoordwiel
1. Kies 4 willekeurige woorden
2. Voeg cijfers en symbolen toe
3. Mix hoofdletters en kleine letters

Voorbeeld:
- "Appel@Boom3Kast#Deur"

## Wat moet je NIET doen?

❌ Gebruik geen:
- Geboortedata
- Huisdiernamen
- "wachtwoord123"
- "qwerty"
- "123456"

## Wachtwoord beheer

### 1. Wachtwoordmanager
- Slaat al je wachtwoorden veilig op
- Je hoeft alleen één hoofdwachtwoord te onthouden
- Voorbeelden: LastPass, 1Password, Bitwarden

### 2. Twee-factor authenticatie
- Voegt een extra beveiligingslaag toe
- Zelfs met je wachtwoord kan niemand inloggen

## Oefening: Maak je eigen wachtwoord

1. Kies een methode (zin of wiel)
2. Maak een sterk wachtwoord
3. Test het op een wachtwoordsterkte-meter

## Onthoud!
Je wachtwoord is als de sleutel van je huis - maak het sterk en bewaar het goed!
    `,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 12
  },
  {
    id: 13,
    title: "HTTPS en veilige verbindingen",
    description: "Leer over HTTPS en hoe je kunt zien of een website veilig is.",
    author: "Team Cyberbrein",
    duration: "6 minuten",
    difficulty: "Beginner",
    videoUrl: "",
    relatedLinks: [
      { title: "HTTPS uitgelegd", url: "https://www.cloudflare.com/learning/ssl/what-is-https/" },
      { title: "Website veiligheid check", url: "https://transparencyreport.google.com/https/overview" }
    ],
    content: `
# HTTPS: De veilige weg op internet

## Wat is HTTPS?

HTTPS is als een beveiligde tunnel voor je gegevens op internet. De 'S' staat voor 'Secure' (veilig).

## Hoe herken je een veilige website?

### 1. Het slotje
- Groen slotje in de adresbalk
- Betekent dat de verbinding versleuteld is

### 2. De URL
- Begint met "https://"
- Niet "http://" (zonder 's')

### 3. Het certificaat
- Klik op het slotje om het certificaat te zien
- Controleer of het certificaat geldig is

## Waarom is HTTPS belangrijk?

1. **Privacy** - Je gegevens zijn versleuteld
2. **Veiligheid** - Mensen kunnen niet meelezen
3. **Vertrouwen** - Je weet dat de website echt is

## Wat gebeurt er zonder HTTPS?

- Je gegevens zijn zichtbaar voor anderen
- Hackers kunnen je gegevens stelen
- Je kunt niet zeker zijn of de website echt is

## Oefening: Check de veiligheid

1. Bezoek verschillende websites
2. Controleer of ze HTTPS gebruiken
3. Kijk naar het slotje en certificaat

## Tips voor veilig surfen

1. Gebruik altijd HTTPS voor:
   - Online winkelen
   - Internetbankieren
   - Inloggen op accounts

2. Let op waarschuwingen:
   - Rode slotjes
   - Waarschuwingen van je browser
   - "Niet veilig" meldingen

## Onthoud!
HTTPS is als een veilige tunnel - het beschermt je gegevens terwijl ze over internet reizen!
    `,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 13
  },
  {
    id: 14,
    title: "Cyberaanvallen begrijpen",
    description: "Leer over verschillende soorten cyberaanvallen en hoe je je ertegen kunt beschermen.",
    author: "Team Cyberbrein",
    duration: "8 minuten",
    difficulty: "Intermediate",
    videoUrl: "",
    relatedLinks: [
      { title: "Cyberaanvallen voorbeelden", url: "https://www.csoonline.com/article/2120387/what-is-a-cyber-attack.html" },
      { title: "Cybersecurity tips", url: "https://www.cisa.gov/stopthinkconnect" }
    ],
    content: `
# Cyberaanvallen: De digitale bedreigingen

## Wat is een cyberaanval?

Een cyberaanval is als een digitale inbraak. Hackers proberen:
- In je computer te komen
- Je gegevens te stelen
- Schade aan te richten

## Soorten cyberaanvallen

### 1. Malware
- Kwaadaardige software
- Kan je computer overnemen
- Voorbeelden: virussen, ransomware

### 2. Phishing
- Valse e-mails of websites
- Probeert je gegevens te stelen
- Ziet er vaak echt uit

### 3. DDoS-aanvallen
- Overlaadt websites met verkeer
- Maakt websites onbereikbaar
- Als een verkeersopstopping

## Hoe bescherm je jezelf?

### 1. Software updates
- Installeer altijd updates
- Ze bevatten beveiligingspatches
- Maak je computer sterker

### 2. Antivirus software
- Scant op malware
- Blokkeert verdachte bestanden
- Waarschuwt voor gevaar

### 3. Firewall
- Als een digitale muur
- Blokkeert ongewenst verkeer
- Beschermt je netwerk

## Wat te doen bij een aanval?

1. **Blijf kalm**
2. **Verbind los**
3. **Vertel het een volwassene**
4. **Verander wachtwoorden**
5. **Scan je computer**

## Oefening: Spot de aanval

Kun je zien welke van deze situaties een cyberaanval is?

1. Een pop-up die zegt dat je computer is geïnfecteerd
2. Een e-mail van je bank met een link
3. Je computer wordt plotseling heel langzaam

## Onthoud!
Cyberaanvallen zijn overal, maar met de juiste bescherming kun je ze weerstaan!
    `,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 14
  },
  {
    id: 15,
    title: "Digitale voetafdruk",
    description: "Leer over je digitale voetafdruk en hoe je deze kunt beheren.",
    author: "Team Cyberbrein",
    duration: "7 minuten",
    difficulty: "Beginner",
    videoUrl: "",
    relatedLinks: [
      { title: "Digitale voetafdruk calculator", url: "https://www.footprintcalculator.org/" },
      { title: "Privacy tips", url: "https://www.digitalfootprintcalculator.com/" }
    ],
    content: `
# Digitale voetafdruk: Je online sporen

## Wat is een digitale voetafdruk?

Je digitale voetafdruk zijn alle sporen die je achterlaat op internet:
- Websites die je bezoekt
- Berichten die je verstuurt
- Foto's die je deelt
- Zoekopdrachten die je doet

## Soorten digitale voetafdrukken

### 1. Actieve voetafdruk
- Dingen die je bewust deelt
- Social media posts
- Reacties op websites

### 2. Passieve voetafdruk
- Sporen die je onbewust achterlaat
- Cookies
- Locatiegegevens

## Waarom is het belangrijk?

1. **Privacy** - Je gegevens zijn waardevol
2. **Reputatie** - Toekomstige werkgevers kunnen het zien
3. **Veiligheid** - Hackers kunnen het gebruiken

## Hoe beheer je je voetafdruk?

### 1. Social media
- Denk na voor je iets deelt
- Gebruik privacy-instellingen
- Verwijder oude posts

### 2. Browsing
- Gebruik privé modus
- Wis cookies regelmatig
- Gebruik een VPN

### 3. Apps
- Controleer permissies
- Verwijder apps die je niet gebruikt
- Update privacy-instellingen

## Oefening: Check je voetafdruk

1. Google je eigen naam
2. Bekijk je social media profielen
3. Controleer welke apps toegang hebben tot je gegevens

## Tips voor een kleine voetafdruk

1. **Denk na voor je deelt**
2. **Gebruik sterke privacy-instellingen**
3. **Wis regelmatig je geschiedenis**
4. **Update je apps en software**

## Onthoud!
Je digitale voetafdruk is als voetstappen in het zand - ze blijven lang zichtbaar, dus wees voorzichtig waar je loopt!
    `,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 15
  },
  {
    id: 16,
    title: "Privacy rechten en AVG",
    description: "Leer over je privacy rechten en de Algemene Verordening Gegevensbescherming (AVG).",
    author: "Team Cyberbrein",
    duration: "8 minuten",
    difficulty: "Intermediate",
    videoUrl: "",
    relatedLinks: [
      { title: "AVG voor kinderen", url: "https://www.privacy.nl/avg/" },
      { title: "Privacy rechten", url: "https://www.autoriteitpersoonsgegevens.nl/nl/onderwerpen/avg-nieuwe-europese-privacywetgeving" }
    ],
    content: `
# Privacy rechten en de AVG

## Wat is de AVG?

De Algemene Verordening Gegevensbescherming (AVG) is een wet die:
- Je privacy beschermt
- Regelt hoe bedrijven met je gegevens om moeten gaan
- Je rechten geeft over je eigen gegevens

## Je privacy rechten

### 1. Recht op informatie
- Bedrijven moeten duidelijk vertellen wat ze met je gegevens doen
- Ze moeten uitleggen waarom ze je gegevens nodig hebben

### 2. Recht op inzage
- Je mag vragen welke gegevens een bedrijf over je heeft
- Je mag een kopie van je gegevens opvragen

### 3. Recht op correctie
- Je mag foute gegevens laten verbeteren
- Je mag onvolledige gegevens aanvullen

### 4. Recht op verwijdering
- Je mag vragen om je gegevens te verwijderen
- Dit heet ook wel het "recht om vergeten te worden"

## Wat zijn persoonsgegevens?

Persoonsgegevens zijn alle gegevens die over jou gaan:
- Naam en adres
- E-mailadres
- Telefoonnummer
- Foto's
- Schoolgegevens

## Hoe beschermt de AVG je?

1. **Toestemming**
   - Bedrijven moeten toestemming vragen
   - Je mag altijd "nee" zeggen
   - Toestemming moet vrijwillig zijn

2. **Beveiliging**
   - Gegevens moeten veilig worden opgeslagen
   - Alleen bevoegde mensen mogen erbij
   - Er moeten goede beveiligingsmaatregelen zijn

3. **Transparantie**
   - Bedrijven moeten duidelijk zijn
   - Ze moeten uitleggen wat ze doen
   - Je mag vragen stellen

## Oefening: Check je rechten

1. Vraag bij een website welke gegevens ze over je hebben
2. Controleer of je toestemming hebt gegeven
3. Oefen je recht op verwijdering

## Onthoud!
De AVG geeft je macht over je eigen gegevens - gebruik je rechten!
    `,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 16
  },
  {
    id: 17,
    title: "Datalekken begrijpen",
    description: "Leer wat datalekken zijn en wat je moet doen als je gegevens zijn gelekt.",
    author: "Team Cyberbrein",
    duration: "7 minuten",
    difficulty: "Intermediate",
    videoUrl: "",
    relatedLinks: [
      { title: "Datalek melden", url: "https://www.autoriteitpersoonsgegevens.nl/nl/onderwerpen/datalekken" },
      { title: "Datalek check", url: "https://haveibeenpwned.com/" }
    ],
    content: `
# Datalekken: Als je gegevens op straat komen te liggen

## Wat is een datalek?

Een datalek is als je gegevens per ongeluk op straat komen te liggen:
- Hackers stelen gegevens
- Een bedrijf verliest gegevens
- Gegevens komen in verkeerde handen

## Soorten datalekken

### 1. Hacking
- Hackers breken in bij bedrijven
- Stelen klantgegevens
- Verkopen gegevens op het dark web

### 2. Verlies
- Verloren laptops of telefoons
- Verkeerd verzonden e-mails
- Onveilige opslag

### 3. Interne fouten
- Medewerkers die per ongeluk gegevens delen
- Slechte beveiliging
- Verouderde systemen

## Wat te doen bij een datalek?

### 1. Als je een melding krijgt
- Verander direct je wachtwoord
- Controleer je accounts
- Zet twee-factor authenticatie aan

### 2. Als je vermoedt dat je gegevens gelekt zijn
- Check haveibeenpwned.com
- Controleer je bankrekening
- Let op verdachte activiteit

### 3. Preventie
- Gebruik sterke wachtwoorden
- Gebruik twee-factor authenticatie
- Wees voorzichtig met wat je deelt

## Oefening: Check je accounts

1. Ga naar haveibeenpwned.com
2. Voer je e-mailadres in
3. Check of je gegevens gelekt zijn

## Tips voor bescherming

1. **Gebruik unieke wachtwoorden**
2. **Zet waarschuwingen aan**
3. **Controleer regelmatig je accounts**
4. **Wees voorzichtig met wat je deelt**

## Onthoud!
Datalekken gebeuren, maar je kunt jezelf beschermen door voorzichtig te zijn met je gegevens!
    `,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 17
  },
  {
    id: 18,
    title: "Geotagging en locatie privacy",
    description: "Leer over geotagging en hoe je je locatie privacy kunt beschermen.",
    author: "Team Cyberbrein",
    duration: "6 minuten",
    difficulty: "Beginner",
    videoUrl: "",
    relatedLinks: [
      { title: "Locatie privacy tips", url: "https://www.consumer.ftc.gov/articles/how-protect-your-privacy-when-using-mobile-apps" },
      { title: "Geotagging uitleg", url: "https://www.lifewire.com/what-is-geotagging-3486025" }
    ],
    content: `
# Geotagging: Je locatie delen

## Wat is geotagging?

Geotagging is als een digitale postzegel die vertelt waar je bent:
- Foto's met locatie
- Social media posts met plaats
- Apps die je locatie bijhouden

## Waarom is het belangrijk?

1. **Privacy** - Niet iedereen hoeft te weten waar je bent
2. **Veiligheid** - Locatiegegevens kunnen misbruikt worden
3. **Controle** - Jij bepaalt wie je locatie mag zien

## Hoe werkt geotagging?

### 1. In foto's
- Je telefoon slaat locatie op in foto's
- Social media kunnen deze gegevens tonen
- Anderen kunnen zien waar de foto is gemaakt

### 2. In apps
- Apps vragen om locatietoegang
- Ze kunnen je bewegingen volgen
- Ze gebruiken je locatie voor advertenties

## Hoe bescherm je je locatie?

### 1. Foto's
- Zet locatie uit bij het maken van foto's
- Verwijder locatiegegevens voor het delen
- Controleer privacy-instellingen

### 2. Apps
- Geef alleen noodzakelijke apps toegang
- Controleer regelmatig app-permissies
- Gebruik locatie alleen als nodig

### 3. Social media
- Deel niet altijd je locatie
- Gebruik privacy-instellingen
- Denk na voor je checkt in

## Oefening: Check je instellingen

1. Ga naar je telefooninstellingen
2. Controleer welke apps locatie mogen gebruiken
3. Zet onnodige toegang uit

## Tips voor veilig gebruik

1. **Wees selectief** - Deel alleen wat nodig is
2. **Controleer regelmatig** - Check je instellingen
3. **Gebruik privacy-instellingen** - Beperk wie het kan zien
4. **Denk na voor je deelt** - Is het echt nodig?

## Onthoud!
Je locatie is persoonlijk - deel het alleen met mensen die je vertrouwt!
    `,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 18
  },
  {
    id: 19,
    title: "App permissies en privacy",
    description: "Leer over app permissies en hoe je je privacy kunt beschermen.",
    author: "Team Cyberbrein",
    duration: "7 minuten",
    difficulty: "Beginner",
    videoUrl: "",
    relatedLinks: [
      { title: "App permissies uitleg", url: "https://www.consumer.ftc.gov/articles/how-protect-your-privacy-when-using-mobile-apps" },
      { title: "Privacy tips", url: "https://www.privacyrights.org/consumer-guides/online-privacy-using-internet-safely" }
    ],
    content: `
# App permissies: Wat apps van je willen

## Wat zijn app permissies?

App permissies zijn als toestemmingen die apps vragen:
- Toegang tot je camera
- Toegang tot je locatie
- Toegang tot je contacten

## Waarom vragen apps permissies?

### Noodzakelijke permissies
- Camera voor foto's maken
- Microfoon voor spraakberichten
- Locatie voor navigatie

### Onnodige permissies
- Contacten voor een rekenmachine
- Camera voor een notitie-app
- Locatie voor een puzzelspel

## Hoe bescherm je je privacy?

### 1. Controleer permissies
- Lees wat de app vraagt
- Vraag je af of het nodig is
- Weiger onnodige permissies

### 2. Update regelmatig
- Apps worden veiliger
- Nieuwe privacy-instellingen
- Beveiligingsupdates

### 3. Gebruik privacy-instellingen
- Beperk toegang waar mogelijk
- Gebruik alleen wat nodig is
- Controleer regelmatig

## Oefening: Check je apps

1. Ga naar je telefooninstellingen
2. Bekijk welke permissies je apps hebben
3. Zet onnodige permissies uit

## Tips voor veilig gebruik

1. **Wees kritisch** - Vraag je af of het nodig is
2. **Update regelmatig** - Houd je apps up-to-date
3. **Controleer reviews** - Lees wat anderen zeggen
4. **Gebruik betrouwbare bronnen** - Download alleen van officiële stores

## Onthoud!
Jij bepaalt wat apps van je mogen - wees voorzichtig met wat je toestaat!
    `,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 19
  },
  {
    id: 20,
    title: "Incognito modus en privacy",
    description: "Leer over incognito modus en hoe je privé kunt browsen.",
    author: "Team Cyberbrein",
    duration: "6 minuten",
    difficulty: "Beginner",
    videoUrl: "",
    relatedLinks: [
      { title: "Privé browsen uitleg", url: "https://www.howtogeek.com/117776/htg-explains-how-private-browsing-works-and-why-it-doesnt-offer-complete-privacy/" },
      { title: "Privacy tips", url: "https://www.privacyrights.org/consumer-guides/online-privacy-using-internet-safely" }
    ],
    content: `
# Incognito modus: Privé browsen

## Wat is incognito modus?

Incognito modus is als een geheime tunnel voor je browser:
- Je browsegeschiedenis wordt niet opgeslagen
- Cookies worden verwijderd na het sluiten
- Je bent niet volledig anoniem

## Wat doet incognito modus wel?

1. **Verwijdert geschiedenis** - Na het sluiten
2. **Verwijdert cookies** - Na het sluiten
3. **Verwijdert formuliergegevens** - Na het sluiten

## Wat doet incognito modus niet?

1. **Maakt je niet anoniem** - Je internetprovider kan je nog steeds zien
2. **Beschermt niet tegen virussen** - Je kunt nog steeds malware krijgen
3. **Verbergt je niet voor websites** - Websites kunnen je nog steeds zien

## Wanneer gebruik je incognito modus?

### Goede momenten
- Op een gedeelde computer
- Voor gevoelige zoekopdrachten
- Bij het inloggen op meerdere accounts

### Slechte momenten
- Voor illegaal gebruik
- Om virussen te vermijden
- Om volledig anoniem te zijn

## Hoe gebruik je het?

### Chrome
1. Klik op de drie puntjes
2. Kies "Nieuw incognitovenster"
3. Of gebruik Ctrl+Shift+N

### Firefox
1. Klik op het menu
2. Kies "Nieuw privévenster"
3. Of gebruik Ctrl+Shift+P

## Oefening: Probeer het uit

1. Open een incognito venster
2. Bezoek enkele websites
3. Sluit het venster
4. Controleer je geschiedenis

## Tips voor veilig gebruik

1. **Combineer met andere tools** - VPN, antivirus
2. **Wees voorzichtig** - Je bent niet volledig anoniem
3. **Gebruik het slim** - Alleen wanneer nodig
4. **Onthoud de beperkingen** - Het is geen magische oplossing

## Onthoud!
Incognito modus is handig, maar maakt je niet onzichtbaar - gebruik het verstandig!
    `,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 20
  },
  {
    id: 21,
    title: "Social media privacy",
    description: "Leer hoe je je privacy kunt beschermen op sociale media.",
    author: "Team Cyberbrein",
    duration: "8 minuten",
    difficulty: "Beginner",
    videoUrl: "",
    relatedLinks: [
      { title: "Social media privacy tips", url: "https://www.consumer.ftc.gov/articles/how-protect-your-privacy-social-media" },
      { title: "Privacy instellingen", url: "https://www.staysafeonline.org/stay-safe-online/securing-key-accounts-devices/social-media-privacy/" }
    ],
    content: `
# Social media privacy: Wat je wel en niet moet delen

## Wat is social media privacy?

Social media privacy gaat over:
- Wat je deelt
- Met wie je het deelt
- Hoe je het deelt

## Wat moet je NIET delen?

### Persoonlijke informatie
- Je volledige adres
- Je telefoonnummer
- Je geboortedatum
- Je schooladres

### Privé momenten
- Wanneer je op vakantie gaat
- Waar je precies bent
- Met wie je bent
- Wat je doet

## Hoe bescherm je je privacy?

### 1. Privacy-instellingen
- Maak je profiel privé
- Beperk wie je posts kan zien
- Controleer regelmatig je instellingen

### 2. Wat je deelt
- Denk na voor je iets deelt
- Deel niet te veel persoonlijks
- Wees voorzichtig met foto's

### 3. Met wie je deelt
- Accepteer alleen bekende vrienden
- Wees voorzichtig met vreemden
- Gebruik groepen slim

## Oefening: Check je profiel

1. Bekijk je social media profielen
2. Controleer je privacy-instellingen
3. Verwijder onnodige informatie

## Tips voor veilig gebruik

1. **Denk na voor je deelt**
2. **Gebruik sterke privacy-instellingen**
3. **Accepteer alleen bekende vrienden**
4. **Controleer regelmatig je instellingen**

## Onthoud!
Wat je op social media deelt, kan voor altijd zichtbaar blijven - wees voorzichtig!
    `,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 21
  }
];

// Functies voor het beheren van lessen
export function getAllLessons() {
  return [...encryptionLessons].sort((a, b) => a.order - b.order);
}

export function getLessonById(id) {
  return encryptionLessons.find(lesson => lesson.id === parseInt(id));
}

export function addLesson(lessonData) {
  const newId = encryptionLessons.length > 0 
    ? Math.max(...encryptionLessons.map(lesson => lesson.id)) + 1
    : 1;
  
  const newOrder = encryptionLessons.length > 0
    ? Math.max(...encryptionLessons.map(lesson => lesson.order)) + 1
    : 1;

  const newLesson = {
    id: newId,
    title: lessonData.title,
    description: lessonData.description || "",
    author: lessonData.author || "Team Cyberbrein",
    duration: lessonData.duration || "",
    difficulty: lessonData.difficulty || "Beginner",
    videoUrl: lessonData.videoUrl || "",
    relatedLinks: lessonData.relatedLinks || [],
    content: lessonData.content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: newOrder
  };

  encryptionLessons.push(newLesson);
  return newLesson;
}

export function updateLesson(id, lessonData) {
  const index = encryptionLessons.findIndex(lesson => lesson.id === parseInt(id));
  if (index === -1) return null;

  const updatedLesson = {
    ...encryptionLessons[index],
    ...lessonData,
    updatedAt: new Date().toISOString()
  };

  encryptionLessons[index] = updatedLesson;
  return updatedLesson;
}

export function deleteLesson(id) {
  const index = encryptionLessons.findIndex(lesson => lesson.id === parseInt(id));
  if (index === -1) return false;
  
  encryptionLessons.splice(index, 1);
  return true;
}

export function reorderLessons(newOrder) {
  // newOrder is een array van { id, order } objecten
  newOrder.forEach(item => {
    const lesson = encryptionLessons.find(l => l.id === parseInt(item.id));
    if (lesson) {
      lesson.order = item.order;
    }
  });
} 