// MouseWheel, Map, Lerp
// Ayeman Islam
// Feb 26/26

let x, y;
let x1, y1;
let x2, y2;
let diameter = 50;
let area = 30;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2; y = height/2;
  x1 = width*2; y1 = height*2
  x2 = width*0.0045; y2 = height*0.0045
  strokeWeight(3);
}

function draw() {
  background(220, 30);
  x = lerp(x, mouseX, 0.15);
  y = lerp(y, mouseY, 0.15);

  x1 = lerp(x1, mouseX, 0.05);
  y1 = lerp(y1, mouseY, 0.05);

  x2 = lerp(x2, mouseX, 0.5);
  y2 = lerp(y2, mouseY, 0.5);

  // line(x,y, mouseX, mouseY);

  let r = map(x, 0, width, 0, 255);
  let g = map(y, 0, height, 0, 255);
  let b = 120;

  let r1 = map(x, 0, width, 25, 255);
  let g1 = map(y, 30, height, 25, 255);
  let b1 = 250;

  let r2 = map(x, 45, width, 25, 255);
  let g2 = map(y, 30, height, 0, 255);
  let b2 = 50;
  
  fill(r, g, b);
  stroke(r, g, b);
  circle(x, y, diameter);

  fill(r1, g1, b1);
  stroke(r1, g1, b1);
  rect(x1, y1, area, area);

  noFill();
  stroke(r2, g2, b2);
  ellipse(x2, y2, x2, y2, x2, y2);

}

function mouseWheel(event) {
  print(event.delta);
  if(event.delta < 0){
    diameter += 5;
  }
  else{
    diameter = max(5, diameter -5);
  }
}



