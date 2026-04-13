import useFlowStore from '@/hooks/useFlowStore';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { ScrollText, AlignLeft, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import type { ScriptNode } from '@shared';
import NodeWrapper from './components/NodeWrapper';
import NodeHeader from './components/NodeHeader';
import NodeField from './components/NodeField';
import NodeTextarea from './components/NodeTextarea';

export default function ScriptNode({ data, id, selected }: NodeProps<ScriptNode>) {
   const updateNode = useFlowStore((state) => state.updateNode);
   const assistScript = useFlowStore((state) => state.assistScript);

   const isGenerating = data.status === 'GENERATING';

   const assistButton = (
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
   );

   return (
      <NodeWrapper selected={selected} minWidth={300} minHeight={200} locked={!!data.locked}>
         <NodeHeader
            icon={ScrollText}
            label="Script / Storyboard"
            color="indigo"
            rightSlot={assistButton}
         />

         <div className="flex flex-col gap-2 grow">
            <NodeField icon={AlignLeft} label="Content" className="h-full">
               <NodeTextarea
                  accentColor="indigo"
                  mono
                  className="grow"
                  placeholder="Enter your script or detailed prompt here..."
                  value={data?.content as string}
                  onChange={(e) => updateNode(id, { content: e.target.value })}
               />
            </NodeField>
         </div>

         <Handle
            type="source"
            position={Position.Right}
            className="bg-slate-900 border-2 border-white"
            style={{ width: '12px', height: '12px' }}
         />
      </NodeWrapper>
   );
}
