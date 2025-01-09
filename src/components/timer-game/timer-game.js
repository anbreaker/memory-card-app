import { LitElement, html } from 'lit';

// Internationalization
import { i18nMixin } from '../../mixins/i18n-mixin.js';
import i18n from '../../i18n/i18n.js';

// Components
import '../../components/btn-action/btn-action.js';

// Styles
import stylesTimerGame from './timer-game.css.js';

export class TimerGame extends i18nMixin(LitElement) {
  /**
   * Retrieves the styles for the TimerGame component.
   * @returns {Array} An array containing the styles for the TimerGame component.
   */
  static get styles() {
    return [stylesTimerGame];
  }

  /**
   * Properties of the TimerGame component.
   * @property {number} time - The current time value.
   * @property {boolean} running - Indicates whether the timer is running.
   */
  static get properties() {
    return {
      time: { type: Number },
      running: { type: Boolean },
    };
  }

  /**
   * Creates an instance of the TimerGame component.
   * Initializes the interval timer, running timer state, translation function, and time.
   */
  constructor() {
    super();

    this.intervalTimer = null;
    this.runningTimer = false;
    this.t = i18n.t;
    this.time = 0;
  }

  /**
   * Starts the timer if it is not already running.
   * Prevents multiple starts by checking the runningTimer flag.
   * Calculates the base time in case of a reset and updates the time every 10 milliseconds.
   */
  startTimer() {
    // Prevent multiple starts
    if (this.runningTimer) return;

    this.runningTimer = true;

    // Calculate the base time in case of reset
    const startTime = Date.now() - this.time;

    this.intervalTimer = setInterval(() => {
      this.time = Date.now() - startTime;

      this.requestUpdate();
    }, 10); // Update every 10 milliseconds
  }

  /**
   * Stops the timer by clearing the interval and setting the running state to false.
   * @method stopTimer
   */
  stopTimer() {
    clearInterval(this.intervalTimer);
    this.runningTimer = false;
  }

  /**
   * Resets the timer by clearing the interval, setting the time to 0,
   * and marking the timer as not running. Also triggers an update request.
   */
  resetTimer() {
    clearInterval(this.intervalTimer);
    this.time = 0;
    this.runningTimer = false;

    this.requestUpdate();
  }

  /**
   * Formats a given time in milliseconds into a string with the format MM:SS:SSS.
   *
   * @param {number} milliseconds - The time in milliseconds to format.
   * @returns {string} The formatted time string.
   */
  formatTime(milliseconds) {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const millisecs = milliseconds % 1000;

    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${millisecs < 100 ? '0' : ''}${
      millisecs < 10 ? '0' : ''
    }${millisecs}`;
  }

  /**
   * Renders the timer game component.
   *
   * @returns {TemplateResult} The HTML template for the timer game component.
   */
  render() {
    return html`
      <div>
        <p>
          ${this.t('gameView.time')}:
          <span class="timer">${this.formatTime(this.time)}</span>
        </p>

        <btn-action text="${this.t('gameView.resetTimer')}" @btn-click=${this.resetTimer}></btn-action>
      </div>
    `;
  }
}

customElements.define('timer-game', TimerGame);
