// Assignment 2 - Rocky Terrain Generation
// Ayeman Islam
// March 3/26
//
// 

//Global Variable
let y;
let startTime, original_startTime;
let rectWidth = 5;




function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke()

  y = windowHeight;

  startTime = random(100);
}

function rockyTerrain() {
  startTime = original_startTime;

  for (let x = 0; x < width; x += rectWidth) {
    let rectHeight = map(noise(startTime)) * (height * 0.95);

    fill("black");
    rect(x, y, rectWidth, -rectHeight);

    startTime += 0.005;
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
  rockyTerrain();
}
