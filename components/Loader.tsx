
import React, { useState, useEffect } from 'react';

interface LoaderProps {
    messages: string[];
}

export const Loader: React.FC<LoaderProps> = ({ messages }) => {
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessageIndex(prevIndex => (prevIndex + 1) % messages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [messages.length]);

    return (
        <div className="flex flex-col items-center justify-center p-8 text-center w-full max-w-lg">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-400"></div>
            <h2 className="text-2xl font-bold mt-6 text-orange-400">Generating Your Cinematic Intro...</h2>
            <p className="mt-2 text-gray-300 min-h-[48px]">
                {messages[currentMessageIndex]}
            </p>
        </div>
    );
};
