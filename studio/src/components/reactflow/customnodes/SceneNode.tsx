import useFlowStore from '@/hooks/useFlowStore';
import { canExtendScene } from '@/lib/functions/graphUtils';
import type { SceneNode } from '@shared';
import { checkContentSafety } from '@shared';
import { Handle, Position, type NodeProps, NodeResizer } from '@xyflow/react';
import {
   AlertCircle,
   Camera,
   CheckCircle2,
   Clapperboard,
   Clock,
   Image as ImageIcon,
   Loader2,
   Move,
   Play,
   Type,
   Lock,
   Layers,
} from 'lucide-react';
import { useEffect } from 'react';

export default function SceneNode({ data, id, selected }: NodeProps<SceneNode>) {
   const updateNode = useFlowStore((state) => state.updateNode);
   const generateVideo = useFlowStore((state) => state.generateVideo);
   const nodes = useFlowStore((state) => state.nodes);
   const edges = useFlowStore((state) => state.edges);
   //---------------------------------------------------------'

   // canExtend --> derived state by calling the canExtendScene() function from graphUtils.ts
   const canExtend = canExtendScene(id, nodes, edges);
   const safetyResult = checkContentSafety(data.scenePrompt);

   // useEffect --> checks on mount / re-render if the data.canExtend state is actually differnt from the derived canExtend function state
   // this might happen if the user disconnects the parentSceneNode and can't toggle the button
   useEffect(() => {
      if (!canExtend && data.canExtend) {
         updateNode(id, { canExtend: false });
      }
   }, [canExtend, data.canExtend, id, updateNode]);

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
      <div className="relative bg-white border-2 border-slate-900 rounded-xl p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-w-[400px] min-h-[450px] flex flex-col gap-3 font-sans w-full h-full">
         <NodeResizer 
            minWidth={400} 
            minHeight={450} 
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
               <label className={`text-[10px] font-bold uppercase flex items-center gap-1 ${safetyResult.isSafe ? 'text-slate-400' : 'text-red-500'}`}>
                  <Type size={10} /> Scene Prompt {(!safetyResult.isSafe) && "(Inappropriate content detected)"}
               </label>
               <textarea
                  className={`w-full text-sm p-2 border-2 rounded-lg outline-none transition-colors font-medium min-h-[60px] resize-none ${safetyResult.isSafe ? 'border-slate-100 focus:border-purple-500' : 'border-red-500 bg-red-50 text-red-900 focus:border-red-600'}`}
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

            {/* Extend Previous Scene Toggle */}
            <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border-2 border-slate-100 mt-1">
               <div className="flex items-center gap-2">
                  <Layers
                     size={14}
                     className={
                        canExtend ? 'text-purple-500' : 'text-slate-300'
                     }
                  />
                  <span
                     className={`text-[10px] font-bold uppercase ${canExtend ? 'text-slate-700' : 'text-slate-300'}`}
                  >
                     Extend Previous Scene
                  </span>
               </div>
               <button
                  disabled={!canExtend}
                  onClick={() => updateNode(id, { canExtend: !data.canExtend })}
                  className={`w-10 h-5 rounded-full relative transition-colors ${
                     !canExtend
                        ? 'bg-slate-200 cursor-not-allowed'
                        : data.canExtend
                          ? 'bg-purple-600'
                          : 'bg-slate-300'
                  }`}
               >
                  <div
                     className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${
                        data.canExtend ? 'left-6' : 'left-1'
                     }`}
                  />
               </button>
            </div>

            {data.status === 'ERROR' && data.errorMessage && (
               <div className="flex items-start gap-2 p-2 bg-red-50 border border-red-100 rounded-lg">
                  <AlertCircle
                     size={14}
                     className="text-red-500 shrink-0 mt-0.5"
                  />
                  <p className="text-[10px] text-red-600 font-medium leading-relaxed">
                     {data.errorMessage}
                  </p>
               </div>
            )}

            {/* Media Display */}
            <div className="flex flex-col gap-1 grow min-h-0">
               <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                  <ImageIcon size={10} /> Media Preview
               </label>
               <div className="relative w-full aspect-video bg-slate-100 border-2 border-slate-900/10 rounded-xl overflow-hidden shadow-inner group flex-shrink-0">
                  {data.videoURL && data.videoURL !== 'https://...' ? (
                     <video
                        src={data.videoURL}
                        controls
                        className="w-full h-full object-cover bg-black"
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
                     <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-slate-300 bg-slate-50/50">
                        <div className="relative">
                           <ImageIcon size={24} className="opacity-50" />
                           {data.status === 'PROCESSING' && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                 <Loader2 size={16} className="animate-spin text-purple-500" />
                              </div>
                           )}
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-widest opacity-50">
                           {data.status === 'PROCESSING' ? 'Generating Content...' : 'No Media'}
                        </span>
                     </div>
                  )}
               </div>
            </div>

            {/* Generate Button */}
            {/* STATUS IS IDLE (user has not generated a video) */}
            {data.status === 'IDLE' && (
               <button
                  onClick={() => generateVideo(id)}
                  disabled={!safetyResult.isSafe}
                  className="group relative w-full flex items-center justify-center gap-2 py-3 px-4 bg-purple-600 border-2 border-slate-900 rounded-xl text-white font-bold uppercase tracking-widest text-[10px] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-200 disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0"
               >
                  <>
                     <Play size={16} fill="white" />
                     Generate Video
                  </>
               </button>
            )}
            {/* status is PROCESSING --> show disabled + loader */}
            {data.status === 'PROCESSING' && (
               <button
                  disabled
                  className="group relative w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-100 border-2 border-slate-200 rounded-xl text-slate-400 font-bold uppercase tracking-widest text-[10px] transition-all"
               >
                  <>
                     <Loader2 size={16} className="animate-spin" />
                     Generating Video...
                  </>
               </button>
            )}
            {/* status is ERROR --> show try again button */}
            {data.status === 'ERROR' && (
               <button
                  onClick={() => generateVideo(id)}
                  disabled={!safetyResult.isSafe}
                  className="group relative w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-600 border-2 border-slate-900 rounded-xl text-white font-bold uppercase tracking-widest text-[10px] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-200 disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0"
               >
                  <>
                     <AlertCircle size={16} />
                     Retry Generation
                  </>
               </button>
            )}
            {/* status is READY --> show regenerate button */}
            {data.status === 'READY' && (
               <button
                  onClick={() => generateVideo(id)}
                  disabled={!safetyResult.isSafe}
                  className="group relative w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 border-2 border-slate-900 rounded-xl text-white font-bold uppercase tracking-widest text-[10px] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-200 disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0"
               >
                  <>
                     <Play size={16} fill="white" />
                     Regenerate Video
                  </>
               </button>
            )}
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
