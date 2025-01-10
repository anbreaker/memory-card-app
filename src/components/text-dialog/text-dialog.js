import { LitElement, html } from 'lit';

// Internationalization
import { i18nMixin } from '../../mixins/i18n-mixin.js';
import i18n from '../../i18n/i18n.js';

// Components
import '../btn-action/btn-action.js';

// Styles
import textDialogStyles from './text-dialog.css.js';

class TextDialog extends i18nMixin(LitElement) {
  /**
   * Retrieves the styles for the text dialog component.
   * @returns {Array} An array containing the styles for the text dialog component.
   */
  static get styles() {
    return [textDialogStyles];
  }

  /**
   * @property {boolean} open - Indicates whether the dialog is open.
   * @property {string} text - The text content of the dialog.
   * @property {string} title - The title of the dialog.
   */
  static get properties() {
    return {
      open: { type: Boolean },
      text: { type: String },
      title: { type: String },
    };
  }

  /**
   * Creates an instance of the TextDialog component.
   * Initializes the `open` property to `false` and sets up the translation function `t`.
   */
  constructor() {
    super();

    this.open = false;
    this.text = '';
    this.title = '';

    this.t = i18n.t;
  }

  /**
   * Renders the HTML template for the text dialog component.
   * @returns {TemplateResult} The HTML template for the text dialog component.
   */
  render() {
    return html`
      ${this.open
        ? html`
            <div>
              <div class="dialog">
                <h2 class="title">${this.title}</h2>
                <p class="points-message">${this.text}</p>
              </div>
            </div>
          `
        : html``}
    `;
  }
}

customElements.define('text-dialog', TextDialog);
