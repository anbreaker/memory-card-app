import { LitElement, html } from 'lit';

// Internationalization
import { i18nMixin } from '../../mixins/i18n-mixin.js';
import i18n from '../../i18n/i18n.js';

// TODO
// Logic from the game
// import { GameLogic } from '../../logic/game-logic.js';

// Components
import '../../components/btn-action/btn-action.js';

// Styles
import gameStyles from './game-view.css.js';

// Constants
import {
  CARD_BOX,
  DEFAULT_LEVEL,
  DEFAULT_PLAYER_NAME,
  DIFFICULTY_LEVEL,
  LEVELS,
} from '../../constants/game-constants.js';

// Logic from the game
// TODO separate the logic from the view

class GameView extends i18nMixin(LitElement) {
  static get styles() {
    return [gameStyles];
  }

  static get properties() {
    return {
      currentNumber: { type: Number },
      difficulty: { type: String },
      isGameStarted: { type: Boolean },
      level: { type: String },
      numbers: { type: Array },
      playerName: { type: String },
      points: { type: Number },
      timeLimit: { type: Number },
      visibleNumbers: { type: Boolean },
    };
  }

  constructor() {
    super();

    this.currentNumber = null;
    this.isGameStarted = false;
    this.level = DEFAULT_LEVEL;
    this.numbers = [];
    this.playerName = DEFAULT_PLAYER_NAME;
    this.points = 0;
    this.t = i18n.t;
    this.timeLimit = LEVELS[this.level].speed;
    this.visibleNumbers = false;
  }

  // Start the game and generate a new board
  startGame() {
    this.isGameStarted = true;
    this.points = 0;
    this.generateBoard();
  }

  generateShuffledNumbers(length) {
    const numbers = Array.from({ length }, (_, i) => i + 1);

    return numbers.sort(() => Math.random() - 0.5);
  }

  // Generate a new board with shuffled numbers and set a random number to remember
  generateBoard() {
    const numbers = this.generateShuffledNumbers(CARD_BOX);

    this.numbers = numbers;
    this.currentNumber = numbers[Math.floor(Math.random() * CARD_BOX)];
    this.timeLimit = LEVELS[this.level].speed;

    // Show numbers for a limited time based on difficulty
    this.visibleNumbers = true;

    // After the time limit, hide the numbers and enable click
    setTimeout(() => {
      this.visibleNumbers = false;
    }, this.timeLimit * 1000);
  }

  // Handle the card click event
  handleCardClick(index) {
    // Disable clicks if numbers are visible
    if (!this.isGameStarted || this.visibleNumbers) return;

    const card = this.shadowRoot.querySelectorAll('.card')[index];
    const isCorrect = this.numbers[index] === this.currentNumber;

    // If the player clicks the correct card
    if (isCorrect) {
      card.classList.add('correct');
      this.points += LEVELS[this.level].points;

      setTimeout(() => {
        card.classList.remove('correct');
        this.generateBoard();
      }, 1000);
    } else {
      card.classList.add('wrong');

      setTimeout(() => {
        card.classList.remove('wrong');

        // TODO change the alert to a message in the UI
        alert('Game Over!'); // End the game if the selection is wrong
        this.isGameStarted = false;
      }, 1000);
    }
  }

  // Update the difficulty level when the user selects a new one
  handleLevelChange(event) {
    this.level = event.target.value;
    this.generateBoard();
  }

  // Render the game UI
  render() {
    return html`
      <div>
        <h1 class="title">${this.t('gameView.welcome')} ${this.playerName} 🙋</h1>
        <p>${this.t('gameView.points')} ${this.points}</p>

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

        <btn-action text="${this.t('gameView.play')}" @btn-click=${this.startGame}></btn-action>

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
                <span class="game-board__number">${this.currentNumber}</span>
              </p>
            `
          : ''}
      </div>
    `;
  }
}

customElements.define('game-view', GameView);
