'use client';

const CodeInput = ({ currentCode, input, setInput, handleSubmit, result, showHint, setShowHint }) => {
  return (
    <div className="w-full md:w-2/3 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg md:ml-6 border border-gray-200 dark:border-gray-700">
      {currentCode && (
        <>
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">Ontcijfer deze code:</p>
          <p className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">{currentCode.code}</p>

          {/* Hint-knop */}
          <button
            onClick={() => setShowHint(true)}
            className="w-full mb-4 p-3 bg-yellow-500 hover:bg-yellow-400 dark:bg-yellow-600 dark:hover:bg-yellow-500 text-white rounded-lg transition-colors"
          >
            Toon hint
          </button>

          {/* Hint voor het encryptiemodel, alleen zichtbaar na klikken */}
          {showHint && (
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Hint: Deze code is versleuteld met het{' '}
              model.
            </p>
          )}

          <input
            type="text"
            className="w-full p-3 mb-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
            placeholder="Voer je ontcijferde oplossing in"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="w-full mt-4 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 transition-colors"
          >
            Controleer Oplossing
          </button>

          {result && (
            <div
              className={`mt-4 p-4 rounded-lg ${
                result.startsWith('✅') 
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' 
                  : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
              }`}
            >
              {result}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CodeInput;
