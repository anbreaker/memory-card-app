import { LitElement, html } from 'lit';

// Internationalization
import { i18nMixin } from '../../mixins/i18n-mixin.js';
import i18n from '../../i18n/i18n.js';

// Components
import '../../components/btn-action/btn-action.js';

// Constants
import { CARD_STATES, DEFAULT_LEVEL, DEFAULT_PLAYER_NAME, DIFFICULTY_LEVEL } from '../../constants/game-constants.js';

// Logic from the game
import { GameLogic } from '../../logic/game-logic.js';

// Styles
import gameStyles from './game-view.css.js';

class GameView extends i18nMixin(LitElement) {
  static get styles() {
    return [gameStyles];
  }

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

  startGame() {
    this.gameLogic.startGame();
  }

  removeClassForHtmlElement(element, className) {
    // Wait 1 second before removing the class
    setTimeout(() => {
      element.classList.remove(className);

      // TODO change for message error UI
      if (className === CARD_STATES.WRONG) {
        alert('Game Over!');
      }
    }, 1000);
  }

  handleCardClick(index) {
    const result = this.gameLogic.handleCardClick(index);

    const card = this.shadowRoot.querySelectorAll('.card')[index];

    if (result) {
      card.classList.add(card, CARD_STATES.CORRECT);

      this.removeClassForHtmlElement(CARD_STATES.CORRECT);
    } else {
      card.classList.add(CARD_STATES.WRONG);

      this.removeClassForHtmlElement(card, CARD_STATES.WRONG);
    }
  }

  handleLevelChange(event) {
    this.gameLogic.changeLevel(event.target.value);
  }

  render() {
    return html`
      <div>
        <h1>${this.t('gameView.welcome')} ${this.playerName} 🙋</h1>
        <p>${this.t('gameView.points')} ${this.points}</p>
        <label>
          ${this.t('gameView.level')}
          <select @change="${this.handleLevelChange}">
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
