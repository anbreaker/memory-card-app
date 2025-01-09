import { afterEach, beforeEach, describe, expect, test } from 'vitest';

import { TimerGame } from '../../../src/components/timer-game/timer-game.js';

describe('TimerGame', () => {
  let timerGame;

  beforeEach(() => {
    timerGame = new TimerGame();
  });

  afterEach(() => {
    timerGame.stopTimer();
  });

  test('should initialize with default values', () => {
    expect(timerGame.time).toBe(0);
    expect(timerGame.runningTimer).toBe(false);
  });

  test('should start the timer', () => {
    timerGame.startTimer();
    expect(timerGame.runningTimer).toBe(true);
  });

  test('should not start the timer if already running', () => {
    timerGame.startTimer();
    timerGame.startTimer();
    expect(timerGame.runningTimer).toBe(true);
  });

  test('should stop the timer', () => {
    timerGame.startTimer();
    timerGame.stopTimer();
    expect(timerGame.runningTimer).toBe(false);
  });

  test('should reset the timer', () => {
    timerGame.startTimer();
    timerGame.resetTimer();
    expect(timerGame.time).toBe(0);
    expect(timerGame.runningTimer).toBe(false);
  });

  test('should format time correctly', () => {
    const formattedTime = timerGame.formatTime(123456);
    expect(formattedTime).toBe('02:03:456');
  });

  test('should update time while running', () => {
    timerGame.startTimer();
    setTimeout(() => {
      expect(timerGame.time).toBeGreaterThan(0);
    }, 20);
  });
});
