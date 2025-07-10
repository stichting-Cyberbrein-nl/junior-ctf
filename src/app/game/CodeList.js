'use client';

const CodeList = ({ codes, solvedCodes, handleSelectCode }) => {
  return (
    <div className="w-full md:w-1/3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-4 md:mb-0 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Beschikbare Codes</h2>
      {/* Voeg een vaste hoogte toe en maak de lijst scrollbaar */}
      <div className="overflow-y-auto h-96"> {/* Stel hier een vaste hoogte in en maak scrollbaar */}
        {codes.length > 0 ? (
          <ul className="list-none">
            {codes.map((code, index) => (
              <li
                key={code.id}
                className={`mb-2 p-3 cursor-pointer ${
                  solvedCodes.includes(code.id) 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                } rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors`}
                onClick={() => handleSelectCode(code)}
              >
                {index + 1}. {code.code} {solvedCodes.includes(code.id) && '✅'}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">Geen codes beschikbaar</p>
        )}
      </div>
    </div>
  );
};

export default CodeList;
