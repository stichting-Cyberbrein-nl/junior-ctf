'use client';

const EncryptionInfo = ({ selectedEncryption }) => {
  return (
    selectedEncryption && (
      <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{selectedEncryption.name}</h3>
        <p className="text-gray-700 dark:text-gray-300 mt-2">{selectedEncryption.description}</p>
      </div>
    )
  );
};

export default EncryptionInfo;
