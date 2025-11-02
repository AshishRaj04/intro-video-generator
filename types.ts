export type AspectRatio = '16:9' | '9:16';

// Fix: Moved global type declarations from App.tsx to centralize them and resolve potential declaration conflicts.
declare global {
    interface AIStudio {
        hasSelectedApiKey: () => Promise<boolean>;
        openSelectKey: () => Promise<void>;
    }
    interface Window {
        aistudio: AIStudio;
    }
}
