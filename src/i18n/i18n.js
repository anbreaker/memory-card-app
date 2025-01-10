import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translations
import { en } from './locales/en';
import { es } from './locales/es';
import { pt } from './locales/pt';

i18n.use(LanguageDetector).init({
  debug: true, // Show logs
  fallbackLng: 'en', // Language by default
  interpolation: {
    escapeValue: false, // i18next does not escape HTML
  },
  resources: {
    en: {
      translation: en,
    },
    es: {
      translation: es,
    },
    pt: {
      translation: pt,
    },
  },
});

export default i18n;
