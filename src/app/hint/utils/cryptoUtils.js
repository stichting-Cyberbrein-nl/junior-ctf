import CryptoJS from 'crypto-js';

/**
 * Encrypt text using various methods
 * @param {Object} params - Parameters for encryption
 * @returns {string} - Encrypted text
 */
export const encryptText = ({ method, input, shift = 3, key = '', aValue = 5, bValue = 8 }) => {
  if (!input) return '';
  
  switch (method) {
    case 'rot13':
      return rot13(input);
    case 'caesar':
      return caesarCipher(input, shift);
    case 'base64':
      return base64Encode(input);
    case 'atbash':
      return atbashCipher(input);
    case 'vigenere':
      return vigenereCipher(input, key || 'key');
    case 'hex':
      return hexEncode(input);
    case 'md5':
      return md5Hash(input);
    case 'rot47':
      return rot47(input);
    case 'affine':
      return affineCipher(input, aValue, bValue);
    case 'transposition':
      return transpositionCipher(input, key || 'key');
    case 'binary':
      return binaryEncode(input);
    case 'des':
      return desEncrypt(input, key || '12345678');
    case 'aes':
      return aesEncrypt(input, key || 'cyberbrein2021');
    default:
      return 'Selecteer een versleutelingsmethode';
  }
};

/**
 * Decrypt text using various methods
 * @param {Object} params - Parameters for decryption
 * @returns {string} - Decrypted text
 */
export const decryptText = ({ method, input, shift = 3, key = '', aValue = 5, bValue = 8 }) => {
  if (!input) return '';
  
  switch (method) {
    case 'rot13':
      return rot13(input); // ROT13 is its own inverse
    case 'caesar':
      return caesarCipher(input, -shift);
    case 'base64':
      return base64Decode(input);
    case 'atbash':
      return atbashCipher(input); // Atbash is its own inverse
    case 'vigenere':
      return vigenereDecipher(input, key || 'key');
    case 'hex':
      return hexDecode(input);
    case 'md5':
      return 'MD5 kan niet worden teruggedraaid.';
    case 'rot47':
      return rot47(input); // ROT47 is its own inverse
    case 'affine':
      return affineDecipher(input, aValue, bValue);
    case 'transposition':
      return transpositionDecipher(input, key || 'key');
    case 'binary':
      return binaryDecode(input);
    case 'des':
      return desDecrypt(input, key || '12345678');
    case 'aes':
      return aesDecrypt(input, key || 'cyberbrein2021');
    default:
      return 'Selecteer een decodering methode';
  }
};

// ROT13 Cipher
export const rot13 = (text) => {
  return text.replace(/[a-zA-Z]/g, (char) => {
    const base = char <= 'Z' ? 65 : 97;
    return String.fromCharCode(
      base + ((char.charCodeAt(0) - base + 13) % 26)
    );
  });
};

// Caesar Cipher
export const caesarCipher = (text, shift) => {
  return text.replace(/[a-zA-Z]/g, (char) => {
    const base = char <= 'Z' ? 65 : 97;
    return String.fromCharCode(
      base + ((char.charCodeAt(0) - base + shift + 26) % 26)
    );
  });
};

// Base64 Encode/Decode
export const base64Encode = (text) => btoa(text);
export const base64Decode = (text) => {
  try {
    return atob(text);
  } catch (e) {
    return 'Ongeldige Base64 input';
  }
};

// ROT47 Cipher
export const rot47 = (text) => {
  return text.replace(/[!-~]/g, (char) => {
    return String.fromCharCode(
      33 + ((char.charCodeAt(0) - 33 + 47) % 94)
    );
  });
};

// Atbash Cipher
export const atbashCipher = (text) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const reverseAlphabet = 'ZYXWVUTSRQPONMLKJIHGFEDCBAzyxwvutsrqponmlkjihgfedcba';
  return text.replace(/[a-zA-Z]/g, (char) =>
    reverseAlphabet[alphabet.indexOf(char)]
  );
};

// MD5 Hash
export const md5Hash = (text) => {
  return CryptoJS.MD5(text).toString();
};

// Hexadecimal Encode/Decode
export const hexEncode = (text) => {
  return text
    .split('')
    .map((char) => char.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('');
};

export const hexDecode = (hex) => {
  try {
    return hex
      .match(/.{1,2}/g)
      .map((byte) => String.fromCharCode(parseInt(byte, 16)))
      .join('');
  } catch (e) {
    return 'Ongeldige hexadecimale input';
  }
};

// Vigenère Cipher
export const vigenereCipher = (text, key) => {
  let result = '';
  key = key.toLowerCase().replace(/[^a-z]/g, '');
  if (!key) key = 'key'; // Default key if none provided
  
  let keyIndex = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char.match(/[a-zA-Z]/)) {
      const base = char <= 'Z' ? 65 : 97;
      const shift = key[keyIndex % key.length].charCodeAt(0) - 97;
      result += String.fromCharCode(
        base + ((char.charCodeAt(0) - base + shift) % 26)
      );
      keyIndex++;
    } else {
      result += char;
    }
  }
  return result;
};

export const vigenereDecipher = (text, key) => {
  let result = '';
  key = key.toLowerCase().replace(/[^a-z]/g, '');
  if (!key) key = 'key'; // Default key if none provided
  
  let keyIndex = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char.match(/[a-zA-Z]/)) {
      const base = char <= 'Z' ? 65 : 97;
      const shift = key[keyIndex % key.length].charCodeAt(0) - 97;
      result += String.fromCharCode(
        base + ((char.charCodeAt(0) - base - shift + 26) % 26)
      );
      keyIndex++;
    } else {
      result += char;
    }
  }
  return result;
};

