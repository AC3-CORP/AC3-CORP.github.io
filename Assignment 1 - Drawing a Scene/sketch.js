// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
  
}
function sky() {
  noStroke();
  fill(192, 54, 44);
  rect(0, 0, 1500, 1000);
  
  noStroke();
  fill(203, 109, 81);
  rect(0, 500, 1500, 2000);

  noStroke();
  fill(233,150,122);
  rect(0, 600, 1500, 2000);

  noStroke();
  fill("pink");
  rect(0, 670, 1500, 2000);
}

function landscapeNearView(){
  noStroke();
  fill(160, 82, 45);
  ellipse(0, 1000, 800, 400);
  ellipse(200, 1000, 400, 400);
  ellipse(400, 1000, 700, 400);
  ellipse(600, 1000, 800, 400);
  ellipse(800, 1000, 400, 400);
  ellipse(1000, 1000, 900, 400);
}

function landscapeMidView(){
  noStroke();
  fill(203, 109, 81);
  ellipse(0, 950, 800, 400);
  ellipse(200, 950, 1000, 400);
  ellipse(400, 950, 700, 400);
  ellipse(600, 950, 850, 400);
  ellipse(800, 950, 1000, 400);
}

function landscapeMidFarView(){
  noStroke();
  fill(244, 164, 96);
  ellipse(0, 920, 800, 400);
  ellipse(200, 920, 1000, 400);
  ellipse(400, 920, 700, 400);
  ellipse(600, 920, 850, 400);
  ellipse(800, 920, 1000, 400);
}

function landscapeDistant(){
  noStroke();
  fill(0, 206, 209);
  rect(0, 700, 1000, 1000);

  noStroke();
  fill(0,139,139);
  rect(0, 710, 1000, 1000);
}

function draw() {
  background(255, 116, 0);
  sky();
  landscapeDistant();
  landscapeMidFarView();
  landscapeMidView();
  landscapeNearView();
}


