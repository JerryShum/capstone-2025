//! These are the blueprints for each type of node
// They are going to be used as the "default" values of the nodes whenever new instances are added

import type {
   CharacterNodeData,
   EnvironmentNodeData,
   SceneNodeData,
   ScriptNodeData,
} from '@shared';

export const nodeBlueprint = {
   character: {
      label: 'Add Character Node',
      defaultData: {
         type: 'character',
         name: 'Character name...',
         style: 'e.g. Cinematic, Realistic, Anime...',
         appearance: 'e.g. Pirate, Prince, SuperHero...',
         referenceImage: 'https://...',
      } as CharacterNodeData,
   },
   scene: {
      label: 'Add Scene Node',
      defaultData: {
         type: 'scene',
         scenePrompt: 'Describe the scene action...',
         duration: 8,
         shotType: 'Wide',
         cameraMovement: 'Static',
         status: 'IDLE',
         videoURL: 'https://...',
         thumbnailURL: 'https://...',
         extend: false,
      } as SceneNodeData,
   },
   script: {
      label: 'Add Script Node',
      defaultData: {
         type: 'script',
         content: 'Write your script segment here...',
      } as ScriptNodeData,
   },
   environment: {
      label: 'Add Environment Node',
      defaultData: {
         type: 'environment',
         location: 'New Setting...',
         timeOfDay: 'Morning',
         weather: 'Clear',
         lightingStyle: 'Cinematic',
         description: 'Describe the atmosphere and environmental details...',
      } as EnvironmentNodeData,
   },
} as const;
