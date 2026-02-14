import { createFileRoute } from '@tanstack/react-router';
import { useState, useCallback } from 'react';
import {
   ReactFlow,
   applyNodeChanges,
   applyEdgeChanges,
   addEdge,
   Background,
   BackgroundVariant,
   Controls,
   MiniMap,
   Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from '@/components/ui/button';
import { useNodeStore } from '@/hooks/useNodeStore';

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
   // const [nodes, setNodes] = useState(initialNodes);
   // const [edges, setEdges] = useState(initialEdges);

   // const onNodesChange = useCallback(
   //    (changes) =>
   //       setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
   //    [],
   // );
   // const onEdgesChange = useCallback(
   //    (changes) =>
   //       setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
   //    [],
   // );
   // const onConnect = useCallback(
   //    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
   //    [],
   // );
   //! USING ZUSTAND STORE TO GET NODES AND STATE
   const nodes = useNodeStore((state) => state.nodes);
   const edges = useNodeStore((state) => state.edges);

   const { projectID } = Route.useParams();
   const proOptions = { hideAttribution: true };

   // --------------------------------

   // function addNewNode() {
   //    const newNode = {
   //       id: String(nodes.length + 1),
   //       position: { x: 0, y: 0 },
   //       data: { label: `Node ${nodes.length + 1}` },
   //    };

   //    setNodes([...nodes, newNode]);
   // }

   return (
      <div style={{ width: '100vw', height: '100vh' }}>
         <ReactFlow
            nodes={nodes}
            edges={edges}
            // onNodesChange={onNodesChange}
            // onEdgesChange={onEdgesChange}
            // onConnect={onConnect}
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
               <div>
                  <Button className="hover:cursor-pointer">Add Node</Button>
               </div>
            </Panel>
         </ReactFlow>
      </div>
   );
}
