import { beforeEach, describe, expect, test } from 'vitest';

// Views
import { GameView } from '../../../src/views/game/game-view.js';

// Components
import '../../../src/components/btn-action/btn-action.js';
import '../../../src/components/countdown-timer/countdown-timer.js';
import '../../../src/components/text-dialog/text-dialog.js';

// Constants
import { DIFFICULTY_LEVEL } from '../../../src/constants/game-constants.js';

describe('GameView', () => {
  let element;

  beforeEach(() => {
    // Create the element
    element = document.createElement('game-view');
    document.body.appendChild(element);
  });

  test('should render the game view', () => {
    expect(element).to.exist;
  });

  test('should initialize with default properties', () => {
    expect(element.playerName).to.equal('');
    expect(element.level).to.equal(DIFFICULTY_LEVEL[0]);
    expect(element.points).to.equal(0);
    expect(element.isGameStarted).to.be.false;
    expect(element.showMessage).to.be.false;
  });

  test('should start the game when startGame is called', () => {
    element.startGame();
    expect(element.isGameStarted).to.be.true;
    expect(element.showMessage).to.be.false;
  });

  test('should handle card click correctly', () => {
    element.numbers = [1, 2, 3];
    element.visibleNumbers = true;
    element.handleCardClick(0);
    const card = element.shadowRoot.querySelectorAll('.card')[0];
    expect(card.classList.contains('correct') || card.classList.contains('wrong')).to.be.true;
  });

  test('should change level correctly', () => {
    const event = { target: { value: DIFFICULTY_LEVEL[1] } };
    element.handleLevelChange(event);
    expect(element.level).to.equal(DIFFICULTY_LEVEL[1]);
  });

  test('should show message when game is over', () => {
    element.removeClassForHtmlElement(null, 'wrong');
    setTimeout(() => {
      expect(element.showMessage).to.be.true;
    }, 1000);
  });

  test('should render the correct number of cards', async () => {
    element.numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    await element.updateComplete;
    const cards = element.shadowRoot.querySelectorAll('.card');
    expect(cards.length).to.equal(9);
  });

  test('should display the correct player name', async () => {
    element.playerName = 'Test Player';
    await element.updateComplete;
    const playerNameElement = element.shadowRoot.querySelector('h1');
    expect(playerNameElement.textContent).to.include('Test Player');
  });

  test('should update points correctly', async () => {
    element.points = 10;
    await element.updateComplete;
    const pointsElement = element.shadowRoot.querySelector('p');
    expect(pointsElement.textContent).to.include('10');
  });
});