// Affine Cipher
export const affineCipher = (text, a, b) => {
  const m = 26; // Length of the alphabet
  const aInv = modInverse(a, m); // Multiplicative inverse of a modulo m
  if (aInv === null) {
    return 'Invalid "a" value; it must be coprime with 26.';
  }
  return text.replace(/[a-zA-Z]/g, (char) => {
    const base = char <= 'Z' ? 65 : 97;
    const x = char.charCodeAt(0) - base;
    const y = (a * x + b) % m;
    return String.fromCharCode(base + y);
  });
};

export const affineDecipher = (text, a, b) => {
  const m = 26; // Length of the alphabet
  const aInv = modInverse(a, m); // Multiplicative inverse of a modulo m
  if (aInv === null) {
    return 'Invalid "a" value; it must be coprime with 26.';
  }
  return text.replace(/[a-zA-Z]/g, (char) => {
    const base = char <= 'Z' ? 65 : 97;
    const y = char.charCodeAt(0) - base;
    const x = (aInv * (y - b + m)) % m;
    return String.fromCharCode(base + x);
  });
};

// Helper function to find the modular inverse
export const modInverse = (a, m) => {
  a = ((a % m) + m) % m;
  for (let x = 1; x < m; x++) {
    if (((a * x) % m) === 1) {
      return x;
    }
  }
  return null; // No inverse exists
};

// Transposition Cipher (Simple Columnar Transposition)
export const transpositionCipher = (text, key) => {
  if (!key) key = 'key'; // Default key if none provided
  const numColumns = key.length;
  const numRows = Math.ceil(text.length / numColumns);
  const matrix = Array.from({ length: numRows }, () =>
    Array(numColumns).fill('')
  );

  let index = 0;
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numColumns; col++) {
      if (index < text.length) {
        matrix[row][col] = text[index];
        index++;
      }
    }
  }

  // Sort the columns based on the key
  const sortedKey = key.split('').map((char, idx) => ({ char, idx }));
  sortedKey.sort((a, b) => a.char.charCodeAt(0) - b.char.charCodeAt(0));

  let result = '';
  for (const { idx } of sortedKey) {
    for (let row = 0; row < numRows; row++) {
      result += matrix[row][idx] || '';
    }
  }
  return result;
};

export const transpositionDecipher = (text, key) => {
  if (!key) key = 'key'; // Default key if none provided
  const numColumns = key.length;
  const numRows = Math.ceil(text.length / numColumns);
  const totalCells = numColumns * numRows;
  const numShadedBoxes = totalCells - text.length;

  // Sort the key
  const sortedKey = key.split('').map((char, idx) => ({ char, idx }));
  sortedKey.sort((a, b) => a.char.charCodeAt(0) - b.char.charCodeAt(0));

  const columns = Array(numColumns).fill('');
  let index = 0;
  for (const { idx } of sortedKey) {
    const colLength = numRows - (idx >= numColumns - numShadedBoxes ? 1 : 0);
    columns[idx] = text.slice(index, index + colLength);
    index += colLength;
  }

  let result = '';
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numColumns; col++) {
      if (row < columns[col].length) {
        result += columns[col][row] || '';
      }
    }
  }
  return result;
};

// Binary Encode/Decode (ASCII)
export const binaryEncode = (text) => {
  return text
    .split('')
    .map((char) =>
      char.charCodeAt(0).toString(2).padStart(8, '0')
    )
    .join(' ');
};

export const binaryDecode = (binary) => {
  try {
    return binary
      .split(' ')
      .map((byte) => String.fromCharCode(parseInt(byte, 2)))
      .join('');
  } catch (e) {
    return 'Ongeldige binaire input';
  }
};

// DES Encryption/Decryption
export const desEncrypt = (text, key) => {
  if (!key || key.length < 8) key = '12345678'; // Default key if none or too short
  try {
    return CryptoJS.DES.encrypt(text, CryptoJS.enc.Utf8.parse(key), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }).ciphertext.toString(CryptoJS.enc.Hex);
  } catch (e) {
    return 'DES encryptie fout: ' + e.message;
  }
};

export const desDecrypt = (cipherHex, key) => {
  if (!key || key.length < 8) key = '12345678'; // Default key if none or too short
  try {
    const cipherParams = CryptoJS.enc.Hex.parse(cipherHex);
    const decrypted = CryptoJS.DES.decrypt(
      { ciphertext: cipherParams },
      CryptoJS.enc.Utf8.parse(key),
      {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (e) {
    return 'DES decryptie fout: mogelijk ongeldige input of sleutel';
  }
};

// AES Encryption/Decryption
export const aesEncrypt = (text, key) => {
  if (!key) key = 'cyberbrein2021'; // Default key if none provided
  try {
    return CryptoJS.AES.encrypt(text, key).toString();
  } catch (e) {
    return 'AES encryptie fout: ' + e.message;
  }
};

export const aesDecrypt = (cipherText, key) => {
  if (!key) key = 'cyberbrein2021'; // Default key if none provided
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (e) {
    return 'AES decryptie fout: mogelijk ongeldige input of sleutel';
  }
}; 