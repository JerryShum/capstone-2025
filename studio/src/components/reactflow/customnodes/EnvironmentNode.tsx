import useFlowStore from '@/hooks/useFlowStore';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { Mountain, Clock, Cloud, Zap, AlignLeft, Trees } from 'lucide-react';
import type { EnvironmentNodeData } from '@/lib/flowTypes';

export default function EnvironmentNode({ data, id }: NodeProps) {
   const updateNode = useFlowStore((state) => state.updateNode);
   const envData = data as EnvironmentNodeData;

   const handleChange = (field: keyof EnvironmentNodeData, value: string) => {
      updateNode(id, { [field]: value });
   };

   return (
      <div className="bg-white border-2 border-slate-900 rounded-xl p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-w-[280px] flex flex-col gap-3 font-sans">
         <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-emerald-500">
            <Trees size={14} />
            <span>Environment / Setting</span>
         </div>

         <div className="flex flex-col gap-2">
            {/* location */}
            <div className="flex flex-col gap-1">
               <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                  <Mountain size={10} /> Location
               </label>
               <input
                  type="text"
                  className="w-full text-sm p-2 border-2 border-slate-100 rounded-lg focus:border-emerald-500 outline-none transition-colors font-medium"
                  placeholder="e.g. Neo-Tokyo, Deep Space..."
                  defaultValue={envData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
               />
            </div>

            <div className="grid grid-cols-2 gap-3">
               {/* time of day */}
               <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                     <Clock size={10} /> Time of Day
                  </label>
                  <select
                     className="w-full text-sm p-2 border-2 border-slate-100 rounded-lg focus:border-emerald-500 outline-none transition-colors bg-white"
                     defaultValue={envData.timeOfDay}
                     onChange={(e) => handleChange('timeOfDay', e.target.value)}
                  >
                     <option value="Morning">Morning</option>
                     <option value="Afternoon">Afternoon</option>
                     <option value="Sunset">Sunset</option>
                     <option value="Night">Night</option>
                  </select>
               </div>

               {/* weather */}
               <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                     <Cloud size={10} /> Weather
                  </label>
                  <select
                     className="w-full text-sm p-2 border-2 border-slate-100 rounded-lg focus:border-emerald-500 outline-none transition-colors bg-white"
                     defaultValue={envData.weather}
                     onChange={(e) => handleChange('weather', e.target.value)}
                  >
                     <option value="Clear">Clear</option>
                     <option value="Rainy">Rainy</option>
                     <option value="Foggy">Foggy</option>
                     <option value="Snowy">Snowy</option>
                  </select>
               </div>
            </div>

            {/* lighting style */}
            <div className="flex flex-col gap-1">
               <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                  <Zap size={10} /> Lighting Style
               </label>
               <input
                  type="text"
                  className="w-full text-sm p-2 border-2 border-slate-100 rounded-lg focus:border-emerald-500 outline-none transition-colors font-medium"
                  placeholder="e.g. Neon, Cinematic, Golden Hour..."
                  defaultValue={envData.lightingStyle}
                  onChange={(e) =>
                     handleChange('lightingStyle', e.target.value)
                  }
               />
            </div>

            {/* description */}
            <div className="flex flex-col gap-1">
               <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                  <AlignLeft size={10} /> Detailed Description
               </label>
               <textarea
                  className="w-full min-h-[60px] text-sm p-2 border-2 border-slate-100 rounded-lg focus:border-emerald-500 outline-none transition-colors resize-none font-mono"
                  placeholder="Describe the environment in detail..."
                  defaultValue={envData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
               />
            </div>
         </div>

         <Handle
            type="source"
            position={Position.Right}
            className="bg-slate-900 border-2 border-white"
            style={{ width: '12px', height: '12px' }}
         />
      </div>
   );
}
