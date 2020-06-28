"use strict"

function Cell(id) {
  this.content = 0;
  this.id = id;
  this.unfree = false;
}

const classCell = 'cll';

$('document').ready(function () {
  let application = function () {
    let turn = 1;
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
      let ans;
      for (let i = 0; i < 3; i++) {
        let sum = 0;
        for (let j = 0; j < 3; j++) {
          sum += cells[i][j].content;
        }
        if (sum >= 3) {
          ans = showWinner(sum);
          if (ans) {
            $(`#${info.id}`).html(ans);
            return;
          }
        }
      }

      for (let i = 0; i < 3; i++) {
        let sum = 0;
        for (let j = 0; j < 3; j++) {
          sum += cells[j][i].content;
        }
        if (sum >= 3) {
          ans = showWinner(sum);
          if (ans) {
            $(`#${info.id}`).html(ans);
            return;
          }
        }
      }

      
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (!cells[i][j].unfree) {

          }
        }
      }
    } 

    let showWinner = function show(sum) {
      let ans = '';
      if (sum === 3) {
        ans += 'X win';
      } else if (sum === 6) {
        ans += 'O win';
      }
      return ans;
    }

    let restart = function restartGame() {
      turn = 1;
      info.text();
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          cells[i][j].unfree = false;
          cells[i][j].content = 0;
          $(`button[class='${classCell}']`).html(`<img src="Images/${application.cellIm()}">`);
        }
      }
    }

    return {
      getTurn : function () {
        return turn;
      },
      check : checkMethod,
      restart : restart,
      cells : cells,
      cellIm : function () {
        return cell;
      },
      turn : function () {
        let ans = turn ? tic : tac;
        turn = turn ? 0 : 1;
        info.text();
        return ans;
      }
    };
  }();

  let restartBtn = { 
    id : "rest",
    caption : "Restart"
  }

  let info = {
    id : "info",
    text : function () {
      $(`#${info.id}`).html(`Move ${application.getTurn() ? 'X' : 'O'}`);
    }
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
    let ind = $(this).attr("id").slice(-2);
    let cell = application.cells[ind[0]][ind[1]]; 
    if (cell.unfree) {
      return;
    }
    $(this).html(`<img src="Images/${application.turn()}">`);
    cell.unfree = true;
    cell.content = application.getTurn() ? 1 : 2;
    application.check();
  })
  
  $(`#${restartBtn.id}`).click(function () {
    application.restart();
  })
})
