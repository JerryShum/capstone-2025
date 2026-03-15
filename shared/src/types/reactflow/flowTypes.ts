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

//# ScriptNode
export type ScriptNodeData = {
   type: 'script';
   content: string;
   locked?: boolean;
};
export type ScriptNode = Node<ScriptNodeData, 'script'>;

//# Character Node
export type CharacterNodeData = {
   type: 'character';
   name: string;
   appearance: string;
   style: string;
   referenceImage?: httpsURL;
   locked?: boolean;
};
export type CharacterNode = Node<CharacterNodeData, 'character'>;

//# SceneNode
export type SceneNodeData = {
   type: 'scene';
   scenePrompt: string;
   duration: number;
   shotType: 'Wide' | 'Medium' | 'Close-up' | 'Over-the-shoulder';
   cameraMovement: 'Static' | 'Pan' | 'Tilt' | 'Zoom' | 'Dolly';
   status: 'IDLE' | 'PROCESSING' | 'READY' | 'ERROR';
   errorMessage?: string;
   videoURL: string;
   thumbnailURL: httpsURL;
   lastOperationName?: string;
   locked?: boolean;
   canExtend: boolean;
   /** Unix ms timestamp of when the video finished generating — used for the 48h Gemini file expiry check. */
   videoGeneratedAt?: number;
   /** Gemini Files API URI of the generated video (e.g. https://generativelanguage.googleapis.com/v1beta/files/...).
    *  Only valid for ~48h after generation. Used for native Veo video extension. */
   geminiVideoUri?: string;
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
   locked?: boolean;
};

export type EnvironmentNode = Node<EnvironmentNodeData, 'environment'>;

//@ General App Node (encapsulates all nodes)
type AppNodeData =
   | ScriptNodeData
   | CharacterNodeData
   | SceneNodeData
   | EnvironmentNodeData;
export type AppNode = Node<AppNodeData>; // this appnode tells reactflow that the "official" nodes should only be the ones stated above

//---------------------------------------------------------

export type HistoryItem = {
   nodes: AppNode[];
   edges: Edge[];
};

type NodeTypes = 'script' | 'character' | 'scene' | 'environment';

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
   deleteNode: (id: string) => void;
   duplicateNode: (id: string) => void;
   toggleNodeLock: (id: string) => void;
   generateVideo: (nodeID: string) => Promise<void>;
   pollVideoStatus: (nodeID: string, operationName: string) => Promise<void>;
   resumeVideoPoll: () => void;

   // Undo/Redo
   past: HistoryItem[];
   future: HistoryItem[];
   undo: () => void;
   redo: () => void;
   takeSnapshot: () => void;
};
