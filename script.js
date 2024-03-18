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

/*----- cached elements  -----*/
const computerGrid = document.querySelector("#computer-grid");
const playerGrid = document.querySelector("#player-grid");
const message = document.querySelector("#message");
const turns = document.querySelector("#turns");

function generateGrid(id, grid) {
  for (let i = 0; i < 10; i++) {
    const row = document.createElement("div");
    row.classList.add("row", "border-1");
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.classList.add(
        "col-1",
        "border",
        "border-primary",
        "border-2",
        "text-center"
      );
      cell.id = `${id}${i}${j}`;
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
    let count = 0;
    while (!shipAdded && count < 500) {
      const dir = direction();
      if (dir === "h") {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * (9 - ship));
        let canAddShip = true;
        for (let i = col; i < col + ship; i++) {
          const el = document.querySelector(`#${id}${row}${i}`);
          if (el.value) {
            canAddShip = false;
          }
        }
        if (canAddShip) {
          for (let i = col; i < col + ship; i++) {
            const el = document.querySelector(`#${id}${row}${i}`);
            el.classList.add("ship-h");
            el.innerHTML += `${ship}`;
            el.value = "S";
          }
          shipAdded = true;
        }
      } else {
        const row = Math.floor(Math.random() * (9 - ship));
        const col = Math.floor(Math.random() * 10);
        let canAddShip = true;
        for (let i = row; i < row + ship; i++) {
          const el = document.querySelector(`#${id}${i}${col}`);
          if (el.value) {
            canAddShip = false;
          }
        }
        if (canAddShip) {
          for (let i = row; i < row + ship; i++) {
            const el = document.querySelector(`#${id}${i}${col}`);
            el.classList.add("ship-v");
            el.innerHTML += `${ship}`;
            el.value = "S";
          }
          shipAdded = true;
        }
      }
      count++;
    }
  });
}

function renderMessage() {
  if (winner === "T") {
    message.innerText = "Tie Game!!";
  } else if (winner) {
    message.innerHTML = `<span> ${PLAYERS[winner]}</span> Wins!`;
  } else {
    turns.innerHTML = `<span>${PLAYERS[turn]}'s</span> Turn!`;
  }
}

function playGame() {
  console.log("computer hit: " + computersHit, "player hits:" + playersHit);
  if (computersHit === shipsLengthTotal || playersHit === shipsLengthTotal) {
    console.log("winner");
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
  const row = Math.floor(Math.random() * 10);
  const col = Math.floor(Math.random() * 10);
  const el = document.querySelector(`#${id}${row}${col}`);
  checkHit(el);
}

function checkHit(target) {
  if (target.value === "X" || target.classList.contains("ship")) return;
  if (target.value === "S") {
    console.log("hit");
    target.classList.add("ship");
    if (turn === -1) {
      computersHit++;
    } else {
      playersHit++;
    }
  } else {
    console.log("miss");
    target.classList.add("bg-black");
    target.value = "X";
  }
  turn *= -1;
  renderMessage();
  setTimeout(() => {
    playGame();
  }, "1000");
}

function startGame() {
  generateGrid("c", computerGrid);
  generateGrid("p", playerGrid);
  renderMessage();
  playGame();
}
