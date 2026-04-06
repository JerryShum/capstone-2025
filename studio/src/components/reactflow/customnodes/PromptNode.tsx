import { Handle, Position, type NodeProps, NodeResizer } from '@xyflow/react';
import { Sparkles, AlignLeft } from 'lucide-react';

export default function PromptNode({ data, selected }: NodeProps) {
   return (
      <div className="bg-white border-2 border-slate-900 rounded-xl p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-w-[250px] min-h-[200px] flex flex-col gap-3 font-sans w-full h-full">
         <NodeResizer 
            minWidth={250} 
            minHeight={200} 
            isVisible={selected} 
            lineClassName="border-slate-400"
            handleClassName="bg-white border-2 border-slate-900 w-3 h-3 rounded-sm"
         />
         <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-amber-500">
            <Sparkles size={14} />
            <span>AI Prompt</span>
         </div>

         <div className="flex flex-col gap-2 grow">
            <div className="flex flex-col gap-1 h-full">
               <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                  <AlignLeft size={10} /> Label
               </label>
               <textarea
                  className="w-full h-full text-sm p-2 border-2 border-slate-100 rounded-lg focus:border-amber-500 outline-none transition-colors font-mono resize-none"
                  placeholder="Enter AI prompt..."
                  defaultValue={data.label as string}
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


