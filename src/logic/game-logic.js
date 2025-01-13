import { CARD_BOX, DEFAULT_LEVEL, LEVELS, ONE_SECOND } from '../constants/game-constants.js';

// Extends the EventTarget class to use addEventListener and dispatchEvent
class GameLogic extends EventTarget {
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

    GameLogic.instance = this; // Saves the single instance
  }

  _notifyLevelChange() {
    this.dispatchEvent(new CustomEvent('level-change', { detail: this }));
  }

  startGame() {
    this.isGameStarted = true;
    this.points = 0;
    this.generateBoard();
    this._notifyLevelChange();
  }

  generateShuffledNumbers(length) {
    const numbers = Array.from({ length }, (_, i) => i + 1);
    return numbers.sort(() => Math.random() - 0.5);
  }

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

  changeLevel(newLevel) {
    this.level = newLevel;
    this.generateBoard();
    this._notifyLevelChange();
  }
}

const gameLogicInstance = new GameLogic('Default Player', DEFAULT_LEVEL);
export default gameLogicInstance;
