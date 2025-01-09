import { LitElement, html } from 'lit';

// Internationalization
import { i18nMixin } from '../../mixins/i18n-mixin.js';
import i18n from '../../i18n/i18n.js';

// Components
import '../../components/btn-action/btn-action.js';
import '../../components/countdown-timer/countdown-timer.js';

// Constants
import {
  CARD_STATES,
  DEFAULT_LEVEL,
  DEFAULT_PLAYER_NAME,
  DIFFICULTY_LEVEL,
  LEVELS,
} from '../../constants/game-constants.js';

// Logic from the game
import { GameLogic } from '../../logic/game-logic.js';

// Styles
import gameStyles from './game-view.css.js';

class GameView extends i18nMixin(LitElement) {
  /**
   * Returns an array of styles to be applied to the component.
   * @returns {Array} An array containing the styles for the component.
   */
  static get styles() {
    return [gameStyles];
  }

  /**
   * @property {number} currentNumber - The current number displayed in the game.
   * @property {boolean} isGameStarted - Indicates whether the game has started.
   * @property {string} level - The current level of the game.
   * @property {Array} numbers - The array of numbers used in the game.
   * @property {string} playerName - The name of the player.
   * @property {number} points - The current points of the player.
   * @property {boolean} visibleNumbers - Indicates whether the numbers are visible.
   */
  static get properties() {
    return {
      currentNumber: { type: Number },
      isGameStarted: { type: Boolean },
      level: { type: String },
      numbers: { type: Array },
      playerName: { type: String },
      points: { type: Number },
      visibleNumbers: { type: Boolean },
    };
  }

  /**
   * Constructs a new instance of the game view.
   * Initializes the game logic with the player's name and default level.
   * Synchronizes the initial status with the game logic.
   * Sets up an event listener for level change events to synchronize the status.
   */
  constructor() {
    super();
    const playerName = localStorage.getItem('playerName') || DEFAULT_PLAYER_NAME;
    this.gameLogic = new GameLogic(playerName, DEFAULT_LEVEL);
    this.t = i18n.t;

    // Synchronize initial status
    this.syncWithLogic();

    // Listening for level status change events
    this.gameLogic.addEventListener('level-change', () => this.syncWithLogic());
  }

  /**
   * Synchronizes the view's state with the game logic's state.
   * Updates the current number, game status, level, numbers array,
   * player name, points, and visible numbers from the game logic.
   */
  syncWithLogic() {
    this.currentNumber = this.gameLogic.currentNumber;
    this.isGameStarted = this.gameLogic.isGameStarted;
    this.level = this.gameLogic.level;

    // Ensures reactivity by copying the array
    this.numbers = [...this.gameLogic.numbers];

    this.playerName = this.gameLogic.playerName;
    this.points = this.gameLogic.points;
    this.visibleNumbers = this.gameLogic.visibleNumbers;
  }

  /**
   * Starts the game by initializing the game logic and countdown timer.
   */
  startGame() {
    this.gameLogic.startGame();

    this.initCountdownTimer();
  }

  /**
   * Initializes the countdown timer based on the selected level.
   * This method retrieves the time limit for the current level from the LEVELS object,
   * updates the timer element with the retrieved time, and starts the countdown.
   */
  initCountdownTimer() {
    // time according to level selected
    const timeLimit = LEVELS[this.level]?.speed;

    const timerElement = this.shadowRoot.querySelector('countdown-timer');

    timerElement.time = timeLimit; // Update timer time
    timerElement.startCountdown(); // Starts the timer
  }

  /**
   * Removes a specified class from an HTML element after a delay of 1 second.
   * If the class to be removed is CARD_STATES.WRONG, an alert with "Game Over!" is shown.
   *
   * @param {HTMLElement} element - The HTML element from which the class will be removed.
   * @param {string} className - The class name to be removed from the element.
   */
  removeClassForHtmlElement(element = null, className) {
    // Ensure className and element are valid
    if (!element || !className) return;

    // Wait 1 second before removing the class
    setTimeout(() => {
      // TODO change for message error UI
      if (className === CARD_STATES.WRONG) {
        alert('Game Over!');
      }

      element.classList.remove(className);
    }, 1000);
  }

  /**
   * Handles the click event on a card.
   * @param {number} index - The index of the clicked card.
   */
  handleCardClick(index) {
    const card = this.shadowRoot.querySelectorAll('.card')[index];

    const result = this.gameLogic.handleCardClick(index);

    if (result) {
      card.classList.add(CARD_STATES.CORRECT);

      this.removeClassForHtmlElement(card, CARD_STATES.CORRECT);

      // TODO ver como hacer un delay para que se muestre el contador bien
      setTimeout(() => {
        this.initCountdownTimer(), 1000;
      });
    } else {
      card.classList.add(CARD_STATES.WRONG);

      this.removeClassForHtmlElement(card, CARD_STATES.WRONG);
    }
  }

  /**
   * Handles the change of game level.
   * @param {Event} event - The event triggered by changing the level.
   */
  handleLevelChange(event) {
    this.gameLogic.changeLevel(event.target.value);
  }

  /**
   * Renders the game view.
   *
   * @returns {TemplateResult} The HTML template for the game view.
   *
   * @this {LitElement}
   * @memberof GameView
   *
   * @description
   * This method returns an HTML template that includes:
   * - A welcome message with the player's name.
   * - The current points of the player.
   * - A countdown timer component.
   * - A dropdown to select the game level.
   * - A button to start the game.
   * - If the game has started, a game board with cards and a reminder of the current number to remember.
   */
  render() {
    return html`
      <div>
        <h1>${this.t('gameView.welcome')} ${this.playerName} 🙋</h1>
        <p>${this.t('gameView.points')} ${this.points}</p>
        <countdown-timer></countdown-timer>

        <label>
          ${this.t('gameView.level')}
          <select class="level" @change="${this.handleLevelChange}">
            ${DIFFICULTY_LEVEL.map(
              (level) => html`
                <option value="${level}" ?selected="${this.level === level}">
                  ${this.t(`gameView.${level.toLowerCase()}`)}
                </option>
              `
            )}
          </select>
        </label>

        <btn-action text="${this.t('gameView.play')}" @btn-click="${this.startGame}"></btn-action>

        ${this.isGameStarted
          ? html`
              <div class="game-board">
                ${this.numbers.map(
                  (num, index) => html`
                    <div
                      class="card ${this.visibleNumbers ? 'visible' : ''}"
                      @click="${() => this.handleCardClick(index)}"
                    >
                      ${this.visibleNumbers ? num : ''}
                    </div>
                  `
                )}
              </div>
              <p>
                ${this.t('gameView.rememberNumber')}
                <span class="remember-number">${this.currentNumber}</span>
              </p>
            `
          : ''}
      </div>
    `;
  }
}

customElements.define('game-view', GameView);
