"use strict"

function Cell(id) {
  this.content = 'o';
  this.id = id;
  this.unfree = false;
}

const classCell = 'cll';

$('document').ready(function () {
  let application = function () {
    let turn = 1;
    let emptyCellsAmount = 9;
    let gameIsRunning = true;
    let cells = [];
    const id = "cl";
    const cell = "cell.png";
    const tic = "tic.png";
    const tac = "tac.png";
    for (let i = 0; i < 3; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(new Cell(id + i + j));
      }
      cells.push(row);
    }

    let checkMethod = function checkCellsForWinner() {
      for (let i = 1, j = 0; j < 3; j++) {
        let str = '';
        str += cells[i - 1][j].content;
        str += cells[i][j].content;
        str += cells[i + 1][j].content;
        if (showWinner(str)) {
          return;
        }
        if (j === 1) {
          str = '';
          str += cells[j][j].content;
          str += cells[j - 1][j - 1].content;
          str += cells[j + 1][j + 1].content;
          if (showWinner(str)) {
            return;
          }
          str = '';
          str += cells[j][j].content;
          str += cells[j + 1][j - 1].content;
          str += cells[j - 1][j + 1].content;
          if (showWinner(str)) {
            return;
          }
        }
        str = '';
        str += cells[j][i - 1].content;
        str += cells[j][i].content;
        str += cells[j][i + 1].content;
        if (showWinner(str)) {
          return;
        }
      }

    } 

    let showWinner = function show(str) {
      let ans = '';
      if (emptyCellsAmount == 0) {
        ans = 'DRAW';
      }
      if (str === 'XXX') {
        ans = 'X win';
      } else if (str === 'OOO') {
        ans = 'O win';
      }
      if (ans) {
        $(`#${info.id}`).html(ans);
        gameIsRunning = false;
        return true;
      }
      return false;
    }

    let restart = function restartGame() {
      turn = 1;
      gameIsRunning = true;
      emptyCellsAmount = 9;
      info.text();
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          cells[i][j].unfree = false;
          cells[i][j].content = 'o';
          $(`button[class='${classCell}']`).html(`<img src="Images/${application.cellIm()}">`);
        }
      }
    }

    return {
      getTurn : (() => {
        return turn;
      }),
      getGameStatus : (() => {
        return gameIsRunning;
      }),
      check : checkMethod,
      restart : restart,
      cells : cells,
      cellIm : (() => {
        return cell;
      }),
      turn : function () {
        let ans = turn ? tic : tac;
        turn = turn ? 0 : 1;
        info.text();
        return ans;
      },
      fillCell : (() => {
        emptyCellsAmount--;
      })
    };
  }();

  let restartBtn = { 
    id : "rest",
    caption : "Restart"
  }

  let info = {
    id : "info",
    text : ( () => {
      $(`#${info.id}`).html(`Move ${application.getTurn() ? 'X' : 'O'}`);
    })
  }

  $("body").append(`<div id=\"${info.id}\"></div>`);
  info.text();

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      $("body").append(`<button class=\"${classCell}\" id=\"${application.cells[i][j].id}\"><img src="Images/${application.cellIm()}"></button>`);
    }
    $("body").append(`</br>`);
  }

  $("body").append(`<button id=\"${restartBtn.id}\">${restartBtn.caption}</button>`);
  $(`#${restartBtn.id}`).click(function () {
    application.restart();
  })

  $(`button[class='${classCell}']`).click(function () {
    if (!application.getGameStatus()) {
      return;
    }
    let ind = $(this).attr("id").slice(-2);
    let cell = application.cells[ind[0]][ind[1]]; 
    if (cell.unfree) {
      return;
    }
    $(this).html(`<img src="Images/${application.turn()}">`);
    cell.unfree = true;
    cell.content = application.getTurn() ? 'O' : 'X';
    application.fillCell();
    application.check();
  })
  
  $(`#${restartBtn.id}`).click(function () {
    application.restart();
  })
})
