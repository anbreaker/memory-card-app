import { beforeEach, describe, expect, test, vi } from 'vitest';

import { LanguageSelector } from '../../../src/components/language-selector/language-selector.js';
import i18n from '../../../src/i18n/i18n.js';

describe('LanguageSelector', () => {
  let element;

  beforeEach(() => {
    // Create the element
    element = document.createElement('language-selector');
    document.body.appendChild(element);
  });

  test('should be defined', () => {
    expect(element).toBeInstanceOf(LanguageSelector);
  });

  test('should correctly apply the styles', () => {
    const styles = element.constructor.styles;
    expect(styles).toBeTruthy();
  });

  test('should have default language set', () => {
    expect(element.selectedLanguage).toBe(i18n.language?.split('-')[0] || 'en');
  });

  test('should render the language selector', () => {
    const select = element.shadowRoot.querySelector('.language');
    expect(select).toBeTruthy();
  });

  test('should change language on selection', async () => {
    const select = element.shadowRoot.querySelector('.language');
    select.value = 'en';
    select.dispatchEvent(new Event('change'));

    expect(element.selectedLanguage).toBe('en');
    expect(localStorage.getItem('selectedLanguage')).toBe('en');
    expect(i18n.language).toBe('en-US');
  });

  test('should dispatch language-changed event on language change', async () => {
    const select = element.shadowRoot.querySelector('.language');
    const spy = vi.spyOn(element, 'dispatchEvent');

    select.value = 'es';
    select.dispatchEvent(new Event('change'));

    expect(spy).toHaveBeenCalled();
    const event = spy.mock.calls[0][0];
    expect(event.type).toBe('language-changed');
    expect(event.detail.language).toBe('es');
  });
});
