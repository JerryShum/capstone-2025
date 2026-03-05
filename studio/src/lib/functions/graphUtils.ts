import type { AppNode } from '@shared/types';
import type { Edge } from '@xyflow/react';

// getIncomingNodes --> recieves a targetNodeID (this is typically a sceneNode) --> we use this to find the "source" nodes (parents)
// return a list of the parent nodes
export function getIncomingNodes(
   targetNodeID: string,
   nodes: AppNode[],
   edges: Edge[],
): AppNode[] {
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
