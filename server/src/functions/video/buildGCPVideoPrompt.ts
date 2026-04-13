import type { postVideoSchemaType } from '@shared/schemas/sendVideoSchema';

/**
 * Style Maps: Expanding simple terms into rich cinematic descriptors.
 * Each key corresponds to a valid value from the node types in shared/src/types/reactflow/flowTypes.ts
 * and projectTypes.ts. The fallback in every lookup is the raw value itself.
 */

// EnvironmentNodeData.lightingStyle
const lightingMap: Record<string, string> = {
   Dramatic:
      'high-contrast cinematic lighting with deep shadows and sharp highlights',
   Soft: 'diffused, gentle light that creates a warm and inviting atmosphere',
   Natural: 'realistic daylight following the natural position of the sun',
   Neon: 'vibrant, artificial lights with saturated colors and glowing reflections',
   Backlit:
      'subject silhouetted against a bright background source creating rim light',
   'Golden Hour':
      'warm, low-angle sunlight bathing the scene in rich amber and honey tones',
   Studio:
      'controlled, even, professional three-point studio lighting with no harsh shadows',
   Moonlit:
      'cool, faint silvery moonlight casting long pale shadows across the scene',
};

// EnvironmentNodeData.weather
const weatherMap: Record<string, string> = {
   Clear: 'pristine visibility with no clouds or precipitation',
   Rainy: 'heavy rainfall with wet surfaces, puddles, and reflective textures',
   Foggy: 'thick atmospheric haze reducing visibility and softening all light sources',
   Snowy: 'falling snow with accumulated white blankets covering all surfaces',
};

// EnvironmentNodeData.timeOfDay
const timeOfDayMap: Record<string, string> = {
   Morning:
      'early morning golden hour with long, soft shadows and a fresh cool tone',
   Afternoon:
      'bright mid-day sun with high visibility and neutral, saturated colors',
   Sunset: 'deep orange and purple hues with low-angle dramatic backlighting',
   Night: 'dark atmosphere punctuated by artificial light sources and cool moonlight',
};

// ProjectState.cinematicPreset — matches CinematicPreset union in projectTypes.ts exactly
const cinematicPresetMap: Record<string, string> = {
   'Neo-Noir':
      'moody, stylized visuals with high contrast, deep shadows, and a sense of mystery',
   Technicolor:
      'rich, oversaturated hues and bold color separation evoking classic 1950s Hollywood films',
   'Hand-held Documentary':
      'raw, handheld footage with natural grain, imperfect framing, and authentic spontaneity',
   '80s VHS':
      'washed-out colors, visible scan lines, chromatic aberration, and analogue tape artifacts',
   Cyberpunk:
      'vibrant neon lights, rain-slicked cityscapes, and high-tech-low-life urban aesthetics',
   'Studio Ghibli':
      'lush hand-painted watercolor backgrounds, soft diffused light, and whimsical hand-drawn detail',
   None: "no cinematic preset applied — use the scene's natural visual palette and lighting",
};

// SceneNodeData.shotType
const shotTypeMap: Record<string, string> = {
   Wide: 'expansive wide shot capturing the full environment and all subjects in frame',
   Medium:
      'mid-range framing revealing the subject from the waist up with environmental context',
   'Close-up':
      'tight framing focused on a face or key detail, emphasizing emotion and texture',
   'Over-the-shoulder':
      'shot framed from behind one character looking toward another, creating intimacy',
};

// SceneNodeData.cameraMovement
const cameraMovementMap: Record<string, string> = {
   Static:
      'locked-off tripod shot with no camera movement, emphasizing stillness',
   Pan: 'smooth horizontal sweep of the camera across the scene',
   Tilt: 'vertical pivot of the camera, slowly revealing a tall subject or sweeping landscape',
   Zoom: 'lens zoom gradually drawing the viewer into or away from the focal subject',
   Dolly: 'smooth physical tracking of the camera toward or away from the subject on a dolly',
};

// postVideoSchemaType.aspectRatio
const aspectRatioMap: Record<string, string> = {
   '16:9': 'widescreen cinematic framing',
   '9:16': 'vertical portrait framing optimized for mobile viewing',
   '1:1': 'square format with a centered, symmetrical composition',
};

export function buildGCPVideoPrompt(data: postVideoSchemaType): string {
   const {
      prompt,
      characters,
      environments,
      scripts,
      cinematicPreset,
      negativePrompt,
      aspectRatio,
   } = data;

   // 1. Scene Setting (EnvironmentNode)
   const envContext = environments
      .map((e: any) => {
         const lighting = lightingMap[e.lightingStyle] || e.lightingStyle;
         const weather = weatherMap[e.weather] || e.weather;
         const time = timeOfDayMap[e.timeOfDay] || e.timeOfDay;
         return `${e.location} during ${time} with ${weather}. The lighting is ${lighting}. ${e.description}`.trim();
      })
      .join(' | ');

   // 2. Casting (CharacterNode)
   const charContext = characters
      .map((c: any) => {
         const refNote = c.referenceImage ? ` [Reference image provided]` : '';
         return `${c.name}: ${c.appearance}. Style: ${c.style}.${refNote}`;
      })
      .join(' | ');

   // 3. Scene Direction (SceneNode) — shot type, camera, duration, scene prompt
   const sceneContext = (data as any).scenes
      ? (data as any).scenes
           .map((s: any) => {
              const shot = shotTypeMap[s.shotType] || s.shotType;
              const camera =
                 cameraMovementMap[s.cameraMovement] || s.cameraMovement;
              const dur = s.duration ? ` Duration: ${s.duration}s.` : '';
              return `${s.scenePrompt} Shot as a ${shot}. Camera: ${camera}.${dur}`;
           })
           .join(' | ')
      : '';

   // 4. Narrative (ScriptNode)
   const scriptContext = scripts.map((s: any) => s.content).join(' ');

   // 5. Visual style (CinematicPreset)
   const style = cinematicPresetMap[cinematicPreset] || cinematicPreset;

   // 6. Framing (aspectRatio)
   const composition = aspectRatioMap[aspectRatio] || aspectRatio;

   // 7. Final Construction
   //! CHILD-SAFETY DIRECTIVE — always prepended so it acts as a hard constraint
   const safetyDirective =
      'CONTENT POLICY: This video MUST be entirely child-friendly and appropriate for young audiences. ' +
      'Use a whimsical, colorful, animated art style only (e.g., cartoon, Studio Ghibli, hand-drawn). ' +
      'Absolutely NO realistic human depictions, violence, adult themes, suggestive content, horror, or dark imagery. ' +
      'The tone must be fun, safe, and imaginative — like a children\'s animated film.';

   const sections: string[] = [
      safetyDirective,
      `SCENE CONTEXT: ${envContext}`,
      `CHARACTERS: ${charContext}`,
   ];

   if (sceneContext) {
      sections.push(`SCENE DIRECTION: ${sceneContext}`);
   }

   sections.push(
      `STORY BEATS: ${scriptContext}`,
      `ACTION: ${prompt}`,
      `VISUAL STYLE: ${style}`,
      `COMPOSITION: ${composition}`,
      `NEGATIVE CONCERNS: Avoid ${negativePrompt}. Also avoid: realistic human faces, adult content, violence, horror, dark themes.`,
   );

   return sections.join('\n');
}
