import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { GoogleGenAI } from '@google/genai';
import { scriptAssistSchema } from '@shared/schemas/scriptAssistSchema';
import type { Env } from '@server/lib/auth';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
   throw new Error('GEMINI_API_KEY is not set');
}

const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export const scriptRoute = new Hono<Env>()
   .post('/assist', zValidator('json', scriptAssistSchema), async (c) => {
      const { currentContent, context } = c.req.valid('json');

      //@ Build the context prompt
      const characterContext = context.characters.map((c: any) => `- ${c.name}: ${c.appearance} (${c.style})`).join('\n');
      const environmentContext = context.environments.map((e: any) => `- ${e.location}: ${e.description} (${e.weather}, ${e.timeOfDay})`).join('\n');

      const prompt = `
You are a creative writing assistant for a storyboard studio. 
Help the user expand or refine their script based on the provided context.

### CONTEXT
**Characters:**
${characterContext || 'None defined'}

**Environments:**
${environmentContext || 'None defined'}

### USER'S CURRENT SCRIPT CONTENT
${currentContent || '(Empty)'}

### INSTRUCTIONS
- If the current content is empty, generate a short, engaging opening scene.
- If there is content, expand it or refine the dialogue/descriptions to be more cinematic.
- Ensure the tone matches the characters and environments.
- Return ONLY the refined/expanded script content.
- Remember, scenes are limited to 8 seconds each. This means that the script must not be too long.

### OUTPUT
`;

      const result = await genAI.models.generateContent({
         model: 'gemini-2.5-flash-lite',
         contents: prompt,
      });

      const refinedContent = result.text?.trim() || '';

      if (!refinedContent) {
         return c.json({ error: 'Failed to generate content' }, 500);
      }

      return c.json({ content: refinedContent }, 200);
   });
