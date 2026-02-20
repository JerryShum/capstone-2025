//! These are the blueprints for each type of node
// They are going to be used as the "default" values of the nodes whenever new instances are added

export const nodeBlueprint = {
   character: {
      label: 'Add Character Node',
      defaultData: {
         type: 'character',
         name: 'Character name...',
         style: 'e.g. Cinematic, Realistic, Anime...',
         appearance: 'e.g. Pirate, Prince, SuperHero...',
         referenceImage: 'https://...',
      },
   },
   scene: {
      label: 'Add Scene Node',
      defaultData: {
         type: 'scene',
         prompt: 'Describe the scene action...',
         status: 'IDLE',
         videoURL: 'https://...',
         thumbnailURL: 'https://...',
         duration: 4,
      },
   },
   script: {
      label: 'Add Script Node',
      defaultData: {
         type: 'script',
         content: 'Write your script segment here...',
      },
   },
   projectSettings: {
      label: 'Add Project Settings',
      defaultData: {
         type: 'projectsettings',
         title: 'Untitled Project',
         aspectRatio: '16:9',
         globalStyle: 'Cinematic',
         targetModel: 'Sora',
      },
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
      },
   },
} as const;
