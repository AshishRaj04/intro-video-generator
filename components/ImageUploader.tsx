
import React, { useState, useCallback, useRef } from 'react';

interface ImageUploaderProps {
    onImageSelected: (file: File) => void;
}

const UploadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
);


export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected }) => {
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onImageSelected(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }, [onImageSelected]);

    const handleAreaClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div>
            <label className="block text-sm font-medium text-cyan-300 mb-2">Upload Starting Image</label>
            <div
                onClick={handleAreaClick}
                className="mt-1 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md cursor-pointer transition-colors duration-300 border-gray-600 hover:border-cyan-500 bg-black/20"
            >
                {preview ? (
                    <img src={preview} alt="Image preview" className="max-h-48 rounded-lg object-contain" />
                ) : (
                    <div className="space-y-1 text-center">
                        <UploadIcon />
                        <div className="flex text-sm text-gray-400">
                            <p className="pl-1">Click to upload an image</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                )}
            </div>
            <input
                ref={fileInputRef}
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                accept="image/*"
                onChange={handleFileChange}
            />
        </div>
    );
};
