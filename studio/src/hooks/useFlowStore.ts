import { create } from 'zustand';
import { addEdge, applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import type { Edge } from '@xyflow/react';
import { devtools } from 'zustand/middleware';
import type { FlowState, AppNode } from '@/lib/types';

const initialEdges = [
   { id: 'e1-2', source: '1', target: '2' },
   { id: 'e2-3', source: '2', target: '3' },
] as Edge[];

const initialNodes = [
   {
      id: '1',
      type: 'character',
      data: {
         type: 'character',
         name: 'barry',
         style: 'pixelated cartoon chicken',
         appearance: 'pixelated chicken, yellow hair, big blue eyes',
      },
      position: { x: 250, y: 25 },
   },
   {
      id: '2',
      type: 'script',
      data: {
         type: 'script',
         name: 'barry',
         visuals: 'pixelated chicken, yellow hair, big blue eyes',
      },
      position: { x: 250, y: 25 },
   },
] as AppNode[];

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useFlowStore = create<FlowState>()(
   devtools((set, get) => ({
      nodes: initialNodes,
      edges: initialEdges,
      onNodesChange: (changes) => {
         set({
            nodes: applyNodeChanges(changes, get().nodes),
         });
      },
      onEdgesChange: (changes) => {
         set({
            edges: applyEdgeChanges(changes, get().edges),
         });
      },
      onConnect: (connection) => {
         set({
            edges: addEdge(connection, get().edges),
         });
      },
      setNodes: (nodes) => {
         set({ nodes });
      },
      setEdges: (edges) => {
         set({ edges });
      },
   })),
);

export default useFlowStore;
