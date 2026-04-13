import { Handle, Position, type NodeProps } from '@xyflow/react';
import { Sparkles, AlignLeft } from 'lucide-react';
import NodeWrapper from './components/NodeWrapper';
import NodeHeader from './components/NodeHeader';
import NodeField from './components/NodeField';
import NodeTextarea from './components/NodeTextarea';

export default function PromptNode({ data, selected }: NodeProps) {
   return (
      <NodeWrapper selected={selected} minWidth={250} minHeight={200}>
         <NodeHeader icon={Sparkles} label="AI Prompt" color="amber" />

         <div className="flex flex-col gap-2 grow">
            <NodeField icon={AlignLeft} label="Label" className="h-full">
               <NodeTextarea
                  accentColor="amber"
                  mono
                  className="h-full"
                  placeholder="Enter AI prompt..."
                  defaultValue={data.label as string}
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
