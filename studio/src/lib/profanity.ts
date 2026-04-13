import leoProfanity from 'leo-profanity';

// Load the default English dictionary on module init
leoProfanity.loadDictionary('en');

/**
 * Checks if a string contains profane language.
 * @param text - The string to check.
 * @returns `true` if profanity is detected, `false` otherwise.
 */
export function containsProfanity(text: string): boolean {
   if (!text) return false;
   return leoProfanity.check(text);
}
