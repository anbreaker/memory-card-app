import { css } from 'lit';

/**
 * CSS styles for the app root component.
 * @module app-root.css
 */

export default css`
  :host {
    color: aliceblue;
    display: block;
    font-family: Arial, sans-serif;
    height: 100vh;
  }

  .app {
    position: relative;
  }

  .logo {
    padding: 1.25rem;
    position: absolute;
    width: 5rem;
  }

  #game {
    align-items: center;
    display: flex;
    justify-content: center;
    min-height: 100vh;
    text-align: center;
  }
`;
