import useFlowStore from '@/hooks/useFlowStore';
import { Handle, Position, type NodeProps, NodeResizer } from '@xyflow/react';
import { ScrollText, AlignLeft, Lock, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import type { ScriptNode } from '@shared';

export default function ScriptNode({ data, id, selected }: NodeProps<ScriptNode>) {
   const updateNode = useFlowStore((state) => state.updateNode);
   const assistScript = useFlowStore((state) => state.assistScript);

   const isGenerating = data.status === 'GENERATING';

   return (
      <div className="relative bg-white border-2 border-slate-900 rounded-xl p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-w-[300px] min-h-[150px] flex flex-col gap-3 font-sans h-full">
         <NodeResizer 
            minWidth={300} 
            minHeight={150} 
            isVisible={selected} 
            lineClassName="border-slate-400"
            handleClassName="bg-white border-2 border-slate-900 w-3 h-3 rounded-sm"
         />
         
         {!!data.locked && (
            <div className="absolute -top-3 -right-3 bg-amber-500 text-white p-1.5 rounded-full shadow-md z-10">
               <Lock size={14} />
            </div>
         )}
         
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-indigo-500">
               <ScrollText size={14} />
               <span>Script / Storyboard</span>
            </div>
            
            <button
               onClick={() => assistScript(id)}
               disabled={isGenerating}
               className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-bold uppercase transition-all border-2 ${
                  isGenerating 
                     ? 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed'
                     : data.status === 'ERROR'
                        ? 'bg-red-50 text-red-500 border-red-200 hover:bg-red-100'
                        : 'bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300'
               }`}
            >
               {isGenerating ? (
                  <Loader2 size={12} className="animate-spin" />
               ) : data.status === 'ERROR' ? (
                  <AlertCircle size={12} />
               ) : (
                  <Sparkles size={12} />
               )}
               {isGenerating ? 'Assisting...' : data.status === 'ERROR' ? 'Retry Assist' : 'Write Assist'}
            </button>
         </div>

         <div className="flex flex-col gap-2 flex-grow">
            <div className="flex flex-col gap-1 h-full">
               <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                  <AlignLeft size={10} /> Content
               </label>
               <textarea
                  className="w-full flex-grow text-sm p-2 border-2 border-slate-100 rounded-lg focus:border-indigo-500 outline-none transition-colors resize-none font-mono"
                  placeholder="Enter your script or detailed prompt here..."
                  value={data?.content as string}
                  onChange={(e) => updateNode(id, { content: e.target.value })}
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


