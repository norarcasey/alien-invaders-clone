import type { Shooter } from './shooter';
import type { AlienInvader } from './alien-invaders';

export interface Grid {
  drawOnGrid: (items: (AlienInvader | Shooter)[]) => void;
  removeFromGrid: (items: (AlienInvader | Shooter)[]) => void;
  gridHas: (className: string, indexes: number) => boolean;
  onLeftEdge: (index: number) => boolean;
  onRightEdge: (index: number) => boolean;
  addLaser: (index: number) => void;
  removeLaser: (index: number) => void;
  width: number;
}

const WIDTH: number = 15;
let squares: NodeListOf<Element>;

function gridHas(className: string, index: number): boolean {
  return squares[index]?.classList.contains(className);
}

function drawOnGrid(items: (AlienInvader | Shooter)[]): void {
  for (const item of items) {
    squares[item.index]?.classList.add(item.className);
  }
}

function removeFromGrid(items: (AlienInvader | Shooter)[]) {
  for (const item of items) {
    squares[item.index]?.classList.remove(item.className);
  }
}

function onLeftEdge(index: number): boolean {
  return index % WIDTH === 0;
}

function onRightEdge(index: number): boolean {
  return index % WIDTH === WIDTH - 1;
}

function addLaser(index: number): void {
  squares[index]?.classList.add('laser');
}
function removeLaser(index: number): void {
  squares[index]?.classList.remove('laser');
}

/**
 * TODO: Add support for multiple sizes
 */
export function InitializeGrid(): Grid {
  const grid: HTMLElement = document.getElementById('grid');

  for (let i = 0; i < 225; i++) {
    const square = document.createElement('div');
    square.classList.add('square');

    grid.appendChild(square);
  }

  squares = document.querySelectorAll('.square');

  return {
    drawOnGrid,
    removeFromGrid,
    gridHas,
    onLeftEdge,
    onRightEdge,
    addLaser,
    removeLaser,
    width: WIDTH,
  };
}
