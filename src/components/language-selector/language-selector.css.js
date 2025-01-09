import { css } from 'lit';

/**
 * CSS styles for the language selector component.
 */
export default css`
  :host {
    display: block;
    padding: 1rem;
  }

  .language {
    background: lightgray;
    border-radius: 0.5rem;
    font-size: 1rem;
    margin: 0.625rem;
    padding: 0.5rem;
  }

  .select-language {
    position: absolute;
    right: 1.25rem;
    top: 1.25rem;
  }
`;
