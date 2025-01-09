import { LitElement, html } from 'lit';

// Styles
import stylesBtnAction from './btn-action.css.js';

class BtnAction extends LitElement {
  /**
   * Retrieves the styles for the btn-action component.
   * @returns {Array} An array containing the styles for the btn-action component.
   */
  static get styles() {
    return [stylesBtnAction];
  }

  /**
   * Defines the properties for the btn-action component.
   * @property {string} text - The text to be displayed on the button.
   */
  static get properties() {
    return {
      text: { type: String },
    };
  }

  /**
   * Creates an instance of the btn-action component.
   * Initializes the text property with the value 'Click Me'.
   */
  constructor() {
    super();

    this.text = 'Click Me';
  }

  /**
   * Handles the click event and dispatches a custom 'btn-click' event.
   * The event bubbles up through the DOM and is composed, meaning it can cross the shadow DOM boundary.
   */
  _handleClick() {
    this.dispatchEvent(
      new CustomEvent('btn-click', {
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Renders a button element with a class of "btn-game" and an event listener for the click event.
   * The button's text content is set to the value of the `text` property.
   *
   * @returns {TemplateResult} The HTML template for the button element.
   */
  render() {
    return html`
      <button class="btn-game" @click=${this._handleClick}>${this.text}</button>
    `;
  }
}

customElements.define('btn-action', BtnAction);
