import { beforeEach, describe, expect, test, vi } from 'vitest';

import '../../../src/views/game/game-view.js';
import { GameLogic } from '../../../src/logic/game-logic.js';
import { CARD_STATES, DIFFICULTY_LEVEL } from '../../../src/constants/game-constants.js';

vi.mock('../../../src/logic/game-logic.js'); // Mock del GameLogic

describe('GameView', () => {
  let element;

  beforeEach(() => {
    // Mock del GameLogic
    GameLogic.mockImplementation(() => ({
      playerName: 'Test Player',
      points: 0,
      level: 'medium',
      isGameStarted: false,
      numbers: [],
      visibleNumbers: false,
      currentNumber: 0,
      startGame: vi.fn(),
      handleCardClick: vi.fn().mockReturnValue(true),
      changeLevel: vi.fn(),
      addEventListener: vi.fn(),
    }));

    // Create the element
    element = document.createElement('game-view');
    document.body.appendChild(element);
  });

  test('should render player name and points', () => {
    const welcomeMessage = element.shadowRoot.querySelector('h1');
    expect(welcomeMessage).to.exist;
    expect(welcomeMessage.textContent).to.include('Test Player');

    const points = element.shadowRoot.querySelector('p');
    expect(points).to.exist;
    expect(points.textContent).to.include('0');
  });

  test('ahould render difficulty level select', () => {
    const select = element.shadowRoot.querySelector('.level');
    expect(select).to.exist;

    const options = select.querySelectorAll('option');
    expect(options).to.have.length(3);
    expect([...options].map((opt) => opt.value)).to.deep.equal(DIFFICULTY_LEVEL);
  });

  test('should render start button', () => {
    const button = element.shadowRoot.querySelector('btn-action');
    expect(button).to.exist;
    expect(button.getAttribute('text')).to.equal(element.t('gameView.play'));
  });

  test('calls startGame on start button click', () => {
    const button = element.shadowRoot.querySelector('btn-action');
    button.dispatchEvent(new CustomEvent('btn-click'));

    expect(element.gameLogic.startGame).toHaveBeenCalled();
  });

  test('should handle card click correctly', async () => {
    element.numbers = [1, 2, 3];
    element.isGameStarted = true;
    element.visibleNumbers = true;

    await element.updateComplete;

    const cards = element.shadowRoot.querySelectorAll('.card');
    expect(cards).to.have.length(3);

    cards[0].click();

    await element.updateComplete;

    expect(cards[0].classList.contains(CARD_STATES.CORRECT)).to.be.true;
  });

  test('Should render game board when game is started', () => {
    element.isGameStarted = true;
    element.numbers = [1, 2, 3];
    element.visibleNumbers = true;
    element.requestUpdate();

    return element.updateComplete.then(() => {
      const gameBoard = element.shadowRoot.querySelector('.game-board');
      expect(gameBoard).to.exist;

      const cards = gameBoard.querySelectorAll('.card');
      expect(cards).to.have.length(3);
      expect([...cards].map((card) => card.textContent.trim())).to.deep.equal(['1', '2', '3']);
    });
  });
});
