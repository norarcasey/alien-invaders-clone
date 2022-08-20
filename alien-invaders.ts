import type { Grid } from './grid';

export type AlienInvader = {
  index: number;
  className: string;
};

const ALIEN_INVADER_CLASS = 'invader';

const INIT_ALIEN_IDS = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31,
  32, 33, 34, 35, 36, 37, 38, 39,
];

const alienInvaders: AlienInvader[] = [];
const aliensRemoved: AlienInvader[] = [];
let direction: number = 1;
let goingRight: boolean = true;

/**
 * This is the automated Alien movement.
 * It moves the aliens left and right
 * down the page.
 */
function moveInvaders(grid: Grid) {
  grid.removeFromGrid(alienInvaders);

  const leftEdge = grid.onLeftEdge(alienInvaders[0].index);
  const rightEdge = grid.onRightEdge(
    alienInvaders[alienInvaders.length - 1].index
  );

  if (rightEdge && goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i].index += grid.width + 1;
    }

    goingRight = false;
    direction = -1;
  }

  if (leftEdge && !goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i].index += grid.width - 1;
    }

    goingRight = true;
    direction = 1;
  }

  // update their location
  for (let i = 0; i < alienInvaders.length; i++) {
    alienInvaders[i].index += direction;
  }

  grid.drawOnGrid(
    alienInvaders.filter((alien) => !aliensRemoved.includes(alien))
  );
}

function removeAlien(index: number, grid: Grid) {
  // Remove Alien from the board
  grid.removeFromGrid([alienInvaders.find((alien) => alien.index === index)]);
  const alienRemoved = alienInvaders.find((invader) => invader.index === index);
  aliensRemoved.push(alienRemoved);
}

/**
 * Creates the initial aliens for the level.
 *
 */
export function InitialzeAlienInvaders(grid): {
  alienInvaders: AlienInvader[];
  aliensRemoved: AlienInvader[];
  moveInvaders: () => void;
  removeInvader: (index: number) => void;
} {
  // Create AlienInvader Objects
  for (let i = 0; i < INIT_ALIEN_IDS.length; i++) {
    alienInvaders.push({
      index: INIT_ALIEN_IDS[i],
      className: ALIEN_INVADER_CLASS,
    });
  }

  grid.drawOnGrid(alienInvaders);

  return {
    alienInvaders,
    aliensRemoved,
    moveInvaders: () => moveInvaders(grid),
    removeInvader: (index: number) => removeAlien(index, grid),
  };
}
