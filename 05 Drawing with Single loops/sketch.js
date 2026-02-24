// 05 Drawing with Single Loops
// Ayeman Islam
// Feb 24/26

// Global Variables 

let cX = 0

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function movingBall() {
  // Using  draw() loop. we can animate.
  cX += 5;
  if(cX > width) cX = 0;
  circle(cX, 50, 25);
}

function circleLine(y, size){
  // Use this function to drawa line of circles
  // y → number   height at wich to draw the line
  // size → number  diameter of the circles
  let xStart = width * 0.1;; //10% position from left
  let xEnd = width * 0.9;    //90% position from left

  for(let y = xStart; y < xEnd; y += size) {
    circle(x, y, size);
  }
}

function gradientBackground() {
  // Create a gradient to use a as a background
  let h = 1; //Height of each rectangle

  // Use a loop (doesn't have to be WHILE)
  // To draw vertical stack of rectangles
  let y = 0;
  while(y < height) {
    let value = map(y, 20, height, 0, 255);
    noStroke();
    fill(value, 200, 255);
    rect( 0, y, width, h);
    y += h;
  }
}

function challenge(){

}

function draw() {
  background(220);
  gradientBackground();
  movingBall();
  
}
