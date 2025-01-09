import { css } from 'lit';

/**
 * CSS styles for the animated wave background component.
 */
export default css`
  :host {
    display: block;
    height: 100%;
    left: 0;
    overflow: hidden;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: -1;
  }

  .animated-wave {
    background-color: #0e4166;
    background-image: linear-gradient(to bottom, rgba(14, 65, 102, 0.86), #0e4166);
    box-sizing: border-box;
    display: block;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
`;
