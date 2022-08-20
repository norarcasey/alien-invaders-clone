import { Shooter } from './shooter';
import { AlienInvader } from './alien-invaders';

interface Grid extends HTMLElement {
  drawOnGrid?: (className: string, indexes: number[]) => void;
  removeFromGrid?: (className: string, indexes: number[]) => void;
  gridHas?: (className: string, indexes: number) => boolean;
  onLeftEdge?: (index: number) => boolean;
  onRightEdge?: (index: number) => boolean;
  width?: number;
}

const WIDTH: number = 15;
let squares: NodeListOf<Element>;

function gridHas(className: string, index: number): boolean {
  return squares[index]?.classList.contains(className);
}

function drawOnGrid(className: string, indexes: number[]): void {
  for (let i = 0; i < indexes.length; i++) {
    squares[indexes[i]]?.classList.add(className);
  }
}

function removeFromGrid(className: string, indexes: number[]) {
  for (let i = 0; i < indexes.length; i++) {
    squares[indexes[i]]?.classList.remove(className);
  }
}

function onLeftEdge(index: number): boolean {
  return index % WIDTH === 0;
}

function onRightEdge(index: number): boolean {
  return index % WIDTH === WIDTH - 1;
}

/**
 * TODO: Add support for multiple sizes
 */
export function InitializeGrid(shooter: Shooter, aliens: AlienInvader[]): Grid {
  const grid: Grid = document.getElementById('grid');

  for (let i = 0; i < 225; i++) {
    const square = document.createElement('div');
    square.classList.add('square');

    grid.appendChild(square);
  }

  squares = document.querySelectorAll('.square');

  // Draw the initial Shooter
  squares[shooter.index].classList.add(shooter.className);

  // Draw the initial aliens
  for (let i = 0; i < aliens.length; i++) {
    squares[aliens[i].index].classList.add(aliens[i].className);
  }

  grid.drawOnGrid = drawOnGrid;
  grid.removeFromGrid = removeFromGrid;
  grid.gridHas = gridHas;
  grid.onLeftEdge = onLeftEdge;
  grid.onRightEdge = onRightEdge;
  grid.width = WIDTH;

  return grid;
}
