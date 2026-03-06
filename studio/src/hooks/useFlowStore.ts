import { gatherSceneContext } from '@/lib/functions/graphUtils';
import { nodeBlueprint } from '@/lib/nodeBlueprint';
import type { AppNode, FlowState, SceneNode } from '@shared';
import { initialEdges, initialNodes } from '@shared';
import { addEdge, applyEdgeChanges, applyNodeChanges } from '@xyflow/react';
import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { useProjectStore } from './useProjectStore';
import { api } from '@/lib/api';

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
         generateVideo: async (id) => {
            //@ getting the current nodes and edges state
            const nodes = get().nodes;
            const edges = get().edges;

            //@ getting the project settings & state
            const projectState = useProjectStore.getState();

            // getting the specific sceneNode --> changing its state
            const sceneNode = nodes.find((node) => node.id === id) as
               | SceneNode
               | undefined;

            // modifying the state of the sceneNode (idle --> processing) and updating the overall nodes state / array
            if (!sceneNode || sceneNode.type !== 'scene') return;
            const updateNode = get().updateNode;
            updateNode(id, { status: 'PROCESSING' });

            // calling graphUtils.ts functions --> gets the info from parent nodes
            const nodeContext = gatherSceneContext(id, nodes, edges);

            try {
               // send request to server --> we get an "operationName" --> polling name / ticket number
               const response = await api.studio.video.generate.$post({
                  json: {
                     prompt: sceneNode.data.scenePrompt,
                     characters: nodeContext.characters,
                     environments: nodeContext.environments,
                     scripts: nodeContext.scripts, // <-- Watch out for the 's'!
                     aspectRatio: projectState.aspectRatio,
                     engine: projectState.engine,
                     cinematicPreset: projectState.cinematicPreset,
                     negativePrompt: projectState.globalNegativePrompt,
                     imageBase64: '', // We can leave this empty for now
                  },
               });

               if (!response) {
                  console.error('ERROR: Unable to generate video.');
               }

               const responseData = await response.json();

               if (!('operationName' in responseData)) {
                  console.error('ERROR: Invalid response format.');
                  return;
               }

               const { operationName } = responseData;

               let isDone = false;

               while (!isDone) {
                  // wait 3 seconds
                  await new Promise((resolve) => setTimeout(resolve, 3000));
                  // TODO: Use operationName to poll for video generation status

                  //ask API for the status of the video
                  const videoStatusResponse = await api.studio.video.status[
                     ':name{.+}'
                  ].$get({ param: { name: operationName } });

                  const { status, videosURL } =
                     (await videoStatusResponse.json()) as {
                        status: string;
                        videosURL?: string;
                     };

                  //@ React to the status:

                  if (status === 'READY_TO_DOWNLOAD') {
                     // video is in the DB and has been downloaded --> the URL is good and we can use it!
                     updateNode(id, {
                        status: 'READY',
                        videoURL: videosURL,
                     });

                     isDone = true;
                  } else if (status === 'ERROR') {
                     // something happened and NO video could be generated.
                     updateNode(id, {
                        status: 'ERROR',
                     });

                     isDone = true;
                  }

                  // status == processing --> loop restarts
               }
            } catch (error) {
               console.log('ERROR', error);
            }
         },
      })),
   ),
);

export default useFlowStore;
