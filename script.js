// # battleship-game

/*----- cached elements  -----*/

// # Init function defines game settings and initialize variables
// ## boat sizes and number of boats(1x2, 2x3, 1x4, 1x5)
// ## Create a function that draws a grid (2 grids for player and computer) - 2x  10x10 grid

function generateGrid(id, grid) {
  for (let i = 0; i < 10; i++) {
    const row = document.createElement("div");
    row.classList.add("row", "border");
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.classList.add("col-sm", "border", "text-center");
      console.log(cell);
      cell.id = `${id}${i}${j}`;
      row.appendChild(cell);
      cell.innerHTML = "x";
    }
    grid.appendChild(row);
  }
}

function startGame() {
  const computerGrid = document.querySelector("#computer-grid");
  const playerGrid = document.querySelector("#player-grid");

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
