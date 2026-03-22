import { defaultProject, type ProjectState } from '@shared';
import { create } from 'zustand';

export const useProjectStore = create<ProjectState>((set) => ({
   id: defaultProject.id,
   projectTitle: defaultProject.projectTitle,
   aspectRatio: defaultProject.aspectRatio,
   engine: defaultProject.engine,
   globalNegativePrompt: defaultProject.globalNegativePrompt,
   cinematicPreset: defaultProject.cinematicPreset,
   executiveSummary: defaultProject.executiveSummary,
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
