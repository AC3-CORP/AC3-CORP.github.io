// CS30 Finals Review
// Ayeman Islam
// June 11/26

let gorillaIdle = [];
let gorillaSwipe = [];
let spiralImages = [];

let spirals = [];

//Gorilla
let gorillaState = 0; //0 = idle and 1 = swipe
let idleIndex = 0; let swipeIndex = 0;
let gorillaX = 200;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 16; i++) {
    if (i < 10) {
      spiralImages.push(await loadImage("assets/Circle/circle0" + i + ".png"));
    }
    else {
      spiralImages.push(await loadImage("assets/Circle/circle" + i + ".png"));
    }

  }


  for (let i = 1; i <= 6; i++) {
    gorillaIdle.push(await loadImage("assets/Gorilla/idle" + i + ".png"));
    gorillaSwipe.push(await loadImage("assets/Gorilla/swipe" + i + ".png"));
  }

}

function draw() {
  background(0);

  //Gorilla Code
  if (gorillaState === 0) {
    image(gorillaIdle[idleIndex], gorillaX, 200);
    if (frameCount % 5 === 0) {
      idleIndex += 1;
      if (idleIndex > 5) {
        idleIndex = 0;
      }
    }
  }
  else if (gorillaState === 1) {
    image(gorillaSwipe[swipeIndex], gorillaX, 200);
    if (frameCount % 5 === 0) {
      swipeIndex += 1;
      if (swipeIndex > 5){
        swipeIndex = 0;
      }
    }
  }

  //Spiral Code
  // for(let s of spirals){ //not east to delete
  //   s.display();
  // }

  for( let i = 0; i < spirals.length; i++){
    let s = spirals[i];
    s.display();

    if(s.active === false){
      spirals.splice(i,1);
      i--;
    }
  }

}

function mousePressed(){
  spirals.push(new Spiral(mouseX, mouseY));

}

function keyPressed(){
  if(keyCode === 37){ //Left Arrow
    gorillaX -= 5;
  }
  if(keyCode === 39){
    gorillaX += 5;
  }
}


class Spiral{ //frames 0-15
  constructor(x,y){
    this.pos = createVector(x,y);
    this.frame = 0;
    this.active = true;
  }

  /// class methods
  display(){
    if(this.frame > 15){
      this.active = false;
    }
    else{
      image(spiralImages[this.frame], this.pos.x, this.pos.y);
      if(frameCount % 3  === 0){
        this.frame++;
      }
    }
  }
}