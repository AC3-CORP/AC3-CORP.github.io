// Assignment 2 - Rocky Terrain Generation
// Ayeman Islam
// March 3/26
//
// 

//Global Variable
let rectWidth = 5;




function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke()
}

function rockyTerrain() {
  for( let x = 0; x < width; x += rectWidth){
    let rectHeight = random(0, height*0.75);

    fill("black");
    rect(x, random(1000,770), rectWidth, windowHeight);
  }
}


function draw() {
  background(220);
  rockyTerrain();
}
