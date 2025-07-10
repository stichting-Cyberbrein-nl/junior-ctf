'use client';

import React from 'react';

/**
 * Component for the form submit button
 */
export default function SubmitButton({ action }) {
  return (
    <button
      type="submit"
      className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus:ring-blue-400"
    >
      {action === 'encrypt' ? 'Versleutelen' : 'Decoderen'}
    </button>
  );
} 