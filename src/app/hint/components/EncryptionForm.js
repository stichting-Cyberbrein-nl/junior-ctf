'use client';

import React from 'react';
import MethodSelect from './form/MethodSelect';
import ActionSelect from './form/ActionSelect';
import TextInput from './form/TextInput';
import SubmitButton from './form/SubmitButton';
import CaesarShiftInput from './form/CaesarShiftInput';
import KeyInput from './form/KeyInput';
import AffineInputs from './form/AffineInputs';

/**
 * EncryptionForm component that provides inputs for encryption/decryption methods
 */
export default function EncryptionForm({
  input,
  setInput,
  method,
  setMethod,
  shift,
  setShift,
  encryptionKey,
  setEncryptionKey,
  aValue,
  setAValue,
  bValue,
  setBValue,
  action,
  setAction,
  onSubmit
}) {
  // Handle input submission (prevents form refresh)
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  // Render method-specific inputs based on selected method
  const renderMethodSpecificInputs = () => {
    switch (method) {
      case 'caesar':
        return (
          <CaesarShiftInput 
            shift={shift} 
            setShift={setShift} 
          />
        );
      case 'vigenere':
      case 'transposition':
      case 'des':
      case 'aes':
        return (
          <KeyInput 
            method={method} 
            keyValue={encryptionKey} 
            setKeyValue={setEncryptionKey} 
          />
        );
      case 'affine':
        return (
          <AffineInputs 
            aValue={aValue} 
            setAValue={setAValue} 
            bValue={bValue} 
            setBValue={setBValue} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput 
        value={input} 
        onChange={setInput} 
        label="Voer de tekst in:" 
        placeholder="Voer hier je tekst in" 
      />
      
      <MethodSelect 
        value={method} 
        onChange={setMethod} 
      />
      
      <ActionSelect 
        value={action} 
        onChange={setAction} 
      />
      
      {renderMethodSpecificInputs()}
      
      <SubmitButton action={action} />
    </form>
  );
} 