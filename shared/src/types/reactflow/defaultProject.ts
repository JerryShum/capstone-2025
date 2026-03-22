import type {
   AppNode,
   CharacterNode,
   SceneNode,
   ScriptNode,
   EnvironmentNode,
} from './flowTypes';

import type { Edge } from '@xyflow/react';

const initScriptNode: ScriptNode = {
   id: 'node-script-1',
   type: 'script',
   data: {
      type: 'script',
      content:
         "Barry the Chicken's Morning Adventure\n\nBarry wakes up, stretches his wings, and finds a mysterious sparkling seed in the middle of the farmyard. He's never seen anything like it before!",
   },
   position: { x: 0, y: 0 },
};

const initCharacterNode: CharacterNode = {
   id: 'node-char-barry',
   type: 'character',
   data: {
      type: 'character',
      name: 'Barry the Chicken',
      style: '3D Animation, Pixar Style',
      appearance:
         'A plump, friendly yellow chicken with a small red comb and oversized, expressive blue eyes. He wears a tiny blue bowtie.',
   },
   position: { x: 0, y: 200 },
};

const initEnvironmentNode: EnvironmentNode = {
   id: 'node-env-farm',
   type: 'environment',
   data: {
      type: 'environment',
      location: 'Sunshine Farmyard',
      timeOfDay: 'Morning',
      weather: 'Clear',
      lightingStyle: 'Golden hour, soft morning glow',
      description:
         'A rustic, well-kept farmyard with a classic red barn, a wooden fence, and patches of green grass. A small vegetable garden is visible in the background.',
   },
   position: { x: 0, y: 400 },
};

const initSceneNode: SceneNode = {
   id: 'node-scene-1',
   type: 'scene',
   data: {
      type: 'scene',
      scenePrompt:
         'Barry the chicken stands in the center of the sunshine farmyard, looking down at a small, glowing blue seed on the ground. He tilts his head curiously.',
      duration: 8,
      shotType: 'Medium',
      cameraMovement: 'Static',
      status: 'IDLE',
      videoURL: 'https://...',
      thumbnailURL: 'https://...',
      canExtend: false,
   },
   position: { x: 450, y: 150 },
};

const initSceneNode2: SceneNode = {
   id: 'node-scene-2',
   type: 'scene',
   data: {
      type: 'scene',
      scenePrompt:
         "Close up on Barry's face as his eyes widen in amazement. The blue glow of the seed reflects in his eyes. He looks extremely excited.",
      duration: 8,
      shotType: 'Close-up',
      cameraMovement: 'Zoom',
      status: 'IDLE',
      videoURL: 'https://...',
      thumbnailURL: 'https://...',
      canExtend: true,
   },
   position: { x: 900, y: 150 },
};

export const initialNodes = [
   initScriptNode,
   initCharacterNode,
   initEnvironmentNode,
   initSceneNode,
   initSceneNode2,
] as AppNode[];

export const initialEdges: Edge[] = [
   {
      id: 'e-script-scene1',
      source: 'node-script-1',
      target: 'node-scene-1',
   },
   {
      id: 'e-char-scene1',
      source: 'node-char-barry',
      target: 'node-scene-1',
   },
   {
      id: 'e-env-scene1',
      source: 'node-env-farm',
      target: 'node-scene-1',
   },
   {
      id: 'e-scene1-scene2',
      source: 'node-scene-1',
      target: 'node-scene-2',
   },
];
