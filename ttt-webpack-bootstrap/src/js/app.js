"use strict"

function Cell(elem) {
  this.content = 'o';
  this.unfree = false;
  this.cell = elem;
}

let application = function () {
let turn = 1;
let emptyCellsAmount = 9;
let gameIsRunning = true;
let cells = [];
const ticClass = 'tic';
const tacClass = 'tac';
let info = document.getElementsByClassName('player-turn');
let player = document.getElementsByClassName('turn');
$(player).addClass(ticClass);
let elmnts = document.getElementsByClassName('cell');
$(info).html('Turn');
for (let i = 0, k = 0; i < 3; i++) {
    let row = [];
    for (let j = 0; j < 3; j++, k++) {
        row.push(new Cell(elmnts[k]));
        $(elmnts[k]).html(k + 1);
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
    let ans = '', win = '';
    if (emptyCellsAmount == 0) {
        ans = 'DRAW';
    }
    if (str === 'XXX') {
        ans = 'win';
        win = 'X';
    } else if (str === 'OOO') {
        ans = 'win';
        win = 'O';
    }
    if (ans) {
        $(player).removeClass([ticClass, tacClass]);
        $(player).addClass((win) ? ((win === 'X') ? ticClass : tacClass) : '');
        $(info).html(ans);
        gameIsRunning = false;
        return true;
    }
    return false;
}

let restart = function restartGame() {
    turn = 1;
    gameIsRunning = true;
    emptyCellsAmount = 9;
    $(info).html('Turn');
    $(player).addClass(ticClass);
    let elements = document.getElementsByClassName('cell');
    for (let i = 0, k = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++, k++) {
            cells[i][j].unfree = false;
            cells[i][j].content = 'o';
            $(elements[k]).removeClass(['tic', 'tac']);
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
    getCell : function (id) {
        let i = 1, j, k = id;

        if (k > 3) {
            while (k > 3) {
                k -= 3;
                i += 1;
            }
            j = k;
        } else {
            j = k;
        }
        return cells[i - 1][j - 1];
    },
    fillCell : (() => {
        return (turn) ? ticClass : tacClass;
    }),
    endTurn : function () {
        turn = turn ? 0 : 1;
        emptyCellsAmount--;
        $(player).removeClass([ticClass, tacClass]);
        $(player).addClass((turn) ? ticClass : tacClass);
    },
};
}();

$('.cell').click(function () {
    if (!application.getGameStatus()) {
        return;
    }
    let cell = application.getCell($(this).html());
    if (cell.unfree) {
        return;
    }
    cell.unfree = true;
    cell.content = application.getTurn() ? 'X' : 'O';
    $(this).addClass(application.fillCell());
    application.endTurn();
    application.check();
})

$('.restart').click(function () {
    application.restart();
})