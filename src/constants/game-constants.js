/**
 * An object representing the different game levels and their properties.
 * @constant
 * @type {Object}
 * @property {Object} EASY - The easy level configuration.
 * @property {Object} MEDIUM - The medium level configuration.
 * @property {Object} HARD - The hard level configuration.
 *
 * Each level configuration object contains:
 * @property {string} label - The label for the level.
 * @property {number} speed - The speed for the level in seconds.
 * @property {number} points - The points awarded for the level.
 */
export const LEVELS = {
  EASY: { label: 'easy', speed: 10, points: 10 },
  MEDIUM: { label: 'medium', speed: 5, points: 20 },
  HARD: { label: 'hard', speed: 2, points: 30 },
};

/**
 * The number of card boxes in the game.
 * @constant {number}
 */
export const CARD_BOX = 9;

/**
 * Enum for card states.
 * @readonly
 * @enum {string}
 */
export const CARD_STATES = {
  CORRECT: 'correct',
  WRONG: 'wrong',
};

/**
 * The default difficulty level for the game.
 * @constant {string}
 */
export const DEFAULT_LEVEL = 'EASY';

/**
 * The default name assigned to a player when no name is provided.
 * @type {string}
 */
export const DEFAULT_PLAYER_NAME = '';

/**
 * An array of difficulty levels derived from the keys of the LEVELS object.
 *
 * @constant {string[]}
 */
export const DIFFICULTY_LEVEL = Object.keys(LEVELS);
