import { create } from 'zustand';
import { addEdge, applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import type { Edge } from '@xyflow/react';
import { devtools } from 'zustand/middleware';
import type { FlowState } from '@/types';

const initialEdges = [
   { id: 'e1-2', source: '1', target: '2' },
   { id: 'e2-3', source: '2', target: '3' },
] as Edge[];

const initialNodes = [
   {
      id: '1',
      type: 'prompt',
      data: { label: 'Prompt Node' },
      position: { x: 250, y: 25 },
   },

   {
      id: '2',
      data: { label: 'Default' },
      position: { x: 100, y: 125 },
   },
   {
      id: '3',
      type: 'output',
      data: { label: 'Output' },
      position: { x: 250, y: 250 },
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
