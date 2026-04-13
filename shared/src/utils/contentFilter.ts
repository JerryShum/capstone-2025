import leoProfanity from 'leo-profanity';

// Initialize with the standard English dictionary
leoProfanity.loadDictionary('en');

// Add custom project-specific banned words if needed
leoProfanity.add(['arpit', 'nigam']);

export interface ContentFilterResult {
   isSafe: boolean;
   flaggedWords: string[];
}

/**
 * Checks a string for profanity or banned phrases.
 * Returns synchronous result (no external API call required).
 */
export function checkContentSafety(text: string): ContentFilterResult {
   if (!text || text.trim() === '') {
      return { isSafe: true, flaggedWords: [] };
   }

   const isSafe = !leoProfanity.check(text);

   // If you want exact flagged words, you'd have to parse it manually,
   // but for our use case, just returning isSafe is usually enough.
   // Providing a generic flagged word for compatibility with older interface.
   
   return {
      isSafe,
      flaggedWords: isSafe ? [] : ['inappropriate content detected'], 
   };
}
