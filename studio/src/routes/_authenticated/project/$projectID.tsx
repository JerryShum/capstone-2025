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
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

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

const initialNodes = [
   { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
   { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
];
const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];

function RouteComponent() {
   const [nodes, setNodes] = useState(initialNodes);
   const [edges, setEdges] = useState(initialEdges);

   const onNodesChange = useCallback(
      (changes) =>
         setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
      [],
   );
   const onEdgesChange = useCallback(
      (changes) =>
         setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
      [],
   );
   const onConnect = useCallback(
      (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
      [],
   );
   const { projectID } = Route.useParams();

   return (
      <div style={{ width: '100vw', height: '100vh' }}>
         <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
         >
            <Background color="#ccc" variant={BackgroundVariant.Dots} />
            <Controls />
            <MiniMap />
         </ReactFlow>
      </div>
   );
}
