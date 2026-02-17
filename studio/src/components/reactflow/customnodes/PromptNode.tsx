import { Handle, Position } from '@xyflow/react';

export default function PromptNode({ data }) {
   return (
      <div className="bg-white border-2 border-slate-200 rounded-md p-3 shadow-lg min-w-[200px]">
         <Handle type="target" position={Position.Top} />
         <div className="font-bold border-b mb-2 pb-1 text-slate-700">
            AI Prompt Node
         </div>
         <textarea
            className="w-full text-xs p-1 border rounded"
            placeholder="Enter AI prompt..."
            defaultValue={data.label}
         />
         <Handle type="source" position={Position.Bottom} />
      </div>
   );
}
