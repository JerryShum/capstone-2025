import { postScriptSchema } from '@shared/schemas/sendScriptSchema';
import z from 'zod';

type postScriptPrompt = z.infer<typeof postScriptSchema>;

/**
 * Builds a descriptive prompt for an image generation model based on story parameters.
 */
export function buildImagePrompt(userPrompt: postScriptPrompt): string {
   const { title, overview, agegroup, genre, artstyle } = userPrompt;

   //! maps the artstyle to a detailed visual description
   const artStyleMap = {
      cartoon:
         'a vibrant and playful cartoon style, with bold outlines, expressive characters, and a lively color palette',
      watercolor:
         'a soft and dreamy watercolor style, with gentle washes of color, soft edges, and an ethereal quality',
      'pixel-art':
         'a charming and nostalgic 2D 8-bit pixel-art style, reminiscent of classic video games',
      '3d-render':
         'a polished and modern 3D digital render, similar to a still from an animated movie, with depth and realistic lighting. The artstyle is reminiscent of modern Pixar & Disney 3D Animation style.',
      'line-art':
         'a clean, elegant, and simple line-art style, perhaps with minimal color fills, focusing on form and shape',
   };

   //!maps the age group to visual complexity and safety
   const ageGroupModifiers = {
      toddlers:
         'very simple shapes, bright primary colors, rounded edges, friendly faces, no scary elements',
      preschool:
         'clear and expressive characters, vibrant colors, simple backgrounds, cheerful and safe mood',
      'young-children':
         'more detailed characters and imaginative settings, dynamic poses, sense of wonder, engaging composition',
   };

   //! maps the genre to a specific mood and theme
   const genreModifiers = {
      adventure:
         'dynamic and exciting, sense of exploration, movement, and a journey',
      fantasy:
         'magical and whimsical, enchanted, glowing elements, imaginative creatures',
      comedy:
         'humorous and silly, exaggerated expressions, playful, lighthearted atmosphere',
      'fairy-tale':
         'classic storybook feel, timeless, whimsical, enchanted forest or castle setting',
   };

   // Get the descriptive phrases from the maps
   const styleDescription = artStyleMap[artstyle];
   const ageDescription = ageGroupModifiers[agegroup];
   const genreDescription = genreModifiers[genre];

   const prompt = `
      A children's storybook illustration depicting: "${overview}".
      The image must be in ${styleDescription}.
      It should have a ${genreDescription} tone.
      The visual style must be appropriate for ${agegroup}: ${ageDescription}.
      This is for a story titled "${title}".
    `;

   // Clean up whitespace and newlines to create a single, clean prompt string
   return prompt.replace(/\s+/g, ' ').trim();
}
