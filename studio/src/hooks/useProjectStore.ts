import type { ProjectState } from '@shared';
import { create } from 'zustand';

export const useProjectStore = create<ProjectState>((set, get) => ({
   id: 123,
   projectTitle: 'default',
   aspectRatio: '16:9',
   engine: 'veo',
   globalNegativePrompt: 'something here',
   cinematicPreset: 'Neo-Noir',
   executiveSummary: 'summary of your story goes here...',
   updateProjectTitle: (title) => {
      set({
         projectTitle: title,
      });
   },
   handleUpdate: (field, value) => {
      set({
         // [] ==> "computed property name" (allows us to use variables as our property names)
         [field]: value,
      });
   },
}));
