// 18 2D Arrays Basics
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
let tileSize = 60;


function setup() {
  createCanvas(cols*tileSize, rows*tileSize);
}

function draw() {
  background(225);
  renderGrid();
  textSize(30);
  fill("red");
  text(getCurrentX() + ", " + getCurrentY(), mouseX, mouseY);
}


function mousePressed(){
  flip(getCurrentX(), getCurrentY());
}

function flip(x, y){
  if(grid[y][x] === 0) grid[y][x] = 255;
  else grid[y][x] = 0;
}

function getCurrentX(){
  // determine the current col pos of mouse
  let constrainedX = constrain(mouseX, 0, width-1);
  return floor(constrainedX / tileSize);
}

function getCurrentY(){
  // determine the current row pos of mouse
  let constrainedY = constrain(mouseY, 0, height-1);
  return floor(constrainedY / tileSize);
}

function renderGrid(){
  // interpret the data stored in 2D array(grid) and
  // draw a matrix of squares to reflect it

  for( let y = 0; y < rows; y++){ // y: 0 1 2 3 4 
    for( let x = 0; x < cols; x++){ // x: 0 1 2 3 4 5
      let fillColor = grid[y][x];
      fill(fillColor);
      rect(x*tileSize, y*tileSize, tileSize);
    }
  }
}


























