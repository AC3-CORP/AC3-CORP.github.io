// The 60 Minute Price Change challenge
// Ayeman Islam
// March 23/26
//

// GLOBAL VARIABLES
let items = [];
let provinces = new Map();
let currentProv = "SK";


function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 1; i <= 20; i++) {
    items.push(
      {
        x: Math.floor(Math.random(0, width - 60)),
        y: Math.floor(Math.random(0, height - 40)),
        speedY: Math.floor(Math.random(1, 13)),
        basePrice: Math.floor(Math.random(10, 100)),
        name: ("Item " + i)
      }
    )
  }

  provinces.set("SK", { tax: 1.11 });
  provinces.set("AB", { tax: 1.05 });
  provinces.set("ON", { tax: 1.13 });


}

function draw() {
  background(220);
  let rules = provinces.get(currentProv);
  for (let i in items) {
    items[i].y += items[i].speedY;
    if (items[i].y > height) items[i].y = 0;
    rect(items[i].x, items[i].y, 60, 40);
    text(items[i].name, items[i].x, items[i].y);
    items[i].basePrice * rules.tax;
  }
}
