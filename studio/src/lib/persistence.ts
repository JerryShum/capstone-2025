import useFlowStore from '@/hooks/useFlowStore';
import { useProjectStore } from '@/hooks/useProjectStore';

export const unsub = useFlowStore.subscribe((state, prevState) => {
   console.log(state, prevState);
});

export const unsub2 = useProjectStore.subscribe((state, prevState) => {
   console.log(state, prevState);
});

// unsub();
// unsub2();
