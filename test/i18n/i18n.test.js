import { beforeEach, describe, expect, test } from 'vitest';

import i18n from '../../src/i18n/i18n';

describe('i18n configuration', () => {
  beforeEach(() => {
    i18n.init({
      fallbackLng: 'en',
      debug: false,
      interpolation: {
        escapeValue: false,
      },
      backend: {
        loadPath: 'src/i18n/locales/{{lng}}.json',
      },
    });
  });

  test('should initialize with the correct fallback language', () => {
    const fallbackLng = i18n.options.fallbackLng[0];
    expect(fallbackLng).toBe('en');
  });

  test('should have debug mode disabled', () => {
    expect(i18n.options.debug).toBe(false);
  });

  test('should not escape values during interpolation', () => {
    expect(i18n.options.interpolation.escapeValue).toBe(false);
  });

  test('should have the correct backend load path', () => {
    expect(i18n.options.backend.loadPath).toBe('src/i18n/locales/{{lng}}.json');
  });
});
