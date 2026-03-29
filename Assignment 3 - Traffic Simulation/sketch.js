// Traffic Simulation
// Ayeman Islam
// March 27/26


// Global Variables 
let eastBound = [];
let westBound = [];
let light;


function setup() {
  createCanvas(windowWidth, windowHeight);

  light = new TrafficLight();
  for (let i = 0; i < 20; i++) {
    eastBound.push(new Vehicle(
      random(width),
      random(height / 3 + 750, height / 3 + 250),
      1
    ));
  }
  for (let i = 0; i < 20; i++) {
    westBound.push(new Vehicle(
      random(width),
      random(height / 3 - 225, height / 3 + 188),
      0
    ));
  }
}

function drawRoad() {
  fill(0,10);
  stroke("cyan ");
  rect(0, 175, 1900, height-200);

  for (let x = 0; x < width; x += 45) {
    if (light.isRed) {
      stroke("red");
      strokeWeight(10);
      line(x, height / 2, x + 21, height / 2);
    }else{
      stroke("cyan");
      strokeWeight(10);
      line(x, height / 2, x + 21, height / 2);
    }
  }
}

class TrafficLight {
  constructor() {
    this.isRed = false;
    this.timer = 0;
  }

  update() {
    if (this.isRed) {
      this.timer--;
      if (this.timer <= 0) {
        this.isRed = false;
      }
    }
  }

  display() {
    noStroke();
    fill(50);
    rect(100, 70, 50, 100);

    if (this.isRed) {
      fill(255, 0, 0);
      ellipse(124, 120, 40);
    } else {
      fill(0, 255, 0);
      ellipse(124, 120, 40);
    }
  }

  turnRed() {
    this.isRed = true;
    this.timer = 120;
  }
}

class Vehicle {
  constructor(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;

    this.type = int(random(2));
    this.color = color(random(150,255),  15, random(200,255));
    this.xSpeed = (direction === 1) ? random(2,5) : random(-2, -5);
  }

  display() {
    push();
    translate(this.x, this.y);

    if (this.direction === 0) {
      scale(-1, 1);
    }

    rectMode(CENTER);
    noStroke();

    let w = (this.type === 0) ? 50 : 75;
    let h = (this.type === 0) ? 25 : 30;

    fill(this.color);
    rect(0, 0, w, h, 6);

    fill(180);
    rect(w / 4, 0, w / 4, h * 0.6, 4);
    rect(-w / 4, 0, w / 4, h * 0.6, 4);

    fill(255, 255, 150);
    ellipse(w / 2 - 3, -h / 4, 5);
    ellipse(w / 2 - 3, h / 4, 5);

    fill(255, 0, 0);
    ellipse(-w / 2 + 3, -h / 4, 5);
    ellipse(-w / 2 + 3, h / 4, 5);

    pop();
  }

  move() {
    if (light.isRed) return;

  let group = (this.direction === 1) ? eastBound : westBound;
  let myLength = (this.type === 0) ? 50 : 75;
  
  let minGap = 30;
  let closestDist = Infinity;
  for (let other of group) {
    if (other !== this) {

      let otherLength = (other.type === 0) ? 50 : 75;

      if (this.direction === 1 && other.x > this.x && abs(other.y - this.y) < 30) {
        let d = other.x - this.x - (myLength/2 + otherLength/2);
        if (d < closestDist) closestDist = d;
      }

      if (this.direction === 0 && other.x < this.x && abs(other.y - this.y) < 30) {
        let d = this.x - other.x - (myLength/2 + otherLength/2);
        if (d < closestDist) closestDist = d;
      }
    }
  }

  if (closestDist < minGap) {
    this.speedDown();
  } else {
    this.speedUp();
  }

  this.x += this.xSpeed/2;

  if (this.x > width) this.x = 0;
  if (this.x < 0) this.x = width;
}

speedUp() {
  if (this.direction === 1 && this.xSpeed < 15) {
    this.xSpeed += 1;
  }
  if (this.direction === 0 && this.xSpeed > -15) {
    this.xSpeed -= 1;
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
  this.color = color(random(0,150), random(0,155), random(200,255));
}

action() {
  this.move();
  if (random(100) < 1) this.speedUp();
  if (random(100) < 1) this.speedDown();
  if (random(100) < 1) this.changeColor();
  this.display();
}
}


function mousePressed() {
  if (keyIsDown(SHIFT)) {
    westBound.push(new Vehicle(mouseX, random(height / 3 - 200, height / 3 + 200), 0));
  } else{
    eastBound.push(new Vehicle(mouseX, random(height / 3 + 750, height / 3 + 250),1));
  }
}

function keyPressed() {
  if (key === ' ') {
    light.turnRed();
  }
}

function draw() {
  background(0,70);
  drawRoad();

  light.update();
  light.display();

  for (let v of eastBound) {
    v.action();
  }

  for (let v of westBound) {
    v.action();
  }
}