jest.useFakeTimers(); // Setup fake timers first
jest.spyOn(global, 'clearInterval'); // Spy BEFORE importing countdownTimer

const { countdownTimer } = require('../src/countdown');

describe('countdownTimer', () => {
  test('should log remaining time at intervals and stop at 0', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    const timerId = countdownTimer(3, 1000);

    // Fast-forward timers
    jest.advanceTimersByTime(4000); // Enough to go 3..2..1..0

    // Check logs
    expect(consoleSpy).toHaveBeenCalledWith(3);
    expect(consoleSpy).toHaveBeenCalledWith(2);
    expect(consoleSpy).toHaveBeenCalledWith(1);
    expect(consoleSpy).toHaveBeenCalledWith(0);

    // Check that clearInterval was called correctly
    expect(global.clearInterval).toHaveBeenCalledWith(timerId);

    consoleSpy.mockRestore();
  });
});
