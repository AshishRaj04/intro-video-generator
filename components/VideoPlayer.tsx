
import React from 'react';
import type { AspectRatio } from '../types';

interface VideoPlayerProps {
    src: string;
    aspectRatio: AspectRatio;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, aspectRatio }) => {
    const aspectRatioClass = aspectRatio === '16:9' ? 'aspect-video' : 'aspect-[9/16]';

    return (
        <div className="w-full max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6 text-orange-400">Generation Complete!</h2>
            <div className={`w-full ${aspectRatioClass} bg-black rounded-lg shadow-2xl shadow-cyan-500/20 overflow-hidden border-2 border-cyan-500/30`}>
                <video src={src} controls autoPlay loop className="w-full h-full object-contain">
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="text-center mt-4">
                 <a
                    href={src}
                    download="atlas-x-intro.mp4"
                    className="inline-block px-5 py-2 bg-orange-500 text-white font-bold rounded-lg shadow-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-opacity-75 transition-all duration-300 transform hover:scale-105"
                >
                    Download Video
                </a>
            </div>
        </div>
    );
};
