import { LitElement, html } from 'lit';

// Internationalization
import { i18nMixin } from '../../mixins/i18n-mixin.js';
import i18n from '../../i18n/i18n.js';

// Constants
import { ONE_SECOND } from '../../constants/game-constants.js';

// Styles
import countdownTimerStyles from './countdown-timer.css.js';

export class CountdownTimer extends i18nMixin(LitElement) {
  /**
   * Returns an array of styles to be applied to the component.
   * @returns {Array} An array containing the styles for the component.
   */
  static get styles() {
    return [countdownTimerStyles];
  }

  /**
   * The properties of the countdown timer component.
   * @returns {Object} The properties of the countdown timer component.
   */
  static get properties() {
    return {
      time: { type: Number },
      running: { type: Boolean },
    };
  }

  /**
   * Creates an instance of the CountdownTimer component.
   * Initializes the interval, running state, translation function, and time.
   */
  constructor() {
    super();

    this.interval = null;
    this.running = false;
    this.t = i18n.t;
    this.time = 0;
  }

  /**
   * Called when the element is added to the document's DOM.
   * If the `time` property is greater than 0, it starts the countdown.
   *
   * @override
   */
  connectedCallback() {
    super.connectedCallback();

    if (this.time > 0) {
      this.startCountdown();
    }
  }

  /**
   * Called when the element is disconnected from the document's DOM.
   * Clears the interval timer and sets it to null.
   *
   * @override
   */
  disconnectedCallback() {
    super.disconnectedCallback();

    clearInterval(this.interval);
    this.interval = null;
  }

  /**
   * Starts the countdown timer.
   *
   * This method initializes the countdown timer and ensures that it does not start multiple times concurrently.
   * It decreases the time by one second intervals and updates the display accordingly.
   * When the timer reaches zero, it stops the countdown and resets the running state.
   *
   * @returns {void}
   */
  startCountdown() {
    // Avoid starting the counter several times
    if (this.running) return;

    this.running = true;

    // Interval to decrease time every second
    this.interval = setInterval(() => {
      if (this.time > 0) {
        this.time -= 1;
        this.requestUpdate();
      } else {
        clearInterval(this.interval); // Stops the timer when it reaches 0
        this.running = false;
      }
    }, ONE_SECOND); // Updates every second
  }

  /**
   * Stops the countdown timer by clearing the interval and setting the running flag to false.
   */
  stopCountdown() {
    clearInterval(this.interval);
    this.running = false;
  }

  /**
   * Renders the countdown timer component.
   *
   * @returns {TemplateResult} The HTML template for the countdown timer component.
   */
  render() {
    return html`
      <div>
        <span class="label">${this.t('countdownTimer.timer')}</span>
        <span class="timer">${this.time}</span>
        <span>${this.t('countdownTimer.seconds')}</span>
      </div>
    `;
  }
}

customElements.define('countdown-timer', CountdownTimer);
