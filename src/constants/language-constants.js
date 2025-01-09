/**
 * An array of objects representing selectable languages.
 * Each object contains the following properties:
 *
 * @constant {Array<Object>}
 * @property {string} value - The language code.
 * @property {string} label - The name of the language.
 * @property {string} flag - The emoji flag of the language.
 */
export const SELECT_LANGUAGES = [
  { value: 'en', label: 'english', flag: '🇬🇧' },
  { value: 'es', label: 'spanish', flag: '🇪🇸' },
  { value: 'pt', label: 'portuguese', flag: '🇵🇹' },
];

/**
 * The default language setting for the application.
 * @constant {string}
 */
export const DEFAULT_LANGUAGE = 'en';
