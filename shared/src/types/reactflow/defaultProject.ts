import type {
   AppNode,
   CharacterNode,
   SceneNode,
   ScriptNode,
   EnvironmentNode,
} from './flowTypes';
import type { Project } from './projectTypes';

import type { Edge } from '@xyflow/react';

//@ Curated list of illustration banner images for new projects
export const BANNER_IMAGES = [
   'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop', // Abstract liquid art
   'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&auto=format&fit=crop', // Abstract colorful waves
   'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop', // Abstract neon shapes
   'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&auto=format&fit=crop', // Abstract paint stroke
   'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop', // Abstract color gradient
] as const;

export function getRandomBanner(): string {
   return BANNER_IMAGES[Math.floor(Math.random() * BANNER_IMAGES.length)] as string;
}

export const defaultProject: Project = {
   id: Date.now(),
   projectTitle: 'My First Story',
   aspectRatio: '16:9',
   engine: 'veo',
   globalNegativePrompt:
      'Low quality, blurry, distorted, static, watermark, text, signature',
   executiveSummary:
      'Welcome to StoryWeaver! This tutorial project shows you how to build AI-generated videos. Each node below explains its purpose \u2014 follow the connections to see how they combine into scenes.',
   cinematicPreset: 'Neo-Noir',
   bannerUrl: getRandomBanner(),
};

// ─── Tutorial Nodes ─────────────────────────────────────────────────

const tutorialScriptNode: ScriptNode = {
   id: 'node-script-1',
   type: 'script',
   data: {
      type: 'script',
      content:
         'Welcome to StoryWeaver!\n\nThis is a SCRIPT NODE. Use it to write the narrative arc of your story. When connected to a Scene, the AI uses this text as context for what should happen.\n\nTry editing this text, then generate the scene to see how it changes the output!',
   },
   position: { x: 0, y: 0 },
};

const tutorialCharacterNode: CharacterNode = {
   id: 'node-char-example',
   type: 'character',
   data: {
      type: 'character',
      name: 'Example Character',
      style: '3D Animation, Pixar Style',
      appearance:
         'A friendly young woman with short auburn hair and warm brown eyes, wearing a casual blue jacket. This is a CHARACTER NODE \u2014 define appearance details here so the AI keeps your character consistent across scenes.',
   },
   position: { x: 0, y: 250 },
};

const tutorialEnvironmentNode: EnvironmentNode = {
   id: 'node-env-park',
   type: 'environment',
   data: {
      type: 'environment',
      location: 'A sunny park',
      timeOfDay: 'Morning',
      weather: 'Clear',
      lightingStyle: 'Golden hour, soft morning glow',
      description:
         'A vibrant city park with green trees, a walking path, and a bench. This is an ENVIRONMENT NODE \u2014 it sets the location, time, and atmosphere for your scenes.',
   },
   position: { x: 0, y: 500 },
};

const tutorialSceneNode1: SceneNode = {
   id: 'node-scene-1',
   type: 'scene',
   data: {
      type: 'scene',
      scenePrompt:
         'A sunny park with green trees. A young woman walks along the path and sits on a bench, smiling at the camera.',
      duration: 5,
      shotType: 'Medium',
      cameraMovement: 'Static',
      status: 'IDLE',
      videoURL: 'https://...',
      thumbnailURL: 'https://...',
      canExtend: false,
   },
   position: { x: 500, y: 200 },
};

const tutorialSceneNode2: SceneNode = {
   id: 'node-scene-2',
   type: 'scene',
   data: {
      type: 'scene',
      scenePrompt:
         'Close-up of the woman looking into the distance with a hopeful expression. Connect scenes together to build a continuous story! Click "Generate Video" to start.',
      duration: 4,
      shotType: 'Close-up',
      cameraMovement: 'Zoom',
      status: 'IDLE',
      videoURL: 'https://...',
      thumbnailURL: 'https://...',
      canExtend: true,
   },
   position: { x: 1000, y: 200 },
};

// ─── Exported Collections ───────────────────────────────────────────

export const initialNodes = [
   tutorialScriptNode,
   tutorialCharacterNode,
   tutorialEnvironmentNode,
   tutorialSceneNode1,
   tutorialSceneNode2,
] as AppNode[];

export const initialEdges: Edge[] = [
   {
      id: 'e-script-scene1',
      source: 'node-script-1',
      target: 'node-scene-1',
   },
   {
      id: 'e-char-scene1',
      source: 'node-char-example',
      target: 'node-scene-1',
   },
   {
      id: 'e-env-scene1',
      source: 'node-env-park',
      target: 'node-scene-1',
   },
   {
      id: 'e-scene1-scene2',
      source: 'node-scene-1',
      target: 'node-scene-2',
   },
];
