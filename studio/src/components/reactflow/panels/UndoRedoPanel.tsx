import { Undo2, Redo2 } from 'lucide-react';
import useUndoRedo from '@/hooks/useUndoRedo';
import NodeButton from './NodeButton';

export default function UndoRedoPanel() {
   const { undo, redo, canUndo, canRedo } = useUndoRedo();

   return (
      <div className="flex items-center gap-1 bg-background/80 backdrop-blur-md border border-border p-1.5 rounded-xl shadow-md shadow-zinc-400/20">
         <NodeButton
            tooltiptext="Undo (Ctrl+Z)"
            Icon={Undo2}
            onClickFunction={undo}
            disabled={!canUndo}
         />
         <div className="w-px h-4 bg-border mx-0.5" />
         <NodeButton
            tooltiptext="Redo (Ctrl+Shift+Z)"
            Icon={Redo2}
            onClickFunction={redo}
            disabled={!canRedo}
         />
      </div>
   );
}
