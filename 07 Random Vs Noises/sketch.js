// 07 Random Vs Noises
// Ayeman Islam
// Feb 27/26
//
// Looking at unpredictabiliity
// Specifically the difference between
// Uniformly distributed numbers
// and Perlin Noise

// Challenge: use noise() to make/use a ySpeed value
// and a xSpeed value
let ySpeed = 0;
let yNoisetimw = 10, yNoiseSpeed = 0.1;

// Global Variables
let d1, d2;
let minSize = 15; let maxSize = 50;
let x1, y1, x2, y2;


// Variables for using noise()
let noiseTime = 5, noiseSpeed = 0.5;
// noiseSpeed controls jow connected
// the random noise() values are


function setup() {
  createCanvas(windowWidth, windowHeight);
  x1 = width * 0.3; y1 = height * 0.5;
  x2 = width * 0.7; y2 = height * 0.5;
  //frameRate(3); 

}


function stars() {
  //use random() to generate 100 stars
  // ALT+SHIFT+F to auto format
  fill(255);
  for (let i = 0; i < 100; i++) {
    let x = random(0, width);
    let y = random(0, height);
    circle(x, y, 3);
  }
}


function noiseCircle() {
  //draw a fixed circle with random()ly
  //changing (but smooth!) diameters
  d2 = noise(noiseTime);   //yields value between 0-1
  d2 = map(d2, 0, 1, minSize, maxSize);
  fill(255, 50, 150);
  circle(x2, y2, d2);
  noiseTime += noiseSpeed;
}


function randomCircle() {
  // draw a fixed circle with random(0)ly
  // changing diameter
  fill(0, 255, 255);
  d1 = random(minSize, maxSize);
  circle(x1, y1, d1);
}

function draw() {
  background(0);
  // randomSeed(703); // Actual value
  // stars();
  ySpeed = noise(yNoiseTime);
  ySpeed = map(ySpeed, 0, 1, -5, 5);
  
  noiseCircle();
  
}
