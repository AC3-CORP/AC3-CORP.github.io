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
  fill("salmon");
  rect(0, 0, 1500, 1000);
  
  noStroke();
  fill("orange");
  rect(0, 500, 1500, 2000);

  noStroke();
  fill("pink");
  rect(0, 600, 1500, 2000);

}

function landscapeNearView(){
  noStroke();
  fill("tan");
  ellipse(0, 900, 800, 400);
  ellipse(200, 900, 800, 400);
  ellipse(400, 900, 700, 400);
  ellipse(600, 900, 800, 400);
  ellipse(800, 900, 800, 400);
}

function draw() {
  background(255, 116, 0);
  sky();
  landscapeNearView();
}


