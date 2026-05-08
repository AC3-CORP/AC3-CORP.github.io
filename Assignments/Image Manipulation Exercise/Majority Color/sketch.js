// Majority Color
// Ayeman Islam
// April 24/26
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let myImage;

function preload() {
  // called BEFORE setup. Won't conlcude 
  // until all loads are complete.
  myImage = loadImage("assets/Megatron-2.jpeg");
}


function setup() {
  createCanvas(myImage.width, myImage.height);
  pixelDensity(1);
  noLoop();
}

function draw() {
  background(220);
  image(myImage, 0, 0);
  // access and modify the pixels on the canvas
  loadPixels(); // dumps data from canvas into array
  //majorColor();
  //removeGreen();
  colorPosterize();
}

function setPixel(x, y, r, g, b) {
  // x,y → pixel location
  // r,g,b → color values
  let index = 4 * (y * width + x);
  setPixelOneD(index, r, g, b);
}

function getAvg(x, y) {
  //return avergage intensity of rgb
  // at (x,y).
  let index = 4 * (y * width + x);
  let r = pixels[index];
  let g = pixels[index + 1];
  let b = pixels[index + 2];

  return (r + g + b) / 3;
}

function setPixelOneD(pos, r, g, b) {
  // pos → 1D location of the pixel'red component
  // r,g,b → new color values (0-255) fpr the pixels
  pixels[pos] = r;
  pixels[pos + 1] = g;
  pixels[pos + 2] = b;
  pixels[pos + 3] = 255;

}

function majorColor() {
  // This function replaces the current RGB value with
  // the great value found out of the three
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {

      let index = 4 * (y * width + x); // converts the current (x,y) pixel position
      // into the correct index value in the pixels array

      let r = pixels[index];
      let g = pixels[index + 1];
      let b = pixels[index + 2];

      if (r >= g && r >= b) setPixel(x, y, 255, 0, 0); //Condition if red wins
      else if (g >= b) setPixel(x, y, 0, 255, 0); // Condition if green wins
      else setPixel(x, y, 0, 0, 255); // Anything would turn to blue other than 
    }                                // the given conditions above
  }
  updatePixels();
}

function removeGreen() {
  // This function allows to remove the Green Color value 
  // from half of the image vertically
  for (let x = width / 2; x < width; x++) {
    for (let y = 0; y < height; y++) {

      let index = 4 * (y * width + x); // converts the current (x,y) pixel position
      // into the correct index value in the pixels array 

      let r = pixels[index];
      let g = pixels[index + 1];
      let b = pixels[index + 2];

      setPixel(x, y, r, 0, b); // removes the green value and keeping other values
    }
  }
  updatePixels();
}

function colorPosterize() {
  // This function will be looking at each pixel
  // allowing to overwrite that pixel with the five possible set of colors
  //
  // Avg Value      Color Changes to
  // 205 - 255   =	  170, 230, 220
  // 155 - 204   =    105,150,210
  // 105 - 154   =    120,180,60
  //  55 - 104   =    130,30,130
  //  0 - 54	   =    90,10,50

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {

      let avg = getAvg(x, y);
      if (avg >= 205) setPixel(x, y, 170, 230, 220);
      else if (avg >= 155) setPixel(x, y, 105, 150, 210);
      else if (avg >= 105) setPixel(x, y, 120, 180, 60);
      else if (avg >= 55) setPixel(x, y, 130, 30, 130);
      else setPixel(x, y, 90, 10, 50);
    }
  }
  updatePixels();
}

function mirror() {

}

