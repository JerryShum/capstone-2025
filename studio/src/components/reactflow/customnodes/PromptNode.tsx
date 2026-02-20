import { Handle, Position, type NodeProps } from '@xyflow/react';
import { Sparkles, AlignLeft } from 'lucide-react';

export default function PromptNode({ data }: NodeProps) {
   return (
      <div className="bg-white border-2 border-slate-900 rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] min-w-[280px] flex flex-col gap-4 font-sans">
         <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-amber-500">
            <Sparkles size={14} />
            <span>AI Prompt</span>
         </div>

         <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
               <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                  <AlignLeft size={10} /> Label
               </label>
               <textarea
                  className="w-full text-sm p-3 border-2 border-slate-100 rounded-lg focus:border-amber-500 outline-none transition-colors font-mono min-h-[100px] resize-none"
                  placeholder="Enter AI prompt..."
                  defaultValue={data.label}
               />
            </div>
         </div>

         <Handle
            type="source"
            position={Position.Bottom}
            className="bg-slate-900 border-2 border-white !-bottom-1.5"
            style={{ width: '12px', height: '12px' }}
         />
      </div>
   );
}
