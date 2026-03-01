import useFlowStore from '@/hooks/useFlowStore';
import { useProjectStore } from '@/hooks/useProjectStore';

//! Creation of store subscribers --> these subscribe to any updates to their store
// the function runs whenever the store state is updated
export const unsub = useFlowStore.subscribe(
   (state) => [state.nodes, state.edges],
   (state, prevState) => {
      const nodeState = state[0];
      const edgeState = state[1];
      console.log('Nodes:', nodeState);
      console.log('Edges', edgeState);
      // call debounce function here --> sends the state to the server (after an amount of time after an action occurred)
   },
);

export const unsub2 = useProjectStore.subscribe((state, prevState) => {
   console.log(state, prevState);

   console.log(state.projectTitle);
});

// unsub();
// unsub2();
