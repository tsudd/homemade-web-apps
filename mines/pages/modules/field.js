const cellModificators = [
  '--zero-mine',
  '--one-mine',
  '--two-mine',
  '--three-mine',
  '--five-mine',
  '--six-mine',
  '--seven-mine',
  '--eight-mine',
];

const cellFlagModificator = '--flag';
const cellMineModificator = '--mine';
const cellDetonatedModificator = '--detonated';

export class Field {
  constructor (height, width, amountOfMines, mineFieldClass, cellClass) {
    let mines = amountOfMines;
    this.cellClass = cellClass;
    this.cells = [];
    this.fieldHeight = height;
    this.fieldHeight = width;
    this.minesToFind = amountOfMines;
    this.height = height;
    this.width = width;
    this.checkedCells = 0;
    this.cellsToCheck = width * height - amountOfMines;
    this.placedFlags = 0;
    for (let i = 0; i < height; i++) {
      let row = [];
      $('.' + mineFieldClass).append(`<div class="row d-flex row-JS-${i} justify-content-center"></div>`);
      for (let j = 0; j < width; j++) {
        row.push(new Cell(i, j));
        $(`.row-JS-${i}`).append(`<div class="btn ${this.cellClass}"></div>`);
      }
      this.cells.push(row);
    }
    while (mines > 0) {
      let i = this.getRandomInt(height);
      let j = this.getRandomInt(width);
      if (!this.cells[i][j].hasMine) {
        this.fillCellWithMine(i, j);
        mines--;
      }
    }
    let cellsCollection = document.getElementsByClassName(cellClass);
    for (let i = 0, k = 0; i < height; i++) {
      for (let j = 0; k < cellsCollection.length && j < width; j++, k++) {
        this.cells[i][j].elementPointer = cellsCollection[k];
      }
    }
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * (max - 1) + 0)
  }

  fillCellWithMine(i, j) {
    this.cells[i][j].hasMine = true;
    for (let di = -1; di <= 1; di++) {
      for (let dj = -1; dj <= 1; dj++) {
        if (di == 0 && dj == 0) {
          continue;
        }
        if (0 <= i + di && i + di< this.height) {
          if (0 <= j + dj && j + dj < this.width) {
            this.cells[i + di][j + dj].minesAround++;
          }
        }
      }
    }
  }

  deleteCells() {
    for (let i = 0; i < this.height; i++) {
      $(`.row-JS-${i}`).remove();
    }
  }

  checkCell(cell) {
    if (!cell) {
      return;
    }
    if (cell.clicked) {
      return;
    }
    if (cell.hasFlag) {
      this.placeFlag(cell);
    }
    cell.clicked = true;
    $(cell.elementPointer).html(cell.minesAround);
    $(cell.elementPointer).addClass(this.cellClass + cellModificators[cell.minesAround]);
    this.checkedCells++;
    if (cell.minesAround == 0) {
      for (let di = -1; di <= 1; di++) {
        for (let dj = -1; dj <= 1; dj++) {
          if (dj == 0 && di == 0) {
            continue;
          }
          if (0 <= cell.verticalIndex + di && cell.verticalIndex + di < this.height) {
            if (0 <= cell.horizontalIndex + dj && cell.horizontalIndex + dj < this.width) {
              this.checkCell(this.cells[cell.verticalIndex + di][cell.horizontalIndex + dj]);
            }
          }
        }
      }
    }
  }

  gameOver(modificator = cellMineModificator) {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.cells[i][j].hasMine) {
          $(this.cells[i][j].elementPointer).addClass(this.cellClass + modificator);
        }
      }
    }
  }

  getProgress() {
    return `${this.placedFlags < 10 ? '0' + `${this.placedFlags}/${this.minesToFind}` : `${this.placedFlags}/${this.minesToFind}`}`;
  }

  placeFlag(cell) {
    if (cell.hasFlag) {
      cell.hasFlag = false;
      this.placedFlags--;
      $(cell.elementPointer).removeClass(this.cellClass + cellFlagModificator);
      return;
    }
    $(cell.elementPointer).addClass(this.cellClass + cellFlagModificator);
    cell.hasFlag = true;
    this.placedFlags++;
  }

  detonateCell(cell) {
    alert("Mines exploded! Poor thing...")
    $(cell.elementPointer).addClass(this.cellClass + cellDetonatedModificator);
  }

  finishGame() {
    alert("Well done! You won!");
    this.gameOver(cellFlagModificator);
  }

  getCell(clickedElement) {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (clickedElement == this.cells[i][j].elementPointer) {
          return this.cells[i][j];
        }
      }
    }
    return null;
  }
}

class Cell {
  constructor (i, j) {
    this.clicked = false;
    this.hasMine = false;
    this.minesAround = 0;
    this.horizontalIndex = j;
    this.verticalIndex = i;
    this.hasFlag = false;
  }
}
