interface Game {
  updateResults: (result: string | number) => void;
  increaseScore: () => void;
  lose: () => void;
  win: () => void;
}

const resultsDisplay: HTMLElement = document.getElementById('results');
let score: number = 0;

function increaseScore(): void {
  score++;
  resultsDisplay.innerHTML = `${score}`;
}

function lose(): void {
  resultsDisplay.innerHTML = 'Game Over';
}

function win(): void {
  resultsDisplay.innerHTML = `You Win: ${score}`;
}

function updateResults(result: string): void {
  resultsDisplay.innerHTML = `${result}`;
}

/**
 * The core game object:
 *
 * Keeps track of score and outcome
 * Manages display of score and outcome
 */
export function Game(): Game {
  return {
    updateResults,
    increaseScore,
    lose,
    win,
  };
}
