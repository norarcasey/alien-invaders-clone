import type { Grid } from './grid';

export type Shooter = {
  index: number;
  className: string;
  move: (e: KeyboardEvent) => void;
  shoot: (e: KeyboardEvent, callback: (index: number) => void) => void;
};

const INIT_SHOOTER_INDEX: number = 202;
let shooter: Shooter;

function move(e: KeyboardEvent, grid: Grid) {
  grid.removeFromGrid([shooter]);

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

  grid.drawOnGrid([shooter]);
}

function shoot(
  e: KeyboardEvent,
  grid: Grid,
  callback: (index: number) => void
) {
  let laserId: number;
  let currentLaserIndex = shooter.index;

  function moveLaser() {
    grid.removeLaser(currentLaserIndex);
    currentLaserIndex -= grid.width;

    grid.addLaser(currentLaserIndex);

    if (grid.gridHas('invader', currentLaserIndex)) {
      grid.removeLaser(currentLaserIndex);
      grid.drawOnGrid([{ className: 'boom', index: currentLaserIndex }]);

      // Show the explosion
      setTimeout(
        () =>
          grid.removeFromGrid([
            { className: 'boom', index: currentLaserIndex },
          ]),
        300
      );
      clearInterval(laserId);

      callback(currentLaserIndex);
    }
  }

  switch (e.code) {
    case 'ArrowUp':
    case 'Space':
      laserId = setInterval(moveLaser, 100);
  }
}

export function InitializeShooter(grid: Grid): Shooter {
  shooter = {
    index: INIT_SHOOTER_INDEX,
    className: 'shooter',
    move: (e) => move(e, grid),
    shoot: (e, callback) => shoot(e, grid, callback),
  };

  grid.drawOnGrid([shooter]);

  document.addEventListener('keydown', shooter.move);

  return shooter;
}
