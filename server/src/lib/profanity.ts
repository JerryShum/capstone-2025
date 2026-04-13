import leoProfanity from 'leo-profanity';

// Load the default English dictionary on module init
leoProfanity.loadDictionary('en');

/**
 * Checks one or more strings for profane language.
 * @param text - A single string or an array of strings to check.
 * @returns `true` if any profanity is detected, `false` otherwise.
 */
export function containsProfanity(text: string | string[]): boolean {
   const inputs = Array.isArray(text) ? text : [text];
   return inputs.some((str) => {
      if (!str) return false;
      // Normalize whitespace (replace newlines/tabs with spaces) to ensure leo-profanity detects words separated by newlines
      const normalizedStr = str.replace(/\s+/g, ' ');
      return leoProfanity.check(normalizedStr);
   });
}
