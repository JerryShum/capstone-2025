import { NodeResizeControl } from '@xyflow/react';
import { Lock } from 'lucide-react';

function ResizeIcon() {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width="24"
         height="24"
         viewBox="0 0 24 24"
         strokeWidth="2.5"
         stroke="#9333ea"
         fill="none"
         strokeLinecap="round"
         strokeLinejoin="round"
         style={{ position: 'absolute', right: -12, bottom: -12 }}
         className="bg-white rounded-lg border-2 border-slate-900 p-1 shadow-md hover:scale-110 transition-transform cursor-nwse-resize"
      >
         <path stroke="none" d="M0 0h24v24H0z" fill="none" />
         <polyline points="16 20 20 20 20 16" />
         <line x1="14" y1="14" x2="20" y2="20" />
         <polyline points="8 4 4 4 4 8" />
         <line x1="4" y1="4" x2="10" y2="10" />
      </svg>
   );
}

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
         className={`relative bg-white border-2 border-slate-900 rounded-xl p-3 shadow-lg flex flex-col gap-3 font-sans w-full h-full ${className}`}
         style={{ minWidth, minHeight }}
      >
         <NodeResizeControl
            minWidth={minWidth}
            minHeight={minHeight}
            keepAspectRatio={keepAspectRatio}
            style={{
               background: 'transparent',
               border: 'none',
            }}
            className={!selected ? 'opacity-0 pointer-events-none' : 'opacity-100'}
         >
            <ResizeIcon />
         </NodeResizeControl>
         {!!locked && (
            <div className="absolute -top-3 -right-3 bg-amber-500 text-white p-1.5 rounded-full shadow-md z-10">
               <Lock size={14} />
            </div>
         )}
         {children}
      </div>
   );
}
