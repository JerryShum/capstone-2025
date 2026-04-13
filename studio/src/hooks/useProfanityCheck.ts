import { useCallback } from 'react';
import { containsProfanity } from '@/lib/profanity';

/**
 * A hook that provides a function to check for profanity.
 */
export function useProfanityCheck() {
   const hasProfanity = useCallback((text: string | null | undefined) => {
      if (!text) return false;
      return containsProfanity(text);
   }, []);

   return { hasProfanity };
}
