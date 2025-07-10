import { useState } from 'react';

export default function WalkthroughPopup({ onClose }) {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        {
            title: "Welkom bij Cyberbrein!",
            content: "Laten we samen ontdekken hoe je verstopte geheimen (flags) kunt vinden!",
            image: "🎮"
        },
        {
            title: "Verstopte Geheimen",
            content: "Overal op de website zijn geheimen verstopt! Kijk bijvoorbeeld naar de ster (⭐) op de homepage. Maar er zijn nog veel meer geheimen te ontdekken!",
            image: "⭐"
        },
        {
            title: "Waar vind je Geheimen?",
            content: "Je kunt geheimen vinden door spellen te spelen, lessen te volgen, quizzen te maken, of door goed te zoeken op de website. Soms moet je iets speciaals doen om ze te vinden!",
            image: "🔍"
        },
        {
            title: "Geheimen Verzamelen",
            content: "Als je een geheim vindt, kun je het invoeren op de 'Flags' pagina. Hoe meer geheimen je vindt, hoe meer je leert over veilig internetten!",
            image: "🏆"
        },
        {
            title: "Tips & Hints",
            content: "Klik op sterretjes en andere speciale symbolen voor hints. Soms moet je goed zoeken, spellen spelen, of lessen volgen om een geheim te vinden!",
            image: "💡"
        },
        {
            title: "Veel Succes!",
            content: "Je bent nu klaar om te beginnen! Klik op 'Start Avontuur' om je zoektocht naar verstopte geheimen te beginnen.",
            image: "🚀"
        }
    ];

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onClose();
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
                <div className="text-center mb-6">
                    <span className="text-4xl mb-4 block">{steps[currentStep].image}</span>
                    <h2 className="text-2xl font-bold text-gray-800">{steps[currentStep].title}</h2>
                </div>

                <p className="text-gray-600 mb-8 text-center">
                    {steps[currentStep].content}
                </p>

                <div className="flex justify-between items-center">
                    <button
                        onClick={handlePrevious}
                        disabled={currentStep === 0}
                        className={`px-4 py-2 rounded-md ${
                            currentStep === 0
                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                    >
                        Vorige
                    </button>

                    <div className="flex space-x-2">
                        {steps.map((_, index) => (
                            <div
                                key={index}
                                className={`w-2 h-2 rounded-full ${
                                    index === currentStep ? 'bg-blue-500' : 'bg-gray-300'
                                }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        {currentStep === steps.length - 1 ? 'Start Avontuur' : 'Volgende'}
                    </button>
                </div>
            </div>
        </div>
    );
} 