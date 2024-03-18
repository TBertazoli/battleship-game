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
const compTurnMessage = document.querySelector("#computers-turn");
const plrTurnMessage = document.querySelector("#players-turn");

function generateGrid(id, grid) {
  for (let i = 0; i < 10; i++) {
    const row = document.createElement("div");
    row.classList.add("row", "border");
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.classList.add("col", "border", "text-center");
      cell.id = `${id}${i}${j}`;
      cell.player = id;
      row.appendChild(cell);
      if (id === "c") {
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

function playGame() {
  if (computersHit < shipsLengthTotal || playersHit < shipsLengthTotal) {
    if (turn === -1) {
      computersTurn("p");
    }
  } else {
    console.log("winner");
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
  console.log(target);
  if (target.value === "X") return;
  if (target.value === "S") {
    console.log("hit");
    target.classList.add("bg-success");
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

  setTimeout(() => {
    turn *= -1;
    playGame();
  }, "1000");
}

// function checkWinner() {
//   {

//   }

// }

function renderMessage() {
  if (winner === "T") {
    message.innerText = "Tie Game!!";
  } else if (winner) {
    message.innerHTML = `<span> ${PLAYERS[winner]}</span> Wins!`;
  } else {
    if (turn === -1) {
      compTurnMessage.innerHTML = "<span>Computers's</span> Turn!";
      plrTurnMessage.classList.add("d-none");
    } else {
      plrTurnMessage.innerHTML = "<span>Player's</span> Turn!";
      compTurnMessage.classList.add("d-none");
    }
  }
}

function startGame() {
  generateGrid("c", computerGrid);
  generateGrid("p", playerGrid);
  renderMessage();
  playGame();
}

// # Function to determine who plays first
// ## Create a function to randomly choose who plays first

// # Function for players turn
// ## Create a function that allows the user to click on a cell and fire a shot.
// ### note: The user will click on a cell and with that id we will be able to mark if that cell is already occupied by the computers ship or not

// # Function for computers turn
// ## Create a function that allows the computer to fire a shot.
// ### This is where we can use AI for the computer to play strategically

// # Function to determine hit or miss
// ## Create a function that checks if cell is a hit or a miss. If cell is occupied by the ship is a hit otherwise is a miss.

// # Function to check for game completion
// ## Create a function that checks for number of hits, whoever has all the hits completed wins the game.

// # Function to check for game stats
// ## Create a function to check for game status and and display who's turn it is
