import { create } from "zustand";

interface StoryState {
  script: string | null;
  imageBase64: string | null;
  setStory: (data: { script: string; imageBase64: string }) => void;
}

export const useStoryStore = create<StoryState>((set) => ({
  script: null,
  imageBase64: null,
  setStory: (data) =>
    set({ script: data.script, imageBase64: data.imageBase64 }),
}));
