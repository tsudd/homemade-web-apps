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
      $('.' + mineFieldClass).append(`<div class="row row-JS-${i}"></div>`);
      for (let j = 0; j < width; j++) {
        row.push(new Cell(i, j));
        $(`.row-JS-${i}`).append(`<div class="col btn ${this.cellClass}"></div>`);
      }
      this.cells.push(row);
    }
    $('.' + this.cellClass).height($('.' + this.cellClass).width());
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
        cellsCollection[k].cell = this.cells[i][j];
        this.cells[i][j].elementPointer = cellsCollection[k];
      }
    }
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * (max - 1) + 0)
  }

  fillCellWithMine(i, j) {
    this.cells[i][j].hasMine = true;
    if (j - 1 >= 0) {
      this.cells[i][j - 1].minesAround++;
      if (i - 1 >= 0) {
        this.cells[i - 1][j - 1].minesAround++;
      }
      if (i + 1 < this.height) {
        this.cells[i + 1][j - 1].minesAround++;
      }
    }
    if (j + 1 < this.width) {
      this.cells[i][j + 1].minesAround++;
      if (i - 1 >= 0) {
        this.cells[i - 1][j + 1].minesAround++;
      }
      if (i + 1 < this.height) {
        this.cells[i + 1][j + 1].minesAround++;
      }
    }
    if (i - 1 >= 0) {
      this.cells[i - 1][j].minesAround++;
    }
    if (i + 1 < this.height) {
      this.cells[i + 1][j].minesAround++;
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
    cell.clicked = true;
    if (cell.hasMine) {
      $(cell.elementPointer).addClass(this.cellClass + cellDetonatedModificator);
      this.gameOver(cellMineModificator);
      return;
    }
    $(cell.elementPointer).html(cell.minesAround);
    $(cell.elementPointer).addClass(this.cellClass + cellModificators[cell.minesAround]);
    this.checkedCells++;
    if (cell.minesAround == 0) {
      if (cell.horizontalIndex - 1 >= 0) {
        this.checkCell(this.cells[cell.verticalIndex][cell.horizontalIndex - 1]);
        if (cell.verticalIndex - 1 >= 0) {
          this.checkCell(this.cells[cell.verticalIndex - 1][cell.horizontalIndex - 1]);
        }
        if (cell.verticalIndex + 1 < this.height) {
          this.checkCell(this.cells[cell.verticalIndex + 1][cell.horizontalIndex - 1]);
        }
      }
      if (cell.horizontalIndex + 1 < this.width) {
        this.checkCell(this.cells[cell.verticalIndex][cell.horizontalIndex + 1]);
        if (cell.verticalIndex - 1 >= 0) {
          this.checkCell(this.cells[cell.verticalIndex - 1][cell.horizontalIndex + 1]);
        }
        if (cell.verticalIndex + 1 < this.height) {
          this.checkCell(this.cells[cell.verticalIndex + 1][cell.horizontalIndex + 1]);
        }
      }
      if (cell.verticalIndex - 1 >= 0) {
        this.checkCell(this.cells[cell.verticalIndex - 1][cell.horizontalIndex]);
      }
      if (cell.verticalIndex + 1 < this.height) {
        this.checkCell(this.cells[cell.verticalIndex + 1][cell.horizontalIndex]);
      }
    }
  }

  gameOver(modificator) {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.cells[i][j].hasMine) {
          $(this.cells[i][j].elementPointer).addClass(this.cellClass + modificator);
        }
      }
    }
  }

  getProgress() {
    return `${this.placedFlags < 10 ? '0' + this.placedFlags : this.placedFlags}/${this.minesToFind}`;
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

  finishGame() {
    this.gameOver(cellFlagModificator);
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
