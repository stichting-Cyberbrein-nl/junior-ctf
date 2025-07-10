'use client';

import React from 'react';

/**
 * Component for selecting the encryption/decryption method
 */
export default function MethodSelect({ value, onChange }) {
  // Define all available encryption methods
  const methods = [
    { value: 'rot13', label: 'ROT13' },
    { value: 'caesar', label: 'Caesar Cipher' },
    { value: 'base64', label: 'Base64 Encode/Decode' },
    { value: 'atbash', label: 'Atbash Cipher' },
    { value: 'vigenere', label: 'Vigenère Cipher' },
    { value: 'hex', label: 'Hex Encode/Decode' },
    { value: 'md5', label: 'MD5 Hash' },
    { value: 'rot47', label: 'ROT47' },
    { value: 'affine', label: 'Affine Cipher' },
    { value: 'transposition', label: 'Transposition Cipher' },
    { value: 'binary', label: 'Binary Encode/Decode' },
    { value: 'des', label: 'DES Encryption/Decryption' },
    { value: 'aes', label: 'AES Encryption/Decryption' }
  ];

  return (
    <div className="mb-4">
      <label className="block text-gray-700 dark:text-gray-300 mb-2">
        Kies een methode:
      </label>
      <select
        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {methods.map(method => (
          <option key={method.value} value={method.value}>
            {method.label}
          </option>
        ))}
      </select>
    </div>
  );
} 