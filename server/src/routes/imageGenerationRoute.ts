import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { GoogleGenAI } from '@google/genai';

// This AI client is for the text model (Gemini), used for rewriting prompts.
const textAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

interface Prediction {
  bytesBase64Encoded: string;
}

interface ApiResponse {
  predictions: Prediction[];
  error?: {
    message: string;
  };
}

export const imageGenerationRoute = new Hono().post(
  '/',
  zValidator('json', z.object({
    prompt: z.string().min(1).max(1000),
  })),
  async (c) => {
    try {
      let { prompt } = c.req.valid('json');
      
      const projectId = '526769313585';
      const location = 'us-central1';
      const apiKey = process.env.VERTEX_API_KEY;

      if (!apiKey) {
        throw new Error('VERTEX_API_KEY is not set in the environment variables.');
      }

      const url = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/imagegeneration@002:predict?key=${apiKey}`;

      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          instances: [
            { prompt: prompt }
          ],
          parameters: {
            sampleCount: 1
          }
        })
      });

      let responseData = await response.json() as ApiResponse;
      
      // If the initial prompt is blocked by Vertex AI, try to rewrite it with Gemini and try again.
      if (responseData.error && responseData.error.message.includes('violate our policies')) {
        console.log("Original prompt blocked by Vertex AI, attempting to rewrite with Gemini...");

        const rewriteInstruction = `Rewrite the following prompt to be safe for work and to avoid generating any controversial or policy-violating content, while preserving the core creative idea as much as possible. Just return the rewritten prompt, and nothing else. Original prompt: "${prompt}"`;
        
        const result = await textAI.models.generateContent({
          contents: [{ role: 'user', parts: [{ text: rewriteInstruction }] }],
        });
        const rewriteResponse = result.response;
        const rewrittenPrompt = rewriteResponse.candidates[0].content.parts[0].text;

        if (!rewrittenPrompt) {
          throw new Error('Failed to rewrite the prompt with Gemini.');
        }

        console.log(`Rewritten prompt: "${rewrittenPrompt}"`);
        prompt = rewrittenPrompt.trim();

        // Try the Vertex AI API call again with the new prompt
        response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            instances: [
              { prompt: prompt }
            ],
            parameters: {
              sampleCount: 1
            }
          })
        });
        responseData = await response.json() as ApiResponse;
      }

      if (!responseData.predictions || responseData.predictions.length === 0) {
        console.error("API response did not contain predictions:", JSON.stringify(responseData, null, 2));
        throw new Error('The API did not return any predictions, even after a potential rewrite.');
      }

      const prediction = responseData.predictions[0];

      if (!prediction) {
        throw new Error('No prediction found in the response.');
      }

      const imageBytes = prediction.bytesBase64Encoded;

      if (imageBytes) {
        return c.json({
          success: true,
          imageData: imageBytes,
        });
      } else {
        console.error("API response did not contain an image:", JSON.stringify(responseData, null, 2));
        return c.json({ error: 'Failed to generate image from API response.' }, 500);
      }
    } catch (error) {
      console.error('Error in image generation route:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      return c.json({ error: 'An internal server error occurred.', message: errorMessage }, 500);
    }
  });