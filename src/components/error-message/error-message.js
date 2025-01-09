import { LitElement, html, css } from 'lit';

// Styles
import errorMessageStyles from './error-message.css.js';

class ErrorMessage extends LitElement {
  /**
   * Returns an array of styles to be applied to the component.
   * @returns {Array} An array containing the styles for the component.
   */
  static get styles() {
    return [errorMessageStyles];
  }

  /**
   * Declares the properties for the component.
   */
  static get properties() {
    return {
      message: { type: String },
    };
  }

  constructor() {
    super();

    this.message = '';
  }

  /**
   * Displays an error message.
   * @param {String} message - The message to display.
   */
  showError(message) {
    this.message = message;
    this.requestUpdate();
  }

  /**
   * Clears the error message.
   */
  clearError() {
    this.message = '';
    this.requestUpdate();
  }

  render() {
    return html`
      <div class="error-container">
        <div class="error-message ${this.message ? 'visible' : ''}">${this.message}</div>
      </div>
    `;
  }
}

customElements.define('error-message', ErrorMessage);
