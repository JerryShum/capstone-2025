export type CinematicPreset =
   | 'Neo-Noir'
   | 'Technicolor'
   | 'Hand-held Documentary'
   | '80s VHS'
   | 'Cyberpunk'
   | 'Studio Ghibli'
   | 'None';

export type ProjectState = {
   projectTitle: string;
   aspectRatio: '16:9' | '9:16';
   engine: 'veo' | 'sora';
   globalNegativePrompt: string;
   executiveSummary: string;
   cinematicPreset: CinematicPreset;
   updateProjectTitle: (title: string) => void;
};
