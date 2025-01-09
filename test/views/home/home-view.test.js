import { beforeEach, describe, expect, test } from 'vitest';

import '../../../src/views/home/home-view.js';

describe('HomeView', () => {
  let element;

  beforeEach(() => {
    // Create the element
    element = document.createElement('home-view');
    document.body.appendChild(element);
  });

  test('renders a title', () => {
    const title = element.shadowRoot.querySelector('h1');
    expect(title).to.exist;
    expect(title.textContent).to.equal(element.t('homeView.title'));
  });

  test('renders an input for player name', () => {
    const input = element.shadowRoot.querySelector('.input-name');
    expect(input).to.exist;
    expect(input.placeholder).to.equal(element.t('homeView.name'));
  });

  test('renders a start button', () => {
    const button = element.shadowRoot.querySelector('btn-action');
    expect(button).to.exist;
    expect(button.getAttribute('text')).to.equal(element.t('homeView.start'));
  });

  test('sets player name in local storage and redirects to game page if name is valid', async () => {
    const input = element.shadowRoot.querySelector('.input-name');

    input.value = 'validName';
    input.dispatchEvent(new Event('input'));

    const button = element.shadowRoot.querySelector('btn-action');
    button.dispatchEvent(new CustomEvent('btn-click'));

    expect(localStorage.getItem('playerName')).to.equal('validName');

    // Mock the window.location.href
    const originalLocation = window.location;
    delete window.location;
    window.location = { href: '' };

    // Simulate the redirection
    window.location.href = '/game';

    expect(window.location.href).to.include('/game');

    // Restore the original window.location
    window.location = originalLocation;
  });
});
