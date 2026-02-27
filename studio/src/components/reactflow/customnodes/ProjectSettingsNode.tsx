import { Handle, Position } from '@xyflow/react';
import type { ProjectSettingsNode, httpsURL } from '@/lib/flowTypes';
import type { NodeProps } from '@xyflow/react';
import useFlowStore from '@/hooks/useFlowStore';
import {
   Settings2,
   Type,
   Monitor,
   Cpu,
   Ban,
   Dices,
   Sliders,
   Wrench,
   Image as ImageIcon,
   Clapperboard,
   AlignLeft,
} from 'lucide-react';

export default function ProjectSettingsNode({
   data,
   id,
}: NodeProps<ProjectSettingsNode>) {
   const updateNode = useFlowStore((state) => state.updateNode);

   return (
      <div className="bg-white border-2 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] min-w-[320px] flex flex-col gap-4 font-sans">
         <div className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center gap-2 text-[12px] font-black uppercase tracking-tighter text-amber-600">
               <Settings2 size={16} />
               <span>Project Settings / Global DNA</span>
            </div>
         </div>

         <div className="grid grid-cols-1 gap-4">
            {/* Title */}
            <div className="flex flex-col gap-1">
               <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                  <Type size={10} /> Project Title
               </label>
               <input
                  className="w-full text-sm p-2 border-2 border-slate-100 rounded-lg focus:border-amber-500 outline-none transition-colors font-medium"
                  value={data.title}
                  onChange={(e) => updateNode(id, { title: e.target.value })}
               />
            </div>

            <div className="grid grid-cols-2 gap-3">
               {/* Aspect Ratio */}
               <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                     <Monitor size={10} /> Aspect Ratio
                  </label>
                  <select
                     className="w-full text-sm p-2 border-2 border-slate-100 rounded-lg focus:border-amber-500 outline-none transition-colors font-medium bg-white"
                     value={data.aspectRatio}
                     onChange={(e) =>
                        updateNode(id, {
                           aspectRatio: e.target.value as any,
                        })
                     }
                  >
                     <option value="16:9">16:9 (Cinematic)</option>
                     <option value="9:16">9:16 (Social)</option>
                     <option value="1:1">1:1 (Square)</option>
                  </select>
               </div>

               {/* Target Engine */}
               <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                     <Cpu size={10} /> Gen Engine
                  </label>
                  <select
                     className="w-full text-sm p-2 border-2 border-slate-100 rounded-lg focus:border-amber-500 outline-none transition-colors font-medium bg-white"
                     value={data.targetEngine}
                     onChange={(e) =>
                        updateNode(id, {
                           targetEngine: e.target.value as any,
                        })
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
            <div className="flex flex-col gap-1">
               <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                  <Ban size={10} /> Global Negative Prompt
               </label>
               <textarea
                  className="w-full text-xs p-2 border-2 border-slate-100 rounded-lg focus:border-amber-500 outline-none transition-colors font-medium min-h-[60px] resize-none"
                  placeholder="Terms to avoid..."
                  value={data.negativePrompt}
                  onChange={(e) =>
                     updateNode(id, { negativePrompt: e.target.value })
                  }
               />
            </div>

            <div className="grid grid-cols-2 gap-3">
               {/* Seed */}
               <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                     <Dices size={10} /> Project Seed
                  </label>
                  <input
                     type="number"
                     className="w-full text-sm p-2 border-2 border-slate-100 rounded-lg focus:border-amber-500 outline-none transition-colors font-medium"
                     value={data.seed}
                     onChange={(e) =>
                        updateNode(id, { seed: parseInt(e.target.value) })
                     }
                  />
               </div>

               {/* Guidance Scale */}
               <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                     <Sliders size={10} /> Guidance (CFG)
                  </label>
                  <input
                     type="number"
                     step="0.1"
                     className="w-full text-sm p-2 border-2 border-slate-100 rounded-lg focus:border-amber-500 outline-none transition-colors font-medium"
                     value={data.guidanceScale}
                     onChange={(e) =>
                        updateNode(id, {
                           guidanceScale: parseFloat(e.target.value),
                        })
                     }
                  />
               </div>
            </div>

            {/* Motion Intensity */}
            <div className="flex flex-col gap-1">
               <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-2 justify-between">
                  <span className="flex items-center gap-1">
                     <Wrench size={10} /> Motion Intensity
                  </span>
                  <span className="text-amber-500">{data.motionIntensity}</span>
               </label>
               <input
                  type="range"
                  min="1"
                  max="10"
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  value={data.motionIntensity}
                  onChange={(e) =>
                     updateNode(id, {
                        motionIntensity: parseInt(e.target.value),
                     })
                  }
               />
            </div>

            {/* Style Reference */}
            <div className="flex flex-col gap-1">
               <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                  <ImageIcon size={10} /> Style Reference (SREF)
               </label>
               <input
                  className="w-full text-sm p-2 border-2 border-slate-100 rounded-lg focus:border-amber-500 outline-none transition-colors font-medium"
                  placeholder="https://..."
                  value={data.styleReference}
                  onChange={(e) =>
                     updateNode(id, {
                        styleReference: e.target.value as httpsURL,
                     })
                  }
               />
            </div>

            {/* Cinematic Preset */}
            <div className="flex flex-col gap-1">
               <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                  <Clapperboard size={10} /> Cinematic Preset
               </label>
               <select
                  className="w-full text-sm p-2 border-2 border-slate-100 rounded-lg focus:border-amber-500 outline-none transition-colors font-medium bg-white"
                  value={data.cinematicPreset}
                  onChange={(e) =>
                     updateNode(id, { cinematicPreset: e.target.value })
                  }
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
            <div className="flex flex-col gap-1">
               <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                  <AlignLeft size={10} /> Executive Summary
               </label>
               <textarea
                  className="w-full text-xs p-2 border-2 border-slate-100 rounded-lg focus:border-amber-500 outline-none transition-colors font-medium min-h-[80px] resize-none"
                  placeholder="The core narrative DNA..."
                  value={data.summary}
                  onChange={(e) => updateNode(id, { summary: e.target.value })}
               />
            </div>
         </div>

         <Handle
            type="source"
            position={Position.Right}
            className="bg-amber-500 border-2 border-white"
            style={{ width: '12px', height: '12px' }}
         />
      </div>
   );
}
