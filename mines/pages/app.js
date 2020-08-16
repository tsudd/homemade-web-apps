import { Field } from './modules/field';
import { Timer } from './modules/timer';
import { changeProportions } from './modules/additional';

"use strict";

const mineFieldClass = 'game-space__mine-field';
const cellClass = 'game-space__cell';
const createSmallFieldButton = '.btn-group__small';
const createMediumFieldButton = '.btn-group__medium';
const createLargeFieldButton = '.btn-group__large';
const timerLabelClass = 'timer__label';
const counterLabelClass = 'game-space__mine-counter-label';
const pauseButtonClass = 'pause-button';

const percentageOfMines = 0.15625;

let application = function () {
  let minesCounterElement = document.getElementsByClassName(counterLabelClass);
  let timer = null;
  let field = null;
  let firstClick = true;
  let gameIsRunning = false;
  timer = new Timer(document.getElementsByClassName(timerLabelClass));

  let updateCounter = (() => {
    if (!field) {
      return;
    }
    $(minesCounterElement).html(field.getProgress());
  })

  let resetCounter = (() => {
    $(minesCounterElement).html('00/00');
  })
  
  let deleteField = (() => {
    if (!field) {
      return;
    }
    field.deleteCells();
    field = null;
    gameIsRunning = false;
    timer.reset();
  })

  let checkWinStatus = (() => {
    if (field.checkedCells != field.cellsToCheck) {
      return;
    }
    gameIsRunning = false;
    field.finishGame();
    timer.pauseUnpause();
  })

  return {
    createField : ((heigth, width) => {
      if (field) {
        deleteField();
      }
      let amountOfMines = Math.floor(heigth * width * percentageOfMines);
      field = new Field(heigth, width, amountOfMines, mineFieldClass, cellClass);
      firstClick = true;
      resetCounter();
    }),
    deleteField : deleteField,
    pauseGame : (() => {
      timer.pauseUnpause();
    }),
    checkCell : ((clickedElement) => {
      field.checkCell(clickedElement.cell);
      checkWinStatus();
    }),
    makeFirstClick : (() => {
      if (firstClick) {
        firstClick = false;
        gameIsRunning = true;
        return true;
      }
      return firstClick;
    }),
    getGameStatus : (() => {
      return gameIsRunning;
    }),
    startTimer : (() => {
      timer.pauseUnpause();
      timer.startTimer();
    }),
    pauseUnpauseGame : (() => {
      gameIsRunning = gameIsRunning ? false : true;
      timer.pauseUnpause();
    }),
    placeFlag : ((cell) => {
      field.placeFlag(cell);
      updateCounter();
    }),
    getFirstClick : (() => {
      return firstClick;
    })
  }
}();

$( window ).resize(function() {
  changeProportions(cellClass);
 });

 $(createSmallFieldButton).click(function () {
  application.createField(8, 8);
})

$(createMediumFieldButton).click(function () {
  application.createField(16, 16);
})

$(`.${mineFieldClass}`).on('click', `.${cellClass}`, function (e) {
  if (application.makeFirstClick()) {
    application.startTimer();
  }
  if (!application.getGameStatus()) {
    return;
  }
  if (e.ctrlKey) {
    if (this.cell.clicked) {
      return;
    }
    application.placeFlag(this.cell);
    return;
  }
  if (this.cell.hasFlag) {
    return;
  }
  application.checkCell(this);
})

$(`.${pauseButtonClass}`).click(function () {
  if (application.getFirstClick()) {
    return;
  }
  application.pauseUnpauseGame();
  if (application.getGameStatus()) {
    $(`.${cellClass}`).show();
  } else {
    $(`.${cellClass}`).hide();
  }
})
