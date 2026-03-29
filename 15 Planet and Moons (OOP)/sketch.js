// Planets and Moons (OOP)
// Ayeman Islam
// March 26/26
//
//

// Global Variables
let myPlanet;


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  myPlanet = new Planet(width/2, height/2);
  noStroke();
}


function draw() {
  background(0,30);
  stroke(205,255,25);
  myPlanet.display();
}

function mousePressed(){
//regular click -> add moon
// SHIFT click -> destriy and reset moon
if(keyIsPressed && keyCode === SHIFT){
  myPlanet = new Planet(width/2,height/2);
}
else{
  myPlanet.createMoon();
}
}

function keyPressed(){
  if(keyCode !== SHIFT){
    myPlanet.x = mouseX;
    myPlanet.y = mouseY;
  }
}

class Planet{
  //constructor
  constructor(x,y){
    this.x = x; this.y = y; this.s = 100;
    this.moons = [];
  }
  //class methods
  createMoon(){
    this.moons.push(new Moon());
  }

  display(){
    // draw the planet + all of its moons
    //circle(this.x, this.y, this.s);
    //for the moons
    for(let m of this.moons){
      m.update(this.x, this.y);
    }
  }
}

class Moon{
  constructor(){
    this.speed = random(5,20); //angular speed
    this.angle = 0;
    this.orbitRadius = random(100,300);
    this.s = random(30,50);
  }

  //class methods
  move(x,y){
    this.angle += this.speed;
  }

  display(x,y){
    push();
    translate(x,y);
    rotate(this.angle);
    circle(this.orbitRadius, 0, this.s);
    pop();
  }

  update(x,y){
    //helper method to handle all internal method calls.
    this.move();
    this.display(x,y);
  }
}
