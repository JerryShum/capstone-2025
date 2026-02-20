import { Handle, Position } from '@xyflow/react';
import type { CharacterNode, httpsURL } from '@/lib/types';
import type { NodeProps } from '@xyflow/react';
import useFlowStore from '@/hooks/useFlowStore';

// We are getting props from NodeProps --> NodeProps is getting the "CharacterNode" props
export default function CharacterNode({ data, id }: NodeProps<CharacterNode>) {
   //! Data is going to be how the "state" of a node is saved
   // data.name --> how we save the state of this node's character name

   const isValidURL =
      !data.referenceImage || data.referenceImage.startsWith('https://');

   const updateNode = useFlowStore((state) => state.updateNode);
   return (
      <div className="bg-white border-2 border-slate-900 rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] min-w-[240px] flex flex-col gap-3 font-sans">
         <Handle
            type="target"
            position={Position.Top}
            className="w-3 h-3 bg-slate-900 border-2 border-white"
         />

         <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Character Profile
         </div>

         <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700">Name</label>
            <input
               className="w-full text-sm p-2 border-2 border-slate-100 rounded-lg focus:border-blue-500 outline-none transition-colors"
               placeholder="Character name..."
               value={data.name}
               onChange={(e) => updateNode(id, { name: e.target.value })}
            />
         </div>

         <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700">
               Style
            </label>
            <input
               className="w-full text-sm p-2 border-2 border-slate-100 rounded-lg focus:border-blue-500 outline-none transition-colors"
               placeholder="e.g. Cinematic, Anime..."
               value={data.style}
               onChange={(e) => updateNode(id, { style: e.target.value })}
            />
         </div>
         <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700">
               Appearance
            </label>
            <input
               className="w-full text-sm p-2 border-2 border-slate-100 rounded-lg focus:border-blue-500 outline-none transition-colors"
               placeholder="e.g. Cinematic, Anime..."
               value={data.appearance}
               onChange={(e) => updateNode(id, { appearance: e.target.value })}
            />
         </div>

         <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700">
               Reference Image URL
            </label>
            <input
               className={`w-full text-sm p-2 border-2 border-slate-100 rounded-lg focus:border-blue-500 outline-none transition-colors ${!isValidURL ? 'border-red-500 focus:border-red-500' : 'border-slate-100'}`}
               placeholder="https://..."
               type="url"
               pattern="https://.*"
               value={data.referenceImage}
               onChange={(e) =>
                  updateNode(id, { referenceImage: e.target.value as httpsURL })
               }
            />
         </div>

         <Handle
            type="source"
            position={Position.Bottom}
            className="w-3 h-3 bg-slate-900 border-2 border-white"
         />
      </div>
   );
}
