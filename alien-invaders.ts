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

function turnLeft(onRightEdge: boolean, width: number): void {
  if (onRightEdge && goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i].index += width + 1;
    }

    goingRight = false;
    direction = -1;
  }
}

function turnRight(onLeftEdge: boolean, width: number): void {
  if (onLeftEdge && !goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i].index += width - 1;
    }

    goingRight = true;
    direction = 1;
  }
}

function move(onRightEdge: boolean, onLeftEdge: boolean, width: number): void {
  turnLeft(onRightEdge, width);
  turnRight(onLeftEdge, width);

  // update their location
  for (let i = 0; i < alienInvaders.length; i++) {
    alienInvaders[i].index += direction;
  }
}

/**
 * Creates the initial aliens for the level.
 *
 */
export function InitialzeAlienInvaders(): {
  alienInvaders: AlienInvader[];
  aliensRemoved: AlienInvader[];
  moveAlienInvaders: (
    onRightEdge: boolean,
    onLeftEdge: boolean,
    width: number
  ) => void;
} {
  for (let i = 0; i < INIT_ALIEN_IDS.length; i++) {
    alienInvaders.push({
      index: INIT_ALIEN_IDS[i],
      className: ALIEN_INVADER_CLASS,
    });
  }

  return { alienInvaders, aliensRemoved, moveAlienInvaders: move };
}
