
import React, { useState, useEffect, useCallback } from 'react';

interface ApiKeySelectorProps {
    onKeySelected: () => void;
}

export const ApiKeySelector: React.FC<ApiKeySelectorProps> = ({ onKeySelected }) => {
    const [checking, setChecking] = useState(true);

    const checkApiKey = useCallback(async () => {
        setChecking(true);
        if (window.aistudio && await window.aistudio.hasSelectedApiKey()) {
            onKeySelected();
        }
        setChecking(false);
    }, [onKeySelected]);

    useEffect(() => {
        checkApiKey();
    }, [checkApiKey]);

    const handleSelectKey = async () => {
        try {
            await window.aistudio.openSelectKey();
            // Assume success and let the parent component proceed.
            // This handles the race condition where hasSelectedApiKey might not be updated immediately.
            onKeySelected();
        } catch (error) {
            console.error("Error opening API key selection:", error);
        }
    };

    if (checking) {
        return <div className="text-center p-8">Checking API Key status...</div>;
    }

    return (
        <div className="mt-12 text-center bg-gray-900/50 backdrop-blur-md border border-orange-500/20 rounded-2xl p-8 max-w-lg mx-auto shadow-2xl shadow-orange-500/10">
            <h2 className="text-2xl font-bold text-orange-400 mb-4">API Key Required</h2>
            <p className="text-gray-300 mb-6">
                To use the Veo video generation model, you need to select an API key.
                Project setup and billing are required.
            </p>
            <button
                onClick={handleSelectKey}
                className="px-6 py-3 bg-orange-500 text-white font-bold rounded-lg shadow-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-opacity-75 transition-all duration-300 transform hover:scale-105"
            >
                Select API Key
            </button>
            <p className="mt-4 text-sm text-gray-500">
                <a 
                    href="https://ai.google.dev/gemini-api/docs/billing" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="underline hover:text-orange-400"
                >
                    Learn more about billing
                </a>
            </p>
        </div>
    );
};
