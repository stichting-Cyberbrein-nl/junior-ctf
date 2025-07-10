# Cyberbrein Game - Codes and Solutions Guide

## Overview

This guide contains all the codes and their solutions used in the Cyberbrein game. The codes are implemented in `src/codes.js` and range from easy to difficult challenges. Each code follows a specific encryption method that players must identify and solve.

## Code Structure

Each code in the game follows this structure:
```javascript
{
    id: Number,
    code: 'Encrypted Text',
    solution: 'Decrypted Text',
    difficulty: 'Level',
    encryption: 'Encryption Method',
    key: 'Optional Key'  // Only for certain encryption methods
}
```

## Code List by Difficulty

### Easy Difficulty

1. **Caesar Cipher (Shift -3)**
   - Code: 'Ebiil Tloia'
   - Solution: 'Hello World'
   - Encryption: Caesar Cipher (Shift -3)
   - Flag: FLAG{Het adminwachtwoord is cyberbrein}

2. **ROT13 Cipher**
   - Code: 'UnpxEvtug'
   - Solution: 'HackRight'
   - Encryption: ROT13 Cipher (Shift +13)

3. **Atbash Cipher**
   - Code: 'ERXGLI TVEVIH'
   - Solution: 'VICTOR GEVERS'
   - Encryption: Atbash Cipher (Reversed Alphabet)

4. **ROT13 Cipher**
   - Code: 'er-O00GPZC'
   - Solution: 're-B00TCMP'
   - Encryption: ROT13 Cipher (Shift +13)

5. **Caesar Cipher (Shift +3)**
   - Code: 'Khoor Zruog'
   - Solution: 'Hello World'
   - Encryption: Caesar Cipher (Shift +3)

### Medium Difficulty

6. **Vigenère Cipher**
   - Code: 'JYDOJJGFPU'
   - Solution: 'HACKSHIELD'
   - Encryption: Vigenère Cipher
   - Key: 'CYBER'

7. **Affine Cipher**
   - Code: 'SYNCPNPCWV'
   - Solution: 'CYBERBREIN'
   - Encryption: Affine Cipher
   - Keys: a=5, b=8

8. **Base64 Encoding**
   - Code: 'RElWRCBBY2FkZW15'
   - Solution: 'DIVD Academy'
   - Encryption: Base64 Encoding

10. **Atbash Cipher**
    - Code: 'WREW rh znzarmt'
    - Solution: 'DIVD is amazing'
    - Encryption: Atbash Cipher (Reversed Alphabet)

### Hard Difficulty

11. **Binary Encoding (ASCII)**
    - Code: '01010110 01101001 01100011 01110100 01101111 01110010'
    - Solution: 'Victor'
    - Encryption: Binary Encoding (ASCII)

12. **Hexadecimal Encoding**
    - Code: '5365637572697479'
    - Solution: 'Security'
    - Encryption: Hexadecimal Encoding

13. **Base64 Encoding**
    - Code: 'Q3liZXJicmVpbg=='
    - Solution: 'Cyberbrein'
    - Encryption: Base64 Encoding

## Encryption Methods Explained

### 1. Caesar Cipher
- **How it works**: Shifts each letter in the alphabet by a fixed number of positions
- **Example**: With shift +3, A→D, B→E, C→F, etc.
- **How to solve**: Try different shifts until readable text appears

### 2. ROT13 Cipher
- **How it works**: Special case of Caesar Cipher with a fixed shift of 13 positions
- **Example**: A→N, B→O, C→P, etc.
- **How to solve**: Shift each letter 13 positions in the alphabet

### 3. Atbash Cipher
- **How it works**: Replaces each letter with its mirror image in the alphabet
- **Example**: A→Z, B→Y, C→X, etc.
- **How to solve**: Replace each letter with the letter at the same distance from the end of the alphabet

### 4. Vigenère Cipher
- **How it works**: Uses a keyword to determine the shift for each letter
- **Example**: With key "KEY", each letter is shifted according to the corresponding key letter
- **How to solve**: Use the key to determine the shift for each letter

### 5. Affine Cipher
- **How it works**: Uses the formula E(x) = (a*x + b) mod 26
- **Example**: With a=5, b=8, each letter is transformed mathematically
- **How to solve**: Use the inverse formula D(y) = a^(-1) * (y - b) mod 26

### 6. Base64 Encoding
- **How it works**: Converts binary data to ASCII text
- **Example**: "Hello" → "SGVsbG8="
- **How to solve**: Use a Base64 decoder tool

### 7. Binary Encoding
- **How it works**: Converts text to binary ASCII values
- **Example**: "A" → "01000001"
- **How to solve**: Convert each 8-bit group to its corresponding ASCII character

### 8. Hexadecimal Encoding
- **How it works**: Converts text to hexadecimal ASCII values
- **Example**: "Hello" → "48656C6C6F"
- **How to solve**: Convert each pair of hex digits to its corresponding ASCII character

## Tips for Solving Codes

1. **Identify the Encryption Method**
   - Look for patterns in the code
   - Check for common cipher characteristics
   - Consider the difficulty level

2. **Use the Right Tools**
   - Online decoders
   - Cipher tables
   - ASCII/Unicode tables

3. **Check for Keys**
   - Some ciphers require keys
   - Keys might be hidden in the challenge
   - Try common keys if none provided

## Additional Resources

- The game includes a `/hint` page with tools to help decode various encryption methods
- Each encryption method has a detailed explanation in the game's lessons
- Practice with the provided examples before attempting the challenges 