import { afterEach, beforeEach, describe, expect, test } from 'vitest';

import './../../../src/components/animated-wave-background/animated-wave-background.js';

describe('AnimatedWaveBackground', () => {
  let element;

  beforeEach(() => {
    // Create the element
    element = document.createElement('animated-wave-background');
    document.body.appendChild(element);
  });

  afterEach(() => {
    element.remove();
  });

  test('should be defined', () => {
    expect(customElements.get('animated-wave-background')).toBeDefined();
  });

  test('should correctly apply the styles', () => {
    const styles = element.constructor.styles;
    expect(styles).toBeTruthy();
  });

  test('should render an SVG element', () => {
    const svg = element.shadowRoot.querySelector('svg');
    expect(svg).not.toBeNull();
  });
});
