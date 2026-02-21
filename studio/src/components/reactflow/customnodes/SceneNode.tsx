import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { SceneNode } from '@/lib/types';
import useFlowStore from '@/hooks/useFlowStore';
import {
   Clapperboard,
   Type,
   Clock,
   Camera,
   Move,
   Play,
   Image as ImageIcon,
   Loader2,
   AlertCircle,
   CheckCircle2,
} from 'lucide-react';

export default function SceneNode({ data, id }: NodeProps<SceneNode>) {
   const updateNode = useFlowStore((state) => state.updateNode);

   const getStatusIcon = () => {
      switch (data.status) {
         case 'PROCESSING':
            return <Loader2 size={14} className="animate-spin text-blue-500" />;
         case 'READY':
            return <CheckCircle2 size={14} className="text-emerald-500" />;
         case 'ERROR':
            return <AlertCircle size={14} className="text-red-500" />;
         default:
            return null;
      }
   };

   const getStatusColor = () => {
      switch (data.status) {
         case 'PROCESSING':
            return 'text-blue-500';
         case 'READY':
            return 'text-emerald-500';
         case 'ERROR':
            return 'text-red-500';
         default:
            return 'text-slate-400';
      }
   };

   return (
      <div className="bg-white border-2 border-slate-900 rounded-xl p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-w-[400px] flex flex-col gap-3 font-sans">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-purple-500">
               <Clapperboard size={14} />
               <span>Scene / Shot</span>
            </div>
            <div
               className={`flex items-center gap-1 text-[10px] font-bold uppercase ${getStatusColor()}`}
            >
               {getStatusIcon()}
               <span>{data.status}</span>
            </div>
         </div>

         <div className="flex flex-col gap-2">
            {/* scene prompt */}
            <div className="flex flex-col gap-1">
               <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                  <Type size={10} /> Scene Prompt
               </label>
               <textarea
                  className="w-full text-sm p-2 border-2 border-slate-100 rounded-lg focus:border-purple-500 outline-none transition-colors font-medium min-h-[60px] resize-none"
                  placeholder="Describe the action and visuals..."
                  value={data.scenePrompt}
                  onChange={(e) =>
                     updateNode(id, { scenePrompt: e.target.value })
                  }
               />
            </div>

            <div className="grid grid-cols-2 gap-3">
               {/* duration */}
               <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                     <Clock size={10} /> Duration (s)
                  </label>
                  <input
                     type="number"
                     className="w-full text-sm p-2 border-2 border-slate-100 rounded-lg focus:border-purple-500 outline-none transition-colors font-medium"
                     min={1}
                     max={30}
                     value={data.duration}
                     onChange={(e) =>
                        updateNode(id, {
                           duration: parseInt(e.target.value) || 0,
                        })
                     }
                  />
               </div>

               {/* shot type */}
               <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                     <Camera size={10} /> Shot Type
                  </label>
                  <select
                     className="w-full text-sm p-2 border-2 border-slate-100 rounded-lg focus:border-purple-500 outline-none transition-colors bg-white font-medium"
                     value={data.shotType}
                     onChange={(e) =>
                        updateNode(id, { shotType: e.target.value as any })
                     }
                  >
                     <option value="Wide">Wide</option>
                     <option value="Medium">Medium</option>
                     <option value="Close-up">Close-up</option>
                     <option value="Over-the-shoulder">OTS</option>
                  </select>
               </div>
            </div>

            {/* camera movement */}
            <div className="flex flex-col gap-1">
               <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                  <Move size={10} /> Camera Movement
               </label>
               <select
                  className="w-full text-sm p-2 border-2 border-slate-100 rounded-lg focus:border-purple-500 outline-none transition-colors bg-white font-medium"
                  value={data.cameraMovement}
                  onChange={(e) =>
                     updateNode(id, { cameraMovement: e.target.value as any })
                  }
               >
                  <option value="Static">Static</option>
                  <option value="Pan">Pan</option>
                  <option value="Tilt">Tilt</option>
                  <option value="Zoom">Zoom</option>
                  <option value="Dolly">Dolly</option>
               </select>
            </div>

            {/* Media Display */}
            <div className="flex flex-col gap-1">
               <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                  <ImageIcon size={10} /> Media Preview
               </label>
               <div className="relative w-full aspect-video bg-slate-50 border-2 border-slate-100 rounded-lg overflow-hidden flex items-center justify-center group">
                  {data.videoURL && data.videoURL !== 'https://...' ? (
                     <video
                        src={data.videoURL}
                        controls
                        className="w-full h-full object-cover"
                        poster={
                           data.thumbnailURL !== 'https://...'
                              ? data.thumbnailURL
                              : undefined
                        }
                     />
                  ) : data.thumbnailURL &&
                     data.thumbnailURL !== 'https://...' ? (
                     <img
                        src={data.thumbnailURL}
                        alt="Scene Thumbnail"
                        className="w-full h-full object-cover"
                     />
                  ) : (
                     <div className="flex flex-col items-center justify-center gap-2 text-slate-300">
                        <ImageIcon size={24} />
                        <span className="text-[10px] uppercase font-bold tracking-wider">
                           No Media
                        </span>
                     </div>
                  )}
               </div>
            </div>

            {/* Generate Button */}
            <button
               disabled={data.status === 'PROCESSING'}
               onClick={() => updateNode(id, { status: 'PROCESSING' })}
               className="group relative w-full flex items-center justify-center gap-2 py-3 px-4 bg-purple-600 border-2 border-slate-900 rounded-xl text-white font-bold uppercase tracking-widest text-[10px] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-200 disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0"
            >
               {data.status === 'PROCESSING' ? (
                  <>
                     <Loader2 size={16} className="animate-spin" />
                     Generating...
                  </>
               ) : (
                  <>
                     <Play size={16} fill="white" />
                     Generate Video
                  </>
               )}
            </button>
         </div>


         <Handle
            type="target"
            position={Position.Left}
            className="bg-slate-900 border-2 border-white"
            style={{ width: '12px', height: '12px' }}
         />
         <Handle
            type="source"
            position={Position.Right}
            className="bg-slate-900 border-2 border-white "
            style={{ width: '12px', height: '12px' }}
         />
      </div>
   );
}
