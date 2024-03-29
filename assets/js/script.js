/*----- constants -----*/
const PLAYERS = {
  1: "Player",
  "-1": "Computer",
  null: "",
};

const SHIPS = [2, 3, 3, 4, 5];
const shipsLengthTotal = SHIPS.reduce((acc, cur) => {
  return acc + cur;
}, 0);

/*----- state variables -----*/
let playersHit = 0;
let computersHit = 0;
let turn = Math.floor(Math.random() * 2) === 0 ? 1 : -1;
let winner;
let compLastHit = [];

/*----- cached elements  -----*/
const computerGrid = document.querySelector("#computer-grid");
const playerGrid = document.querySelector("#player-grid");
const message = document.querySelector("#message");
const button = document.querySelector("#btn");
const pturn = document.querySelector("#player-turn");
const cturn = document.querySelector("#computer-turn");

/*----- functions -----*/

function generateGrid(id, grid) {
  for (let i = 0; i < 10; i++) {
    const row = document.createElement("div");
    row.classList.add("row", "border-1", "g-0");
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.classList.add(
        "col-1",
        "border",
        "border-primary",
        "border-2",
        "pointer",
        "rounded"
      );
      cell.id = `${id}${i}${j}`;
      cell.row = i;
      cell.col = j;
      cell.player = id;
      row.appendChild(cell);
      if (id === "p") {
        cell.addEventListener("click", playersTurn);
      }
    }
    grid.appendChild(row);
  }
  placeShips(id);
}

function direction() {
  let random = Math.floor(Math.random() * 2) === 0 ? "h" : "v";
  return random;
}

function placeShips(id) {
  SHIPS.forEach((ship) => {
    let shipAdded = false;
    while (!shipAdded) {
      const dir = direction();
      if (dir === "h") {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * (9 - ship));
        let canAddShip = true;
        for (let i = col; i < col + ship; i++) {
          const el = document.querySelector(`#${id}${row}${i}`);
          if (el.hasShip) {
            canAddShip = false;
          }
        }
        if (canAddShip) {
          for (let i = col; i < col + ship; i++) {
            const el = document.querySelector(`#${id}${row}${i}`);
            if (id === "c") {
              el.classList.add("bg-secondary");
            }
            //left this here intentionally for debugging purpose for game improvment
            // el.innerHTML += `${ship}`;
            el.hasShip = true;
          }
          shipAdded = true;
        }
      } else {
        const row = Math.floor(Math.random() * (9 - ship));
        const col = Math.floor(Math.random() * 10);
        let canAddShip = true;
        for (let i = row; i < row + ship; i++) {
          const el = document.querySelector(`#${id}${i}${col}`);
          if (el.hasShip) {
            canAddShip = false;
          }
        }
        if (canAddShip) {
          for (let i = row; i < row + ship; i++) {
            const el = document.querySelector(`#${id}${i}${col}`);
            if (id === "c") {
              el.classList.add("bg-secondary");
            }
            //left this here intentionally for debugging purpose for game improvment
            // el.innerHTML += `${ship}`;
            el.hasShip = true;
          }
          shipAdded = true;
        }
      }
    }
  });
}

function renderMessage() {
  if (winner) {
    button.classList.remove("d-none");
    button.innerHTML = "Play again?";
    message.innerHTML = `<span>${PLAYERS[winner]}</span> Wins!`;
    cturn.classList.add("invisible");
    pturn.classList.add("invisible");
  } else if (turn === 1) {
    cturn.classList.add("invisible");
    pturn.classList.remove("invisible");
  } else {
    pturn.classList.add("invisible");
    cturn.classList.remove("invisible");
  }
}

function playGame() {
  button.classList.add("d-none");
  if (computersHit === shipsLengthTotal) {
    winner = -1;
    renderMessage();
  } else if (playersHit === shipsLengthTotal) {
    winner = 1;
    renderMessage();
  } else if (turn === -1) {
    computersTurn("c");
  }
}

function playersTurn(e) {
  let target = e.target;
  if (turn === -1) return;
  checkHit(target);
}

