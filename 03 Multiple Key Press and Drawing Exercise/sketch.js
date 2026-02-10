// Multiple KeyPress Detection
// ----Drawing Practice----
// FEB 10/25
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function checkMutli(){
  //a function to demonstrate how we check
 //if a multiple keyboard butssed at once
strokeWeight(mouseX / 10);
stroke(255, 0, 0);

 //check for multiple keypressed (3 simultaneously)
 let X  = keyIsDown(65); //a
 let Y = keyIsDown(66); //b
 let c = keyIsDown(67); //c

 let str = "a: " + a + " b: " + b + " c: " + c;
 textSize(40);
 text(str, 100, 300);
}

//-------Challenge-------//
function drawAvatar(){
  strokeWeight(0);

  fill("lightGreen");
  circle(190 + X, 210 + Y, 145);
  rect(118 + X, 200 + Y, 144, 83);
  rect(118 + X, 200 + Y, 10, 105);
  rect(252 + X, 200 + Y, 10, 105);

  fill("black");
  circle(225 + X, 200 + Y, 13);
  circle(155 + X, 200 + Y, 13);
  rect(164 + X, 230 + Y, 56, 3, 50);
  
}
let avatar = drawAvatar();


function draw() {
  background(220);
  //checkMutli();
  let X  = keyIsDown(38); //a
  let Y = keyIsDown(40); //b

  let avatar = drawAvatar();
}

draw(avatar, mouseX, mouseY);

