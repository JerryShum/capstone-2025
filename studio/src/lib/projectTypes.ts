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
   //# Using a generic for the typing of this function
   // --> K is a generic, meaning that its value can be any of the keys of projectState (projectTitle, aspectRatio, etc.)
   // field: field can be any key of projectState
   // value: since K is a generic (representing the keys  of projectState) --> we can use ProjectState[k] to ensure that the value MUST match the types specified
   handleUpdate: <K extends keyof ProjectState>(
      field: K,
      value: ProjectState[K],
   ) => void;
};
