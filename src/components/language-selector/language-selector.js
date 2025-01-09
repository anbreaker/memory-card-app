import { LitElement, html } from 'lit';

// Internationalization
import { i18nMixin } from '../../mixins/i18n-mixin.js';
import i18n from '../../i18n/i18n.js';

// Components
import '../../components/btn-action/btn-action.js';

// Styles
import stylesLanguageSelector from './language-selector.css.js';

// Constants
import { DEFAULT_LANGUAGE, SELECT_LANGUAGES } from '../../constants/language-constants.js';

export class LanguageSelector extends i18nMixin(LitElement) {
  /**
   * Retrieves the styles for the language selector component.
   *
   * @returns {Array} An array containing the styles for the language selector component.
   */
  static get styles() {
    return [stylesLanguageSelector];
  }

  /**
   * Constructs a new instance of the language selector component.
   *
   * This constructor performs the following actions:
   * - Ensures the selected language is loaded from localStorage, or defaults to the current i18n language, or a predefined default language.
   * - Changes the i18n language to the selected language if it was not previously set.
   * - Binds the i18n translation function to the instance.
   * @constructor
   */
  constructor() {
    super();

    // Ensure the language is loaded from localStorage or the default value
    this.selectedLanguage =
      localStorage.getItem('selectedLanguage') || i18n.language?.split('-')[0] || DEFAULT_LANGUAGE;

    // Change the language if it was not previously set
    i18n.changeLanguage(this.selectedLanguage);

    this.t = i18n.t;
  }

  /**
   * Handles the language change event.
   * Updates the selected language, changes the language in i18n,
   * stores the selected language in local storage, and dispatches
   * a custom event to notify other components of the language change.
   *
   * @param {Event} event - The event object containing the target element.
   * @param {HTMLSelectElement} event.target - The target element of the event.
   * @param {string} event.target.value - The new selected language.
   */
  handleLanguageChange({ target }) {
    this.selectedLanguage = target.value;

    i18n.changeLanguage(this.selectedLanguage);

    localStorage.setItem('selectedLanguage', this.selectedLanguage);

    this.dispatchEvent(
      new CustomEvent('language-changed', {
        detail: { language: this.selectedLanguage },
      })
    );
  }

  /**
   * Renders the language selector component.
   * @returns {TemplateResult} The HTML template for the language selector.
   */
  render() {
    return html`
      <div class="select-language">
        <label>${this.t('homeView.language')}:</label>
        <select class="language" @change=${this.handleLanguageChange} value=${this.selectedLanguage}>
          ${SELECT_LANGUAGES.map(
            (language) => html`
              <option ?selected="${language.value === this.selectedLanguage}" value="${language.value}">
                ${this.t(`homeView.${language.label}`)} ${language.flag}
              </option>
            `
          )}
        </select>
      </div>
    `;
  }
}

customElements.define('language-selector', LanguageSelector);
