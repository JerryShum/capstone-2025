import PromptNode from '@/components/reactflow/customnodes/PromptNode';
import useFlowStore from '@/hooks/useFlowStore';
import { calcPosition } from '@/lib/functions/calcPosition';
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
import { Clapperboard, ScrollText, Trees, UserStar } from 'lucide-react';
import { useShallow } from 'zustand/shallow';
import CharacterNode from './customnodes/CharacterNode';
import EnvironmentNode from './customnodes/EnvironmentNode';
import ScriptNode from './customnodes/ScriptNode';
import BackButton from './panels/BackButton';
import NodeButton from './panels/NodeButton';

export default function Flow({ props }) {
   //! USING ZUSTAND STORE TO GET NODES, STATE, FUNCTIONS, ETC.

   const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } =
      useFlowStore(
         useShallow((state) => ({
            nodes: state.nodes,
            edges: state.edges,
            onNodesChange: state.onNodesChange,
            onEdgesChange: state.onEdgesChange,
            onConnect: state.onConnect,
            addNode: state.addNode,
         })),
      );

   //! THIS DEFINES ALL THE TYPES OF NDOES THAT RF EXPECTS --> if there is a node that ISN'T one of these types --> revert to default node
   const nodeTypes = {
      prompt: PromptNode,
      character: CharacterNode,
      script: ScriptNode,
      environment: EnvironmentNode,
   };

   //---------------------------------------------------------
   const reactFlow = useReactFlow();

   const proOptions = { hideAttribution: true };

   return (
      <div style={{ width: '100vw', height: '100vh' }}>
         <ReactFlow
            nodeTypes={nodeTypes}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            proOptions={proOptions}
         >
            <Background
               color="#c7c7c7"
               variant={BackgroundVariant.Dots}
               size={3}
               gap={40}
            />
            <Controls />
            <MiniMap />
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
            </Panel>
            <Panel position="top-left">
               <BackButton />
            </Panel>
            <Panel position="center-left">
               <div></div>
            </Panel>
         </ReactFlow>
      </div>
   );
}
