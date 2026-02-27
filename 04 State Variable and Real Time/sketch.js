// State Variables and Real Time
// Ayeman Islam
// Feb 23/26


// Global Variables
let shapeState = 0; //0- Circle    1- Square
//2- Triangle  3- Starbust
let startTime;


function setup() {
  createCanvas(windowWidth, windowHeight);
  startTime = millis();
}

//millis()   startTime   millis()-startTime
//   0           0              0
//   200         0              200
//   400         0              400
//   600        600             0
//   800        600             200
//   1000       600             400

function draw() {
  background(220);
  drawShape();
  manageTime();
}

function manageTime() {
  // this function will reset our timer
  // (and update shapeState) once every
  // 1000 milliseconds.
  let elapsedTime = millis() - startTime;
  if (elapsedTime > 1000) {
    updateState();
    startTime = millis();
  }
}

function keyPressed() {
  updateState();
}

function updateState() {
  shapeState++;
  if (shapeState > 3) shapeState = 0;
}

function drawShape() {
  // function inspects the shapeState variable
  // and draws the appropriate shape on the canvas
  let x = width / 2; let y = height / 2;
  switch (shapeState) {
    case 0:
      circle(x, y, 150);
      break;
    case 1:
      square(x, y, 150);
      break;
    case 2:
      triangle(x - 50, y + 50, x + 50, y + 50, x, y - 25);
      break;
    case 3:
      for (let i = 0; i < 30; i++) {
        let x2 = random(x - 80, x + 80);
        let y2 = random(y - 80, y + 80);
        line(x, y, x2, y2);
      }
      break;
  }
}