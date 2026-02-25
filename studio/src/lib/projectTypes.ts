export type ProjectState = {
   projectTitle: string;
   projectSettings: {
      aspectRatio: '16:9' | '9:16' | '1:1';
      engine: 'veo' | 'sora';
      globalNegativePrompt: string;
      executiveSummary: string;
   };
   updateProjectTitle: (title: string) => void;
};
