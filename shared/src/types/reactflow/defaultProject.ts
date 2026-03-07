import type {
   AppNode,
   CharacterNode,
   SceneNode,
   ScriptNode,
} from './flowTypes';

import type { Edge } from '@xyflow/react';

const initCharacterNode: CharacterNode = {
   id: '1-defaultchar',
   type: 'character',
   data: {
      type: 'character',
      name: 'barry',
      style: 'pixelated cartoon chicken',
      appearance: 'pixelated chicken, yellow hair, big blue eyes',
   },
   position: { x: 500, y: 25 },
};

const initScriptNode: ScriptNode = {
   id: '2-initscript',
   type: 'script',
   data: {
      type: 'script',
      content: 'script for barry the chicken:yapyapyapypaypaypyapp',
   },
   position: { x: 250, y: 25 },
};

const initSceneNode: SceneNode = {
   id: '3-initscene',
   type: 'scene',
   data: {
      type: 'scene',
      scenePrompt: 'Barry the chicken is going about his day around the barn.',
      duration: 8,
      shotType: 'Close-up',
      cameraMovement: 'Dolly',
      status: 'IDLE',
      videoURL: 'https://',
      thumbnailURL: 'https://',
      lastOperationName: '',
   },
   position: { x: 0, y: 25 },
};

export const initialNodes = [
   initCharacterNode,
   initScriptNode,
   initSceneNode,
] as AppNode[];

export const initialEdges = [] as Edge[];
