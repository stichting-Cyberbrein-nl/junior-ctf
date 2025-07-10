'use client';

const EncryptionList = ({ encryptions, handleShowEncryptionInfo }) => {
  return (
    <ul className="flex flex-wrap">
      {encryptions.map((encryption) => (
        <li
          key={encryption.id}
          className="mr-4 mb-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 cursor-pointer rounded-lg hover:bg-green-200 dark:hover:bg-green-800/40 transition-colors shadow-sm"
          onClick={() => {
            console.log('Ga naar /hint voor handige tools');
            handleShowEncryptionInfo(encryption);
          }}
        >
          {encryption.name}
        </li>
      ))}
    </ul>
  );
};

export default EncryptionList;