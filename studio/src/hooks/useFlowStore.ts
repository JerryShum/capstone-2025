import { create } from 'zustand';
import { addEdge, applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import type { Edge } from '@xyflow/react';
import { devtools } from 'zustand/middleware';
import type {
   FlowState,
   AppNode,
   ScriptNode,
   CharacterNode,
   ProjectSettingsNode,
} from '@/lib/flowTypes';
import { nodeBlueprint } from '@/lib/nodeBlueprint';

const initialEdges = [] as Edge[];

const initCharacterNode: CharacterNode = {
   id: '1-defaultchar',
   type: 'character',
   data: {
      type: 'character',
      name: 'barry',
      style: 'pixelated cartoon chicken',
      appearance: 'pixelated chicken, yellow hair, big blue eyes',
   },
   position: { x: 250, y: 25 },
};

const initScriptNode: ScriptNode = {
   id: '2-initscript',
   type: 'script',
   data: {
      type: 'script',
      content: 'script for barry the chicken:yapyapyapypaypaypyapp',
   },
   position: { x: 250, y: 25 },
};

const initProjectSettingsNode: ProjectSettingsNode = {
   id: '3-initprojectsettings',
   type: 'projectSettings',
   data: {
      type: 'projectSettings',
      title: 'Untitled Project',
      aspectRatio: '16:9',
      targetEngine: 'Google Veo',
      negativePrompt: 'blur, low quality, distorted, watermark',
      seed: -1,
      guidanceScale: 7.5,
      motionIntensity: 5,
      styleReference: 'https://...',
      cinematicPreset: 'Neo-Noir',
      summary: 'A brief overview of the project theme...',
   },
   position: { x: 300, y: 400 },
};

const initialNodes = [
   initCharacterNode,
   initScriptNode,
   initProjectSettingsNode,
] as AppNode[];

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useFlowStore = create<FlowState>()(
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
   })),
);

export default useFlowStore;
