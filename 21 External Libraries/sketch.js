// External Libraries
// Ayeman Islam
// May 8/26
//
// 

// Global Variables
let gui, b;

function setup() {
  createCanvas(300, 300);
  gui = createGui();
  b = createButton("myButton", 50, 50);
}

function draw() {
  background(220);
  drawGui();

  if(b.IsPressed){
  print(b.lable + "All Hail Megatron");
  }
}


