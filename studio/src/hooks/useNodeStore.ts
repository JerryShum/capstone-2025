import { create } from 'zustand';
import { addEdge, applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import { devtools } from 'zustand/middleware';

//! Defining reactflow AppState
import {
   type Edge,
   type Node,
   type OnNodesChange,
   type OnEdgesChange,
   type OnConnect,
} from '@xyflow/react';

export type AppNode = Node;

export type AppState = {
   nodes: AppNode[];
   edges: Edge[];
   onNodesChange: OnNodesChange<AppNode>;
   onEdgesChange: OnEdgesChange;
   onConnect: OnConnect;
   setNodes: (nodes: AppNode[]) => void;
   setEdges: (edges: Edge[]) => void;
};

const initialEdges = [
   { id: 'e1-2', source: '1', target: '2' },
   { id: 'e2-3', source: '2', target: '3' },
] as Edge[];

const initialNodes = [
   {
      id: '1',
      type: 'input',
      data: { label: 'Input' },
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
const useNodeStore = create<AppState>()(
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

export default useNodeStore;

//# Example
// export const useStore = create((set) => ({
//    bears: 0,
//$   increasePopulation: function that takes in 0 parameters --> calls the set() function --> set accesses the state --> and returns a new state where bears = state.bears + 1
//    increasePopulation: () => set((state) => ({ bears: state.bears + 1 }))
//    removeAllBears: () => set({ bears: 0 }),
// }));
