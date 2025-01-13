import { css } from 'lit';

export default css`
  .game-board {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin: 1.25rem auto;
  }

  .card {
    align-items: center;
    border: 0.125rem solid #edf2f4;
    border-radius: 0.5rem;
    cursor: pointer;
    display: flex;
    font-size: 1.25rem;
    font-weight: bold;
    height: 6.25rem;
    justify-content: center;
    text-align: center;
    transition:
      background-color 0.3s,
      transform 0.2s;
    width: 6.25rem;
  }

  .card.visible {
    background-color: transparent;
    pointer-events: none; /* Block clicks without Js */
  }

  .card.correct {
    background-color: #4caf50;
    transition: background-color 0.3s ease;
  }

  .card.wrong {
    background-color: #dc143c;
    transition: background-color 0.3s ease;
  }

  .card:hover {
    transform: scale(1.1);
  }

  .card:active {
    transform: scale(1);
  }

  .level {
    background: #d3d3d3;
    border-radius: 0.5rem;
    font-size: 1rem;
    margin: 0.625rem;
    padding: 0.5rem;
    text-align: center;
    width: 7rem;
  }

  .remember-number {
    color: #f6ae2d;
    font-size: 1.5rem;
  }

  /* Media query for mobile devices */
  @media (max-width: 600px) {
    .game-board {
      gap: 0.2rem;
      margin: 1rem auto;
    }

    .card {
      font-size: 1rem;
      height: 5rem;
      width: 5rem;
    }

    .remember-number {
      font-size: 1.2rem;
    }

    .welcome {
      font-size: 1.2rem;
    }
  }
`;
