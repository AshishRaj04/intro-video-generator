
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="text-center py-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-wider uppercase" style={{
                textShadow: '0 0 10px rgba(0, 255, 255, 0.7), 0 0 20px rgba(0, 255, 255, 0.5), 0 0 30px rgba(255, 165, 0, 0.3)'
            }}>
                <span className="text-cyan-400">ATLAS</span><span className="text-orange-500">-X</span>
            </h1>
            <p className="mt-3 text-lg md:text-xl text-cyan-200/80 tracking-widest" style={{
                textShadow: '0 0 5px rgba(255, 165, 0, 0.4)'
            }}>
                Science. Space. Strategy.
            </p>
        </header>
    );
};
