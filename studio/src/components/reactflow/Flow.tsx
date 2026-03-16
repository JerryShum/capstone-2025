import PromptNode from '@/components/reactflow/customnodes/PromptNode';
import useFlowStore from '@/hooks/useFlowStore';
import { calcPosition } from '@/lib/functions/calcPosition';
import type { AppNode } from '@shared';
import {
   Background,
   BackgroundVariant,
   Controls,
   MiniMap,
   Panel,
   ReactFlow,
   useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Clapperboard, Film, ScrollText, Trees, UserStar } from 'lucide-react';
import { useShallow } from 'zustand/shallow';
import CharacterNode from './customnodes/CharacterNode';
import EnvironmentNode from './customnodes/EnvironmentNode';
import SceneNode from './customnodes/SceneNode';
import ScriptNode from './customnodes/ScriptNode';
import useUndoRedo from '@/hooks/useUndoRedo';
import IconMenu from './panels/PanelMenu';
import NodeButton from './panels/NodeButton';
import { useCallback, useEffect, useRef, useState } from 'react';
import ContextMenu from './contextmenu/ContextMenu';
import UndoRedoPanel from './panels/UndoRedoPanel';

export default function Flow() {
   //! USING ZUSTAND STORE TO GET NODES, STATE, FUNCTIONS, ETC.

   const {
      nodes,
      edges,
      onNodesChange,
      onEdgesChange,
      onConnect,
      addNode,
      resumeVideoPoll,
      takeSnapshot,
      stitchVideos,
   } = useFlowStore(
      useShallow((state) => ({
         nodes: state.nodes,
         edges: state.edges,
         onNodesChange: state.onNodesChange,
         onEdgesChange: state.onEdgesChange,
         onConnect: state.onConnect,
         addNode: state.addNode,
         resumeVideoPoll: state.resumeVideoPoll,
         takeSnapshot: state.takeSnapshot,
         stitchVideos: state.stitchVideos,
      })),
   );

   useUndoRedo();

   // Stitch state
   const [isStitching, setIsStitching] = useState(false);
   const [stitchResult, setStitchResult] = useState<string | null>(null);

   async function handleStitchVideos() {
      setIsStitching(true);
      setStitchResult(null);
      try {
         const url = await stitchVideos();
         if (url) {
            setStitchResult(url);
         } else {
            alert('Stitch failed — make sure all scenes have READY status and at least 2 are connected.');
         }
      } finally {
         setIsStitching(false);
      }
   }

   //! THIS DEFINES ALL THE TYPES OF NDOES THAT RF EXPECTS --> if there is a node that ISN'T one of these types --> revert to default node
   const nodeTypes = {
      prompt: PromptNode,
      character: CharacterNode,
      script: ScriptNode,
      environment: EnvironmentNode,
      scene: SceneNode,
   };

   //---------------------------------------------------------
   const reactFlow = useReactFlow();
   const proOptions = { hideAttribution: true };

   //---------------------------------------------------------

   //@ when this component mounts (loads) --> call the resumeVideoPoll() function.
   // this checks our sceneNodes to see if any of them were in the middle of a generation --> if they were, we continue it.
   useEffect(() => {
      console.log('call poll video using useEffect');
      resumeVideoPoll();
   });

   //---------------------------------------------------------
   //! Context Menu
   const ref = useRef(null);

   interface MenuState {
      id?: string;
      top?: number;
      left?: number;
      right?: number;
      bottom?: number;
      position?: { x: number; y: number };
   }

   const [menu, setMenu] = useState<MenuState | null>(null);

   //# Right click node event
   const onNodeContextMenu = useCallback(
      (event: React.MouseEvent, node: AppNode) => {
         // Prevent native context menu from showing
         event.preventDefault();
         setMenu({
            id: node.id,
            top: event.clientY,
            left: event.clientX,
            right: undefined,
            bottom: undefined,
         });

         console.log('right click detected --> NodeContextmenu was fired');
      },
      [setMenu],
   );

   //# Right click pane event (background) --> maybe delete if we dont want this functionality

   const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

   // const onPaneContextMenu = useCallback(
   //    (event) => {
   //       event.preventDefault();

   //       setMenu({
   //          id: undefined,
   //          top: event.clientY,
   //          left: event.clientX,
   //          right: undefined,
   //          bottom: undefined,
   //       });

   //       console.log('right click on pane');
   //    },
   //    [setMenu],
   // );

   return (
      <div style={{ width: '100vw', height: '100vh' }}>
         <ReactFlow
            ref={ref}
            nodeTypes={nodeTypes}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            proOptions={proOptions}
            // triggers when right clicking on a node
            onNodeContextMenu={onNodeContextMenu}
            // onPaneContextMenu={onPaneContextMenu}
            onPaneClick={onPaneClick}
            onMoveStart={onPaneClick}
            onNodeDragStart={() => takeSnapshot()}
            onSelectionDragStart={() => takeSnapshot()}
         >
            {/* Background */}
            <Background
               color="#c7c7c7"
               variant={BackgroundVariant.Dots}
               size={3}
               gap={40}
            />
            <Controls />
            <MiniMap />
            {/*  --------------------Context Menu------------------------ */}
            {/* When menu is NOT null (i.e when someone right clicks on the background or on a node --> render the ContextMenu) */}
            {menu && <ContextMenu {...menu} onClick={onPaneClick} />}

            {/* --------------------Panels------------------------ */}
            <Panel position="top-right">
               <UndoRedoPanel />
            </Panel>
            <Panel position="top-left">
               <IconMenu />
            </Panel>
            <Panel
               position="bottom-center"
               className="flex items-center justify-center gap-2 bg-background/80 backdrop-blur-md border border-border p-3 rounded-xl shadow-md mb-4 shadow-zinc-400"
            >
               <NodeButton
                  tooltiptext="Script Node"
                  Icon={ScrollText}
                  onClickFunction={() => {
                     addNode('script', calcPosition(reactFlow));
                  }}
               />
               <NodeButton
                  tooltiptext="Character Node"
                  Icon={UserStar}
                  onClickFunction={() => {
                     addNode('character', calcPosition(reactFlow));
                  }}
               />
               <NodeButton
                  tooltiptext="Environment Node"
                  Icon={Trees}
                  onClickFunction={() => {
                     addNode('environment', calcPosition(reactFlow));
                  }}
               />
               <NodeButton
                  tooltiptext="Scene Node"
                  Icon={Clapperboard}
                  onClickFunction={() => {
                     addNode('scene', calcPosition(reactFlow));
                  }}
               />
               <div className="w-px h-8 bg-border mx-1" />
               {/* Stitch button */}
               <button
                  onClick={handleStitchVideos}
                  disabled={isStitching}
                  title="Stitch all READY clips into one video"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors"
               >
                  <Film className="h-4 w-4" />
                  {isStitching ? 'Stitching...' : 'Stitch Video'}
               </button>
            </Panel>

            {/* Stitch Result Dialog */}
            {stitchResult && (
               <Panel position="top-left" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
                  <div className="bg-background border border-border rounded-2xl shadow-2xl p-6 w-[480px]">
                     <h2 className="text-lg font-bold mb-3">🎬 Stitched Video Ready</h2>
                     <video
                        src={stitchResult}
                        controls
                        className="w-full rounded-lg mb-4 max-h-64 object-contain bg-black"
                     />
                     <div className="flex gap-2">
                        <a
                           href={stitchResult}
                           target="_blank"
                           rel="noreferrer"
                           className="flex-1 text-center py-2 px-4 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium"
                        >
                           Open in New Tab
                        </a>
                        <button
                           onClick={() => setStitchResult(null)}
                           className="py-2 px-4 rounded-lg border border-border text-sm font-medium hover:bg-accent"
                        >
                           Close
                        </button>
                     </div>
                  </div>
               </Panel>
            )}
            <Panel position="center-left">
               <div></div>
            </Panel>
         </ReactFlow>
      </div>
   );
}
