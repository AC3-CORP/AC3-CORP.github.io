// 08 Object Notation and Noise Recap
// Ayeman Islam
// March 2/26
//


// GLOBAL VARIABLES sections
let ball, ball2; // Objects can't created befrore setup

function setup() {
  createCanvas(windowWidth, windowHeight);
  ball = { // object notation. Inside the brackets
           // set up a bunch of property: value pairs
    x: 300, y: 400, size: 45,
    c: color(random(255), random(255), random(255)),
    timeX: random(100), timeY: random(100), timeOff: 0.005,
  }

  ball2 = { // object notation. Inside the brackets
    // set up a bunch of property: value pairs
  x: 200, y: 100, size: 45,
  c: color(255, random(255), 250),
  timeX: random(400), timeY: random(200), timeOff: 0.005,
}

}

function moveBall(b){
  // b → Ball type object
  // Update the positiuon and draw thee ball

  // Generate how to change x and y position (noise)
  let dx = noise(b.timeX); // 0-1
  dx = map(dx, 0, 1, -5, 5); // dx: -5 to 5

  let dy = noise(b.timeY); // dy: -5 to 5
  dy = map(dy, 0, 1, -5, 5);

  // Advance our noise graph "cursors"
  b.timeX += b.timeOff; b.timeY+= b.timeOff;

  // Upadte the position
  b.x += dx; b.y += dy;

  // Corrections (wrap around)
  if(b.x < 0) b.x = width;
  else if(b.x > width) b.x = 0;

  if(b.y < 0) b.y = height;
  else if(b.y > height) b.y = 0;

  // Render the circle
  fill(b.c);
  circle(b.x, b.y, b.size);

}

function draw() {
  //background(220);
  moveBall(ball);
  moveBall(ball2);
}
