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
    background: #d3d3d3;
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

  /* Media query for mobile devices */
  @media (max-width: 600px) {
    .language {
      font-size: 1rem;
      margin: 0.4rem;
      padding: 0.2rem 0.5rem;
    }
  }
`;
