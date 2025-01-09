import { css } from 'lit';

/**
 * CSS styles for the home view component.
 */
export default css`
  :host {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
  }

  .error-container {
    margin-top: 0.5rem;
    min-height: 1.5rem;
  }

  .error-message {
    color: #d80032;
    font-size: 1rem;
    visibility: hidden;
  }

  .error-message.visible {
    visibility: visible;
  }

  .input-name {
    border-radius: 0.625rem;
    font-size: 1rem;
    margin: 0.3125rem 0;
    padding: 0.625rem;
  }
`;
