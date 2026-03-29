// Traffic Simulation
// Ayeman Islam
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// Global Variables 
let eastBound = [];
let westBound = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function drawRoad() {
  fill(0)
  noStroke();
  rect(0, 330, width, 325);
  stroke("yellow");
  strokeWeight(4);

  for (let x = 0; x < width; x += 45) {
    line(x, width / 2, x + 21, width / 2);
  }
}

class Vehicle {
  constructor(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;

    this.type = int(random(2)); // 0 or 1
    this.color = color(random(255), random(255), random(255));

    this.xSpeed = (direction === 1) ? random(2, 5) : random(-5, -2);
  }

  display() {
    fill(this.color);

    if (this.type === 0) {
      // car
      rect(this.x, this.y, 40, 20);
    } else {
      // truck
      rect(this.x, this.y, 60, 25);
    }
  }

  move() {
    // stop if light is red
    if (light.isRed) return;

    this.x += this.xSpeed;

    // wrap around
    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width;
  }

  speedUp() {
    if (this.direction === 1 && this.xSpeed < 15) {
      this.xSpeed += 0.5;
    }
    if (this.direction === 0 && this.xSpeed > -15) {
      this.xSpeed -= 0.5;
    }
  }

  speedDown() {
    if (this.direction === 1 && this.xSpeed > 0) {
      this.xSpeed -= 0.5;
    }
    if (this.direction === 0 && this.xSpeed < 0) {
      this.xSpeed += 0.5;
    }
  }

  changeColor() {
    this.color = color(random(255), random(255), random(255));
  }

  action() {
    this.move();

    if (random(100) < 1) this.speedUp();
    if (random(100) < 1) this.speedDown();
    if (random(100) < 1) this.changeColor();

    this.display();
  }
}

function draw() {
  background(220);
  drawRoad();
}
