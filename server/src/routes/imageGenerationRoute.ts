import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { GoogleGenAI } from '@google/genai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not set in the environment variables.');
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const imageGenerationSchema = z.object({
  prompt: z.string().min(1),
});

export const imageGenerationRoute = new Hono().post(
  '/',
  zValidator('json', imageGenerationSchema),
  async (c) => {
    try {
      const { prompt } = c.req.valid('json');

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: prompt,
      });

      let imageData = '';
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          imageData = part.inlineData.data;
          break; // Assuming we only get one image part
        }
      }

      if (!imageData) {
        throw new Error('No image data found in the response.');
      }

      return c.json({ success: true, imageData });
    } catch (error) {
      console.error('Error generating image:', error);
      c.status(500);
      return c.json({ success: false, message: 'Failed to generate image.' });
    }
  },
);
