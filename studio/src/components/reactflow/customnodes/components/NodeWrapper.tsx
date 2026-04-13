import { NodeResizer } from '@xyflow/react';
import { Lock } from 'lucide-react';

interface NodeWrapperProps {
   children: React.ReactNode;
   selected?: boolean;
   minWidth: number;
   minHeight: number;
   keepAspectRatio?: boolean;
   locked?: boolean;
   className?: string;
}

export default function NodeWrapper({
   children,
   selected,
   minWidth,
   minHeight,
   keepAspectRatio,
   locked,
   className = '',
}: NodeWrapperProps) {
   return (
      <div
         className={`relative bg-white border-2 border-slate-900 rounded-xl p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-3 font-sans w-full h-full ${className}`}
         style={{ minWidth, minHeight }}
      >
         <NodeResizer
            minWidth={minWidth}
            minHeight={minHeight}
            keepAspectRatio={keepAspectRatio}
            isVisible={selected}
            lineClassName="border-slate-400"
            handleClassName="bg-white border-2 border-slate-900 w-3 h-3 rounded-sm"
         />
         {!!locked && (
            <div className="absolute -top-3 -right-3 bg-amber-500 text-white p-1.5 rounded-full shadow-md z-10">
               <Lock size={14} />
            </div>
         )}
         {children}
      </div>
   );
}
