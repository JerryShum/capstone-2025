import type {
   AppNode,
   CharacterNode,
   EnvironmentNode,
   SceneNode,
   ScriptNode,
} from '@shared/types';
import type { Edge } from '@xyflow/react';

// getIncomingNodes --> recieves a targetNodeID (this is typically a sceneNode) --> we use this to find the "source" nodes (parents)
// return a list of the parent nodes
export function getIncomingNodes(
   targetNodeID: string,
   nodes: AppNode[],
   edges: Edge[],
) {
   // 1. Filter the entire 'edges' array for any edge where 'edge.target === sceneId'
   const parentEdges = edges.filter((edge) => edge.target === targetNodeID);
   // 2. Map those edges to just get the 'source' IDs.
   const sourceIDs = parentEdges.map((edge) => {
      return edge.source;
   });
   // 3. Filter the 'nodes' array to return only nodes whose ID is in that source list.
   const parentNodes = nodes.filter((node) => sourceIDs.includes(node.id));

   return parentNodes;
}

// gatherSceneContext --> uses getIncomingNodes() to get a list of parentNodes --> this compiles the information of those parentNodes
export function gatherSceneContext(
   sceneNodeID: string,
   nodes: AppNode[],
   edges: Edge[],
) {
   // parentNodes of the sceneNode --> nodes providing info to the scene
   const parentNodes = getIncomingNodes(sceneNodeID, nodes, edges);

   // return an object --> contains all the character, environment, and script data
   return {
      // 1. filter --> getting only the parent nodes of a certain type
      // 2. map --> returning ONLY the data field of those nodes
      characters: parentNodes
         .filter((node): node is CharacterNode => node.type === 'character')
         .map((node) => node.data),
      environments: parentNodes
         .filter((node): node is EnvironmentNode => node.type === 'environment')
         .map((node) => node.data),
      scripts: parentNodes
         .filter((node): node is ScriptNode => node.type === 'script')
         .map((node) => node.data),
   };
}

export function getPreviousSceneNode(
   currentSceneNodeID: string,
   nodes: AppNode[],
   edges: Edge[],
) {
   const parentNodes = getIncomingNodes(currentSceneNodeID, nodes, edges);

   for (const node of parentNodes) {
      if (node.type === 'scene') {
         return node as SceneNode;
      }
   }

   return false;
}

export function canExtendScene(
   currentSceneNodeID: string,
   nodes: AppNode[],
   edges: Edge[],
) {
   const previousSceneNode: SceneNode | boolean = getPreviousSceneNode(
      currentSceneNodeID,
      nodes,
      edges,
   );

   if (!previousSceneNode) {
      return false;
   }

   // checks if the previous scene is done generating --> also checks if we got the operation name to use in google
   if (
      previousSceneNode.data.status === 'READY' &&
      previousSceneNode.data.lastOperationName
   ) {
      return true;
   }
}
