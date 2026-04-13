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
   return inputs.some((str) => leoProfanity.check(str));
}
