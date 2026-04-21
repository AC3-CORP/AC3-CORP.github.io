// 20 Maps and Files
// Ayeman Islam
// April 21/26
//
// 
let textFile;
let imgFile, rows, cols, colorMap;

function preload() {
  textFile = loadStrings("assets/info.txt");
  imgFile = loadStrings("assets/colorImage.txt");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //await loadAssets();
  noStroke();
  noLoop();

  // Determine the number of the rows and cols
  rows = imgFile.length;
  cols = imgFile[0].length;

  // Construct the Map of Colors
  colorMap = new Map([
    ["b", "black"],
    ["w", color(255)],
    ["r", "red"],
    ["l", "brown"],
    ["p", "purple"]
  ]);

}

function drawImage() {
  // Read through our text info and
  // contruct an image.
  let pixelSize = 57;
  for (let y = 0; y < rows; y++) {
    let currentRow = imgFile[y];
    for (let x = 0; x < cols; x++) {
      let currentKey = currentRow[x];
      fill(colorMap.get(currentKey));
      square(x*pixelSize, y*pixelSize, pixelSize);
  }
  }
}

function draw() {
  background(220);
  processText();
  drawImage();
}

function processText() {
  // look at 3 different ways to split up
  // larger strings into words, or characters
  // split() and ... spread syntax

  print("SPLIT INTO WORDS");
  let splitWords = textFile[0].split(" ");
  print(splitWords);

  print("SPLIT INTO CHARACTERS")
  let splitChars = textFile[1].split(" ");
  print(splitChars);

  print("SPREAD INTO CHARACTERS");
  let spreadChars = [...textFile[2]];
  print(spreadChars);

}

