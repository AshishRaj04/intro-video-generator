import React, { useState, useCallback } from 'react';
import { ApiKeySelector } from './components/ApiKeySelector';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { AspectRatioSelector } from './components/AspectRatioSelector';
import { Loader } from './components/Loader';
import { VideoPlayer } from './components/VideoPlayer';
import { generateVideoFromImage } from './services/geminiService';
import type { AspectRatio } from './types';
import { LOADING_MESSAGES } from './constants';

const App: React.FC = () => {
    const [apiKeyReady, setApiKeyReady] = useState<boolean>(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
    const [title, setTitle] = useState<string>('ATLAS-X');
    const [tagline, setTagline] = useState<string>('Science. Space. Strategy.');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleGeneration = useCallback(async () => {
        if (!imageFile) {
            setError('Please upload an image first.');
            return;
        }
        if (!title.trim()) {
            setError('Please enter a title.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setVideoUrl(null);

        try {
            const url = await generateVideoFromImage(imageFile, aspectRatio, title, tagline);
            setVideoUrl(url);
        } catch (e: any) {
            console.error(e);
            const errorMessage = e.message || 'An unknown error occurred.';
            setError(errorMessage);
            if (errorMessage.includes('Requested entity was not found.')) {
                setError('API Key error. Please re-select your API key.');
                setApiKeyReady(false);
            }
        } finally {
            setIsLoading(false);
        }
    }, [imageFile, aspectRatio, title, tagline]);
    
    const resetState = () => {
        setImageFile(null);
        setVideoUrl(null);
        setError(null);
        setIsLoading(false);
        setTitle('ATLAS-X');
        setTagline('Science. Space. Strategy.');
    }

    return (
        <div className="min-h-screen text-white font-sans flex flex-col items-center p-4 sm:p-6 md:p-8">
            <div className="w-full max-w-4xl mx-auto">
                <Header />

                {!apiKeyReady ? (
                    <ApiKeySelector onKeySelected={() => setApiKeyReady(true)} />
                ) : (
                    <main className="mt-8 md:mt-12 w-full flex flex-col items-center">
                        {isLoading ? (
                            <Loader messages={LOADING_MESSAGES} />
                        ) : videoUrl ? (
                            <div className="w-full flex flex-col items-center gap-6">
                                <VideoPlayer src={videoUrl} aspectRatio={aspectRatio} />
                                <button
                                    onClick={resetState}
                                    className="px-6 py-3 bg-cyan-500/80 text-white font-bold rounded-lg shadow-lg hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-opacity-75 transition-all duration-300 transform hover:scale-105"
                                >
                                    Generate Another Video
                                </button>
                            </div>
                        ) : (
                            <div className="w-full max-w-xl bg-gray-900/50 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-6 md:p-8 shadow-2xl shadow-cyan-500/10">
                                <div className="space-y-6">
                                    <ImageUploader onImageSelected={setImageFile} />
                                    <AspectRatioSelector selected={aspectRatio} onSelect={setAspectRatio} />
                                    <div>
                                        <label htmlFor="title-input" className="block text-sm font-medium text-cyan-300 mb-2">Intro Title</label>
                                        <input
                                            type="text"
                                            id="title-input"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="e.g., ATLAS-X"
                                            className="w-full px-4 py-3 bg-black/20 border-2 border-gray-600 rounded-lg text-white focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-300"
                                            aria-label="Intro Title"
                                            required
                                            maxLength={50}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="tagline-input" className="block text-sm font-medium text-cyan-300 mb-2">Tagline (Optional)</label>
                                        <input
                                            type="text"
                                            id="tagline-input"
                                            value={tagline}
                                            onChange={(e) => setTagline(e.target.value)}
                                            placeholder="e.g., Science. Space. Strategy."
                                            className="w-full px-4 py-3 bg-black/20 border-2 border-gray-600 rounded-lg text-white focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-300"
                                            aria-label="Tagline"
                                            maxLength={100}
                                        />
                                    </div>
                                    <button
                                        onClick={handleGeneration}
                                        disabled={!imageFile || !title.trim()}
                                        className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-orange-500 text-white font-bold text-lg rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-cyan-400 hover:to-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-300/50 transition-all duration-300 transform hover:scale-105 disabled:scale-100"
                                    >
                                        Generate Video
                                    </button>
                                </div>
                                {error && (
                                    <p className="mt-4 text-center text-red-400">{error}</p>
                                )}
                            </div>
                        )}
                    </main>
                )}
            </div>
        </div>
    );
};

export default App;