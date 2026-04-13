/**
 * Prompt Content Filter (Shared)
 *
 * Uses the `leo-profanity` library — a community-maintained profanity
 * dictionary based on Shutterstock's banned-word list. No hardcoded
 * word list lives in our source code.
 *
 * Design decisions:
 *  - Library is initialized once at module load (synchronous).
 *  - Custom phrases can be added via CUSTOM_BANNED_PHRASES below.
 *  - The `checkContentSafety` API is identical to the previous
 *    hand-rolled filter so no consumers need changes.
 */

import filter from 'leo-profanity';

// ─── Custom Phrases ─────────────────────────────────────────────────
// Add project-specific terms that aren't in the standard dictionary.
// These are loaded once at startup alongside the default English list.
const CUSTOM_BANNED_PHRASES: string[] = [
   // Add any custom words/phrases here, e.g.:
   // 'some custom phrase',
];

// Initialize: load default English dictionary + add our custom terms
filter.loadDictionary('en');
if (CUSTOM_BANNED_PHRASES.length > 0) {
   filter.add(CUSTOM_BANNED_PHRASES);
}

// ─── Public API ─────────────────────────────────────────────────────

export interface ContentFilterResult {
   /** True when the content is clean and safe to proceed. */
   safe: boolean;
   /** The matched term (only populated when unsafe). Never expose to client. */
   matchedTerm?: string;
}

/**
 * Scans a string for profanity / inappropriate content.
 *
 * Performance: Synchronous — sub-millisecond on prompts up to
 *              several thousand characters.
 *
 * @param content - The raw user input to check (prompt, feedback, etc.)
 * @returns A result object indicating whether the content is safe.
 */
export function checkContentSafety(content: string): ContentFilterResult {
   if (!content || content.trim().length === 0) {
      return { safe: true };
   }

   const hasProfanity = filter.check(content);

   if (hasProfanity) {
      // Extract the matched word(s) for server-side logging only.
      // We compare original vs cleaned to find what was censored.
      const cleaned = filter.clean(content);
      const matchedTerm = extractDifference(content, cleaned);

      return { safe: false, matchedTerm };
   }

   return { safe: true };
}

/**
 * Compares original text with its cleaned version to extract
 * the first word that was censored. Used for server-side logging only.
 */
function extractDifference(original: string, cleaned: string): string {
   const origWords = original.split(/\s+/);
   const cleanWords = cleaned.split(/\s+/);

   for (let i = 0; i < origWords.length; i++) {
      if (origWords[i] !== cleanWords[i]) {
         return origWords[i] ?? 'unknown';
      }
   }

   return 'unknown';
}
