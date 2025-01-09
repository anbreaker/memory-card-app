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

  @media (min-width: 600px) and (max-width: 900px) {
    .select-language {
      right: 0.5rem;
      top: 0rem;
    }
  }
`;
