import type {
   AppNode,
   CharacterNode,
   ProjectSettingsNode,
   SceneNode,
   ScriptNode,
} from './flowTypes';

import type { Edge } from '@xyflow/react';

const initCharacterNode: CharacterNode = {
   id: '1-defaultchar',
   type: 'character',
   data: {
      type: 'character',
      name: 'Barry',
      style: 'Pixelated cartoon chicken, 3d art style',
      appearance: 'Pixelated chicken, yellow hair, big blue eyes',
   },
   position: { x: 500, y: 25 },
};
const initCharacterNode2: CharacterNode = {
   id: '2-defaultchar',
   type: 'character',
   data: {
      type: 'character',
      name: 'Bruce the Cow',
      style: 'Pixelated cartoon cow, 3d art style',
      appearance: 'Pixelated cow, 3d, similar to minecraft baby cow.',
   },
   position: { x: 500, y: 25 },
};

const initScriptNode: ScriptNode = {
   id: '3-initscript',
   type: 'script',
   data: {
      type: 'script',
      content:
         'Script for Barry the Chicken: \n\n Barry the chicken: Hello! \n\n Bruce the Cow: Hi Barry! ',
   },
   position: { x: 250, y: 25 },
};

const initSceneNode: SceneNode = {
   id: '4-initscene',
   type: 'scene',
   data: {
      type: 'scene',
      scenePrompt:
         'Barry the chicken is going about his day around the barn. He meets Bruce the cow and they say hi to eachother.',
      duration: 8,
      shotType: 'Close-up',
      cameraMovement: 'Dolly',
      status: 'IDLE',
      videoURL: 'https://',
      thumbnailURL: 'https://',
   },
   position: { x: 0, y: 25 },
};

export const initialNodes = [
   initCharacterNode,
   initCharacterNode2,
   initScriptNode,
   initSceneNode,
] as AppNode[];

export const initialEdges = [] as Edge[];
