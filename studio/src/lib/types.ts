import {
   type Edge,
   type Node,
   type OnNodesChange,
   type OnEdgesChange,
   type OnConnect,
} from '@xyflow/react';
// --------------------------------------

//! Defining the types for the custom nodes:

export type httpsURL = `https://${string}`;

//@ Node data type definitions:
//# Project Settings (Global Config Node)
export type ProjectSettingsNodeData = {
   type: 'projectSettings';
   title: string;
   aspectRatio: '16:9' | '9:16' | '1:1';
   targetEngine:
      | 'Google Veo'
      | 'OpenAI Sora'
      | 'Runway Gen-3'
      | 'Luma Dream Machine';
   negativePrompt: string;
   seed: number;
   guidanceScale: number; // CFG
   motionIntensity: number; // 1-10
   styleReference?: httpsURL;
   cinematicPreset: string;
   summary: string;
};
export type ProjectSettingsNode = Node<
   ProjectSettingsNodeData,
   'projectSettings'
>;

//# ScriptNode
export type ScriptNodeData = {
   type: 'script';
   content: string;
};
export type ScriptNode = Node<ScriptNodeData, 'script'>;

//# Character Node
export type CharacterNodeData = {
   type: 'character';
   name: string;
   appearance: string;
   style: string;
   referenceImage?: httpsURL;
};
export type CharacterNode = Node<CharacterNodeData, 'character'>;

//# SceneNode
export type SceneNodeData = {
   type: 'scene';
   prompt: string;
   status: 'IDLE' | 'PROCESSING' | 'READY' | 'ERROR';
   videoURL: httpsURL;
   thumbnailURL: httpsURL;
   duration: number;
};
export type SceneNode = Node<SceneNodeData, 'scene'>;

//# Environment Node
export type EnvironmentNodeData = {
   type: 'environment';
   location: string;
   timeOfDay: 'Morning' | 'Afternoon' | 'Sunset' | 'Night';
   weather: 'Clear' | 'Rainy' | 'Foggy' | 'Snowy';
   lightingStyle: string;
   description: string;
};

export type EnvironmentNode = Node<EnvironmentNodeData, 'environment'>;

//@ General App Node (encapsulates all nodes)
type AppNodeData =
   | ProjectSettingsNodeData
   | ScriptNodeData
   | CharacterNodeData
   | SceneNodeData
   | EnvironmentNodeData;
export type AppNode = Node<AppNodeData>; // this appnode tells reactflow that the "official" nodes should only be the ones stated above

//---------------------------------------------------------

type NodeTypes =
   | 'projectSettings'
   | 'script'
   | 'character'
   | 'scene'
   | 'environment';

//! To be used by zustand store --> this is an interface of the entire reactflow state
export type FlowState = {
   nodes: AppNode[];
   edges: Edge[];
   onNodesChange: OnNodesChange<AppNode>;
   onEdgesChange: OnEdgesChange;
   onConnect: OnConnect;
   setNodes: (nodes: AppNode[]) => void;
   setEdges: (edges: Edge[]) => void;
   addNode: (type: NodeTypes, position: { x: number; y: number }) => void;
   //updateNode --> accepts a string for ID, and then any of the customNode data types!
   updateNode: (id: string, data: Partial<AppNodeData>) => void;
};
