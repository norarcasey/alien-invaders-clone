import './style.css';

import { InitialzeAlienInvaders } from './alien-invaders';
import { InitializeGrid } from './grid';
import { InitializeShooter } from './shooter';
import { Game } from './game';

let invaderInterval: number;

const grid = InitializeGrid();

const game = Game();
const { alienInvaders, aliensRemoved, moveInvaders, removeInvader } =
  InitialzeAlienInvaders(grid);
const shooter = InitializeShooter(grid);

/**
 *  Managing win states
 */
function checkStatus() {
  if (grid.gridHas('invader', shooter.index)) {
    game.lose();
    clearInterval(invaderInterval);
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    if (alienInvaders[i].index > grid.width * grid.width) {
      game.lose();
      clearInterval(invaderInterval);
    }
  }
  if (aliensRemoved.length === alienInvaders.length) {
    game.win();
    clearInterval(invaderInterval);
  }
}

function start(): void {
  moveInvaders();
  checkStatus();
}

function hit(index: number): void {
  removeInvader(index);
  game.increaseScore();
}

invaderInterval = setInterval(start, 500);
document.addEventListener('keydown', (e) => shooter.shoot(e, hit));
