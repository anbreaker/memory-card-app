import { css } from 'lit';

export default css`
  .game-board {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin: 1.25rem auto;
  }

  .game-board__number {
    color: #f6ae2d;
    font-size: 1.5rem;
  }

  .card {
    align-items: center;
    border: 0.125rem solid #edf2f4;
    border-radius: 8px;
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
  }

  .card.correct {
    background-color: #4caf50;
  }

  .card.wrong {
    background-color: #dc143c;
  }

  .card:hover {
    transform: scale(1.1);
  }

  .card:active {
    transform: scale(1);
  }

  .level {
    background: lightgray;
    border-radius: 0.5rem;
    font-size: 1rem;
    margin: 0.625rem;
    padding: 0.5rem;
    text-align: center;
    width: 7rem;
  }
`;
