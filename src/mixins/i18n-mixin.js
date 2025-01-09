import i18n from '../i18n/i18n.js';

/**
 * Internationalization
 * A mixin that adds internationalization (i18n) support to a base class.
 * It listens for language changes and triggers an update when the language changes.
 *
 * @param {Class} Base - The base class to extend.
 * @returns {Class} - The extended class with i18n support.
 *
 * @mixin
 */
export const i18nMixin = (Base) =>
  class extends Base {
    /**
     * Lifecycle method called when the element is added to the document's DOM.
     * Binds the updateTranslations method to the current instance and sets up
     * a listener for the 'languageChanged' event from the i18n library.
     *
     * @override
     */
    connectedCallback() {
      super.connectedCallback();
      this.updateTranslations = this.updateTranslations.bind(this);
      i18n.on('languageChanged', this.updateTranslations);
    }

    /**
     * Called when the element is disconnected from the document's DOM.
     * This method removes the 'languageChanged' event listener from the i18n instance.
     *
     * @override
     */
    disconnectedCallback() {
      super.disconnectedCallback();
      i18n.off('languageChanged', this.updateTranslations);
    }

    /**
     * Updates the translations by requesting an update.
     * This method triggers the `requestUpdate` function to refresh the translations.
     */
    updateTranslations() {
      this.requestUpdate();
    }
  };
