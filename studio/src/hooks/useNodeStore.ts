import { create } from 'zustand';

type CounterStore = {
   nodes: {
      id: string;
      position: { x: number; y: number };
      data: { label: string };
   }[];
   edges: { id: string; source: string; target: string }[];
};

export const useNodeStore = create((set) => ({
   nodes: [
      { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
      { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
   ],
   edges: [{ id: 'n1-n2', source: 'n1', target: 'n2' }],
   //! pass in node --> set state by adding node to nodes array
   addNode: (newNode) => set((state) => ({ nodes: [...state.nodes, newNode] })),
}));
