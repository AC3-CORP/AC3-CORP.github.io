// Traffic Simulation
// Ayeman Islam
// March 27/26


// Global Variables 
let eastBound = []; // creates an array for the traffic going eastbound
let westBound = []; // creates an array for the traffic going westbound
let light; // creates a variable for the traffic light


function setup() {
  createCanvas(windowWidth, windowHeight);

  light = new TrafficLight(); // sets up the new object in the variable

  for (let i = 0; i < 20; i++) { //creates the cars for the traffic going eastbound
    eastBound.push(new Vehicle( // a for loop to keep the flows cars unlimited
      random(width),
      random(height / 3 + 750, height / 3 + 250),
      1
    ));
  }
  for (let i = 0; i < 20; i++) { //creates the cars for the traffic going westbound
    westBound.push(new Vehicle( // a for loop to keep the flows cars unlimited
      random(width),
      random(height / 3 - 225, height / 3 + 188),
      0
    ));
  }
}

function drawRoad() {
  fill(0, 10);
  stroke("cyan ");
  rect(0, 175, 1900, height - 200);

  for (let x = 0; x < width; x += 45) {
    if (light.isRed) {
      stroke("red");
      strokeWeight(10);
      line(x, height / 2, x + 21, height / 2);
    } else {
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
    this.color = color(random(150, 255), 15, random(200, 255));
    this.xSpeed = (direction === 1);
    this.random = int(random(101));
  }

  display() {
    push();
    translate(this.x, this.y);

    if (this.direction === 0) {
      scale(-1, 1);
    }

    rectMode(CENTER);
    noStroke();

    let w, h;
    if (this.type === 0) {
      w = 50;
      h = 25;
    }
    else{
      w = 75;
      h = 30;
    }

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
    this.x += this.xSpeed;

    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width;
  }

  speedUp() {
    if (this.direction === 1 && this.xSpeed < 7) {
      this.xSpeed += 1;
    }
    if (this.direction === 0 && this.xSpeed > -7) {
      this.xSpeed -= 1;
    }
  }

  speedDown() {
    if (this.direction === 1 && this.xSpeed > 3) {
      this.xSpeed -= 1;
    }
    if (this.direction === 0 && this.xSpeed < -3) {
      this.xSpeed += 1;
    }
  }

  changeColor() {
    this.color = color(random(15, 255), random(115), random(200, 255));
  }

  action() {
    this.move();
    this.random = int(random(101));
    if (this.random === 1) this.speedUp();
    if (this.random === 2) this.speedDown();
    if (this.random === 3) this.changeColor();
    this.display();
  }
}


function mousePressed() {
  if (keyIsDown(SHIFT)) {
    westBound.push(new Vehicle(mouseX, random(height / 3 - 200, height / 3 + 200), 0));
  } else {
    eastBound.push(new Vehicle(mouseX, random(height / 3 + 750, height / 3 + 250), 1));
  }
}

function keyPressed() {
  if (keyCode === 32 ) {
    light.turnRed();
  }
}

function draw() {
  background(0, 70);
  drawRoad();

  light.update();
  light.display();

  for (let eB of eastBound) {
    eB.action();
  }

  for (let wB of westBound) {
    wB.action();
  }
}