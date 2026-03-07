import { postScriptSchema } from '@shared/schemas/sendScriptSchema';
import z from 'zod';

type postScriptPrompt = z.infer<typeof postScriptSchema>;

export function buildScriptPrompt({
   title,
   overview,
   agegroup,
   genre,
   artstyle,
}: postScriptPrompt): string {
   const ageGroupStoryMap = {
      toddlers:
         'for toddlers (ages 1-3), that focuses on simple concepts, repetition, and has a very gentle tone',
      preschool:
         'for preschoolers (ages 3-5), with a clear narrative, relatable friendly characters, and a simple positive message',
      'young-children':
         'for young children (ages 6-8), featuring a more developed plot, exciting challenges, and character growth',
   };

   const genreMap = {
      adventure:
         'an exciting but lighthearted adventure story with brave characters exploring new and exciting worlds/places.',
      fantasy:
         'a magical fantasy tale set in an enchanted land with mythical creatures and whimsical elements',
      comedy:
         'a light-hearted comedy full of silly situations, humorous characters, and funny expressions',
      'fairy-tale':
         'a classic fairy-tale that teaches a valuable lesson, with a timeless and charming feel.',
   };

   const agePrompt = ageGroupStoryMap[agegroup];
   const genrePrompt = genreMap[genre];

   const detailedPrompt = `
   
   The title of the story is: ${title}.
   
   The user overview/script that was given by the user is: ${overview}.

   The story is meant for ${agePrompt}.

   The genre of the story should be ${genrePrompt}. 
   
   The artstyle for the video should be: ${artstyle}`;

   return detailedPrompt;
}
