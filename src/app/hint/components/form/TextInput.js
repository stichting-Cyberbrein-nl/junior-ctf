'use client';

import React from 'react';

/**
 * Reusable text input component
 */
export default function TextInput({ value, onChange, label, placeholder }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 dark:text-gray-300 mb-2">{label}</label>
      <input
        type="text"
        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
} 