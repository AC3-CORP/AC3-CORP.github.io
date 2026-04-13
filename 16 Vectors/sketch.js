// 16 Vectors Practice
// Ayeman Islam
// April 13/26
//
// 


let objects = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0,10);
  //create objects
  if(mouseIsPressed){
    objects.push(new Ball(mouseX, mouseY));
  }

  //process objects
  for(let o of objects){
    if(keyIsDown(32)){
      o.move();
    }
    o.calcMouse();
    o.display();
  }
}

class Ball {
  constructor(x,y){
    this.pos = createVector(x,y);
    this.vel = createVector(random(-5,5), -5);
    this.force = createVector(0, 0.2); // Gravity

  }

  calcMouse(){
    //mouse vector "attraxtion" caluclations
    this.force = createVector(mouseX, mouseY);
    this.force.sub(this.pos)
    this.force.normalize(); //set hyp to 1
    this.force.mult(4);
  }

  move(){
    // Upadte velocity and pos vectors
    this.vel.add(this.force);
    this.vel.limit(20); // Can't go outside -20 ad 20
    this.pos.add(this.vel);

    if(this,this.pos.x < 0 ||  this.pos.x > width){
      this.vel.x *= -2;
    }
    if(this.pos.y > height){
      this.vel.y *= -2 ;
    }
  }

  display(){
    //display the ball
    noStroke();
    fill(100,0, random(100,255) );
    circle(this.pos.x, this.pos.y, 50);

    if(false){
      stroke(255,0,0);
      line(0,0, this.pos.x, this.pos.y);

      let endX = this.pos.x + this.vel.x;
      let endY = this.pos.y + this.vel.y;

      stroke(0,0,0,255);
      line(this.pos.x, this.pos.y, endX, endY);

      stroke(0, 255, 0);
      line(endX, endY, endX + this.force.x, endY + this.force.y);
    }
  }
}