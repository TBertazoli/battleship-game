// # battleship-game
/*----- constants -----*/
const PLAYERS = {
  1: "Blue",
  "-1": "Red",
  null: "",
};

const SHIPS = [2, 3, 3, 4, 5];

/*----- state variables -----*/
let turn;

/*----- cached elements  -----*/
const computerGrid = document.querySelector("#computer-grid");
const playerGrid = document.querySelector("#player-grid");

function generateGrid(id, grid) {
  for (let i = 0; i < 10; i++) {
    const row = document.createElement("div");
    row.classList.add("row", "border");
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.classList.add("col", "border", "text-center");

      cell.id = `${id}${i}${j}`;
      row.appendChild(cell);
      if (id === "c") {
        cell.addEventListener("click", checkClick);
      }
    }
    grid.appendChild(row);
  }

  placeShips(id, grid);
}

function direction() {
  let random = Math.floor(Math.random() * 2) === 0 ? "h" : "v";
  return random;
}

function placeShips(id, grid) {
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
            el.value = true;
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
            el.value = true;
          }
          shipAdded = true;
        }
        // playersTurn(grid);
      }
      count++;
    }
  });
}

// function playersTurn(grid) {
//   for (let i = 0; i < 10; i++) {
//     for (let j = 0; j < 10; j++) {
//       const cellEl = document.querySelector(`${i}${j}`);

//     }
//   }
// }

function checkClick(e) {
  let target = e.target.value;
  if (target === true) {
    console.log("hit");
    target.classList.add("bg-success");
  } else {
    console.log("miss");
  }
}

function startGame() {
  generateGrid("c", computerGrid);
  generateGrid("p", playerGrid);
  turn = turn = Math.floor(Math.random() * 2) === 0 ? 1 : -1;
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
