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

  for (let i = 0; i < 35; i++) { //creates 50 cars for the traffic going eastbound
    eastBound.push(new Vehicle( // a for loop to keep the flows cars unlimited
      random(width),
      random(height / 3 + 750, height / 3 + 250),
      1
    ));
  }
  for (let i = 0; i < 35; i++) { //creates 50 cars for the traffic going westbound
    westBound.push(new Vehicle( // a for loop to keep the flows cars unlimited
      random(width),
      random(height / 3 - 225, height / 3 + 188),
      0
    ));
  }
}

function drawRoad() {
  // this function creates a highway for the two-way traffic
  // it also consists of a extra feature where the lane divider
  // changes to the same color as the traffic light
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
  // this class make a traffic light
  // in this class you could change the settings for the frame count
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
  // this class creates a vehicle and its traffic physics
  // theres is randomizers for the random colors, sizes, and speed
  // for the two traffics
  constructor(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;

    this.type = int(random(2));
    this.color = color(random(120, 155), 15, random(200, 255));
    this.xSpeed = (direction === 1);
    this.random = int(random(101));
  }

  display() {
    push();
    translate(this.x, this.y); // moves to car position


    if (this.direction === 0) {// flips the car direction if going westbound
      scale(-1, 1);
    }

    rectMode(CENTER);
    noStroke();

    let w, h;
    if (this.type === 0) { //sets the size based on type of vehicle
      w = 50;
      h = 25;
    }
    else {
      w = 75;
      h = 35;
    }

    fill(this.color);
    rect(0, 0, w, h, 6); // car body

    fill(180);
    rect(w / 4, 0, w / 4, h * 0.6, 4); // windows
    rect(-w / 4, 0, w / 4, h * 0.6, 4);

    fill(255, 255, 150);
    ellipse(w / 2 - 3, -h / 4, 5); // headlights
    ellipse(w / 2 - 3, h / 4, 5);

    fill(255, 0, 0);
    ellipse(-w / 2 + 3, -h / 4, 5); // tail lights
    ellipse(-w / 2 + 3, h / 4, 5);

    pop();
  }

  move() { // this method controls the movement of the car
    if (light.isRed) return true; // stops the cars from moving when the light turns red
    this.x += this.xSpeed; // moves the car

    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width;
  }

  speedUp() { // this method increases the speed of the car 
    if (this.direction === 1 && this.xSpeed < 7) {
      this.xSpeed += 2; // increases the speed of eastbound cars
    }
    if (this.direction === 0 && this.xSpeed > -7) {
      this.xSpeed -= 2; // increases the speed of westbound cars
    }
  }

  speedDown() { // this method decreases the speed of the car
    if (this.direction === 1 && this.xSpeed > 3) {
      this.xSpeed -= 2; // decreases the speed of eastbound cars
    }
    if (this.direction === 0 && this.xSpeed < -3) {
      this.xSpeed += 2; // decreases the speed of westbound cars
    }
  }

  changeColor() { // sets up a randomizer for different colors for each car spawned
    this.color = color(random(15, 205), random(50,115), random(200, 255));
  }

  action() { // moves the car and randomizes speeds, and looks
    this.move();
    this.random = int(random(101)); //sets up the randomizer to create: 
    if (this.random === 1) this.speedUp(); // different speeds and different color
    if (this.random === 2) this.speedDown();
    if (this.random === 3) this.changeColor();
    this.display(); // draws the car using randomizer setup
  }
}


function mousePressed() {
  // this function allows the left mouse click to spawn new cars 
  // clicking just the left mouse button allows spawn in eastbound
  // click the left mouse button along with the SHIFT key allows spawn in westbound
  if (keyIsDown(SHIFT)) {
    westBound.push(new Vehicle(mouseX, random(height / 3 - 200, height / 3 + 200), 0));
  } else {
    eastBound.push(new Vehicle(mouseX, random(height / 3 + 750, height / 3 + 250), 1));
  }
}

function keyPressed() {
  // this function allows the ability to change
  // the traffic lights through the pressing of spacebar 
  if (keyCode === 32) {
    light.turnRed();
  }
}

function draw() {
  background(0, 70);
  drawRoad();

  light.update(); // updates the traffic light every time it turns red to green, vice versa
  light.display(); // draws the traffic light

  for (let eB of eastBound) { //updates and draws all the eastbound cars
    eB.action();
  }

  for (let wB of westBound) { //updates and draws all the west bound cars
    wB.action();
  }
}