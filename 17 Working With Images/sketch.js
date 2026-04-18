// 17 Working With Images
// Ayeman Islam
// April 14/26
// How to load images and play animations

let lionL, lionR;
let dir = "left";
let pinImages = [];
let current = 0; //pinwheel current index 

async function loadAssets(){
  //loading the lions first
  lionL = loadImage("assets/lion-left.png");
  lionR = loadImage("assets/lion-right.png");

  //pinwheel images
  for(let i = 0; i <= 8; i++){
    pinImages.push(loadImage("assets/pin-0"+ i + ".png"));
  }
}

async function setup() {
  createCanvas(windowWidth, windowHeight);
  await loadAssets();
  imageMode(CENTER); // center referenced Images
  //framerate(n) good for debugging
}

function lion(){
  //update the stata variable based on moouse movment
  if (movedX < 0) dir = "left";
  else if(movedX > 0) dir = "right";
  // interpreting the state variable
  if(dir === "left"){
    image(lionL, mouseX, mouseY, lionL.width/2, lionL.height/2);
  }
  else{
    image(lionR, mouseX, mouseY, lionR.width/2, lionR.height/2);
  }
}

function pinWheel(){
  image(pinImages[current], width/2, height*0.7);
  if(frameCount%1 === 0){
    current = (current + 1)%9;
  }
}

class PinWheel{
  constructor(x,y){
    this.x = x; this.y = y; 
  }
}

function draw() {
  background(220);
  //lion();
  pinWheel();
}
