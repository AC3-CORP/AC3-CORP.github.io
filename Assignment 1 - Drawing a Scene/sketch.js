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
  let topColor = color(202, 104, 44); 
  let bottomColor = color(255, 201, 175);
  
  // Looing through every y-pixel
  for (let y = 0; y < height; y++) {
    // Calculating the percentage (0.0 to 1.0)
    let n = map(y, 0, height, 0, 1);
    let newColor = lerpColor(topColor, bottomColor, n);
    
    stroke(newColor);
    line(0, y, width, y);
  }
}

function sun() {
  noStroke()
  fill("white")
  circle(675, 730, 85);
  circle(610, 630, 95);
}
 
function mountains() {
  noStroke();
  fill(217, 131, 130);
  triangle(0, 1000, 0, 650, 150, 1000);
  triangle(50, 1000, 230, 580, 550, 1000);
  triangle(250, 1000, 455, 705, 650, 1000);
  triangle(0, 1000, 100, 800, 350, 1000);
  triangle(700, 1000, 650, 800, 450, 1000);
  triangle(700, 1000, 650, 800, 850, 1000);
  triangle(600, 1000, 755, 700, 875, 1000);
  triangle(655, 1000, 890, 700, 900, 1000);
}

function grounds() {
  noStroke();
  fill(196, 107, 82);
  rect(1, 930, 900, 800);

  noStroke();
  fill(213, 125, 92);
  rect(1, 950, 900, 800);

  noStroke();
  fill(227, 140, 102);
  rect(1, 970, 900, 800);
} 

function huts(){
  noStroke();
  fill(197, 97, 97);
  arc(100, 1050, 560, 580, PI, 0); 
  arc(350, 1050, 230, 370, PI, 0);
  rect(50, 650, 10, 200);
  rect(70, 655, 5, 200);  
}

function draw() {
  sky();
  sun();
  mountains();
  grounds();
  huts();
}


