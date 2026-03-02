import { nodeBlueprint } from '@/lib/nodeBlueprint';
import type { AppNode, FlowState } from '@shared';
import { initialEdges, initialNodes } from '@shared';
import { addEdge, applyEdgeChanges, applyNodeChanges } from '@xyflow/react';
import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { gatherSceneContext } from '@/lib/functions/graphUtils';
import { api } from '@/lib/api';
import { useProjectStore } from './useProjectStore';
import type { SceneNode } from '@shared';

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useFlowStore = create<FlowState>()(
   subscribeWithSelector(
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
         addNode: (type, position) => {
            console.log('addNode');
            // use the blueprint to create a "default" node based on the type
            // character | scene | projectSettings | script
            const blueprint = nodeBlueprint[type];
            const { x, y } = position;

            // define new node structure
            const newNode: AppNode = {
               id: (get().nodes.length + 1).toString() + '-' + Date.now(),
               type: type,
               //$ Position should be changed to fit the middle of current viewport
               position: { x, y },
               data: blueprint.defaultData,
            };

            // set the new state to include newNode
            set({ nodes: [...get().nodes, newNode] });
         },
         updateNode: (id, data) => {
            // filter out all the nodes and find the one we need to update using id
            set({
               nodes: get().nodes.map((node) => {
                  if (node.id === id) {
                     // we found the node we need to update --> create new node with the new data

                     const newNode = {
                        // spread the general "node" properties
                        ...node,
                        // overwriting the old data with new data (keeps whatever wasn't updated)
                        data: { ...node.data, ...data },
                     } as AppNode;

                     return newNode;
                  }

                  return node;
               }),
            });
         },
         deleteNode: (id) => {
            set({
               //@ Only kepe the nodes with IDS that DO NOT match the input
               nodes: get().nodes.filter((node) => !(node.id == id)),
               edges: get().edges.filter(
                  //@ Only keeping the edges where their source AND target DONT match the input
                  (edge) => !(edge.source == id) && !(edge.target == id),
               ),
            });
         },
         duplicateNode: (id) => {
            const nodesArray = get().nodes;

            const originalNode = nodesArray.find((node) => {
               return node.id == id;
            });

            if (!originalNode) return;

            const duplicate = {
               ...originalNode,
               id: nodesArray.length.toString() + '-' + Date.now(),
               position: {
                  x: originalNode.position.x + 200,
                  y: originalNode.position.y + 200,
               },
            } as AppNode;

            set({
               nodes: [...nodesArray, duplicate],
            });
         },
         generateVideo: async (nodeId: string) => {
            const nodes = get().nodes;
            const edges = get().edges;
            const sceneNode = nodes.find((n) => n.id === nodeId) as SceneNode | undefined;

            if (!sceneNode || sceneNode.type !== 'scene') return;

            // 1. Gather context from upstream nodes
            const context = gatherSceneContext(nodeId, nodes, edges);
            const projectSettings = useProjectStore.getState();

            // 2. Set status to PROCESSING
            get().updateNode(nodeId, { status: 'PROCESSING' });

            try {
               // 3. Trigger video generation
               const response = await api.studio.video.generate.$post({
                  json: {
                     prompt: sceneNode.data.scenePrompt,
                     aspectRatio: projectSettings.aspectRatio as '16:9' | '9:16' | '1:1',
                     duration: sceneNode.data.duration,
                     characters: context.characters,
                     environments: context.environments,
                     // imageBase64: ... (Optional reference image)
                  },
               });

               if (!response.ok) throw new Error('Failed to initiate video generation');

               const operationData = await response.json();
               const operationName = operationData.operationName as string;

               // 4. Polling for status
               let isDone = false;
               while (!isDone) {
                  // Wait for 3 seconds between polls
                  await new Promise((resolve) => setTimeout(resolve, 3000));

                  const statusRes = await api.studio.video.status[':name{.+}'].$get({
                     param: { name: operationName },
                  });

                  if (!statusRes.ok) throw new Error('Failed to check status');

                  const result = (await statusRes.json()) as {
                     status: 'SUCCESS' | 'PROCESSING' | 'FAILED';
                     videoURL?: string;
                     error?: string;
                  };

                  if (result.status === 'SUCCESS') {
                     get().updateNode(nodeId, {
                        status: 'READY',
                        videoURL: result.videoURL as any,
                     });
                     isDone = true;
                  } else if (result.status === 'FAILED') {
                     throw new Error(result.error || 'Generation failed');
                  }
               }
            } catch (error) {
               console.error('Video Generation Error:', error);
               get().updateNode(nodeId, { status: 'ERROR' });
            }
         },
      })),
   ),
);

export default useFlowStore;
