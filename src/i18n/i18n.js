import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Locales from 'i18next-http-backend'; // Local JSON's

/**
 * i18next is an internationalization-framework written in and for JavaScript.
 */
i18n
  .use(Locales)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en', // default language
    debug: true,
    interpolation: {
      escapeValue: false, // i18next does not escape HTML defaults
    },
    backend: {
      loadPath: 'src/i18n/locales/{{lng}}.json', // Path where JSON files are located
    },
  });

export default i18n;
