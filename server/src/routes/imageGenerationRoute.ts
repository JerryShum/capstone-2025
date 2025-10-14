import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

interface Prediction {
  bytesBase64Encoded: string;
}

interface ApiResponse {
  predictions: Prediction[];
}

export const imageGenerationRoute = new Hono().post(
  '/',
  zValidator('json', z.object({
    prompt: z.string().min(1).max(1000),
  })),
  async (c) => {
    try {
      const { prompt } = c.req.valid('json');
      
      const projectId = '526769313585';
      const location = 'us-central1';
      const apiKey = process.env.VERTEX_API_KEY;

      if (!apiKey) {
        throw new Error('VERTEX_API_KEY is not set in the environment variables.');
      }

      const url = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/imagegeneration@002:predict?key=${apiKey}`;

      const response = await fetch(url, {
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

      if (!response.ok) {
        const errorBody = await response.json();
        console.error("Vertex AI API Error:", JSON.stringify(errorBody, null, 2));
        throw new Error(`API request failed with status ${response.status}: ${errorBody.error.message}`);
      }

      const responseData = await response.json() as ApiResponse;
      
      if (!responseData.predictions || responseData.predictions.length === 0) {
        console.error("API response did not contain predictions:", JSON.stringify(responseData, null, 2));
        throw new Error('The API did not return any predictions.');
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
