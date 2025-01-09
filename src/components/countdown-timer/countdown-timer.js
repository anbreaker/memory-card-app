import { LitElement, html } from 'lit';

// Internationalization
import { i18nMixin } from '../../mixins/i18n-mixin.js';
import i18n from '../../i18n/i18n.js';

// Styles
import countdownTimerStyles from './countdown-timer.css.js';

export class CountdownTimer extends i18nMixin(LitElement) {
  static get styles() {
    return [countdownTimerStyles];
  }

  static get properties() {
    return {
      time: { type: Number },
      running: { type: Boolean },
    };
  }

  constructor() {
    super();

    this.interval = null;
    this.running = false;
    this.t = i18n.t;
    this.time = 0;
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.time > 0) {
      this.startCountdown();
    }
  }

  startCountdown() {
    if (this.running) return; // Avoid starting the counter several times

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
    }, 1000); // Updates every second
  }

  stopCountdown() {
    clearInterval(this.interval);
    this.running = false;
  }

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
