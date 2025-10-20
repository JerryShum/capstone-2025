import { create } from "zustand";

interface StoryState {
  script: string | null;
  imageBase64: string | null;
  video_prompt: string[] | null;
  setStory: (data: {
    script: string;
    video_prompt: string[];
    imageBase64: string;
  }) => void;
}

export const useStoryStore = create<StoryState>((set) => ({
  script: null,
  video_prompt: null,
  imageBase64: null,
  setStory: (data) =>
    set({
      script: data.script,
      video_prompt: data.video_prompt,
      imageBase64: data.imageBase64,
    }),
}));
