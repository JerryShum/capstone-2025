import useFlowStore from '@/hooks/useFlowStore';
import { Copy, Trash } from 'lucide-react';

interface ContextMenuProps {
   id?: string;
   top?: number;
   left?: number;
   right?: number;
   bottom?: number;
   onClick: () => void;
}

export default function ContextMenu(props: ContextMenuProps) {
   const { id, top, left, right, bottom, onClick } = props;
   const deleteNode = useFlowStore((state) => state.deleteNode);
   const duplicateNode = useFlowStore((state) => state.duplicateNode);

   return (
      <div
         style={{
            top: top,
            left: left,
            right: right,
            bottom: bottom,
         }}
         className="absolute z-50 bg-white border-2 border-slate-900 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] min-w-[180px] overflow-hidden flex flex-col"
      >
         <span className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-slate-700 transition-colors text-left">
            Node Actions
         </span>
         <button
            onClick={() => {
               console.log('duplicate node pressed');
               //# check if theres ID --> means theres a node that was passed
               if (id) {
                  duplicateNode(id);
               }
               onClick();
            }}
            className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100 transition-colors text-left"
         >
            <Copy size={16} className="text-blue-500" />
            Duplicate
         </button>
         <button
            onClick={() => {
               //# check if theres ID --> means theres a node that was passed
               console.log('delete node clicked');
               if (id) {
                  deleteNode(id);
               }
               onClick();
            }}
            className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-destructive hover:bg-slate-100 transition-colors text-left"
         >
            <Trash size={16} className="text-destructive" />
            Delete
         </button>
      </div>
   );
}
