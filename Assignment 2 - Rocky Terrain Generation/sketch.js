// Assignment 2 - Rocky Terrain Generation
// Ayeman Islam
// March 3/26
//
// 

//Global Variable
let y;
let start, original_start;
let rectWidth = 5;

let panX = 0;
let panSpeed = -1;

let highestY; let highestX;
let total_Height;
let countHeight;
let average;


let tallestPeak;


//-------------------------------------//
//-------------------------------------//

function setup() {
  createCanvas(windowWidth, windowHeight);

  y = windowHeight;
  original_start = random(100);

}

function backgroundColor() {
   let topColor = color(22, 4, 244);
  let bottomColor = color(25, 200, 205);

  // Looping through every y-pixel
  for (let y = 0; y < height; y++) {
    // Calculating the percentage (0.0 to 1.0)
    let n = map(y, 0, height, 0, 1);
    let newColor = lerpColor(topColor, bottomColor, n);

    stroke(newColor);
    line(0, y, width, y);}
}

function generateTerrain() {
  start = original_start;
  tallestPeak = height;

  let total_Height = 0;
  let countHeight = 0;

  for (let x = 0; x < width; x += rectWidth) {
    let rectHeight = map(noise(start), 0, 1, 0, height * 0.95);

    fill(0,0, 120);
    stroke(0,50,250);
    strokeWeight(0.5);
    rect(x, y, rectWidth, -rectHeight);
    start += 0.005;

    let tallestY = height - rectHeight;
    if (tallestY < tallestPeak) {
      tallestPeak = tallestY;
      highestX = x + rectWidth / 4;
      highestY = tallestY;
    }
    total_Height += rectHeight;
    countHeight++;
      
  }

  average = total_Height / countHeight;
  fill("red");
  rect(0, height - average, width, 3);

  drawFlag(highestX, highestY);
}

function keyPressed() {
  if (keyCode === 37) {
    rectWidth += 1;
  }
  else if (keyCode === 39) {
    rectWidth -= 1;
    if (rectWidth < 1) {
      rectWidth = 1;
    }
  }
}

function drawFlag(x, y) {
  stroke(0,255,255);
  strokeWeight(6);
  line(x, y, x, y - 40);

  fill(0,250,255);
  strokeWeight(1)
  triangle(x - 1, y - 40, x - 1, y - 22, x + 30, y - 30);
}

function draw() {
  backgroundColor();

  original_start += 0.01;
  panX += panSpeed;
  generateTerrain();
  

}

