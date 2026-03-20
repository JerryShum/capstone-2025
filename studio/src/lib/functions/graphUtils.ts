import type {
   AppNode,
   CharacterNode,
   EnvironmentNode,
   ScriptNode,
   SceneNode,
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

/**
 * Returns the immediately preceding SceneNode in the graph, i.e. the SceneNode
 * that has a direct edge pointing TO the given scene node.
 * Returns undefined if there is no such predecessor or if it is not a scene node.
 */
export function getPreviousSceneNode(
   sceneNodeID: string,
   nodes: AppNode[],
   edges: Edge[],
): SceneNode | undefined {
   const parentEdges = edges.filter((edge) => edge.target === sceneNodeID);
   for (const edge of parentEdges) {
      const parentNode = nodes.find((n) => n.id === edge.source);
      if (parentNode && parentNode.type === 'scene') {
         return parentNode as SceneNode;
      }
   }
   return undefined;
}

/**
 * Returns true if the immediately preceding SceneNode is READY and has a
 * valid video URL — meaning this scene can attempt video continuation/extension.
 */
export function canExtendScene(
   sceneNodeID: string,
   nodes: AppNode[],
   edges: Edge[],
): boolean {
   const prev = getPreviousSceneNode(sceneNodeID, nodes, edges);
   return (
      prev !== undefined &&
      prev.data.status === 'READY' &&
      !!prev.data.videoURL &&
      prev.data.videoURL !== 'https://' &&
      prev.data.videoURL !== 'https://...'
   );
}

/**
 * Builds an ordered timeline of SceneNodes by topologically sorting
 * the scene-to-scene edges in the graph.
 *
 * Algorithm:
 *  1. Collect all SceneNodes.
 *  2. Build an in-degree map counting how many scene→scene incoming edges each scene has.
 *  3. Start from all nodes with in-degree 0 (no predecessor scene → they are "first scenes").
 *  4. BFS / Kahn's algorithm to emit nodes in order.
 *
 * If the graph has branches or disconnected parts, they are appended after the main chain
 * in arbitrary order (matching real topological sort behaviour).
 */
export function buildTimeline(nodes: AppNode[], edges: Edge[]): SceneNode[] {
   const sceneNodes = nodes.filter((n): n is SceneNode => n.type === 'scene');

   if (sceneNodes.length === 0) return [];

   // scene-to-scene edges only
   const sceneIds = new Set(sceneNodes.map((n) => n.id));
   const sceneEdges = edges.filter(
      (e) => sceneIds.has(e.source) && sceneIds.has(e.target),
   );

   // in-degree map
   const inDegree = new Map<string, number>();
   for (const sn of sceneNodes) {
      inDegree.set(sn.id, 0);
   }
   for (const e of sceneEdges) {
      inDegree.set(e.target, (inDegree.get(e.target) ?? 0) + 1);
   }

   // adjacency list (source → targets)
   const adj = new Map<string, string[]>();
   for (const e of sceneEdges) {
      if (!adj.has(e.source)) adj.set(e.source, []);
      adj.get(e.source)!.push(e.target);
   }

   // Kahn's topological sort
   const queue: string[] = [];
   for (const [id, deg] of inDegree.entries()) {
      if (deg === 0) queue.push(id);
   }

   const ordered: SceneNode[] = [];
   while (queue.length > 0) {
      const current = queue.shift()!;
      const node = sceneNodes.find((n) => n.id === current);
      if (node) ordered.push(node);

      for (const neighbor of adj.get(current) ?? []) {
         const newDeg = (inDegree.get(neighbor) ?? 1) - 1;
         inDegree.set(neighbor, newDeg);
         if (newDeg === 0) queue.push(neighbor);
      }
   }

   // Safety: if there were cycles (shouldn't happen in practice), append remaining nodes
   const orderedIds = new Set(ordered.map((n) => n.id));
   for (const sn of sceneNodes) {
      if (!orderedIds.has(sn.id)) ordered.push(sn);
   }

   return ordered;
}
