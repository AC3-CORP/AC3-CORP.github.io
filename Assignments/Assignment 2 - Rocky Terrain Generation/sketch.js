// Assignment 2 - Rocky Terrain Generation
// Ayeman Islam
// March 3/26
//
// 

//Global Variables 
let y; //Storing the ground position it will start from
let start, original_start; // movment through Perlin Noise when generating terrain
let rectWidth = 5; // Width Of each terrain rectangle

let panX = 0; // Both controls horizontal panning
let panSpeed = -1;

let highestY; let highestX; // Storing the tallest/highest terrain peak

let total_Height; //Variables that are being used to calculate the average terrain height
let countHeight;
let average;


let tallestPeak; // Storing the Y position of the tallest peak found


//-------------------------------------//
//-------------------------------------//

function setup() {
  createCanvas(windowWidth, windowHeight);

  y = windowHeight; // Sets the terrain base to the bottom of the screen
  original_start = random(100); // Random starting value

}

function backgroundColor() {
  // This function allows to make a colorful gradient background

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
  // This function allows to generate a terrain with
  // the use of Perlin Noise
  // This function allows an addition feature to find
  // average height of the terrain using a bright red line

  start = original_start; // Resets the noise starting point each frame
  tallestPeak = height; // Restes the tallest peak value

  let total_Height = 0; // Resetting the calculations for average height
  let countHeight = 0;

  for (let x = 0; x < width; x += rectWidth) {
    let rectHeight = map(noise(start), 0, 1, 0, height * 0.95);

    // Terrain Appearances
    fill(0,0, 120);
    stroke(0,50,250);
    strokeWeight(0.5);

    // The Drawing of the Terrain Rectangle
    rect(x, y, rectWidth, -rectHeight);
    
    //Moving to the next noise value
    start += 0.005;

    let tallestY = height - rectHeight; // Calculation of the top of the terrain column
    //Checking if the current column is the tallest peak so far 
    if (tallestY < tallestPeak) {
      tallestPeak = tallestY;
      highestX = x + rectWidth / 4;
      highestY = tallestY;
    }
    // Adding height to total for average calculation
    total_Height += rectHeight;
    countHeight++;
      
  }
  // Calculates Average Terrain Height
  average = total_Height / countHeight;
  
  fill("red"); // Draws thge line where the Average Height is
  rect(0, height - average, width, 3);

  drawFlag(highestX, highestY); // Draws the flag on the tallest peak
}

function keyPressed() {
  if (keyCode === 37) { /// <- Compression of the graph
    rectWidth += 1;
  }
  else if (keyCode === 39) { /// <- Stretching of the graph
    rectWidth -= 1;
    if (rectWidth < 1) {
      rectWidth = 1;
    }
  }
}

function drawFlag(x, y) {
  // This function allows to draw a flag on top
  // Of the highest peak in the terrain

  // This creates the pole of the flag
  stroke(0,255,255);
  strokeWeight(6);
  line(x, y, x, y - 40);

  // This creates the Canton and Fly End of the flag
  fill(0,250,255);
  strokeWeight(1)
  triangle(x - 1, y - 40, x - 1, y - 22, x + 30, y - 30);
}

//------------------------------------------------------------//
//-----------------------MAIN PROGRAM-------------------------//
//------------------------------------------------------------//

function draw() {
  backgroundColor(); // --- Draws the gradient background
  original_start += 0.01; // --- Move noise position to create scrolling terrain
  panX += panSpeed; // --- Updates the horizontal panning of the canvas
  generateTerrain(); // Generates terrain every frame
  

}

