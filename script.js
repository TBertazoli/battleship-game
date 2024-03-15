// # battleship-game
/*----- constants -----*/
const PLAYERS = {
  1: "Blue",
  "-1": "Red",
  null: "",
};

const SHIPS = [2, 3, 3, 4, 5];

/*----- state variables -----*/

/*----- cached elements  -----*/
const computerGrid = document.querySelector("#computer-grid");
const playerGrid = document.querySelector("#player-grid");

function generateGrid(id, grid) {
  for (let i = 0; i < 10; i++) {
    const row = document.createElement("div");
    row.classList.add("row", "border", "border-dark-subtle");
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.classList.add(
        "col-sm",
        "border",
        "text-center",

        "border-dark-subtle"
      );
      cell.id = `${id}${i}${j}`;
      row.appendChild(cell);
      // cell.innerHTML = cell.id;
    }
    grid.appendChild(row);
  }

  placeShips(id, grid);
}

function direction() {
  let random = Math.floor(Math.random() * 2) === 0 ? "h" : "v";
  return random;
  // if (random === "h") {
  //   goHorizontally(grid);
  // } else {
  //   goVertically(grid);
  // }
}

function goHorizontally(grid) {
  console.log(grid);
}

function goVertically() {}

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
      }

      // const dir = direction();
      // if (dir === "h") {
      //   const row = Math.floor(Math.random() * 10);
      //   const col = Math.floor(Math.random() * (9 - ship));
      //   for (let i = col; i < col + ship; i++) {
      //     const el = document.querySelector(`#${id}${row}${i}`);
      //     el.classList.add("ship-h");
      //   }
      // } else {
      //   const row = Math.floor(Math.random() * (9 - ship));
      //   const col = Math.floor(Math.random() * 10);
      //   for (let i = row; i < row + ship; i++) {
      //     const el = document.querySelector(`#${id}${i}${col}`);
      //     el.classList.add("ship-v");
      //   }
      // }
      count++;
    }
  });
}

//     //     iterate over ship ar
//     //  choose random v or h direction
//     //  if h
//     //  choose random row
//     //  else
//     //  choose random col
//   );

function startGame() {
  generateGrid("c", computerGrid);
  generateGrid("p", playerGrid);
}

// ### note: define if boats are integers or characters (TBD)

// # Function to place ships on the grid
// ## Create a function that randomly places the ships on the grid for both user and computer (If time permit create a function that allows the user to place the ships on the grid)
// ### note: The ships will be randomically placed on each grid without overlaping the ships according to the number of cell each ship will ocupy

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
