import { describe, it, expect, beforeEach, vi } from 'vitest';

// Logic
import gameLogicInstance from '../../src/logic/game-logic.js';

// Constants
import { LEVELS, DEFAULT_LEVEL, CARD_BOX } from '../../src/constants/game-constants.js';

describe('GameLogic', () => {
  beforeEach(() => {
    gameLogicInstance.level = DEFAULT_LEVEL;
    gameLogicInstance.playerName = 'Player';
    gameLogicInstance.points = 0;
    gameLogicInstance.isGameStarted = false;
    gameLogicInstance.numbers = [];
    gameLogicInstance.currentNumber = null;
    gameLogicInstance.visibleNumbers = false;
  });

  it('should start the game correctly', () => {
    gameLogicInstance.startGame();
    expect(gameLogicInstance.isGameStarted).toBe(true);
    expect(gameLogicInstance.points).toBe(0);
    expect(gameLogicInstance.numbers.length).toBe(CARD_BOX);
    expect(gameLogicInstance.visibleNumbers).toBe(true);
  });

  it('should generate shuffled numbers', () => {
    const numbers = gameLogicInstance.generateShuffledNumbers(10);
    expect(numbers.length).toBe(10);
    expect(new Set(numbers).size).toBe(10); // Check for uniqueness
  });

  it('should handle correct card click', () => {
    gameLogicInstance.startGame();
    gameLogicInstance.visibleNumbers = false;
    const correctIndex = gameLogicInstance.numbers.indexOf(gameLogicInstance.currentNumber);
    const result = gameLogicInstance.handleCardClick(correctIndex);
    expect(result).toBe(true);
    expect(gameLogicInstance.points).toBe(LEVELS[DEFAULT_LEVEL].points);
  });

  // TODO
  it('should handle wrong card click', () => {
    gameLogicInstance.startGame();
    gameLogicInstance.visibleNumbers = false;
    const wrongIndex =
      (gameLogicInstance.numbers.indexOf(gameLogicInstance.currentNumber) + 1) % gameLogicInstance.numbers.length;
    const result = gameLogicInstance.handleCardClick(wrongIndex);
    expect(result).toBe(false);

    // Delay the check to allow the game to finish (Animations)
    setTimeout(() => {
      expect(gameLogicInstance.isGameStarted).toBe(false);
    }, 1600);
  });

  it('should change level correctly', () => {
    const newLevel = 'medium';
    gameLogicInstance.changeLevel(newLevel);
    expect(gameLogicInstance.level).toBe(newLevel);
    expect(gameLogicInstance.timeLimit).toBe(LEVELS[newLevel]?.speed);
  });

  it('should notify level change', () => {
    const spy = vi.spyOn(gameLogicInstance, 'dispatchEvent');
    gameLogicInstance._notifyLevelChange();
    expect(spy).toHaveBeenCalled();
  });
});
