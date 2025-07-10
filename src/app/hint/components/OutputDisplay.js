'use client';

import React from 'react';

/**
 * Component to display encryption/decryption output
 */
export default function OutputDisplay({ output }) {
  return (
    <div className="mt-4">
      <label className="block text-gray-700 dark:text-gray-300 mb-2">Uitvoer:</label>
      <textarea
        readOnly
        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        value={output}
        rows="4"
        placeholder="De uitvoer verschijnt hier..."
      ></textarea>
    </div>
  );
} 