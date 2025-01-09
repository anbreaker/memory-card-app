import { LitElement, html } from 'lit';

// Internationalization
import { i18nMixin } from '../../mixins/i18n-mixin.js';
import i18n from '../../i18n/i18n.js';

// Components
import '../../components/btn-action/btn-action.js';
import '../../components/error-message/error-message.js';

// Styles
import homeStyles from './home-view.css.js';

class HomeView extends i18nMixin(LitElement) {
  /**
   * Returns an array of styles to be applied to the component.
   * @returns {Array} An array containing the styles for the component.
   */
  static get styles() {
    return [homeStyles];
  }

  /**
   * Defines the properties for the home-view component.
   * @property {String} playerName - The name of the player.
   */
  static get properties() {
    return {
      playerName: { type: String },
    };
  }

  /**
   * Defines the properties for the home-view component.
   * @property {String} playerName - The name of the player.
   */
  constructor() {
    super();

    this.playerName = '';
    this.t = i18n.t;
  }

  /**
   * Clears the error message by calling the clearError method on the error-message component.
   */
  clearErrorMessage() {
    const errorElement = this.shadowRoot.querySelector('error-message');
    errorElement.clearError();
  }

  /**
   * Handles the start of the game by validating the player's name.
   * If the player's name is less than 3 characters, an error message is displayed.
   * Otherwise, the error message is hidden and the player setup and redirection process is initiated.
   */
  handleStartGame() {
    const errorElement = this.shadowRoot.querySelector('error-message');

    if (this.playerName.trim().length < 3) {
      errorElement.showError(this.t('homeView.errorMessage'));
      return;
    }

    this.setupPlayerAndRedirect();
  }

  /**
   * Sets the player's name in local storage and redirects to the game page.
   */
  setupPlayerAndRedirect() {
    localStorage.setItem('playerName', this.playerName);
    window.location.href = '/game';
  }

  render() {
    return html`
      <section>
        <h1>${this.t('homeView.title')}</h1>
        <input
          class="input-name"
          type="text"
          placeholder="${this.t('homeView.name')}"
          @focus=${this.clearErrorMessage}
          @input=${(ev) => (this.playerName = ev.target.value)}
        />
        <error-message></error-message>
        <btn-action text="${this.t('homeView.start')}" @btn-click=${this.handleStartGame}></btn-action>
      </section>
    `;
  }
}

customElements.define('home-view', HomeView);
