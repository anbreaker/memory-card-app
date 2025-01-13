import { CARD_BOX, DEFAULT_LEVEL, LEVELS, ONE_SECOND } from '../constants/game-constants.js';

// Extends the EventTarget class to use addEventListener and dispatchEvent
class GameLogic extends EventTarget {
  // Static instance === null
  static instance = null;

  constructor(playerName, defaultLevel) {
    super();

    if (GameLogic.instance) {
      return GameLogic.instance; // Returns the existing instance
    }

    this.currentNumber = null;
    this.isGameStarted = false;
    this.level = defaultLevel;
    this.numbers = [];
    this.playerName = playerName;
    this.points = 0;
    this.timeLimit = LEVELS[defaultLevel].speed;
    this.visibleNumbers = false;

    // Saves the single instance
    GameLogic.instance = this;
  }

  /**
   * Notifies listeners about a level change by dispatching a 'level-change' event.
   * The event contains the current instance as its detail.
   *
   * @private
   */
  _notifyLevelChange() {
    this.dispatchEvent(new CustomEvent('level-change', { detail: this }));
  }

  /**
   * Starts the game by setting the game state to started,
   * initializing the points to zero, and generating the game board.
   */
  startGame() {
    this.isGameStarted = true;
    this.points = 0;
    this.generateBoard();
  }

  /**
   * Generates an array of shuffled numbers from 1 to the specified length.
   *
   * @param {number} length - The length of the array to generate.
   * @returns {number[]} An array of shuffled numbers from 1 to the specified length.
   */
  generateShuffledNumbers(length) {
    const numbers = Array.from({ length }, (_, i) => i + 1);
    return numbers.sort(() => Math.random() - 0.5);
  }

  /**
   * Generates the game board by shuffling numbers, selecting a random current number,
   * setting the time limit based on the current level, and making numbers visible for a limited time.
   * After the time limit, the numbers become invisible and the level change is notified.
   */
  generateBoard() {
    this.numbers = this.generateShuffledNumbers(CARD_BOX);
    this.currentNumber = this.numbers[Math.floor(Math.random() * CARD_BOX)];
    this.timeLimit = LEVELS[this.level]?.speed;
    this.visibleNumbers = true;
    this._notifyLevelChange();

    setTimeout(() => {
      this.visibleNumbers = false;
      this._notifyLevelChange();
    }, this.timeLimit * ONE_SECOND);
  }

  /**
   * Handles the click event on a card.
   *
   * @param {number} index - The index of the clicked card.
   * @returns {boolean} - Returns true if the clicked card is correct, otherwise false.
   *
   * @fires CustomEvent#card-correct - Dispatched when the clicked card is correct.
   * @fires CustomEvent#card-wrong - Dispatched when the clicked card is wrong.
   */
  handleCardClick(index) {
    if (!this.isGameStarted || this.visibleNumbers) return;

    const isCorrect = this.numbers[index] === this.currentNumber;

    if (isCorrect) {
      this.points += LEVELS[this.level].points;

      this.dispatchEvent(new CustomEvent('card-correct', { detail: { index } }));

      // Delay before generating a new board and notifying the change 1 second
      setTimeout(() => {
        this.generateBoard();
        this._notifyLevelChange();
      }, ONE_SECOND);

      return true;
    }

    this.dispatchEvent(new CustomEvent('card-wrong', { detail: { index } }));

    // Delay before game completion 1 second
    setTimeout(() => {
      this.isGameStarted = false;
      this._notifyLevelChange();
    }, ONE_SECOND);

    return false;
  }

  /**
   * Changes the current game level to the specified new level.
   * Generates a new game board and notifies listeners about the level change.
   *
   * @param {number} newLevel - The new level to set for the game.
   */
  changeLevel(newLevel) {
    this.level = newLevel;
    this.generateBoard();
    this._notifyLevelChange();
  }
}

const gameLogicInstance = new GameLogic('Player', DEFAULT_LEVEL);
export default gameLogicInstance;
