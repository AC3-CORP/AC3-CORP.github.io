// Basic Transformations Sandbox


let originalSpacing = 20;


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function face(x, y) {
  //draw a face at x,y
  push();
  translate(x,y);
  ellipseMode(CENTER);
  fill("White");
  stroke(0);
  ellipse(0,0,150,150);

}

function rectangleRed(x, y) {
  //draw a red rectangle at x,y (sized 50 pixels square) - to visualize what happens to the coordinate system
  //when different basic transformations are applied.
  noStroke();
  fill(255, 0, 0, 150);
  rect(x, y, 50, 50);

}

function rectangleBlue(x, y) {
  //draw a red rectangle at x,y (sized 50 pixels square) - to visualize what happens to the coordinate system
  //when different basic transformations are applied.
  noStroke();
  fill(0, 0, 255, 150);
  rect(x, y, 50, 50);

}

function drawBasicGrid(shade) {
  //draw the normal cartesian Coordinate Grid, in a light color. Spaced at 20 px by default
  stroke(shade);
  for (let x = 0; x < width; x += 20) {
    line(x, 0, x, height);
  }
  for (let y = 0; y < height; y += 20) {
    line(0, y, width, y);
  }

  //Draw "X" at the origin
  strokeWeight(3);
  stroke(0);
  line(-5,0,5,0);
  line(0,5,0,-5);
  strokeWeight(1);
}





function draw() {
  // ALL TRANSFORMATION RESET at draw()
  // background(255);
  //drawBasicGrid(220);


  //transformation one: TRANSLATION
  // push();
  // translate(200, 150); // x, y. (z)
  // drawBasicGrid(150);
  // rectangleBlue(0,0);
  // pop();

  // push();
  // translate(100, 300);
  // rectangleRed(0,0);
  // pop();

  //add push()  pop()

  background(255);
  // //transformation two: SCALE
  // //scale works w.r.t. ORIGIN
  // //can use negative scale to flip the coordinate system
  // let s = map(mouseX, 0, width, 0.1, 8);
  
  // translate(200,200);
  // scale(s); // 0-1 reduction, 1 no change, > 1 enlargment
  // drawBasicGrid(180);
  // rectMode(CENTER);
  // rectangleBlue(0,0);



  //transformation three: ROTATION
  //reminder: rotations are measured in radians, not degrees! Functions can help with the conversion...
  translate(300,300);
  angleMode(DEGREES); // Changes the mode of radians to degrees
  rotate(frameCount);
  //drawBasicGrid(150)
  face(0, 0);
  //Combinations of Transformations

  //Challenge
  let n = 250;
  for(let i = 0; i < n; i++){
  stroke("black");
  line(0,0,75,0);
  rotate(360/-n);
  }
  

}