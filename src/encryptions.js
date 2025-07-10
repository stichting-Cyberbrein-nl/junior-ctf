export const encryptions = [
  {
    id: 1,
    name: 'Caesar Cipher',
    description: 'De Caesar-codering is een van de eenvoudigste en bekendste coderingen. Het is een verschuivingscodering waarbij elke letter in de tekst wordt verschoven met een vast aantal posities in het alfabet. Bijvoorbeeld, met een verschuiving van +3 wordt "ABC" gecodeerd als "DEF". Om het toe te passen, vervang je elke letter door de letter die een bepaald aantal posities verderop staat in het alfabet.'
  },
  {
    id: 2,
    name: 'ROT13 Cipher',
    description: 'De ROT13-codering is een speciale vorm van de Caesar-codering met een vaste verschuiving van 13 posities. Het roteert elke letter in het alfabet met 13 plaatsen. Hetzelfde algoritme wordt gebruikt voor zowel coderen als decoderen. Bijvoorbeeld, "HELLO" wordt "URYYB".'
  },
  {
    id: 3,
    name: 'Atbash Cipher',
    description: 'De Atbash-codering is een simpele substitutiecodering waarbij het alfabet wordt omgekeerd. De eerste letter wordt vervangen door de laatste, de tweede door de een-na-laatste, enzovoort. Bijvoorbeeld, "ABC" wordt "ZYX". Om het toe te passen, vervang je elke letter door zijn spiegelbeeld in het alfabet.'
  },
  {
    id: 4,
    name: 'Vigenère Cipher',
    description: 'De Vigenère-codering is een polyalfabetische substitutiecodering die een sleutelwoord gebruikt om de verschuiving voor elke letter te bepalen. Elke letter in de tekst wordt verschoven op basis van de corresponderende letter in het sleutelwoord. Bijvoorbeeld, met de sleutel "KEY" wordt "HELLO" gecodeerd als "RIJVS". Om het toe te passen, herhaal je het sleutelwoord over de lengte van de tekst en verschuif je elke letter overeenkomstig.'
  },
  {
    id: 5,
    name: 'Affine Cipher',
    description: 'De Affine-codering is een substitutiecodering die elke letter transformeert met de formule E(x) = (a * x + b) mod 26, waarbij "a" en "b" sleutels zijn en "x" de numerieke positie van de letter. Bijvoorbeeld, met a=5 en b=8, wordt "HELLO" gecodeerd als "MSSHQ". Om het toe te passen, converteer je letters naar nummers, pas je de formule toe en zet je het resultaat terug om in letters.'
  },
  {
    id: 6,
    name: 'Base64 Encoding',
    description: 'Base64-encoding converteert binaire gegevens naar een ASCII-tekenreeks met behulp van 64 ASCII-tekens. Bijvoorbeeld, "Hello World" wordt gecodeerd als "SGVsbG8gV29ybGQ=". Om het toe te passen, encodeer je de binaire gegevens in groepen van 6 bits en map je deze naar de Base64-karakters.'
  },
  {
    id: 7,
    name: 'Transposition Cipher',
    description: 'Een transpositiecodering herschikt de letters van de originele tekst volgens een bepaald systeem of sleutel. De letters blijven hetzelfde, maar hun volgorde verandert. Bijvoorbeeld, met de sleutel "HACK" kan "HELLO" worden herschikt tot "EHLOL". Om het toe te passen, schrijf je de tekst in een matrix op basis van de sleutel en lees je deze kolom voor kolom uit volgens de sleutelvolgorde.'
  },
  {
    id: 8,
    name: 'Binary Encoding (ASCII)',
    description: 'Bij binaire codering wordt elk karakter omgezet in zijn binaire ASCII-representatie. Bijvoorbeeld, "A" wordt "01000001". Om het toe te passen, converteer je elke letter naar zijn ASCII-code en vervolgens naar binaire vorm.'
  },
  {
    id: 9,
    name: 'Hexadecimal Encoding',
    description: 'Hexadecimale codering converteert tekens naar hun hexadecimale ASCII-waarde. Bijvoorbeeld, "Hello" wordt "48656C6C6F". Om het toe te passen, converteer je elke letter naar zijn ASCII-code en vervolgens naar hexadecimale vorm.'
  },
  {
    id: 10,
    name: 'DES Encryption',
    description: 'DES (Data Encryption Standard) is een symmetrisch blokcijfer dat gegevens in blokken van 64 bits versleutelt met een 56-bits sleutel. Om het toe te passen, gebruik je een cryptografiebibliotheek met de juiste sleutel. Bijvoorbeeld, met de sleutel "12345678" wordt "HELLO" versleuteld tot een onleesbare ciphertext die alleen met dezelfde sleutel kan worden ontsleuteld.'
  },
  {
    id: 11,
    name: 'AES Encryption',
    description: 'AES (Advanced Encryption Standard) is een sterk symmetrisch blokcijfer dat gegevens versleutelt met sleutels van 128, 192 of 256 bits. Om het toe te passen, gebruik je een cryptografiebibliotheek en een geheime sleutel, zoals "cyberbrein2021". Bijvoorbeeld, "HELLO" wordt versleuteld tot een beveiligde ciphertext.',
    FLAG_2: 'FLAG{het adminpanel vind je op /backend}'
  },
  {
    id: 12,
    name: "Konami Code",
    description: "Niet echt een encryptie, maar een beroemde cheat code uit de gaming wereld: ↑↑↓↓←→←→BA. Deze code werd oorspronkelijk gebruikt in Konami videogames uit de jaren '80 om extra levens of speciale functies te ontgrendelen. De volledige code is: omhoog, omhoog, omlaag, omlaag, links, rechts, links, rechts, B, A. Deze encoding is een cultureel fenomeen geworden in de gamewereld."
  }
];

export default encryptions;
