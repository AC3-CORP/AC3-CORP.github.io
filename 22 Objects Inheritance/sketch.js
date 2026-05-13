// 22 Objects, Inheritance
// Ayeman Islam
// May 13/26
//
// Also - splitting our project
// across several files

let objects = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for( let i = 0; i< 200; i++){
    objects.push(new AnimatedObject(random(width), random(height)));
    objects.push(new CircelObject(random(width), random(height)));
    objects.push(new LineObject());
  }
}

function draw() {
  background(250);
  for(let o of objects){
    o.move();
    o.display();
  }

}

