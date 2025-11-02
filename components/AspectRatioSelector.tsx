
import React from 'react';
import type { AspectRatio } from '../types';

interface AspectRatioSelectorProps {
    selected: AspectRatio;
    onSelect: (ratio: AspectRatio) => void;
}

export const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ selected, onSelect }) => {
    const baseClasses = "w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-75";
    const selectedClasses = "bg-cyan-500 text-white shadow-md transform scale-105";
    const unselectedClasses = "bg-gray-700 text-gray-300 hover:bg-gray-600";

    return (
        <div>
            <label className="block text-sm font-medium text-cyan-300 mb-2">Aspect Ratio</label>
            <div className="flex gap-4">
                <button
                    onClick={() => onSelect('16:9')}
                    className={`${baseClasses} ${selected === '16:9' ? selectedClasses : unselectedClasses} focus:ring-cyan-400`}
                >
                    16:9 (Landscape)
                </button>
                <button
                    onClick={() => onSelect('9:16')}
                    className={`${baseClasses} ${selected === '9:16' ? selectedClasses : unselectedClasses} focus:ring-cyan-400`}
                >
                    9:16 (Portrait)
                </button>
            </div>
        </div>
    );
};
