import useFlowStore from '@/hooks/useFlowStore';
import { useProfanityCheck } from '@/hooks/useProfanityCheck';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { Mountain, Clock, Cloud, Zap, AlignLeft, Trees } from 'lucide-react';
import type { EnvironmentNodeData } from '@shared';
import NodeWrapper from './components/NodeWrapper';
import NodeHeader from './components/NodeHeader';
import NodeField from './components/NodeField';
import NodeInput from './components/NodeInput';
import NodeTextarea from './components/NodeTextarea';
import NodeSelect from './components/NodeSelect';

export default function EnvironmentNode({ data, id, selected }: NodeProps) {
   const updateNode = useFlowStore((state) => state.updateNode);
   const { hasProfanity } = useProfanityCheck();
   const envData = data as EnvironmentNodeData;

   const locationProfane = hasProfanity(envData.location);
   const lightingProfane = hasProfanity(envData.lightingStyle);
   const descriptionProfane = hasProfanity(envData.description);

   const handleChange = (field: keyof EnvironmentNodeData, value: string) => {
      updateNode(id, { [field]: value });
   };

   return (
      <NodeWrapper selected={selected} minWidth={300} minHeight={350} locked={!!data.locked}>
         <NodeHeader icon={Trees} label="Environment / Setting" color="emerald" />

         <div className="flex flex-col gap-2 grow">
            <NodeField
               icon={Mountain}
               label="Location"
               error={locationProfane ? 'Profanity detected and is not allowed' : null}
            >
               <NodeInput
                  accentColor="emerald"
                  placeholder="e.g. Neo-Tokyo, Deep Space..."
                  defaultValue={envData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
               />
            </NodeField>

            <div className="grid grid-cols-2 gap-3">
               {/* time of day */}
               <NodeField icon={Clock} label="Time of Day">
                  <NodeSelect
                     accentColor="emerald"
                     defaultValue={envData.timeOfDay}
                     onChange={(e) => handleChange('timeOfDay', e.target.value)}
                  >
                     <option value="Morning">Morning</option>
                     <option value="Afternoon">Afternoon</option>
                     <option value="Sunset">Sunset</option>
                     <option value="Night">Night</option>
                  </NodeSelect>
               </NodeField>

               {/* weather */}
               <NodeField icon={Cloud} label="Weather">
                  <NodeSelect
                     accentColor="emerald"
                     defaultValue={envData.weather}
                     onChange={(e) => handleChange('weather', e.target.value)}
                  >
                     <option value="Clear">Clear</option>
                     <option value="Rainy">Rainy</option>
                     <option value="Foggy">Foggy</option>
                     <option value="Snowy">Snowy</option>
                  </NodeSelect>
               </NodeField>
            </div>

            <NodeField
               icon={Zap}
               label="Lighting Style"
               error={lightingProfane ? 'Profanity detected and is not allowed' : null}
            >
               <NodeInput
                  accentColor="emerald"
                  placeholder="e.g. Neon, Cinematic, Golden Hour..."
                  defaultValue={envData.lightingStyle}
                  onChange={(e) => handleChange('lightingStyle', e.target.value)}
               />
            </NodeField>

            <NodeField
               icon={AlignLeft}
               label="Detailed Description"
               className="grow"
               error={descriptionProfane ? 'Profanity detected and is not allowed' : null}
            >
               <NodeTextarea
                  accentColor="emerald"
                  mono
                  className="h-full"
                  placeholder="Describe the environment in detail..."
                  defaultValue={envData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
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
