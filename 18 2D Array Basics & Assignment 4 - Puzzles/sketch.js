// 18 2D Arrays Basics/ Puzzle Game Assignment
// Ayeman Islam
// April 15/26
//
// 0 (black) 255 (white)
// grid is 6 x 5

// SETUP //
let grid = [
  [0, 0, 0, 255, 0, 255],
  [255, 0, 255, 0, 255, 0],
  [0, 0, 0, 0, 0, 255],
  [255, 255, 255, 255, 255, 0],
  [0, 255, 0, 0, 0, 255],
];
let rows = grid.length;
let cols = grid[0].length;
let tileSize = 250;
let win = false;

function setup() {
  createCanvas(windowWidth, windowWidth);
  randomizeGrid();
}

 /// MAIN PROGRAM ///
function draw() {
  // this functions renders the grid, draws the background,
  // adds the abilities and special effects.
  background(255, 0, 50);
  renderGrid();
  blendMode(ADD);
  canvasEffects();
  blendMode(BLEND)
  overlay();
  textSize(30);
  fill(0, 255, 255);
  if (winCondition()) {
    textSize(150);
    text("YOU WON", width / 4, height / 3);
  }
  //text(getCurrentX() + ", " + getCurrentY(), mouseX, mouseY);
}








// *****************************************************************//
// FUNCTIONS & EFFECTS //
function canvasEffects() {
  // this function provides a special effect
  // on the looks of the entire puzzle
  noStroke();
  for (let y = 0; y < height; y++) {
    let mapping = map(y, 0, height, 0, 1);
    let c = lerpColor(
      color(20, 0, 40),   // dark purple
      color(255, 0, 120), // neon pink
      mapping
    );
    stroke(c);
    line(0, y, width, y);
  }
}

function overlay() {
  // This function allows to see which parts of
  // the puzzle are going to be flipped when the
  // is clicked
  let x = getCurrentX();
  let y = getCurrentY();

  fill(20, 150, 255, 120);

  // Always draw center
  rect(x * tileSize, y * tileSize, tileSize);

  // If SHIFT is NOT pressed, draw neighbors
  if (!keyIsDown(SHIFT)) {
    let directions = [
      [-1, 0], [1, 0], // left, right
      [0, -1], [0, 1]  // up, down
    ];

    for (let [dx, dy] of directions) {
      let newX = x + dx; 
      let newY = y + dy;

      if (newX >= 0 && newX < cols && newY >= 0 && newY < rows) {
        rect(newX * tileSize, newY * tileSize, tileSize);
      }
    }
  }
}

function mousePressed() {
  // only do a flip if mouse is on the canvas
  if (mouseX < width && mouseY < height) {
    let x = getCurrentX(); let y = getCurrentY(); // this varible gets the current x and y
    if (keyIsDown(SHIFT)) { // CHEATER CHEATER CODE
      flip(x, y);           // Helps to cheat through the puzzle
    }
    else {
      // ALWAYS:
      flip(x, y);

      // Flip the cardinal (NSEW) neighbours
      if (x - 1 >= 0) flip(x - 1, y); // WEST
      if (x + 1 <= rows) flip(x + 1, y); // EAST
      if (y - 1 >= 0) flip(x, y - 1); // NORTH
      if (y + 1 <= cols) flip(x, y + 1); // SOUTH
    }
  }
}


function flip(x, y) {
  // this function allows us to flip the tiles 
  // to the opposite colors of what it was previously
  if (grid[y][x] === 0) grid[y][x] = 255;
  else grid[y][x] = 0;
}

function getCurrentX() {
  // determine the current col pos of mouse
  let constrainedX = constrain(mouseX, 0, width - 1);
  return floor(constrainedX / tileSize);
}

function getCurrentY() {
  // determine the current row pos of mouse
  let constrainedY = constrain(mouseY, 0, height - 1);
  return floor(constrainedY / tileSize);
}

function renderGrid() {
  // interpret the data stored in 2D array(grid) and
  // draw a matrix of squares to reflect it

  for (let y = 0; y < rows; y++) { // y: 0 1 2 3 4 
    for (let x = 0; x < cols; x ++) { // x: 0 1 2 3 4 5
      let fillColor = grid[y][x];
      fill(fillColor);
      stroke(0,255,255);
      rect(x * tileSize, y * tileSize, tileSize);
    }
  }
}

function randomizeGrid() {
  // this functions allow to randomize the grid tiles
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      grid[y][x] = random([0, 255]); // pick black or white randomly
    }
  }
  // forces at least one tile to be different
  grid[0][0] = 0;
  grid[0][1] = 255;
}

function winCondition() {
  // this functions allows to know if we "won" by solving
  // the puzzle. it checks all the tiles starting at the top
  // corner all the way to the last square in bottom right
  let wholeGrid = grid[0][0];
  for (let y = 0; y < rows; y++) { // y: 0 1 2 3 4 
    for (let x = 0; x < cols; x++) { // x: 0 1 2 3 4 5
      if (grid[y][x] !== wholeGrid) {
        win = false; // changes to when not all the tiles are black or white
        return win; // this return allows us to continue making the changes
      } // necessary when the puzzle is still not solved
      else {
        win = true; // changes to when all the tiles are black or white
      }
    }
  }
  return win; // returns the value of win regardless of True or False
}




























