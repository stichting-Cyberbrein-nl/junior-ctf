// Verschillende quizcategorieën die in de applicatie kunnen worden gebruikt
export const quizzes = [
  {
    id: "cybersecurity",
    title: "Cybersecurity Quiz",
    description: "Test je kennis over digitale veiligheid en bescherming tegen online bedreigingen.",
    image: "🔒", // Emoji als placeholder, kan later een echte afbeelding zijn
    color: "blue",
    difficulty: "gemiddeld",
    totalQuestions: 10,
    passingScore: 7,
    flagName: "FLAG_QUIZ",
    flagValue: "FLAG_QUIZ{crypto_knowledge_master}",
    questions: [
      {
        id: 1,
        question: "Wat is encryptie?",
        options: [
          "Een type computervirus",
          "Het proces om gegevens te versleutelen zodat alleen bevoegde personen ze kunnen lezen",
          "Een programmeerprotocol",
          "Een type internetverbinding"
        ],
        correctAnswer: 1, // 0-gebaseerde index
        explanation: "Encryptie is het proces waarbij leesbare gegevens worden omgezet in een gecodeerde vorm, zodat alleen mensen met de juiste sleutel deze kunnen lezen."
      },
      {
        id: 2,
        question: "Welke van de volgende is een voorbeeld van een Caesar Cipher?",
        options: [
          "ABC → 123",
          "ABC → QWE",
          "ABC → DEF",
          "ABC → CBA"
        ],
        correctAnswer: 2,
        explanation: "De Caesar Cipher verschuift elke letter in het alfabet een vast aantal posities. ABC → DEF is een voorbeeld van een verschuiving van 3 posities."
      },
      {
        id: 3,
        question: "Wat is het doel van een wachtwoord?",
        options: [
          "Om je gebruikersnaam te onthouden",
          "Om toegang te verlenen tot je account",
          "Om je identiteit te verifiëren en alleen jou toegang te geven",
          "Om je e-mail te verzenden"
        ],
        correctAnswer: 2,
        explanation: "Wachtwoorden dienen om je identiteit te verifiëren en ervoor te zorgen dat alleen jij toegang hebt tot je accounts en gegevens."
      },
      {
        id: 4,
        question: "Wat is 'phishing'?",
        options: [
          "Een hackertechniek om wachtwoorden te kraken",
          "Een poging om gevoelige informatie te stelen door zich voor te doen als een betrouwbare entiteit",
          "Een methode om sterke wachtwoorden te maken",
          "Een type encryptie"
        ],
        correctAnswer: 1,
        explanation: "Phishing is een vorm van social engineering waarbij aanvallers zich voordoen als betrouwbare entiteiten om persoonlijke gegevens zoals wachtwoorden of creditcardnummers te stelen."
      },
      {
        id: 5,
        question: "Wat betekent 'https://' in een webadres?",
        options: [
          "High Transfer Protocol System",
          "Hypertext Transfer Protocol Secure - de verbinding is beveiligd met encryptie",
          "Host Transfer Protocol Standard",
          "Het betekent niets speciaals"
        ],
        correctAnswer: 1,
        explanation: "HTTPS staat voor Hypertext Transfer Protocol Secure. Het geeft aan dat de verbinding tussen jouw browser en de website is versleuteld voor veiligheid."
      },
      {
        id: 6,
        question: "Welke van de volgende is het sterkste wachtwoord?",
        options: [
          "123456",
          "wachtwoord",
          "Mijn$H0nd8IsL1ef!",
          "geboortedatum"
        ],
        correctAnswer: 2,
        explanation: "Een sterk wachtwoord bevat een mix van hoofdletters, kleine letters, cijfers en speciale tekens. Het derde wachtwoord voldoet hier het beste aan."
      },
      {
        id: 7,
        question: "Wat is een 'cyberaanval'?",
        options: [
          "Een computerspel",
          "Een poging om toegang te krijgen tot, schade toe te brengen aan of informatie te stelen uit een computersysteem",
          "Een soort antivirusprogramma",
          "Een internetverbinding"
        ],
        correctAnswer: 1,
        explanation: "Een cyberaanval is een kwaadaardige poging om toegang te krijgen tot computersystemen, netwerken of gegevens om schade aan te richten of informatie te stelen."
      },
      {
        id: 8,
        question: "Wat is een &apos;flag&apos; in een cybersecurity-context?",
        options: [
          "Een land van herkomst",
          "Een type virus",
          "Een geheime tekst of code die je vindt als bewijs dat je een uitdaging hebt voltooid",
          "Een type firewall"
        ],
        correctAnswer: 2,
        explanation: "In cybersecurity-wedstrijden en CTF (Capture The Flag) spellen zijn flags geheime codes die deelnemers moeten vinden om te bewijzen dat ze een bepaalde uitdaging hebben opgelost."
      },
      {
        id: 9,
        question: "Wat moet je doen als je een verdachte e-mail ontvangt?",
        options: [
          "Op alle links klikken om te zien wat er gebeurt",
          "Je wachtwoord direct veranderen en in de e-mail invoeren",
          "De bijlagen downloaden om te zien wat erin zit",
          "De e-mail niet openen, verwijderen of rapporteren als spam"
        ],
        correctAnswer: 3,
        explanation: "Bij verdachte e-mails is het beste om ze niet te openen, direct te verwijderen, en ze te rapporteren als spam of phishing. Klik nooit op links of download bijlagen uit verdachte e-mails."
      },
      {
        id: 10,
        question: "Wat is 'twee-factor authenticatie'?",
        options: [
          "Twee verschillende wachtwoorden gebruiken",
          "Een extra beveiligingslaag die naast je wachtwoord nog een verificatiemethode vereist",
          "Twee keer inloggen op hetzelfde account",
          "Een type encryptie"
        ],
        correctAnswer: 1,
        explanation: "Twee-factor authenticatie (2FA) voegt een extra beveiligingslaag toe aan het inlogproces. Naast iets wat je weet (wachtwoord), heb je ook iets wat je bezit (zoals een telefoon) nodig om in te loggen."
      }
    ]
  },
  {
    id: "encryptie",
    title: "Encryptie Kennis",
    description: "Test je kennis over verschillende encryptiemethoden en coderingen.",
    image: "🔐", // Emoji als placeholder
    color: "green",
    difficulty: "gemiddeld",
    totalQuestions: 10,
    passingScore: 7,
    flagName: "FLAG_ENCRYPTION_QUIZ",
    flagValue: "FLAG_ENCRYPTION_QUIZ{code_master_level_1}",
    questions: [
      {
        id: 1,
        question: "Wat is een Caesar Cipher?",
        options: [
          "Een geheimschrift waarbij elke letter wordt vervangen door een symbool",
          "Een encryptiemethode waarbij elke letter een vast aantal posities in het alfabet wordt verschoven",
          "Een computeralgortime ontwikkeld door Julius Caesar",
          "Een antiek apparaat om geheime berichten te versturen"
        ],
        correctAnswer: 1,
        explanation: "De Caesar Cipher, vernoemd naar Julius Caesar, is een simpele substitutie-encryptie waarbij elke letter in het originele bericht wordt vervangen door een letter die een vast aantal posities verder in het alfabet staat."
      },
      {
        id: 2,
        question: "Wat is een 'sleutel' in encryptie?",
        options: [
          "Een wachtwoord om je computer te ontgrendelen",
          "Een fysiek apparaat dat je nodig hebt voor encryptie",
          "Een stukje informatie dat bepaalt hoe de encryptie en decryptie plaatsvindt",
          "Een back-up van je gecodeerde berichten"
        ],
        correctAnswer: 2,
        explanation: "In cryptografie is een sleutel een stuk informatie dat bepaalt hoe een algoritme een bericht versleutelt of ontcijfert. Zonder de juiste sleutel is het zeer moeilijk of onmogelijk om de oorspronkelijke gegevens te herstellen."
      },
      {
        id: 3,
        question: "Wat is de Enigma machine?",
        options: [
          "Een moderne smartphone-app voor encryptie",
          "Een encryptie-apparaat gebruikt door Nazi-Duitsland tijdens de Tweede Wereldoorlog",
          "Een computervirus dat gegevens versleutelt",
          "Een hedendaags algoritme voor veilige communicatie"
        ],
        correctAnswer: 1,
        explanation: "De Enigma machine was een encryptie-apparaat dat uitgebreid werd gebruikt door Nazi-Duitsland tijdens de Tweede Wereldoorlog. Het breken van de Enigma-code door de geallieerden (met hulp van Alan Turing) was een belangrijke factor in de afloop van de oorlog."
      },
      {
        id: 4,
        question: "Wat is het verschil tussen symmetrische en asymmetrische encryptie?",
        options: [
          "Symmetrische encryptie is sterker dan asymmetrische encryptie",
          "Symmetrische encryptie gebruikt verschillende sleutels voor versleuteling en ontsleuteling, asymmetrische gebruikt dezelfde sleutel",
          "Asymmetrische encryptie gebruikt een private en public key, symmetrische gebruikt dezelfde sleutel voor versleutelen en ontsleutelen",
          "Er is geen verschil, het zijn verschillende namen voor hetzelfde proces"
        ],
        correctAnswer: 2,
        explanation: "Bij symmetrische encryptie wordt dezelfde sleutel gebruikt voor zowel versleutelen als ontsleutelen. Bij asymmetrische encryptie worden verschillende sleutels gebruikt: een publieke sleutel voor versleutelen en een private sleutel voor ontsleutelen (of vice versa)."
      },
      {
        id: 5,
        question: "Wat is een hash-functie?",
        options: [
          "Een functie die data comprimeert om ruimte te besparen",
          "Een functie die wachtwoorden opslaat op een veilige manier",
          "Een functie die data van elke grootte omzet in een vaste-lengte-output",
          "Een functie die encryptie ongedaan maakt"
        ],
        correctAnswer: 2,
        explanation: "Een hash-functie is een wiskundig algoritme dat gegevens van willekeurige grootte neemt en deze omzet in een vastgestelde lengte output (de 'hash'). Een goede hash-functie is moeilijk om terug te rekenen en kleine veranderingen in input leiden tot grote veranderingen in output."
      },
      {
        id: 6,
        question: "Wat is 'end-to-end encryptie'?",
        options: [
          "Encryptie die alleen de uiteinden van een bericht versleutelt",
          "Encryptie waarbij alleen de verzender en ontvanger het bericht kunnen ontcijferen",
          "Encryptie die elk onderdeel van een bericht apart versleutelt",
          "Encryptie die automatisch aflloopt (eindigt) na een bepaalde tijd"
        ],
        correctAnswer: 1,
        explanation: "End-to-end encryptie is een communicatiesysteem waarbij alleen de communicerende gebruikers de berichten kunnen lezen. Tussenliggende partijen (zoals servers) hebben geen toegang tot de ontcijferde berichten."
      },
      {
        id: 7,
        question: "Welke van de volgende is een voorbeeld van een steganografietechniek?",
        options: [
          "Het verzenden van berichten in Morsecode",
          "Het versleutelen van gegevens met een wachtwoord",
          "Het verbergen van een bericht in een afbeelding",
          "Het gebruik van een geheime taal die alleen ingewijden kennen"
        ],
        correctAnswer: 2,
        explanation: "Steganografie is de praktijk van het verbergen van informatie binnen andere niet-geheime gegevens of media. Een voorbeeld is het verbergen van een geheim bericht in een digitale afbeelding door kleine wijzigingen in de pixelwaarden die nauwelijks zichtbaar zijn."
      },
      {
        id: 8,
        question: "Wat is een 'bruteforce-aanval' in de context van cryptografie?",
        options: [
          "Een aanval waarbij fysieke kracht wordt gebruikt om versleutelde hardware te openen",
          "Een aanval die gebruik maakt van een krachtig computervirus",
          "Een aanval waarbij alle mogelijke sleutels worden geprobeerd tot de juiste wordt gevonden",
          "Een aanval die de firewall van een computer omzeilt"
        ],
        correctAnswer: 2,
        explanation: "Een bruteforce-aanval is een cryptografische hackmethode waarbij alle mogelijke sleutels of wachtwoorden systematisch worden geprobeerd totdat de juiste combinatie wordt gevonden. Het is een simpele maar tijdrovende aanpak, vooral bij lange sleutels."
      },
      {
        id: 9,
        question: "Wat is een 'one-time pad'?",
        options: [
          "Een schrijfblok dat zichzelf vernietigt na gebruik",
          "Een encryptiemethode waarbij elke sleutel maar één keer wordt gebruikt",
          "Een computerbestand dat na één keer openen wordt verwijderd",
          "Een wachtwoord dat automatisch verandert na elke login"
        ],
        correctAnswer: 1,
        explanation: "Een one-time pad is een encryptiemethode waarbij een willekeurige sleutel van dezelfde lengte als het bericht wordt gebruikt, en elke sleutel slechts één keer wordt gebruikt. Als het correct wordt toegepast, is het theoretisch onbreekbaar."
      },
      {
        id: 10,
        question: "Welke van de volgende is GEEN voorbeeld van een encryptiemethode?",
        options: [
          "RSA",
          "AES",
          "HTML",
          "Blowfish"
        ],
        correctAnswer: 2,
        explanation: "HTML (HyperText Markup Language) is geen encryptiemethode maar een opmaaktaal voor webpagina's. RSA, AES en Blowfish zijn allemaal bekende encryptie-algoritmen gebruikt voor het beveiligen van gegevens."
      }
    ]
  },
  {
    id: "internetveiligheid",
    title: "Internet Veiligheid",
    description: "Leer hoe je veilig op internet kunt surfen en welke gevaren je moet vermijden.",
    image: "🌐", // Emoji als placeholder
    color: "red",
    difficulty: "beginners",
    totalQuestions: 8,
    passingScore: 6,
    flagName: "FLAG_INTERNET_SAFETY",
    flagValue: "FLAG_INTERNET_SAFETY{surf_safely_champion}",
    questions: [
      {
        id: 1,
        question: "Wat is een 'cookies' op een website?",
        options: [
          "Virtuele snoepjes die je kunt verzamelen voor bonuspunten",
          "Kleine bestanden die op je computer worden opgeslagen om informatie over je bezoek bij te houden",
          "Pop-up advertenties die je moet accepteren",
          "Virussen die zich verspreiden door websites"
        ],
        correctAnswer: 1,
        explanation: "Cookies zijn kleine tekstbestanden die websites op je computer opslaan om informatie over je te onthouden, zoals je inloggegevens of winkelwagentje-inhoud."
      },
      {
        id: 2,
        question: "Wat is een veilige manier om wachtwoorden te beheren?",
        options: [
          "Schrijf ze allemaal op in een notitieboekje",
          "Gebruik hetzelfde wachtwoord voor alles zodat je het makkelijk kunt onthouden",
          "Gebruik een wachtwoordmanager met een sterk hoofdwachtwoord",
          "Deel je wachtwoorden met een vertrouwde vriend als back-up"
        ],
        correctAnswer: 2,
        explanation: "Een wachtwoordmanager is een veilige oplossing omdat deze al je verschillende, sterke wachtwoorden versleuteld opslaat en je hoeft alleen het hoofdwachtwoord te onthouden."
      },
      {
        id: 3,
        question: "Wat moet je controleren voordat je online iets koopt?",
        options: [
          "Of de website een groen sloticoon heeft (https) in de adresbalk",
          "Of de website een eigen app heeft",
          "Of de website meer dan 10 jaar bestaat",
          "Of de website in het Nederlands is"
        ],
        correctAnswer: 0,
        explanation: "Een beveiligde verbinding (https) beschermt je gegevens tijdens het versturen. Het groene sloticoon geeft aan dat de verbinding veilig is en dat de website legitiem is."
      },
      {
        id: 4,
        question: "Wat is een 'phishing' e-mail?",
        options: [
          "Een e-mail over visserijproducten",
          "Een ongewenste reclame-e-mail",
          "Een e-mail die zich voordoet als legitiem om persoonlijke gegevens te stelen",
          "Een e-mail met een virus in de bijlage"
        ],
        correctAnswer: 2,
        explanation: "Phishing e-mails zijn ontworpen om legitiem te lijken (bijvoorbeeld alsof ze van je bank komen) maar zijn bedoeld om je te misleiden en persoonlijke gegevens te ontfutselen."
      },
      {
        id: 5,
        question: "Wat is een goede manier om je apparaten te beschermen?",
        options: [
          "Nooit updates installeren omdat die je apparaat langzamer maken",
          "Regelmatig software-updates installeren en een antivirusprogramma gebruiken",
          "Je apparaten uitzetten als je ze niet gebruikt",
          "Al je bestanden regelmatig verwijderen"
        ],
        correctAnswer: 1,
        explanation: "Software-updates bevatten vaak belangrijke beveiligingspatches die je beschermen tegen nieuwe bedreigingen. Een antivirusprogramma biedt een extra beveiligingslaag."
      },
      {
        id: 6,
        question: "Wat is een 'sterk wachtwoord'?",
        options: [
          "Een woord dat je makkelijk kunt onthouden, zoals je huisdier of geboortedatum",
          "Een wachtwoord dat je elke dag verandert",
          "Een lange combinatie van letters, cijfers en symbolen die niet makkelijk te raden is",
          "Je eigen naam gespeld met getallen in plaats van letters (bijvoorbeeld M4RT1N)"
        ],
        correctAnswer: 2,
        explanation: "Sterke wachtwoorden zijn lang en bevatten een mix van hoofdletters, kleine letters, cijfers en speciale tekens. Ze moeten moeilijk te raden zijn, zelfs voor mensen die je goed kennen."
      },
      {
        id: 7,
        question: "Wat is 'openbare WiFi'?",
        options: [
          "WiFi die je alleen buiten kunt gebruiken",
          "Gratis internetverbindingen op openbare plaatsen zoals cafés of bibliotheken",
          "Een soort WiFi die extra snel is",
          "Een WiFi-netwerk zonder wachtwoord in je eigen huis"
        ],
        correctAnswer: 1,
        explanation: "Openbare WiFi verwijst naar gratis internetverbindingen die beschikbaar zijn in openbare plaatsen. Deze netwerken zijn vaak niet beveiligd, wat betekent dat je voorzichtig moet zijn met gevoelige activiteiten zoals internetbankieren."
      },
      {
        id: 8,
        question: "Wat moet je NIET doen op sociale media?",
        options: [
          "Foto's delen van leuke momenten",
          "Berichten liken van vrienden",
          "Persoonlijke informatie zoals je volledige adres, telefoonnummer of wanneer je op vakantie gaat delen",
          "Je profiel privé maken zodat alleen vrienden je posts kunnen zien"
        ],
        correctAnswer: 2,
        explanation: "Het delen van te veel persoonlijke informatie op sociale media kan een risico vormen voor je privacy en veiligheid. Criminelen kunnen deze informatie gebruiken voor identiteitsdiefstal of om te weten wanneer je huis leeg staat."
      }
    ]
  },
  {
    id: "persoonlijkeprivacy",
    title: "Persoonlijke Privacy",
    description: "Leer hoe je je persoonlijke gegevens kunt beschermen in het digitale tijdperk.",
    image: "🔍", // Emoji als placeholder
    color: "purple",
    difficulty: "beginners",
    totalQuestions: 10,
    passingScore: 7,
    flagName: "FLAG_PRIVACY_QUIZ",
    flagValue: "FLAG_PRIVACY_QUIZ{privacy_guardian_2023}",
    questions: [
      {
        id: 1,
        question: "Wat is het recht op privacy?",
        options: [
          "Het recht om alles te doen wat je wilt",
          "Het recht om je eigen informatie te delen met iedereen",
          "Het recht om controle te hebben over je persoonlijke informatie en wie daar toegang tot heeft",
          "Het recht om anoniem te blijven op sociale media"
        ],
        correctAnswer: 2,
        explanation: "Het recht op privacy is een fundamenteel mensenrecht dat mensen het recht geeft om controle te hebben over hun persoonlijke informatie, inclusief wie er toegang toe heeft en hoe deze wordt gebruikt."
      },
      {
        id: 2,
        question: "Welke informatie wordt gezien als 'persoonlijke gegevens'?",
        options: [
          "Alleen je naam en adres",
          "Alleen gegevens die online staan",
          "Alleen financiële gegevens zoals bankrekeningnummers",
          "Alle informatie die direct of indirect naar jou kan leiden, zoals naam, foto's, e-mailadres, locatiegegevens, etc."
        ],
        correctAnswer: 3,
        explanation: "Persoonlijke gegevens zijn alle gegevens die direct of indirect naar een persoon kunnen leiden, inclusief naam, contactgegevens, online identificatiegegevens, en zelfs indirecte informatie die samen tot identificatie kan leiden."
      },
      {
        id: 3,
        question: "Wat is de AVG/GDPR?",
        options: [
          "Een antivirusprogramma",
          "Een Europese privacywet die bepaalt hoe bedrijven met persoonsgegevens moeten omgaan",
          "Een app om je privégegevens te beschermen",
          "Een certificaat voor veilige websites"
        ],
        correctAnswer: 1,
        explanation: "De Algemene Verordening Gegevensbescherming (AVG) of General Data Protection Regulation (GDPR) is een Europese wet die regelt hoe organisaties persoonlijke gegevens van EU-burgers moeten verzamelen, verwerken en beschermen."
      },
      {
        id: 4,
        question: "Wat is 'datalek'?",
        options: [
          "Een defecte harde schijf waarvan gegevens verloren gaan",
          "Een incident waarbij persoonsgegevens onbedoeld worden blootgesteld aan onbevoegden",
          "Een proces waarbij bedrijven gegevens uitwisselen",
          "Een methode om gegevens te comprimeren voor opslag"
        ],
        correctAnswer: 1,
        explanation: "Een datalek is een beveiligingsincident waarbij persoonsgegevens onbedoeld of onrechtmatig worden vernietigd, verloren gaan, gewijzigd, of ongeoorloofd toegankelijk worden gemaakt voor derden."
      },
      {
        id: 5,
        question: "Wat is 'digitale voetafdruk'?",
        options: [
          "De grootte van je digitale bestanden op je computer",
          "Een methode om je online identiteit te verbergen",
          "Het totaal van alle sporen die je achterlaat tijdens je online activiteiten",
          "Een speciaal wachtwoord voor je sociale media-accounts"
        ],
        correctAnswer: 2,
        explanation: "Je digitale voetafdruk bestaat uit alle sporen die je online achterlaat, waaronder bezochte websites, social media-activiteiten, online aankopen, en alle andere interacties die gegevens over jou vastleggen."
      },
      {
        id: 6,
        question: "Wat is 'geotagging'?",
        options: [
          "Een nieuwe manier om online te betalen",
          "Het proces waarbij geografische coördinaten worden toegevoegd aan foto's of posts",
          "Een manier om je locatie te verbergen op sociale media",
          "Een nieuwe vorm van online gamen"
        ],
        correctAnswer: 1,
        explanation: "Geotagging is het proces waarbij geografische locatiegegevens (coördinaten) worden toegevoegd aan media zoals foto's of social media posts. Dit kan onbedoeld je exacte locatie onthullen."
      },
      {
        id: 7,
        question: "Wat is het beste om te doen als een app onnodige permissies vraagt?",
        options: [
          "De app toch installeren, alle apps vragen om permissies",
          "De ontwikkelaar mailen om te vragen waarom deze permissies nodig zijn",
          "De app niet installeren of een alternatief zoeken dat minder permissies vraagt",
          "De permissies accepteren maar ze later uitzetten"
        ],
        correctAnswer: 2,
        explanation: "Als een app onnodige permissies vraagt (zoals een rekenmachine-app die toegang wil tot je contacten), is het beter om de app niet te installeren of een alternatief te zoeken. Onnodig toegang geven tot je gegevens verhoogt het risico op privacy-schendingen."
      },
      {
        id: 8,
        question: "Wat is 'incognito-modus' in een webbrowser?",
        options: [
          "Een modus die je volledig anoniem maakt op internet",
          "Een modus die je browsegeschiedenis niet opslaat op je eigen apparaat, maar je activiteiten nog steeds zichtbaar kunnen zijn voor websites en je internetprovider",
          "Een beveiligingsfunctie die voorkomt dat je gehackt wordt",
          "Een modus die alle websites blokkeert die je privégegevens verzamelen"
        ],
        correctAnswer: 1,
        explanation: "Incognito-modus (of privé browsen) verhindert dat je browser lokaal je browsegeschiedenis, cookies en formuliergegevens opslaat. Het maakt je echter niet anoniem op internet; je internetprovider, werkgever of de bezochte websites kunnen nog steeds je activiteiten zien."
      },
      {
        id: 9,
        question: "Wanneer is het delen van persoonlijke informatie op sociale media risicovol?",
        options: [
          "Alleen als je je volledige naam en adres deelt",
          "Alleen als je openbare posts maakt",
          "Het is nooit risicovol als je privacy-instellingen goed zijn ingesteld",
          "Het kan altijd risicovol zijn, zelfs met privacy-instellingen, omdat informatie kan worden gedeeld of gelekt"
        ],
        correctAnswer: 3,
        explanation: "Het delen van persoonlijke informatie op sociale media brengt altijd enig risico met zich mee. Zelfs met sterke privacy-instellingen kunnen je vrienden informatie verder delen, bedrijven kunnen beleid wijzigen, of er kunnen datalekken optreden."
      },
      {
        id: 10,
        question: "Wat is een 'privacy paradox'?",
        options: [
          "Een beveiligingssoftware die privacy garandeert",
          "De tegenstrijdigheid tussen mensen's zorgen over privacy en hun daadwerkelijke online gedrag",
          "Een situatie waarin betere privacy leidt tot minder veiligheid",
          "Een technische fout in privacy-instellingen"
        ],
        correctAnswer: 1,
        explanation: "De privacy paradox verwijst naar de tegenstrijdigheid tussen hoe mensen zeggen bezorgd te zijn over hun privacy, maar toch gedrag vertonen dat die privacy in gevaar brengt, zoals het delen van persoonlijke informatie op sociale media of het accepteren van alle cookies."
      }
    ]
  }
]; 