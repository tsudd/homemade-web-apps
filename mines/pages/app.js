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
    createField : ((heigth, width, minePersent = percentageOfMines) => {
      if (field) {
        deleteField();
      }
      let amountOfMines = Math.floor(heigth * width * minePersent);
      field = new Field(heigth, width, amountOfMines, mineFieldClass, cellClass);
      firstClick = true;
      updateCounter();
      $(window).trigger('resize');
    }),
    deleteField : deleteField,
    checkCell : ((clickedElement) => {
      if (clickedElement.cell.hasMine) {
        field.detonateCell(clickedElement.cell);
        field.gameOver();
        gameIsRunning = false;
        this.pauseUnpauseGame();
        return;
      }
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
      timer.pauseUnpause();
    }),
    placeFlag : ((cell) => {
      field.placeFlag(cell);
      updateCounter();
    }),
    getFirstClick : (() => {
      return firstClick;
    }),
    getTimerStatus : (() => {
      return timer.unactive;
    }),
    getFieldWidth : (() => {
      return field.width;
    }),
    getFieldHeight : (() => {
      return field.height;
    }),
  }
}();

$( window ).resize(function() {
  changeProportions(
    cellClass, 
    $(window).height(), 
    $(`.${mineFieldClass}`).width(), 
    application.getFieldWidth(),
    application.getFieldHeight()
    );
 });

 $(createSmallFieldButton).click(function () {
  application.createField(8, 8);
})

$(createMediumFieldButton).click(function () {
  application.createField(16, 16);
})

$(createLargeFieldButton).click(function () {
  application.createField(16, 30, 0.21);
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
  if (!application.getGameStatus()) {
    return;
  }
  application.pauseUnpauseGame();
  if (application.getTimerStatus()) {
    $(`.${cellClass}`).hide();
  } else {
    $(`.${cellClass}`).show();
  }
})
