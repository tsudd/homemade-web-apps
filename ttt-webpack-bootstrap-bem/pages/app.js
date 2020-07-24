"use strict"

// block constants (Is it good practice?)
const ticClass = 'table__cell_tic';
const tacClass = 'table__cell_tac';
const cellClass = 'table__cell';
const restartButtonClass = 'restart-btn';
const turnHeaderClass = 'turn-header';
const turnLabelClass = 'turn';

class Cell {
  constructor (cellElement) {
    this.content = 'o';
    this.unfree = false;
    this.cell = cellElement;
  }
}

class Table {
  constructor () {
    this.turn = 1;
    this.emptyCellsAmount = 9;
    this.gameIsRunning = true;
    this.winnerCombinations = [
      [1, 2, 3], [4, 5, 6], [7, 8, 9],
      [1, 4, 7], [2, 5, 8], [3, 6, 9],
      [1, 5, 9], [7, 5, 3],
    ]
    this.cells = [];
    let cellElements = document.getElementsByClassName(cellClass);
    for (let i = 0; i < cellElements.length; i++) {
      this.cells.push(new Cell(cellElements[i]));
    }
    this.winner = null;
  }

  findWinner() {
    for (let i = 0; i < 8; i++) {
      let strOfCellsContent = '';
      for (let j = 0; j < 3; j++) {
        strOfCellsContent += this.cells[this.winnerCombinations[i][j] - 1].content;
      }
      if (this.isWinner(strOfCellsContent)) {
        this.winner = strOfCellsContent === 'XXX' ? 'X' : 'O';
        return true;
      }
    }
    if (this.emptyCellsAmount == 0) { 
      this.winner = 'DRAW';
      return true;
    }
    return false;
  }

  isWinner(str) {
    if (str === 'OOO' || str === 'XXX') {
      return true;
    }
    return false;
  }

  restartGame() {
    this.turn = 1;
    this.gameIsRunning = true;
    this.emptyCellsAmount = 9;
    this.winner = null;
    for (let i = 0; i < this.cells.length; i++) {
      this.cells[i].content = 'o';
      this.cells[i].unfree = false;
      $(this.cells[i].cell).removeClass([ticClass, tacClass]);
    }
  }

  endTurn() {
    this.turn = this.turn ? 0 : 1;
    this.emptyCellsAmount--;
  }

  fillCell(cellElement) {
    for (let i = 0; i < this.cells.length; i++) {
      if (this.cells[i].cell === cellElement) {
        if (this.cells[i].unfree) {
          return false;
        }
        this.cells[i].content = this.turn ? 'X' : 'O';
        this.cells[i].unfree = true;
        $(this.cells[i].cell).addClass(this.turn ? ticClass : tacClass);
        return true;
      }
    }
    return false;
  }
}

let application = function () {
  let info = document.getElementsByClassName(turnHeaderClass);
  let player = document.getElementsByClassName(turnLabelClass);
  let table = new Table();
  $(player).addClass(ticClass);
  $(info).html('Turn');

  let showWinner = () => {
    let ans = 'win', win = '';
    if (table.winner == 'X') {
      console.log(table.winner);
      win = table.winner;
    } else if (table.winner == 'O') {
      win = table.winner;
    } else {
      ans = table.winner;
    }
    $(player).removeClass([ticClass, tacClass]);
    $(player).addClass((win) ? ((win === 'X') ? ticClass : tacClass) : '');
    $(info).html(ans);
    table.gameIsRunning = false;
  }

  return {
    getTurn : (() => {
      return table.turn;
    }),
    getGameStatus : (() => {
      return table.gameIsRunning;
    }),
    makeTurn : function (cellElement) {
      if (table.fillCell(cellElement)) {
        table.endTurn();
        if (table.findWinner()) {
          showWinner();
          return;
        }
        $(player).removeClass([ticClass, tacClass]);
        $(player).addClass(this.getTurn() ? ticClass : tacClass);
      }
    },
    restartGame : (() => {
      table.restartGame();
      $(player).removeClass([ticClass, tacClass]);
      $(player).addClass(ticClass);
      $(info).html('Turn');
    })
  };
}();

$('.' + cellClass).click(function () {
  if (!application.getGameStatus()) {
    return;
  }
  application.makeTurn(this);
})

$('.' + restartButtonClass).click(function () {
  application.restartGame();
})