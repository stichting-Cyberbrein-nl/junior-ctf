'use client';

import React from 'react';

/**
 * Component for Caesar cipher shift input
 */
export default function CaesarShiftInput({ shift, setShift }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 dark:text-gray-300 mb-2">
        Verschuiving voor Caesar Cipher:
      </label>
      <input
        type="number"
        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        value={shift}
        onChange={(e) => setShift(Number(e.target.value))}
        placeholder="Verschuiving (bijv. 3)"
        min="1"
        max="25"
      />
    </div>
  );
} 