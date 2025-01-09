import { afterEach, beforeEach, describe, expect, test } from 'vitest';

import { CountdownTimer } from '../../../src/components/countdown-timer/countdown-timer.js';

describe('CountdownTimer', () => {
  let element;

  beforeEach(() => {
    // Create the element
    element = document.createElement('countdown-timer');
    document.body.appendChild(element);
  });

  afterEach(() => {
    // Clean up the element
    document.body.removeChild(element);
  });

  test('should initialize with default values', () => {
    expect(element.time).toBe(0);
    expect(element.running).toBe(false);
  });

  test('should start countdown when time is set and connected', () => {
    element.time = 10;
    element.connectedCallback();
    expect(element.running).toBe(true);
  });

  test('should decrease time every second when running', () => {
    element.time = 2;
    element.startCountdown();
    expect(element.running).toBe(true);

    setTimeout(() => {
      expect(element.time).toBe(1);
    }, 1000);

    setTimeout(() => {
      expect(element.time).toBe(0);
      expect(element.running).toBe(false);
    }, 2000);
  });

  test('should stop countdown when stopCountdown is called', () => {
    element.time = 10;
    element.startCountdown();
    element.stopCountdown();
    expect(element.running).toBe(false);
  });

  test('should render the correct time', async () => {
    element.time = 5;
    element.requestUpdate();
    const timer = element.shadowRoot.querySelector('.timer');

    await element.updateComplete;
    expect(timer.textContent).toContain('5');
  });
});
