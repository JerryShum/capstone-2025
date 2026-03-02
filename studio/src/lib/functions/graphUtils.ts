import { Edge } from '@xyflow/react';
import {
   AppNode,
   CharacterNodeData,
   EnvironmentNodeData,
   ScriptNodeData,
   type CharacterNode,
   type EnvironmentNode,
   type ScriptNode,
} from '@shared';

/**
 * 🎓 MENTOR CHALLENGE #1: The "Upstream" Hunt
 *
 * In a graph, nodes are connected by Edges. An Edge has a 'source' and a 'target'.
 * If we are at a SceneNode (the 'target'), we need to find its "Parents" (the 'sources').
 *
 * Your Goal:
 * 1. Filter the 'edges' array to find all edges pointing to 'targetNodeId'.
 * 2. Extract the 'source' ID from each of those edges.
 * 3. Return all full Node objects from the 'nodes' array that match those source IDs.
 */
export function getIncomingNodes(
   targetNodeId: string,
   nodes: AppNode[],
   edges: Edge[],
): AppNode[] {
   // TODO: Implement logic here

   // finding the edges where "sceneNode" is the "target"
   const targetEdges = edges.filter((edge) => {
      if (edge.target === targetNodeId) {
         return edge;
      }
   });

   // finding the IDs of the nodes that are the source / parents of the scenenode
   const sourceIDs = targetEdges.map((edge) => {
      return edge.source;
   });

   // getting the actual node objects from the IDs
   const sourceNodes = nodes.filter((node) => sourceIDs.includes(node.id));

   return sourceNodes;
}

/**
 * 🎓 MENTOR CHALLENGE #2: The "Context" Filter
 *
 * Now that you have a list of parent nodes, we need to sort them into "buckets"
 * so the SceneNode knows exactly what data it's working with.
 *
 * Your Goal:
 * 1. Use getIncomingNodes to get the parents.
 * 2. Filter the parents by their .type ('character', 'environment', 'script').
 * 3. Map the results so you only return the .data of each node.
 */
export function gatherSceneContext(
   sceneNodeId: string,
   nodes: AppNode[],
   edges: Edge[],
) {
   // getting the sceneNode's parent nodes (environment, character, prompt, script, etc.)
   const parentNodes = getIncomingNodes(sceneNodeId, nodes, edges);

   const characterNodes = parentNodes.filter(
      (node): node is CharacterNode => node.type === 'character',
   );
   const environmentNodes = parentNodes.filter(
      (node): node is EnvironmentNode => node.type === 'environment',
   );
   const scriptNodes = parentNodes.filter(
      (node): node is ScriptNode => node.type === 'script',
   );

   return {
      characters: characterNodes.map((node) => node.data),
      environments: environmentNodes.map((node) => node.data),
      scripts: scriptNodes.map((node) => node.data),
   };
}
