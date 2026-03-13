import { useEffect } from 'react';
import useFlowStore from './useFlowStore';

type UseUndoRedoOptions = {
   maxHistorySize: number;
   enableShortcuts: boolean;
};

type UseUndoRedo = (options?: UseUndoRedoOptions) => {
   undo: () => void;
   redo: () => void;
   takeSnapshot: () => void;
   canUndo: boolean;
   canRedo: boolean;
};

const defaultOptions: UseUndoRedoOptions = {
   maxHistorySize: 100,
   enableShortcuts: true,
};

//---------------------------------------------------------

// https://redux.js.org/usage/implementing-undo-history
export const useUndoRedo: UseUndoRedo = ({
   enableShortcuts = defaultOptions.enableShortcuts,
} = defaultOptions) => {
   const { undo, redo, takeSnapshot, past, future } = useFlowStore();

   useEffect(() => {
      // this effect is used to attach the global event handlers
      if (!enableShortcuts) {
         return;
      }

      const keyDownHandler = (event: KeyboardEvent) => {
         const isZ = event.key?.toLowerCase() === 'z';
         const isModifier = event.ctrlKey || event.metaKey;

         if (isZ && isModifier && event.shiftKey) {
            redo();
         } else if (isZ && isModifier) {
            undo();
         }
      };

      document.addEventListener('keydown', keyDownHandler);

      return () => {
         document.removeEventListener('keydown', keyDownHandler);
      };
   }, [undo, redo, enableShortcuts]);

   return {
      undo,
      redo,
      takeSnapshot,
      canUndo: past.length > 0,
      canRedo: future.length > 0,
   };
};

export default useUndoRedo;
