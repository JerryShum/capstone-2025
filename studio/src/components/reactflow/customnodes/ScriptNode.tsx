import useFlowStore from '@/hooks/useFlowStore';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { ScrollText, AlignLeft } from 'lucide-react';

export default function ScriptNode({ data, id }: NodeProps) {
   const updateNode = useFlowStore((state) => state.updateNode);

   return (
      <div className="bg-white border-2 border-slate-900 rounded-xl p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-w-[280px] flex flex-col gap-3 font-sans">
         <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-purple-500">
            <ScrollText size={14} />
            <span>Script / Storyboard</span>
         </div>

         <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
               <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                  <AlignLeft size={10} /> Content
               </label>
               <textarea
                  className="w-full min-h-[100px] text-sm p-2 border-2 border-slate-100 rounded-lg focus:border-purple-500 outline-none transition-colors resize-y font-mono"
                  placeholder="Enter your script or detailed prompt here..."
                  defaultValue={data?.content as string}
                  onChange={(e) => updateNode(id, { content: e.target.value })}
               />
            </div>
         </div>

         <div className="text-[10px] text-slate-400 italic">
            Supports markdown and variables
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
