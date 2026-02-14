import { createFileRoute } from '@tanstack/react-router';
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
import useNodeStore from '@/hooks/useNodeStore';
import PromptNode from '@/components/customnodes/PromptNode';

export const Route = createFileRoute('/_authenticated/project/$projectID')({
   component: RouteComponent,
});

//! THIS IS GOING TO BE THE PRIMARY PAGE FOR THE STUDIO
// Here, we will define the entire nodebased canvas and workflow using reactflow
// Steps:
// 1. Retrieve the project state from the DB by searching up the project ID
// 2. Load the project state and re-create it in the app
// 3. User can start work

//@ ---------------------------------------------------

function RouteComponent() {
   //! USING ZUSTAND STORE TO GET NODES, STATE, FUNCTIONS, ETC.
   const nodes = useNodeStore((state) => state.nodes);
   const edges = useNodeStore((state) => state.edges);
   const setNodes = useNodeStore((state) => state.setNodes);
   const onNodesChange = useNodeStore((state) => state.onNodesChange);
   const onEdgesChange = useNodeStore((state) => state.onEdgesChange);
   const onConnect = useNodeStore((state) => state.onConnect);

   const newNode = {
      id: String(nodes.length + 1),
      position: { x: 0, y: 0 },
      data: {
         label: `Node ${nodes.length + 1}`,
      },
   };

   const nodeTypes = {
      prompt: PromptNode,
   };

   const { projectID } = Route.useParams();
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
               <div>
                  <Button
                     className="hover:cursor-pointer"
                     onClick={() => setNodes([...nodes, newNode])}
                  >
                     Add Node
                  </Button>
               </div>
            </Panel>
         </ReactFlow>
      </div>
   );
}
