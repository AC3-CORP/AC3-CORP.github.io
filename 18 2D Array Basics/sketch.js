// 18 2D Arrays Basics/ Puzzle Game Assignment
// Ayeman Islam
// April 15/26
//
// 0 (black) 255 (white)
// grid is 6 x 5

let grid = [
  [0, 0, 0, 255, 0, 255],
  [255, 0, 255, 0, 255, 0],
  [0, 0, 0, 0, 0, 255],
  [255, 255, 255, 255, 255, 0],
  [0, 255, 0, 0, 0, 255],
];
let rows = grid.length;
let cols = grid[0].length;
let tileSize = 150;
let win = false;

function setup() {
  createCanvas(cols * tileSize, rows * tileSize);
}

function draw() {
  background(225);
  renderGrid();
  textSize(30);
  fill("green");
  if(winCondition()){
    text("YOU WON", width/2, height/2);
  }
  text(getCurrentX() + ", " + getCurrentY(), mouseX, mouseY);
}

function greenOverlay(){
  if (mouseX < width && mouseY < height) {

    let x = getCurrentX(); let y = getCurrentY();

    if (keyIsDown(SHIFT)) { // CHEATER CHEATER CODE
      flip(x, y);           // Helps to cheat through the puzzle
    }
    else {
      // ALWAYS:
      flip(x, y);

      // Flip the cardinal (NSEW) neighbours
      if (x - 1 >= 0) fill("green", 20); // WEST
      if (x + 1 <= rows) fill("green", 20); // EAST
      if (y - 1 >= 0) fill("green", 20); // NORTH
      if (y + 1 <= cols) fill("green", 20); // SOUTH
    }
  }
}



function mousePressed() {
  // only do a flip if mouse is on the canvas
  if (mouseX < width && mouseY < height) {

    let x = getCurrentX(); let y = getCurrentY();


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
    for (let x = 0; x < cols; x++) { // x: 0 1 2 3 4 5
      let fillColor = grid[y][x];
      fill(fillColor);
      rect(x * tileSize, y * tileSize, tileSize);
    }
  }
}

function winCondition(){
  let wholeGrid = grid[0][0];
  for (let y = 0; y < rows; y++) { // y: 0 1 2 3 4 
    for (let x = 0; x < cols; x++) { // x: 0 1 2 3 4 5
      if (grid[y][x] !== wholeGrid){
        win = false;
        return win;
      }
      else{
        win = true;
      }
    }
  }
  return win; 
}




























