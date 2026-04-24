// Majority Color
// Ayeman Islam
// April 24/26
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let myImage;

function preload(){
  // called BEFORE setip. Won't conlcude 
  // until all loads are complete.
  myImage = loadImage("assets/Megtron-D16.jpg");
  
}


function setup() {
  createCanvas(myImage.width, myImage.height);
  pixelDensity(1);
  //myVideo.hide();

}

function draw() {
  background(220);
  image(myImage, 0, 0);
  // access and modify the pixels on the canvas
  loadPixels(); // dumps data from canvas into array
  textImage();
  //boost();
  //greyscale();
  //updatePixels();
}

function textImage(){
  let scaleAmount = 5;
  fill("red");
  textSize(scaleAmount);
  for(let x = 0; x < width; x+= scaleAmount){
    for(let y = 0; y < height; y += scaleAmount){
      let avg = getAvg(x,y); //0-255
      if(avg > 210) text("X", x, y);
      else if(avg > 170) text("XX", x, y);
      else if(avg > 130) text("XXX", x, y);
      else if(avg > 90) text("XXXX", x, y);
      else if(avg > 35) text("XXXXX", x, y);
    }
  }
}

function greyscale() {
  // use the average intentsity of each pixel
  // to represent it as a shade of grey
  for(let x = 0; x< width; x++){
    for(let y = 0; y < height; y++){
      let avg = getAvg(x,y);
      setPixel(x,y, avg, avg, avg);

    }
  }
}

function setPixel(x,y,r,g,b){
  // x,y → pixel location
  // r,g,b → color values
  let index = 4*(y*width + x);
  setPixelOneD(index,r,g,b);
}

function boost(){
  // brightening filter
  let boostAmount = map(mouseX, 0, width, -100, 100);
  for(let i = 0; i < pixels.length; i+=4){
    let r = pixels[i] + boostAmount;
    let g = pixels[i+1] + boostAmount;
    let b = pixels[i+2] + boostAmount;
    setPixelOneD(i,r,g,b);
  }
}

function getAvg(x,y){
  //return avergage intensity of rgb
  // at (x,y).
  let index = 4*(y*width + x);
  let r = pixels[index];
  let g = pixels[index+1];
  let b = pixels[index+2];

  return (r + g + b) / 3;
}

function setPixelOneD(pos, r, g, b){
  // pos → 1D location of the piexl'red component
  // r,g,b → new color values (0-255) fpr the pixels
  pixels[pos] = r;
  pixels[pos+1] = g;
  pixels[pos+2] = b;
  
}

function majorColor(){
  let r = pixels[index];
  let g = pixels[index+1];
  let b = pixels[index+2];

  for(let x = 0; x < width; x++){
    for(let y = 0; y < height; y++){
      if(r === g === b) setPixel(x,y,255,0,0);
      if( r != g != b) setPixel(x, y, 0, 255, 0);
      if( r != g != b) setPixel(x, y, 0, 255, 0);
      setPixel(x, y, r, g, b);
    }
  }
}
