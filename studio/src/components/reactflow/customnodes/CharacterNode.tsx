import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { CharacterNode } from '@shared';
import useFlowStore from '@/hooks/useFlowStore';
import { UserStar, Tag, Palette, Sparkles } from 'lucide-react';
import NodeWrapper from './components/NodeWrapper';
import NodeHeader from './components/NodeHeader';
import NodeField from './components/NodeField';
import NodeInput from './components/NodeInput';
import NodeTextarea from './components/NodeTextarea';

export default function CharacterNode({ data, id, selected }: NodeProps<CharacterNode>) {
   const updateNode = useFlowStore((state) => state.updateNode);

   return (
      <NodeWrapper selected={selected} minWidth={300} minHeight={300} locked={data.locked}>
         <NodeHeader icon={UserStar} label="Character / Identity" color="blue" />

         <div className="flex flex-col gap-2 grow">
            {/* name */}
            <NodeField icon={Tag} label="Name">
               <NodeInput
                  accentColor="blue"
                  placeholder="Character name..."
                  value={data.name}
                  onChange={(e) => updateNode(id, { name: e.target.value })}
               />
            </NodeField>

            {/* style */}
            <NodeField icon={Palette} label="Style">
               <NodeInput
                  accentColor="blue"
                  placeholder="e.g. Cinematic, Anime..."
                  value={data.style}
                  onChange={(e) => updateNode(id, { style: e.target.value })}
               />
            </NodeField>

            {/* appearance */}
            <NodeField icon={Sparkles} label="Appearance" className="grow">
               <NodeTextarea
                  accentColor="blue"
                  className="h-full"
                  placeholder="Describe physical traits..."
                  value={data.appearance}
                  onChange={(e) => updateNode(id, { appearance: e.target.value })}
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
