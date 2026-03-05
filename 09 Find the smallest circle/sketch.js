// 09 Find the Smallest Circle
// Ayeman Islam
// March 5/26
//
// 
// 

// Global Variable
let NUM_CIRCLES = 100;
let circles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  makeCircles();
}

function makeCircles() {
  let count = 0;
  while(count < NUM_CIRCLES){
    let x_ = random(0, width);
    let y_ = random(0, height);
    let s_ = random(10, 150);
    let c = {x:x_, y:y_, s:s_};
    circles.push(c);
    count++;
  }

}

function renderCircles() {
  let smallest = circles[0].s;
  let smallestY = circles[0].y;

  for(let c of circles){
    noFill();
    circle(c.x, c.y, c.s);
    if(c.s < smallest){
      smallest = c.s.toFixed(2);
      smallestY = c.y;
    }
  }
  fill(0);
  stroke("red"); strokeWeight(3);
  text(smallest, width/2, height/2);
  line(0, smallestY, width, smallestY);
  stroke(0); strokeWeight(1)

}

function draw() {
  background(220);
  renderCircles();
}
