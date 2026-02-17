import {
   type Edge,
   type Node,
   type OnNodesChange,
   type OnEdgesChange,
   type OnConnect,
} from '@xyflow/react';

//! Defining the types for the custom nodes:

type httpsURL = `https://${string}`;

//@ Node data type definitions:
//# Project Settings (Global Config Node)
export type ProjectSettingsNodeData = {
   type: 'projectsettings';
   title: string;
   aspectRatio: '16:9' | '9:16' | '1:1';
   globalStyle: string;
   targetModel: string;
};
export type ProjectSettingsNode = Node<
   ProjectSettingsNodeData,
   'projectsettings'
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
   visuals: string;
   referenceImage: httpsURL;
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

//@ General App Node (encapsulates all nodes)
type AppNodeData =
   | ProjectSettingsNodeData
   | ScriptNodeData
   | CharacterNodeData
   | SceneNodeData;
export type AppNode = Node<AppNodeData>; // this appnode tells reactflow that the "official" nodes should only be the ones stated above

//! To be used by zustand store --> this is an interface of the entire reactflow state
export type FlowState = {
   nodes: AppNode[];
   edges: Edge[];
   onNodesChange: OnNodesChange<AppNode>;
   onEdgesChange: OnEdgesChange;
   onConnect: OnConnect;
   setNodes: (nodes: AppNode[]) => void;
   setEdges: (edges: Edge[]) => void;
};
