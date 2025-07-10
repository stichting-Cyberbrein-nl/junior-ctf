'use client';

import React, { useState } from 'react';
import EncryptionForm from '../hint/components/EncryptionForm';
import OutputDisplay from '../hint/components/OutputDisplay';
import { encryptText, decryptText } from '../hint/utils/cryptoUtils';

export default function HintPopup({ isOpen, onClose }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [method, setMethod] = useState('rot13');
  const [shift, setShift] = useState(3);
  const [encryptionKey, setEncryptionKey] = useState('');
  const [aValue, setAValue] = useState(5);
  const [bValue, setBValue] = useState(8);
  const [action, setAction] = useState('encrypt');

  const processText = () => {
    try {
      let result;
      if (action === 'encrypt') {
        result = encryptText({
          method,
          input,
          shift,
          key: encryptionKey,
          aValue,
          bValue
        });
        
        if (method === 'caesar' && shift === 13) {
          sessionStorage.setItem('flag-hidden', 'oldehove');
          console.log('Flag is now hidden in session.');
        }
      } else {
        result = decryptText({
          method,
          input,
          shift,
          key: encryptionKey,
          aValue,
          bValue
        });
      }
      
      setOutput(result);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Encryptie Tool</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-4">
            <EncryptionForm
              input={input}
              setInput={setInput}
              method={method}
              setMethod={setMethod}
              shift={shift}
              setShift={setShift}
              encryptionKey={encryptionKey}
              setEncryptionKey={setEncryptionKey}
              aValue={aValue}
              setAValue={setAValue}
              bValue={bValue}
              setBValue={setBValue}
              action={action}
              setAction={setAction}
              onSubmit={processText}
            />
            <OutputDisplay output={output} />
          </div>
        </div>
      </div>
    </div>
  );
} 