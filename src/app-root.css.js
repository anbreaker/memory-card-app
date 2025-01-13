import { css } from 'lit';

/**
 * CSS styles for the app root component.
 * @module app-root.css
 */

export default css`
  :host {
    color: #edf2f4;
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
    width: 4rem;
  }

  .logo:hover {
    transform: rotate(10deg);
    transform: rotate(-10deg);
    transition: all 300ms;
  }

  #game {
    align-items: center;
    display: flex;
    justify-content: center;
    min-height: 100vh;
    text-align: center;
  }

  @media (max-width: 600px) {
    .logo {
      width: 2.5rem;
    }
  }
`;
