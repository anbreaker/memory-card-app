import { afterEach, beforeEach, describe, expect, test } from 'vitest';

import { CountdownTimer } from '../../../src/components/countdown-timer/countdown-timer.js';

describe('TimerGame', () => {
  let countdownTimer;

  beforeEach(() => {
    countdownTimer = new CountdownTimer();
  });

  afterEach(() => {
    countdownTimer.stopTimer();
  });

  // TODO
});
