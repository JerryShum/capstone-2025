import { Handle, Position, type NodeProps } from '@xyflow/react';
import { Sparkles, AlignLeft } from 'lucide-react';

export default function PromptNode({ data }: NodeProps) {
   return (
      <div className="bg-white border-2 border-slate-900 rounded-xl p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-w-[240px] flex flex-col gap-3 font-sans">
         <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-amber-500">
            <Sparkles size={14} />
            <span>AI Prompt</span>
         </div>

         <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
               <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                  <AlignLeft size={10} /> Label
               </label>
               <textarea
                  className="w-full text-sm p-2 border-2 border-slate-100 rounded-lg focus:border-amber-500 outline-none transition-colors font-mono min-h-[80px] resize-none"
                  placeholder="Enter AI prompt..."
                  defaultValue={data.label as string}
               />
            </div>
         </div>

         <Handle
            type="source"
            position={Position.Bottom}
            className="bg-slate-900 border-2 border-white -bottom-1.5!"
            style={{ width: '12px', height: '12px' }}
         />
      </div>
   );
}
