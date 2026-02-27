import { Handle, Position } from '@xyflow/react';
import type { CharacterNode, httpsURL } from '@/lib/flowTypes';
import type { NodeProps } from '@xyflow/react';
import useFlowStore from '@/hooks/useFlowStore';
import {
   UserStar,
   Tag,
   Palette,
   Sparkles,
   Image as ImageIcon,
} from 'lucide-react';

export default function CharacterNode({ data, id }: NodeProps<CharacterNode>) {
   const isValidURL =
      !data.referenceImage || data.referenceImage.startsWith('https://');

   const updateNode = useFlowStore((state) => state.updateNode);

   return (
      <div className="bg-white border-2 border-slate-900 rounded-xl p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-w-[240px] flex flex-col gap-3 font-sans">
         <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-blue-500">
            <UserStar size={14} />
            <span>Character / Identity</span>
         </div>

         <div className="flex flex-col gap-2">
            {/* name */}
            <div className="flex flex-col gap-1">
               <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                  <Tag size={10} /> Name
               </label>
               <input
                  className="w-full text-sm p-2 border-2 border-slate-100 rounded-lg focus:border-blue-500 outline-none transition-colors font-medium"
                  placeholder="Character name..."
                  value={data.name}
                  onChange={(e) => updateNode(id, { name: e.target.value })}
               />
            </div>

            {/* style */}
            <div className="flex flex-col gap-1">
               <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                  <Palette size={10} /> Style
               </label>
               <input
                  className="w-full text-sm p-2 border-2 border-slate-100 rounded-lg focus:border-blue-500 outline-none transition-colors font-medium"
                  placeholder="e.g. Cinematic, Anime..."
                  value={data.style}
                  onChange={(e) => updateNode(id, { style: e.target.value })}
               />
            </div>

            {/* appearance */}
            <div className="flex flex-col gap-1">
               <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                  <Sparkles size={10} /> Appearance
               </label>
               <textarea
                  className="w-full text-sm p-2 border-2 border-slate-100 rounded-lg focus:border-blue-500 outline-none transition-colors font-medium min-h-[50px] resize-none"
                  placeholder="Describe physical traits..."
                  value={data.appearance}
                  onChange={(e) =>
                     updateNode(id, { appearance: e.target.value })
                  }
               />
            </div>

            {/* reference image */}
            <div className="flex flex-col gap-1">
               <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                  <ImageIcon size={10} /> Reference Image URL
               </label>
               <input
                  className={`w-full text-sm p-2 border-2 rounded-lg focus:border-blue-500 outline-none transition-colors font-medium ${
                     !isValidURL
                        ? 'border-red-500 text-red-500'
                        : 'border-slate-100'
                  }`}
                  placeholder="https://..."
                  type="url"
                  value={data.referenceImage}
                  onChange={(e) =>
                     updateNode(id, {
                        referenceImage: e.target.value as httpsURL,
                     })
                  }
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
