'use client';

import React from 'react';

/**
 * Component for Affine cipher parameters (a and b values)
 */
export default function AffineInputs({ aValue, setAValue, bValue, setBValue }) {
  return (
    <>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          Waarde van a (moet relatief priem zijn met 26):
        </label>
        <input
          type="number"
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          value={aValue}
          onChange={(e) => setAValue(Number(e.target.value))}
          placeholder="Waarde van a (bijv. 5)"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Geldige waarden zijn 1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25
        </p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          Waarde van b:
        </label>
        <input
          type="number"
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          value={bValue}
          onChange={(e) => setBValue(Number(e.target.value))}
          placeholder="Waarde van b (bijv. 8)"
          min="0"
          max="25"
        />
      </div>
    </>
  );
} 