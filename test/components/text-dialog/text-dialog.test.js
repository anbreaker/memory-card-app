import { beforeEach, describe, expect, test } from 'vitest';

import '../../../src/components/text-dialog/text-dialog.js';

describe('TextDialog', () => {
  let element;

  beforeEach(() => {
    // Create the element
    element = document.createElement('text-dialog');
    document.body.appendChild(element);
  });

  test('should be defined', () => {
    expect(element).toBeDefined();
  });

  test('should have default properties', () => {
    expect(element.open).toBe(false);
    expect(element.text).toBe('');
    expect(element.title).toBe('');
  });

  test('should render correctly when open is true', async () => {
    element.open = true;
    element.text = 'Test text';
    element.title = 'Test title';
    await element.updateComplete;

    const dialog = element.shadowRoot.querySelector('.dialog');
    const title = element.shadowRoot.querySelector('.title');
    const pointsMessage = element.shadowRoot.querySelector('.points-message');

    expect(dialog).not.toBeNull();
    expect(title.textContent).toBe('Test title');
    expect(pointsMessage.textContent).toBe('Test text');
  });

  test('should not render dialog when open is false', async () => {
    element.open = false;
    await element.updateComplete;

    const dialog = element.shadowRoot.querySelector('.dialog');
    expect(dialog).toBeNull();
  });
});
