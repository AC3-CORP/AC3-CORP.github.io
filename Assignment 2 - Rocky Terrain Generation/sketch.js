// Assignment 2 - Rocky Terrain Generation
// Ayeman Islam
// March 3/26
//
// 

//Global Variable
let y;
let start, original_start;
let rectWidth = 5;
let flagX = 0; let flagY = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  y = windowHeight;

  original_start = random(100);

}

function drawFlag(flagX, flagY) {
  stroke("green");
  strokeWeight(3);
  line(flagX, flagY, flagX, flagY-20);
  
  fill("green");
  strokeWeight(1)
  triangle(flagX - 1 , flagY - 10, flagX - 1, flagY - 22, flagX + 14, flagY - 20);
}

function generateTerrain() {
  noStroke();
  start = original_start;
  for (let x = 0; x < width; x += rectWidth) {
    let rectHeight = map(noise(start), 0, 1, 0, height * 0.95);

    fill("black");
    rect(x, y, rectWidth, -rectHeight);

    start += 0.005;
  }
}


function keyPressed() {
  if (keyCode === 37) {
    rectWidth += 1;
  }
  else if (keyCode === 39) {
    rectWidth -= 1;
    if (rectWidth < 1){
      rectWidth = 1;
    }
  }
}

function draw() {
  background(220);
  generateTerrain();
  drawFlag(100, 100);
}

