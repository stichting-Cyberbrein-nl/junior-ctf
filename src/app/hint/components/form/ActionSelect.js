'use client';

import React from 'react';

/**
 * Component for selecting encrypt or decrypt action
 */
export default function ActionSelect({ value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 dark:text-gray-300 mb-2">
        Actie:
      </label>
      <select
        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="encrypt">Versleutelen</option>
        <option value="decrypt">Decoderen</option>
      </select>
    </div>
  );
} 