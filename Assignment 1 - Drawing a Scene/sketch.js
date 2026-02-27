// Interactive Scene {Tatooine w Luke Skywalker}
// Ayeman Islam
// Feb 11/26

let x, y; //x and y positions for the movable sun
let cX = -800; //controls the x-pos of cloud 1 that enters the scene from the right side
let cX1 = -800; //controls the x-pos of cloud 2 that enters the scene from the right side
let cX2 = 2000; //controls the x-pos of cloud 3 that enters the scene from the left side 
let cX3 = 2000; //controls the x-pos of cloud 4 that enters the scene from the left side

let diameter = 155;

let lukeX = 300; // x position of Luke Skywalker that can be changed through pressing arrow keys
let lukeY = 1050; // y position of Luke Skywalker that is fixed and can't be changed
let speed = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = windowHeight/2, y = windowWidth/2; // setting the x and y positions of the sun
}

function sky() {
  // This function controls the colors of the gradient sky
  let topColor = color(202, 104, 44); 
  let bottomColor = color(255, 201, 175);
  
  // Looping through every y-pixel
  for (let y = 0; y < height; y++) {
    // Calculating the percentage (0.0 to 1.0)
    let n = map(y, 0, height, 0, 1);
    let newColor = lerpColor(topColor, bottomColor, n);
    
    stroke(newColor);
    line(0, y, width, y);
  }
}

function sun() {
  noStroke();
  fill("white");
  circle(675, 730, 85);
  circle(610, 630, 95);
}

function mountains() {
  // This function is the making of the mountains in the distant
  // of this Tatooine Scene
  noStroke();
  fill(207, 131, 130);
  triangle(0, 1000, 0, 650, 150, 1000);
  triangle(50, 1000, 230, 580, 550, 1000);
  triangle(250, 1000, 455, 705, 650, 1000);
  triangle(0, 1000, 100, 800, 350, 1000);
  triangle(700, 1000, 650, 800, 450, 1000);
  triangle(700, 1000, 650, 800, 850, 1000);
  triangle(600, 1000, 805, 700, 1075, 1000);
  triangle(655, 1000, 1300, 600, 1670, 1000);
  triangle(655, 1000, 1670, 700, 2700, windowHeight);
  triangle(655, 1000, 2270, 800, 3400, windowHeight);
  triangle(0, 1000, 2000, 1000, 3450, windowHeight);
}

function grounds() {
  // This function makes the ground/land of the scene
  noStroke();
  fill(196, 107, 82);
  rect(1, 930, windowWidth, 800);

  fill(213, 125, 92);
  rect(1, 950, windowWidth, 800);

  fill(227, 140, 102);
  rect(1, 970, windowWidth, 800);
} 

function huts(){
  // This function is the making of the Tatooine Hut
  noStroke();
  fill(197, 97, 97);
  arc(100, 1050, 560, 580, PI, 0); 
  arc(350, 1050, 230, 370, PI, 0);
  rect(50, 650, 10, 200);
  rect(70, 655, 5, 200); 

  rect(1, 1000, windowWidth, 40);
}

function moveLuke() {
  // This function is the controlling of luke in the scene
  // It allows us to move from left to right
  if (keyIsDown(LEFT_ARROW)) {
    lukeX -= speed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    lukeX += speed;
  }
}

function drawLuke() {
  // This function is the making of the Luke Skywalker 
  // The scale of the character can be changed 
  // through the number change in scale with manual inputs
  
  push();
  translate(lukeX, lukeY);

  scale(1.8);

  // Robed body
  fill(230, 220, 170);
  rect(-15, -40, 30, 50, 5);

  // Head
  fill(255, 220, 180);
  circle(0, -55, 25);

  // Hair
  fill(180, 150, 60);
  arc(0, -60, 26, 20, PI, TWO_PI);

  // Lightsaber 
  fill(81);
  rect(15, -30, 6, 20);

  // Lightsaber blade
  fill(0, 200, 255);
  rect(17, -80, 2, 50);

  pop();
}

function keyPressed(){
   blendMode();
}

function draw() {
  sky();
  sun();
  clouds();
  clouds();
  mountains();
  grounds();
  huts();
  moveLuke();
  drawLuke();

  // This controls the size, alignment of my name
  // It controls the lighting of my name
  // Giving it a neon light atmosphere
  fill(0, 150, 255);
  textAlign(RIGHT, BOTTOM);
  textSize(32);
  text("Ayeman", width-10, height-10);

  fill(255);
  textAlign(RIGHT, BOTTOM);
  textSize(32);
  text("Ayeman", width-10, height-10);


  // These if-statements control the sky color through the blending mode
  // The lower the sun in the canvas, the darker it will get.
  if (y > 700) {                 
    blendMode(OVERLAY);
    noStroke();
    fill(0, 0, 0, 3000);
    rect(0, 0, width, height);
    blendMode(BLEND); 
  }
  if( y > 900){
    blendMode(MULTIPLY);
    noStroke();
    fill(0, 0, 230, 200);
    rect(0, 0, width, height);
    blendMode(BLEND);

  }
}
