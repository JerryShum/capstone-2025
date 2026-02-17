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

   const nodeTypes = {
      prompt: PromptNode,
   };

   const proOptions = { hideAttribution: true };

   return (
      <div style={{ width: '100vw', height: '100vh' }}>
         <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            proOptions={proOptions}
            nodeTypes={nodeTypes}
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
