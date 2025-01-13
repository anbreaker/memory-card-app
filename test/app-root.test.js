import { beforeEach, describe, expect, test } from 'vitest';

import { Router } from '@vaadin/router';

import '../src/app-root.js';

describe('AppRoot', () => {
  let element;

  beforeEach(() => {
    // Create the element
    element = document.createElement('app-root');
    document.body.appendChild(element);
  });

  test('should render the language selector', () => {
    const languageSelector = element.shadowRoot.querySelector('language-selector');
    expect(languageSelector).not.toBeNull(); // Verify than element exists
  });

  test('should render the animated wave background', () => {
    const waveBackground = element.shadowRoot.querySelector('animated-wave-background');
    expect(waveBackground).not.toBeNull(); // Verify than element exists
  });

  test('should navigate to the home view on "/"', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const router = new Router(container);
    router.setRoutes([
      { path: '/', component: 'home-view' },
      { path: '/game', component: 'game-view' },
      { path: '(.*)', redirect: '/' },
    ]);

    // Navega a la ruta "/"
    router.render('/');
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Verifica que el componente correcto se renderizó
    expect(container.querySelector('home-view')).not.toBeNull();

    document.body.removeChild(container);
  });

  test('should block navigation to /game if name is empty', async () => {
    await element.updateComplete;

    // Simula un intento de navegar a /game
    element.router.render('/game');

    // Espera un pequeño tiempo para procesar la navegación
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Verifica que no se navegó a /game
    expect(element.router.location.pathname).toBe('/'); // Redirigido al home
  });

  test('should navigate to /game if name is provided', async () => {
    element.name = 'John Doe'; // Establece un nombre
    await element.updateComplete;

    element.router.render('/game');
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(element.router.location.pathname).toBe('/game'); // Navegación permitida
  });

  test('should redirect to home when an unknown route is accessed', async () => {
    await element.updateComplete;
    const router = element.router;

    // Navigates to an unknown route
    router.render('/unknown');

    // Wait until the router is ready
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Verify that the current path is the root
    expect(router.location.pathname).toBe('/');
  });
});
