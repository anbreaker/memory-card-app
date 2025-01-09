import { beforeEach, describe, expect, test } from 'vitest';

import '../../../src/components/error-message/error-message.js';

describe('ErrorMessage', () => {
  let element;

  beforeEach(() => {
    // Create the element
    element = document.createElement('error-message');
    document.body.appendChild(element);
  });

  test('should be the component is defined', () => {
    expect(element).toBeInstanceOf(customElements.get('error-message'));
  });

  test('should correctly apply the styles', () => {
    const styles = element.constructor.styles;
    expect(styles).toBeTruthy();
  });

  test('should be empty by default message', () => {
    expect(element.message).toBe('');
  });

  test('should display an error message when calling showError', async () => {
    element.showError('Test message');
    await element.updateComplete;

    const errorMessageDiv = element.shadowRoot.querySelector('.error-message');
    expect(errorMessageDiv.textContent).toBe('Test message');
    expect(errorMessageDiv.classList.contains('visible')).toBe(true);
  });

  test('should clear the error message when calling clearError', async () => {
    element.showError('Test message');
    await element.updateComplete;

    element.clearError();
    await element.updateComplete;

    const errorMessageDiv = element.shadowRoot.querySelector('.error-message');
    expect(errorMessageDiv.textContent).toBe('');
    expect(errorMessageDiv.classList.contains('visible')).toBe(false);
  });
});
