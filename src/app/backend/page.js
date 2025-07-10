'use client';

import { useState, useEffect } from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Link from 'next/link';
import FlagPopup from '../components/FlagPopup';

export default function AdminDummy() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupTitle, setPopupTitle] = useState('Flag');
  const [flagName, setFlagName] = useState('');
  const [flagValue, setFlagValue] = useState('');
  const [codes, setCodes] = useState([
    { id: 1, name: "Code 1", difficulty: "Makkelijk", encryption: "AES" },
    { id: 2, name: "Code 2", difficulty: "Gemiddeld", encryption: "RSA" },
    { id: 3, name: "Code 3", difficulty: "Moeilijk", encryption: "SHA-256" }
  ]);
  const [newCode, setNewCode] = useState({ name: "", difficulty: "", encryption: "" });

  // Controleer of er al flags gevonden zijn
  const [flag1Found, setFlag1Found] = useState(false);
  const [flag2Found, setFlag2Found] = useState(false);

  useEffect(() => {
    // Controleer sessionStorage voor gevonden flags
    const savedFlags = sessionStorage.getItem('foundFlags');
    if (savedFlags) {
      try {
        const flags = JSON.parse(savedFlags);
        setFlag1Found(flags.some(flag => flag.flagName === 'FLAG_1' && flag.found));
        setFlag2Found(flags.some(flag => flag.flagName === 'FLAG_2' && flag.found));
      } catch (error) {
        console.error('Fout bij het ophalen van flags uit sessionStorage:', error);
      }
    }
  }, []);

  const updateFlagInStorage = (flagName, flagValue) => {
    const savedFlags = sessionStorage.getItem('foundFlags');
    if (savedFlags) {
      try {
        const flags = JSON.parse(savedFlags);
        // Controleer of de flag al gevonden is
        const flagAlreadyFound = flags.some(flag => flag.flagName === flagName && flag.found);
        
        if (flagAlreadyFound) {
          setPopupTitle('Flag al gevonden');
          setPopupMessage(`Je hebt deze flag (${flagName}) al eerder gevonden!`);
          setFlagName('');
          setFlagValue('');
        } else {
          // Update de flag status
          const updatedFlags = flags.map(flag => 
            flag.flagName === flagName ? { ...flag, found: true } : flag
          );
          sessionStorage.setItem('foundFlags', JSON.stringify(updatedFlags));
          
          // Update lokale state
          if (flagName === 'FLAG_1') setFlag1Found(true);
          if (flagName === 'FLAG_2') setFlag2Found(true);
          
          // Toon popup met succes bericht
          setPopupTitle('Je hebt een flag gevonden! 🎉');
          setPopupMessage('');
          setFlagName(flagName);
          setFlagValue(flagValue);
        }
      } catch (error) {
        console.error('Fout bij het updaten van flags in sessionStorage:', error);
      }
    }
  };

  const handleEditClick = (id) => {
    updateFlagInStorage('FLAG_1', 'FLAG_1{social_engineering}');
    setShowPopup(true);
  };

  const handleAddClick = () => {
    updateFlagInStorage('FLAG_2', 'FLAG_2{security_landmark}');
    setShowPopup(true);
  };

  const handleInputChange = (e, field) => {
    setNewCode({ ...newCode, [field]: e.target.value });
  };

  const handleAddNewCode = () => {
    setCodes([...codes, { id: codes.length + 1, ...newCode }]);
    setNewCode({ name: "", difficulty: "", encryption: "" });
    handleAddClick();
  };

  return (
    <div className="min-h-screen p-8 pb-20 flex flex-col items-center font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl sm:text-4xl font-bold mb-8">Admin Paneel</h1>
      
      {/* Terug naar Home link in de linkerbovenhoek */}
      <div className="absolute top-4 left-4">
        <Link href="/" className="text-lg font-medium text-blue-600 hover:text-blue-800 transition-colors flex items-center">
          <span className="mr-1">←</span> Home
        </Link>
      </div>
      
      {/* Administrator links */}
      <div className="mb-8 w-full max-w-4xl flex gap-4 flex-wrap">
        <FlagPopup
          flagName="FLAG_ADMIN"
          flagValue="FLAG_ADMIN{secure_administration}"
          triggerElement="🔑"
          triggerStyle="text-3xl cursor-pointer hover:opacity-75 transition-opacity"
          hideAfterFound={true}
        />
      </div>
      
      <table className="table-auto w-full max-w-4xl border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-4">ID</th>
            <th className="border border-gray-300 p-4">Naam</th>
            <th className="border border-gray-300 p-4">Moeilijkheidsgraad</th>
            <th className="border border-gray-300 p-4">Encryptie</th>
            <th className="border border-gray-300 p-4">Acties</th>
          </tr>
        </thead>
        <tbody>
          {codes.map((item) => (
            <tr key={item.id} className="text-center">
              <td className="border border-gray-300 p-4">{item.id}</td>
              <td className="border border-gray-300 p-4">{item.name}</td>
              <td className="border border-gray-300 p-4">{item.difficulty}</td>
              <td className="border border-gray-300 p-4">{item.encryption}</td>
              <td className="border border-gray-300 p-4">
                <button
                  onClick={() => handleEditClick(item.id)}
                  className={`rounded-full border border-solid transition-colors ${
                    flag1Found 
                      ? "bg-green-500 hover:bg-green-400" 
                      : "bg-blue-500 hover:bg-blue-400"
                  } text-white text-sm sm:text-base h-10 px-4`}
                >
                  {flag1Found ? "Flag gevonden" : "Bewerken"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-8 w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">Nieuwe Code Toevoegen</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Naam"
            value={newCode.name}
            onChange={(e) => handleInputChange(e, "name")}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Moeilijkheidsgraad"
            value={newCode.difficulty}
            onChange={(e) => handleInputChange(e, "difficulty")}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Encryptie"
            value={newCode.encryption}
            onChange={(e) => handleInputChange(e, "encryption")}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleAddNewCode}
            className={`mt-4 rounded-full border border-solid transition-colors ${
              flag2Found 
                ? "bg-green-500 hover:bg-green-400" 
                : "bg-blue-500 hover:bg-blue-400"
            } text-white text-sm sm:text-base h-10 px-4`}
          >
            {flag2Found ? "Flag gevonden" : "Toevoegen"}
          </button>
        </div>
      </div>

      {/* Verbeterde Popup voor de flag */}
      <Popup open={showPopup} onClose={() => setShowPopup(false)} modal>
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">{popupTitle}</h2>
          
          {flagName && flagValue ? (
            <>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="font-mono text-lg break-all">{flagValue}</p>
              </div>
              <p className="mb-4">
                Deze flag is automatisch toegevoegd aan je verzameling. Ga naar de{' '}
                <Link href="/flags" className="text-blue-600 hover:underline">
                  flags pagina
                </Link>{' '}
                om je voortgang te bekijken.
              </p>
            </>
          ) : (
            <p className="text-lg mb-4">{popupMessage}</p>
          )}
          
          <button
            onClick={() => setShowPopup(false)}
            className="w-full p-3 mt-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition duration-200 ease-in-out"
          >
            Sluiten
          </button>
        </div>
      </Popup>
    </div>
  );
}
