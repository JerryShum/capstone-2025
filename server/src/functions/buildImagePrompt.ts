import { postScriptSchema } from '@shared/schemas/sendScriptSchema';
import z from 'zod';

type postScriptPrompt = z.infer<typeof postScriptSchema>;

function buildImagePrompt(userPrompt: postScriptPrompt) {
   const persona =
      'You are a creative assistant for a storybook generation app. Your task is to take a simple theme and generate two things: 1. A short story segment appropriate for a young child. 2. A detailed, descriptive prompt that can be used to generate a beautiful illustration for that story segment in an AI image generator. The theme is: "A brave squirrel named Squeaky finds a glowing acorn in an ancient, mossy forest." Provide the output in a valid JSON object with the following keys: "story_segment" and "image_prompt".';

   const artStyleMap = {
      cartoon:
         'a vibrant and playful cartoon style, with bold outlines, expressive characters, and a lively color palette',
      watercolor:
         'a soft and dreamy watercolor style, with gentle washes of color, soft edges, and an ethereal quality',
      'pixel-art':
         'a charming and nostalgic 8-bit pixel-art style, reminiscent of classic video games',
      '3d-render':
         'a polished and modern 3D digital render, similar to a still from an animated movie, with depth and realistic lighting',
      'line-art':
         'a clean, elegant, and simple line-art style, perhaps with minimal color fills, focusing on form and shape',
   };
}
