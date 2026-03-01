import useFlowStore from '@/hooks/useFlowStore';
import { useProjectStore } from '@/hooks/useProjectStore';
import debounce from './functions/debounce';
import type { Edge, Node } from '@xyflow/react';
import type { AppNode } from './flowTypes';

//! Creation of store subscribers --> these subscribe to any updates to their store
// the function runs whenever the store state is updated
export const unsub = useFlowStore.subscribe(
   (state) => [state.nodes, state.edges] as const,
   ([nodes, edges], prevState) => {
      // call debounce function here --> sends the state to the server (after an amount of time after an action occurred)
      debouncedSaveFlow(nodes, edges);
   },
);

export const unsub2 = useProjectStore.subscribe((state, prevState) => {
   console.log(state, prevState);

   console.log(state.projectTitle);
});

// unsub();
// unsub2();'

function saveFlow(nodes: AppNode[], edges: Edge[]) {
   console.log('---Saving to the cloud---');
   console.log('Nodes:', nodes);
   console.log('Edges:', edges);
}

const debouncedSaveFlow = debounce(saveFlow, 2000);
