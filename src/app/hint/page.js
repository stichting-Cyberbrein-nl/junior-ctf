'use client';

import { useState } from 'react';
import Link from 'next/link';
import FlagPopup from '../components/FlagPopup';
import EncryptionForm from './components/EncryptionForm';
import OutputDisplay from './components/OutputDisplay';
import { encryptText, decryptText } from './utils/cryptoUtils';

export default function HintPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [method, setMethod] = useState('rot13');
  const [shift, setShift] = useState(3);
  const [key, setKey] = useState('');
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
          key,
          aValue,
          bValue
        });
        
        // Special case for Caesar cipher with shift 13
        if (method === 'caesar' && shift === 13) {
          sessionStorage.setItem('flag-hidden', 'oldehove');
          console.log('Flag is now hidden in session.');
        }
      } else {
        result = decryptText({
          method,
          input,
          shift,
          key,
          aValue,
          bValue
        });
      }
      
      setOutput(result);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-6 md:p-8 pb-20 flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">Encryptie Helper</h1>
      
      {/* Home link in top-left corner */}
      <div className="absolute top-4 left-4">
        <Link href="/" className="text-lg font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors flex items-center">
          <span className="mr-1">←</span> Home
        </Link>
      </div>
      
      {/* Hidden flag in key emoji */}
      <div className="absolute top-4 right-12">
        <FlagPopup
          flagName="FLAG_5"
          flagValue="FLAG_5{cryptosleutel}"
          triggerElement="🔑"
          triggerStyle="text-3xl cursor-pointer hover:opacity-75 transition-opacity"
          hideAfterFound={true}
        />
      </div>

      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <EncryptionForm
          input={input}
          setInput={setInput}
          method={method}
          setMethod={setMethod}
          shift={shift}
          setShift={setShift}
          key={key}
          setKey={setKey}
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
  );
}
