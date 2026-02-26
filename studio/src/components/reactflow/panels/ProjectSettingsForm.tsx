import {
   AlignLeft,
   Ban,
   Clapperboard,
   Cpu,
   Dices,
   ImageIcon,
   Monitor,
   Sliders,
   Type,
} from 'lucide-react';
import type { ProjectSettingsNodeData } from '@/lib/flowTypes';

interface ProjectSettingsFormProps {
   data?: Partial<ProjectSettingsNodeData>;
   onChange?: (data: Partial<ProjectSettingsNodeData>) => void;
}

export default function ProjectSettingsForm({
   data = {},
   onChange,
}: ProjectSettingsFormProps) {
   const handleChange = (field: keyof ProjectSettingsNodeData, value: any) => {
      onChange?.({ [field]: value });
   };

   const inputClasses =
      'w-full text-sm p-2.5 bg-white/5 border border-foreground/15 rounded-xl focus:border-foreground/40 focus:bg-white/10 outline-none transition-all font-medium placeholder:text-slate-600 dark:placeholder:text-slate-400 text-foreground backdrop-blur-sm shadow-inner';
   const labelClasses =
      'text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase flex items-center gap-1.5 tracking-wider mb-1';
   const containerClasses = 'flex flex-col gap-1.5 group';
   const iconClasses = 'text-foreground/60 group-focus-within:text-foreground transition-colors';

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
               value={data.title || ''}
               onChange={(e) => handleChange('title', e.target.value)}
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
                  value={data.aspectRatio || '16:9'}
                  onChange={(e) => handleChange('aspectRatio', e.target.value)}
               >
                  <option value="16:9">16:9 (Cinematic)</option>
                  <option value="9:16">9:16 (Social)</option>
                  <option value="1:1">1:1 (Square)</option>
               </select>
            </div>

            {/* Target Engine */}
            <div className={containerClasses}>
               <label className={labelClasses}>
                  <Cpu size={12} className={iconClasses} /> Gen Engine
               </label>
               <select
                  className={inputClasses}
                  value={data.targetEngine || 'Google Veo'}
                  onChange={(e) => handleChange('targetEngine', e.target.value)}
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
               value={data.negativePrompt || ''}
               onChange={(e) => handleChange('negativePrompt', e.target.value)}
            />
         </div>

         <div className="grid grid-cols-2 gap-4">
            {/* Seed */}
            <div className={containerClasses}>
               <label className={labelClasses}>
                  <Dices size={12} className={iconClasses} /> Project Seed
               </label>
               <input
                  type="number"
                  className={inputClasses}
                  placeholder="-1 for random"
                  value={data.seed ?? -1}
                  onChange={(e) =>
                     handleChange('seed', parseInt(e.target.value))
                  }
               />
            </div>

            {/* Guidance Scale */}
            <div className={containerClasses}>
               <label className={labelClasses}>
                  <Sliders size={12} className={iconClasses} /> Guidance (CFG)
               </label>
               <input
                  type="number"
                  step="0.1"
                  className={inputClasses}
                  value={data.guidanceScale ?? 7.5}
                  onChange={(e) =>
                     handleChange('guidanceScale', parseFloat(e.target.value))
                  }
               />
            </div>
         </div>

         {/* Style Reference */}
         <div className={containerClasses}>
            <label className={labelClasses}>
               <ImageIcon size={12} className={iconClasses} /> Style Reference
               (SREF)
            </label>
            <input
               className={inputClasses}
               placeholder="https://image-url.com/..."
               value={data.styleReference || ''}
               onChange={(e) => handleChange('styleReference', e.target.value)}
            />
         </div>

         {/* Cinematic Preset */}
         <div className={containerClasses}>
            <label className={labelClasses}>
               <Clapperboard size={12} className={iconClasses} /> Cinematic
               Preset
            </label>
            <select
               className={inputClasses}
               value={data.cinematicPreset || 'Neo-Noir'}
               onChange={(e) => handleChange('cinematicPreset', e.target.value)}
            >
               <option value="Neo-Noir">Neo-Noir</option>
               <option value="Technicolor">Technicolor</option>
               <option value="Hand-held Documentary">Documentary</option>
               <option value="80s VHS">80s VHS</option>
               <option value="Cyberpunk">Cyberpunk</option>
               <option value="Studio Ghibli">Studio Ghibli</option>
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
               value={data.summary || ''}
               onChange={(e) => handleChange('summary', e.target.value)}
            />
         </div>
      </div>
   );
}
