import { beforeEach, describe, expect, test } from 'vitest';

import '../../../src/components/btn-action/btn-action.js';

describe('BtnAction', () => {
  let element;

  beforeEach(() => {
    // Create the element
    element = document.createElement('btn-action');
    document.body.appendChild(element);
  });

  test('should be the component is defined', () => {
    expect(element).toBeInstanceOf(customElements.get('btn-action'));
  });

  test('should correctly apply the styles', () => {
    const styles = element.constructor.styles;
    expect(styles).toBeTruthy();
  });

  test('should have a default text "Click Me"', () => {
    expect(element.text).to.equal('Click Me');
  });

  test('should render a button with the correct text', () => {
    const button = element.shadowRoot.querySelector('.btn-game');
    expect(button.textContent).to.equal('Click Me');
  });

  test('should dispatch a "btn-click" event on button click', async () => {
    const button = element.shadowRoot.querySelector('.btn-game');
    const eventPromise = new Promise((resolve) => {
      element.addEventListener('btn-click', resolve);
    });
    button.click();
    const event = await eventPromise;
    expect(event).to.exist;
  });

  test('should allow setting a custom text', async () => {
    element.setAttribute('text', 'Press Me');
    await element.updateComplete;
    const button = element.shadowRoot.querySelector('.btn-game');
    expect(button.textContent).to.equal('Press Me');
  });
});
