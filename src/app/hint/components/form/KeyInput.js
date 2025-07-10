'use client';

import React from 'react';

/**
 * Component for key input in various encryption methods
 */
export default function KeyInput({ method, keyValue, setKeyValue }) {
  // Get the appropriate label based on the method
  const getKeyLabel = () => {
    switch (method) {
      case 'des':
        return 'DES';
      case 'aes':
        return 'AES';
      case 'vigenere':
        return 'Vigenère';
      case 'transposition':
        return 'Transposition';
      default:
        return '';
    }
  };
  
  // Get placeholder text based on method
  const getPlaceholder = () => {
    switch (method) {
      case 'des':
        return 'Minimaal 8 tekens (standaard: 12345678)';
      case 'aes':
        return 'Voer de AES sleutel in (standaard: cyberbrein2021)';
      case 'vigenere':
        return 'Gebruik alleen letters (standaard: key)';
      case 'transposition':
        return 'Voer de transposition sleutel in (standaard: key)';
      default:
        return 'Voer de sleutel in';
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 dark:text-gray-300 mb-2">
        Sleutel voor {getKeyLabel()} Cipher:
      </label>
      <input
        type="text"
        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        value={keyValue}
        onChange={(e) => setKeyValue(e.target.value)}
        placeholder={getPlaceholder()}
      />
    </div>
  );
} 