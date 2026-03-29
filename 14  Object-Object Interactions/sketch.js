// Object_Object Interaction
// Ayeman Islam
// March 25/26
//
 
// Global Variables
let nodes = [];
let reach = 150;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0,25);
  //if no deletions, loop by item
  for(let n of nodes){
    //n.connect();
    n.move();
    n.connect(nodes);
    n.display();
  }
}


function mousePressed(){
  if(mouseButton === "center"){
    for(let i = 0; i <50; i++){
      let x = random(-50,50);
      let y = random(-50,50);
      nodes.push(new csNode(mouseX+x, mouseY+y));
    }  
  }
  if(mouseButton === "left"){
    let n = new csNode(mouseX, mouseY);
    nodes.push(n);
  }
}

class csNode{
  //1. Constructor
  constructor(x,y){
    //properties related to pos/display
    this.x = x; this.y = y; this.size = 5;
    this.c = color(random(255), random(25), random(255));

    //properties related to movement
    this.xTime = random(100); this.yTime = random(100);
    this.timeShift = 0.01; this.maxSpeed = 5;
  }

  //2. Class Methods
  display(){
    fill(this.c);
    noStroke();
    circle(this.x, this.y, this.size);
  }

  move(){
    //use perline noise for xy movement
    let xSpeed =  noise(this.xTime); //0-1 normalized value
    xSpeed = map(xSpeed, 0, 1, -this.maxSpeed, this.maxSpeed);
    this.xTime  += this.timeShift;

    this.x += xSpeed;
    if(this.x < 0) this.x = width;
    else if (this.x > width) this.x = 0;


    let ySpeed = noise(this.yTime);
    ySpeed = map(ySpeed, 0, 1, -this.maxSpeed, this.maxSpeed);
    this.y += this.timeShift;

    this.y += ySpeed;
    if(this.y < 0) this.y = height;
    else if (this.y > height) this.y = 0;
  }

  connect(nodeArray){
    //check if the current pioint is close to any other
    //csNode, and if so join with a line

    stroke(this.c);
    for(let n of nodeArray){
      //this.x, this.y   n.x, n.y
      if(n !== this){ //don't compare to yourself
        let d = dist(this.x, this.y, n.x, n.y);
        if(d < reach){// the two nodes ARE close
          line(this.x, this.y, n.x, n.y);
        }
      }
    }
  }

}