import useFlowStore from '@/hooks/useFlowStore';
import { useProjectStore } from '@/hooks/useProjectStore';
import debounce from './functions/debounce';
import type { Edge, Node } from '@xyflow/react';
import type { AppNode } from '@shared';
import { api } from './api';

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

async function saveFlow(nodes: AppNode[], edges: Edge[]) {
   console.log('---Saving to the cloud---');
   console.log('Nodes:', nodes);
   console.log('Edges:', edges);

   //# get the id and project title from the store
   const { id, projectTitle } = useProjectStore.getState();
   console.log(id);

   //# Checking if ID is real / legit (not 123 since we should be loading a new ID from the db)
   if (!id || id === 123) {
      console.warn('Persistence: No valid project ID found. Skipping save.');
      return;
   }

   //@ Save Logic
   try {
      console.log(`--- Saving Project: ${id} ---`);

      // api.create.video.$post({ json: data });
      const response = await api.studio.update[':id'].$patch({
         param: { id: id.toString() },
         json: {
            projectTitle,
            flowData: { nodes, edges },
         },
      });

      // if there was an error
      if (!response.ok) {
         throw new Error('Failed to save project to database.');
      }

      console.log('Successfully saved project to database!');
   } catch (error) {
      console.error('X Persistence Error:', error);
   }
}

//@ This is the function that has been returned from debounce:
// Guaranteed save 10 seconds after performing consecutive actions
// Saves 2 seconds after an action (debounced)
const debouncedSaveFlow = debounce(saveFlow, 2000, 10000);

//---------------------------------------------------------

//! Loading Logic (Loading a Project when user clicks on ProjectCard) --> this is called in a loader
export async function loadProject(id: number) {
   // fetch project details using ID --> send request to server GET (/api/studio/${id})
   console.log(`--- Fetching Project with ID: ${id} ---`);

   //# Checking if ID is real / legit (not 123 since we should be loading a new ID from the db)
   if (!id || id === 123) {
      console.warn('Persistence: No valid project ID found. Skipping save.');
      return;
   }

   // Get project info from server / DB
   try {
      const response = await api.studio[':id'].$get({
         param: { id: id.toString() },
      });

      if (!response.ok) {
         throw new Error(`Failed retrieving Project: ${id} from database.`);
      }

      const { projectTitle, flowData } = await response.json();

      // update application states using info from DB
      useProjectStore.setState({ id, projectTitle });
      useFlowStore.setState({ nodes: flowData.nodes, edges: flowData.edges });
   } catch (error) {
      console.error(`Encountered error when retrieving project:${id}. `, error);
   }
}
