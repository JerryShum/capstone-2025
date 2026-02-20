import useFlowStore from '@/hooks/useFlowStore';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { ScrollText } from 'lucide-react';

export default function ScriptNode({ data, id }: NodeProps) {
   const updateNode = useFlowStore((state) => state.updateNode);

   return (
      <div className="bg-white border-2 border-slate-900 rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] min-w-[300px] flex flex-col gap-3 font-sans">
         <Handle
            type="target"
            position={Position.Top}
            className="w-3 h-3 bg-slate-900 border-2 border-white"
         />

         <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            <ScrollText size={14} />
            <span>Script / Prompt</span>
         </div>

         <div className="flex flex-col gap-1">
            <textarea
               className="w-full min-h-[120px] text-sm p-3 border-2 border-slate-100 rounded-lg focus:border-purple-500 outline-none transition-colors resize-y font-mono"
               placeholder="Enter your script or detailed prompt here..."
               defaultValue={data?.content as string}
               onChange={(e) => updateNode(id, { content: e.target.value })}
            />
         </div>

         <div className="text-[10px] text-slate-400 italic">
            Supports markdown and variables
         </div>

         <Handle
            type="source"
            position={Position.Bottom}
            className="w-3 h-3 bg-slate-900 border-2 border-white"
         />
      </div>
   );
}
