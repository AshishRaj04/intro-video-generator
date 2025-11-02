import { GoogleGenAI } from "@google/genai";
import type { AspectRatio } from '../types';
import { VEO_MODEL_NAME } from '../constants';

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            resolve(result.split(',')[1]);
        };
        reader.onerror = error => reject(error);
    });
};

export const generateVideoFromImage = async (
    imageFile: File,
    aspectRatio: AspectRatio,
    title: string,
    tagline: string,
): Promise<string> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set. Please select a key.");
    }
    
    // Create a new instance right before the call to ensure the latest key is used.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const base64Image = await fileToBase64(imageFile);

    const dynamicPrompt = `A cinematic sci-fi intro showing Earth from space surrounded by glowing orbital paths, satellites, and data lines forming a network.
As the camera zooms out, the words "${title}" emerge from light particles with a faint energy wave effect.
The tagline "${tagline}" appears below with subtle flare and distortion.
Tone: epic, intelligent, futuristic.
Neon cyan and orange color palette, dark cosmic background, dynamic camera movement, 4K quality.`;


    console.log("Starting video generation...");
    let operation = await ai.models.generateVideos({
        model: VEO_MODEL_NAME,
        prompt: dynamicPrompt,
        image: {
            imageBytes: base64Image,
            mimeType: imageFile.type,
        },
        config: {
            numberOfVideos: 1,
            resolution: '720p',
            aspectRatio: aspectRatio
        }
    });

    console.log("Polling for video result...");
    while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000)); // Poll every 10 seconds
        try {
            operation = await ai.operations.getVideosOperation({ operation: operation });
        } catch(e) {
            console.error("Error during polling:", e);
            throw e;
        }
    }

    if (operation.error) {
        throw new Error(operation.error.message || 'Video generation failed in operation.');
    }
    
    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;

    if (!downloadLink) {
        throw new Error("Video generation succeeded, but no download link was provided.");
    }

    console.log("Fetching generated video from:", downloadLink);
    const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    
    if (!videoResponse.ok) {
        throw new Error(`Failed to download video. Status: ${videoResponse.statusText}`);
    }
    
    const videoBlob = await videoResponse.blob();
    return URL.createObjectURL(videoBlob);
};