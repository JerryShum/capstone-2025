import { AlignLeft, Ban, Clapperboard, Cpu, Monitor, Type } from 'lucide-react';
import { useProjectStore } from '@/hooks/useProjectStore';
import { useShallow } from 'zustand/shallow';
import type { ProjectState } from '@/lib/projectTypes';

export default function ProjectSettingsForm() {
   const inputClasses =
      'w-full text-sm p-2.5 bg-white/5 border border-foreground/15 rounded-xl focus:border-foreground/40 focus:bg-white/10 outline-none transition-all font-medium placeholder:text-slate-600 dark:placeholder:text-slate-400 text-foreground backdrop-blur-sm shadow-inner';
   const labelClasses =
      'text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase flex items-center gap-1.5 tracking-wider mb-1';
   const containerClasses = 'flex flex-col gap-1.5 group';
   const iconClasses =
      'text-foreground/60 group-focus-within:text-foreground transition-colors';

   const {
      projectTitle,
      aspectRatio,
      engine,
      globalNegativePrompt,
      executiveSummary,
      cinematicPreset,
      handleUpdate,
   } = useProjectStore(
      useShallow((state) => ({
         projectTitle: state.projectTitle,
         aspectRatio: state.aspectRatio,
         engine: state.engine,
         globalNegativePrompt: state.globalNegativePrompt,
         executiveSummary: state.executiveSummary,
         cinematicPreset: state.cinematicPreset,
         handleUpdate: state.handleUpdate,
      })),
   );

   return (
      <div className="grid grid-cols-1 gap-5">
         {/* Title */}
         <div className={containerClasses}>
            <label className={labelClasses}>
               <Type size={12} className={iconClasses} /> Project Title
            </label>
            <input
               className={inputClasses}
               placeholder="Enter project name..."
               value={projectTitle}
               onChange={(e) => handleUpdate('projectTitle', e.target.value)}
            />
         </div>

         <div className="grid grid-cols-2 gap-4">
            {/* Aspect Ratio */}
            <div className={containerClasses}>
               <label className={labelClasses}>
                  <Monitor size={12} className={iconClasses} /> Aspect Ratio
               </label>
               <select
                  className={inputClasses}
                  value={aspectRatio}
                  onChange={(e) =>
                     handleUpdate(
                        'aspectRatio',
                        e.target.value as ProjectState['aspectRatio'],
                     )
                  }
               >
                  <option value="16:9">16:9 (Cinematic)</option>
                  <option value="9:16">9:16 (Social)</option>
               </select>
            </div>

            {/* Target Engine */}
            <div className={containerClasses}>
               <label className={labelClasses}>
                  <Cpu size={12} className={iconClasses} /> Gen Engine
               </label>
               <select
                  className={inputClasses}
                  value={engine}
                  onChange={(e) =>
                     handleUpdate(
                        'engine',
                        e.target.value as ProjectState['engine'],
                     )
                  }
               >
                  <option value="Google Veo">Google Veo</option>
                  <option value="OpenAI Sora">OpenAI Sora</option>
                  <option value="Runway Gen-3">Runway Gen-3</option>
                  <option value="Luma Dream Machine">Luma</option>
               </select>
            </div>
         </div>

         {/* Negative Prompt */}
         <div className={containerClasses}>
            <label className={labelClasses}>
               <Ban size={12} className={iconClasses} /> Global Negative Prompt
            </label>
            <textarea
               className={`${inputClasses} min-h-[80px] resize-none leading-relaxed`}
               placeholder="Terms to avoid (e.g. blur, low quality, watermark)..."
               value={globalNegativePrompt}
               onChange={(e) =>
                  handleUpdate('globalNegativePrompt', e.target.value)
               }
            />
         </div>

         {/* Style Reference */}
         {/* <div className={containerClasses}>
            <label className={labelClasses}>
               <ImageIcon size={12} className={iconClasses} /> Style Reference
               (SREF)
            </label>
            <input
               className={inputClasses}
               placeholder="https://image-url.com/..."
               value={data.styleReference || ''}
               onChange={(e) => handleUpdate('styleReference', e.target.value)}
            />
         </div> */}

         {/* Cinematic Preset */}
         <div className={containerClasses}>
            <label className={labelClasses}>
               <Clapperboard size={12} className={iconClasses} /> Cinematic
               Preset
            </label>
            <select
               className={inputClasses}
               value={cinematicPreset}
               onChange={(e) =>
                  handleUpdate(
                     'cinematicPreset',
                     e.target.value as ProjectState['cinematicPreset'],
                  )
               }
            >
               <option value="Neo-Noir">Neo-Noir</option>
               <option value="Technicolor">Technicolor</option>
               <option value="Hand-held Documentary">Documentary</option>
               <option value="80s VHS">80s VHS</option>
               <option value="Cyberpunk">Cyberpunk</option>
               <option value="Studio Ghibli">Studio Ghibli</option>
               <option value="None">None</option>
            </select>
         </div>

         {/* Executive Summary */}
         <div className={containerClasses}>
            <label className={labelClasses}>
               <AlignLeft size={12} className={iconClasses} /> Executive Summary
            </label>
            <textarea
               className={`${inputClasses} min-h-[100px] resize-none leading-relaxed`}
               placeholder="Describe the core narrative DNA and thematic goals..."
               value={executiveSummary}
               onChange={(e) =>
                  handleUpdate('executiveSummary', e.target.value)
               }
            />
         </div>
      </div>
   );
}
