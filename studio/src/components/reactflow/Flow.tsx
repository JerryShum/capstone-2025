import {
   ReactFlow,
   Background,
   BackgroundVariant,
   Controls,
   MiniMap,
   Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from '@/components/ui/button';
import useFlowStore from '@/hooks/useFlowStore';
import PromptNode from '@/components/reactflow/customnodes/PromptNode';
import CharacterNode from './customnodes/CharacterNode';
import { useShallow } from 'zustand/shallow';

export default function Flow({ props }) {
   //! USING ZUSTAND STORE TO GET NODES, STATE, FUNCTIONS, ETC.

   const { nodes, edges, onNodesChange, onEdgesChange, onConnect } =
      useFlowStore(
         useShallow((state) => ({
            nodes: state.nodes,
            edges: state.edges,
            onNodesChange: state.onNodesChange,
            onEdgesChange: state.onEdgesChange,
            onConnect: state.onConnect,
         })),
      );

   //! THIS DEFINES ALL THE TYPES OF NDOES THAT RF EXPECTS --> if there is a node that ISN'T one of these types --> revert to default node
   const nodeTypes = {
      prompt: PromptNode,
      character: CharacterNode,
   };

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
            <Background color="#ccc" variant={BackgroundVariant.Dots} />
            <Controls />
            <MiniMap />
            <Panel
               position="bottom-center"
               className="bg-red-200 h-10 w-lg flex items-center justify-center"
            >
               bottom-center
            </Panel>
            <Panel position="top-left">top-left</Panel>
            <Panel position="center-left">
               <div></div>
            </Panel>
         </ReactFlow>
      </div>
   );
}
