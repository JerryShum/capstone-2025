import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { GoogleGenAI } from '@google/genai';
import { scriptAssistSchema } from '@shared/schemas/scriptAssistSchema';
import type { Env } from '@server/lib/auth';
import { containsProfanity } from '@server/lib/profanity';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
   throw new Error('GEMINI_API_KEY is not set');
}

const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export const scriptRoute = new Hono<Env>()
   .post('/assist', zValidator('json', scriptAssistSchema), async (c) => {
      const { currentContent, context } = c.req.valid('json');

      //@ Profanity Check — reject before hitting the AI
      const textsToCheck = [
         currentContent ?? '',
         ...context.characters.map((ch: any) => `${ch.name} ${ch.appearance} ${ch.style}`),
         ...context.environments.map((e: any) => `${e.location} ${e.description}`),
      ];

      if (containsProfanity(textsToCheck)) {
         return c.json(
            { error: 'Profane language detected. Please keep content child-friendly.' },
            400,
         );
      }

      //@ Build the context prompt
      const characterContext = context.characters.map((c: any) => `- ${c.name}: ${c.appearance} (${c.style})`).join('\n');
      const environmentContext = context.environments.map((e: any) => `- ${e.location}: ${e.description} (${e.weather}, ${e.timeOfDay})`).join('\n');

      const prompt = `
You are a creative writing assistant for a children's animated storyboard studio.
Your ONLY purpose is to help create fun, safe, and imaginative stories for young audiences.

### CONTENT RULES (STRICTLY ENFORCED)
- ALL content MUST be appropriate for children aged 3–12.
- Use a warm, cheerful, whimsical tone — like a children's animated film (e.g., Pixar, Studio Ghibli).
- ABSOLUTELY NO: adult themes, violence, horror, dark imagery, realistic depictions, suggestive content, or profanity.
- Characters should be friendly, colorful, and exaggerated in an animated style.

### CONTEXT
**Characters:**
${characterContext || 'None defined'}

**Environments:**
${environmentContext || 'None defined'}

### USER'S CURRENT SCRIPT CONTENT
${currentContent || '(Empty)'}

### INSTRUCTIONS
- If the current content is empty, generate a short, engaging, child-friendly opening scene.
- If there is content, expand or refine the dialogue/descriptions to be more vivid and animated.
- Ensure the tone matches the characters and environments — keep it fun and safe!
- Return ONLY the refined/expanded script content.
- Remember, scenes are limited to 8 seconds each. The script must not be too long.

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
