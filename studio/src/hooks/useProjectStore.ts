import type { ProjectState } from '@/lib/projectTypes';
import { create } from 'zustand';

export const useProjectStore = create<ProjectState>((set, get) => ({
   projectTitle: 'default',
   projectSettings: {
      aspectRatio: '16:9',
      engine: 'veo',
      globalNegativePrompt: 'something here',
      executiveSummary: 'summary of your story goes here...',
   },
   updateProjectTitle: (title) => {
      set({
         projectTitle: title,
      });
   },
}));