function computersTurn(id) {
  let row;
  let col;

  if (compLastHit.length !== 0) {
    //check horizontally
    //check right

    if (compLastHit.length === 1) {
      row = compLastHit[0].row;
      col = compLastHit[0].col;
      //check right
      if (
        col < 9 &&
        document.querySelector(`#${id}${row}${col + 1}`).value === undefined
      ) {
        row = row;
        col = col + 1;
      }
      //check left
      else if (
        col > 0 &&
        document.querySelector(`#${id}${row}${col - 1}`).value === undefined
      ) {
        row = row;
        col = col - 1;
      }
      //check down
      else if (
        row < 9 &&
        document.querySelector(`#${id}${row + 1}${col}`).value === undefined
      ) {
        row = row + 1;
        col = col;
      }
      //check up
      else if (
        row > 0 &&
        document.querySelector(`#${id}${row - 1}${col}`).value === undefined
      ) {
        row = row - 1;
        col = col;
      }
    } else {
      //check if horizontal
      if (compLastHit[0].row === compLastHit[1].row) {
        row = compLastHit[0].row;
        //check which side is longer
        colMax = Math.max(...compLastHit.map((a) => a.col));
        colMin = Math.min(...compLastHit.map((a) => a.col));
        //check right
        if (
          colMax < 9 &&
          document.querySelector(`#${id}${row}${colMax + 1}`).value ===
            undefined
        ) {
          row = row;
          col = colMax + 1;
        }
        //check left
        else if (
          colMin > 0 &&
          document.querySelector(`#${id}${row}${colMin - 1}`).value ===
            undefined
        ) {
          row = row;
          col = colMin - 1;
        } else {
          compLastHit = [];
          row = Math.floor(Math.random() * 10);
          col = Math.floor(Math.random() * 10);
        }
      } else if (compLastHit[0].col === compLastHit[1].col) {
        //check vertical
        col = compLastHit[0].col;
        //check which side is longer
        rowMax = Math.max(...compLastHit.map((a) => a.row));
        rowMin = Math.min(...compLastHit.map((a) => a.row));

        //check down
        if (
          rowMax < 9 &&
          document.querySelector(`#${id}${rowMax + 1}${col}`).value ===
            undefined
        ) {
          row = rowMax + 1;
          col = col;
        }
        //check up
        else if (
          rowMin > 0 &&
          document.querySelector(`#${id}${rowMin - 1}${col}`).value ===
            undefined
        ) {
          row = rowMin - 1;
          col = col;
        } else {
          compLastHit = [];
          row = Math.floor(Math.random() * 10);
          col = Math.floor(Math.random() * 10);
        }
      } else {
        compLastHit = [];

        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
      }
    }
  } else {
    row = Math.floor(Math.random() * 10);
    col = Math.floor(Math.random() * 10);
  }

  const el = document.querySelector(`#${id}${row}${col}`);
  checkHit(el);
}

function checkHit(target) {
  if ((target.value === "X" || target.value === "H") && turn === -1) {
    computersTurn("c");
  }
  if (target.value === "X" || target.value === "H") return;
  if (target.hasShip) {
    target.value = "H";
    target.classList.add("ship");
    message.innerText = "Hit";
    if (turn === -1) {
      computersHit++;
      compLastHit.push({ row: target.row, col: target.col });
    } else {
      playersHit++;
    }
  } else {
    message.innerHTML = "Miss";
    target.classList.add("bg-black");
    target.value = "X";
  }

  target.classList.remove("pointer");
  turn *= -1;
  renderMessage();
  setTimeout(() => {
    playGame();
  }, "1500");
}

function resetGame() {
  winner = undefined;
  playersHit = 0;
  computersHit = 0;
  compLastHit = [];
  computerGrid.replaceChildren();
  playerGrid.replaceChildren();
  message.innerHTML = "";
  cturn.classList.add("invisible");
  pturn.classList.add("invisible");
  turn = Math.floor(Math.random() * 2) === 0 ? 1 : -1;
}

function startGame() {
  if (winner) {
    resetGame();
  }

  renderMessage();
  generateGrid("c", computerGrid);
  generateGrid("p", playerGrid);
  playGame();
}
