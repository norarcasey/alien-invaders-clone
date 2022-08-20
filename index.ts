import './style.css';

import { InitialzeAlienInvaders } from './alien-invaders';
import { InitializeGrid } from './grid';
import { InitializeShooter } from './shooter';
import { Game } from './game';

let invaderInterval: number;

const game = Game();

const shooter = InitializeShooter();
const { alienInvaders, aliensRemoved, moveAlienInvaders } =
  InitialzeAlienInvaders();

const grid = InitializeGrid(shooter, alienInvaders);

function moveShooter(e: KeyboardEvent) {
  grid.removeFromGrid(shooter.className, [shooter.index]);

  switch (e.code) {
    case 'ArrowLeft':
      if (!grid.onLeftEdge(shooter.index)) {
        --shooter.index;
      }

      break;
    case 'ArrowRight':
      if (!grid.onRightEdge(shooter.index)) {
        ++shooter.index;
      }
      break;
  }

  grid.drawOnGrid(shooter.className, [shooter.index]);
}

function moveInvaders() {
  grid.removeFromGrid(
    'invader',
    alienInvaders.map((alien) => alien.index)
  );

  const leftEdge = grid.onLeftEdge(alienInvaders[0].index);
  const rightEdge = grid.onRightEdge(
    alienInvaders[alienInvaders.length - 1].index
  );

  moveAlienInvaders(rightEdge, leftEdge, grid.width);

  grid.drawOnGrid(
    'invader',
    alienInvaders
      .filter((alien) => !aliensRemoved.includes(alien))
      .map((a) => a.index)
  );

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

function shoot(e: KeyboardEvent) {
  let laserId: number;
  let currentLaserIndex = shooter.index;
  function moveLaser() {
    grid.removeFromGrid('laser', [currentLaserIndex]);
    currentLaserIndex -= grid.width;

    grid.drawOnGrid('laser', [currentLaserIndex]);

    if (grid.gridHas('invader', currentLaserIndex)) {
      grid.removeFromGrid('laser', [currentLaserIndex]);
      grid.removeFromGrid('invader', [currentLaserIndex]);
      grid.drawOnGrid('boom', [currentLaserIndex]);

      // Show the explosion
      setTimeout(() => grid.removeFromGrid('boom', [currentLaserIndex]), 300);
      clearInterval(laserId);

      const alienRemoved = alienInvaders.find(
        (invader) => invader.index === currentLaserIndex
      );
      aliensRemoved.push(alienRemoved);
      game.increaseScore();
    }
  }

  switch (e.code) {
    case 'ArrowUp':
    case 'Space':
      laserId = setInterval(moveLaser, 100);
  }
}

invaderInterval = setInterval(moveInvaders, 500);
document.addEventListener('keydown', moveShooter);
document.addEventListener('keydown', shoot);
