import useFlowStore from '@/hooks/useFlowStore';
import { useProfanityCheck } from '@/hooks/useProfanityCheck';
import { canExtendScene } from '@/lib/functions/graphUtils';
import type { SceneNode } from '@shared';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import {
   AlertCircle,
   Camera,
   CheckCircle2,
   Clapperboard,
   Clock,
   Image as ImageIcon,
   Loader2,
   MessageSquareQuote,
   Move,
   Play,
   Type,
   Layers,
} from 'lucide-react';
import { useEffect } from 'react';
import NodeWrapper from './components/NodeWrapper';
import NodeHeader from './components/NodeHeader';
import NodeField from './components/NodeField';
import NodeTextarea from './components/NodeTextarea';
import NodeSelect from './components/NodeSelect';

export default function SceneNode({
   data,
   id,
   selected,
}: NodeProps<SceneNode>) {
   const updateNode = useFlowStore((state) => state.updateNode);
   const { hasProfanity } = useProfanityCheck();
   const generateVideo = useFlowStore((state) => state.generateVideo);

   const isProfane = hasProfanity(data.scenePrompt);
   const nodes = useFlowStore((state) => state.nodes);
   const edges = useFlowStore((state) => state.edges);

   // canExtend --> derived state by calling the canExtendScene() function from graphUtils.ts
   const canExtend = canExtendScene(id, nodes, edges);

   // useEffect --> checks on mount / re-render if the data.canExtend state is actually different from the derived canExtend function state
   // this might happen if the user disconnects the parentSceneNode and can't toggle the button
   useEffect(() => {
      console.log('testing can extend');
      if (!canExtend && data.canExtend) {
         updateNode(id, { canExtend: false });
         ('testing can extend 2');
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

   const statusSlot = (
      <div
         className={`flex items-center gap-1 text-[10px] font-bold uppercase ${getStatusColor()}`}
      >
         {getStatusIcon()}
         <span>{data.status}</span>
      </div>
   );

   return (
      <NodeWrapper
         selected={selected}
         minWidth={400}
         minHeight={520}
         keepAspectRatio
         locked={!!data.locked}
      >
         <NodeHeader
            icon={Clapperboard}
            label="Scene / Shot"
            color="purple"
            rightSlot={statusSlot}
         />

         <div className="flex flex-col gap-2 grow overflow-hidden">
            {/* scene prompt */}
            <NodeField
               icon={Type}
               label="Scene Prompt"
               error={
                  isProfane ? 'Profanity detected and is not allowed' : null
               }
            >
               <NodeTextarea
                  accentColor="purple"
                  className="min-h-[60px]"
                  placeholder="Describe the action and visuals..."
                  value={data.scenePrompt}
                  onChange={(e) =>
                     updateNode(id, { scenePrompt: e.target.value })
                  }
               />
            </NodeField>

            <div className="grid grid-cols-2 gap-3">
               {/* duration – disabled/locked */}
               <NodeField
                  icon={Clock}
                  label="Duration (s)"
                  className="opacity-60"
               >
                  <div className="relative">
                     <input
                        type="number"
                        className="w-full text-sm text-slate-700 p-2 bg-slate-50/60 border-2 border-slate-50 rounded-lg outline-none font-medium cursor-not-allowed"
                        value={8}
                        disabled
                     />
                  </div>
               </NodeField>

               {/* shot type */}
               <NodeField icon={Camera} label="Shot Type">
                  <NodeSelect
                     accentColor="purple"
                     value={data.shotType}
                     onChange={(e) =>
                        updateNode(id, { shotType: e.target.value as any })
                     }
                  >
                     <option value="Wide">Wide</option>
                     <option value="Medium">Medium</option>
                     <option value="Close-up">Close-up</option>
                     <option value="Over-the-shoulder">OTS</option>
                  </NodeSelect>
               </NodeField>
            </div>

            {/* camera movement */}
            <NodeField icon={Move} label="Camera Movement">
               <NodeSelect
                  accentColor="purple"
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
               </NodeSelect>
            </NodeField>

            {/* Extend Previous Scene Toggle */}
            <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border-2 border-slate-50">
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
            <div className="flex flex-col gap-1 grow min-h-[140px]">
               <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                  <ImageIcon size={10} /> Media Preview
               </label>
               <div className="relative w-full grow bg-slate-50 border-2 border-slate-50 rounded-lg overflow-hidden group">
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900/5">
                     {data.videoURL && data.videoURL !== 'https://...' ? (
                        <video
                           src={data.videoURL}
                           controls
                           className="w-full h-full object-contain bg-black"
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
            </div>

            {/* Refinement Feedback — Visible in all states, disabled in IDLE */}
            <NodeField
               icon={MessageSquareQuote}
               label="Refinement Feedback"
               className={
                  data.status === 'IDLE' || data.status === 'PROCESSING'
                     ? 'opacity-50 grayscale-[50%]'
                     : ''
               }
            >
               <NodeTextarea
                  accentColor="emerald"
                  className="min-h-[52px]"
                  placeholder={
                     data.status === 'IDLE'
                        ? 'Generate a video first to provide feedback...'
                        : "What should change? (e.g. 'More dramatic lighting', 'Slower camera pan')"
                  }
                  value={data.feedback ?? ''}
                  onChange={(e) => updateNode(id, { feedback: e.target.value })}
                  disabled={
                     data.status === 'IDLE' || data.status === 'PROCESSING'
                  }
               />
            </NodeField>

            {/* Generate Button — STATUS IS IDLE */}
            {data.status === 'IDLE' && (
               <button
                  onClick={() => generateVideo(id)}
                  className="group relative w-full flex items-center justify-center gap-2 py-3 px-4 bg-purple-600 border-2 border-slate-900 rounded-xl text-white font-bold uppercase tracking-widest text-[10px] transition-all hover:bg-purple-700 hover:cursor-pointer disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed"
               >
                  <>
                     <Play size={16} fill="white" />
                     Generate Video
                  </>
               </button>
            )}
            {/* STATUS IS PROCESSING */}
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
            {/* STATUS IS ERROR */}
            {data.status === 'ERROR' && (
               <button
                  onClick={() => generateVideo(id)}
                  className="group relative w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-600 border-2 border-slate-900 rounded-xl text-white font-bold uppercase tracking-widest text-[10px] transition-all hover:bg-red-700 hover:cursor-pointer"
               >
                  <>
                     <AlertCircle size={16} />
                     Retry Generation
                  </>
               </button>
            )}
            {/* STATUS IS READY — Regenerate */}
            {data.status === 'READY' && (
               <button
                  onClick={() => generateVideo(id)}
                  className="group relative w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 border-2 border-slate-900 rounded-xl text-white font-bold uppercase tracking-widest text-[10px] transition-all hover:bg-emerald-700 hover:cursor-pointer"
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
            className="bg-slate-900 border-2 border-white"
            style={{ width: '12px', height: '12px' }}
         />
      </NodeWrapper>
   );
}
