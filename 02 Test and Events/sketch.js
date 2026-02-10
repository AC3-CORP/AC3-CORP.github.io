// Project Title: Text And Events
// Ayeman Islam
// Feb 9/26
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let textShade = 255;
let textScale = 40;
let bgcolor = "grey";

function setup() {
  createCanvas(windowWidth, windowHeight);
}

// function displayMouse() {
//   This function will report some
//   system variables relatred to moouse
//   onto the screen via text()

//   mouseX, mouseY -> store current mouse pos
//   mouseIsPressed -> boolean: mouse pressed?
//   good for mouseHELD events...
//   not good for detecting a single press

//   try using mouseIsPressed to change size]
//   becase draw() runs 60 times/s, 4-10 times per click event

//   if (mouseIsPressed){
//     textScale = int(random(10,100)); //10-99
//   }

//   textSize(textScale);
//   fill(textShade);
//   text(mouseX + ", " + mouseY + ", " + mouseIsPressed + ", " + mouseButton, mouseX, mouseY);
// }

function displayKeyboard(){
  //We will use this function to inspect some
  //of p5"s keyboard capabilities

  // keyIsPressed  -> is a keyboard button press?
  // key           -> last pressed ley(non-coded)
  // keyCode       -> last pressed coded key
  if(keyIsPressed){
    ///something was prssed. Next, check which key/keyCode
    if (key = " "){
      bgcolor = colpr(random(255), random(255), random(255));
    }
  }
  
  textSize(30);
  textAlign(CENTER, CENTER);
  let t = keyIsPressed + ", " + key + ", " + keyCode;
  text(t, width/2, height/2);
}  

function keyPressed(){
  if(keyCode === 65){
    bgcolor = color(random(255), random(255), random(255));
  }
}


function draw() {
  //Goal: Keep draw() tidy!
  background(220);
  //displayMouse()
  displayKeyboard()
}

function mousePressed(){
  // this is a p5 
  //automatically called exactly ONCE per MousePress (on down action)
  textShade = int(random(0,255));

}