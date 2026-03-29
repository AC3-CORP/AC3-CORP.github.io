// 13 Objects Books
// Ayeman Islam
// March 24/26
// 

// Global Variables
let myBook; // Cant INIT OBJECTS HERE

function setup() {
  createCanvas(windowWidth, windowHeight);
  myBook = new Book("CS30 Text", "Mr. Scott", 
    124567891011, "leatherbound", 500, width * 0.3);
}

function draw() {
  background(220);
  myBook.display();
}

class Book{
  //1. Contructor
  constructor(title, author, isbn, cover, pages, x){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.cover = cover;
    this.pages = pages;
    this.x = x;

  }

  //2. CLass Methods
  // Since  we're in a class, we omit
  //function keyword
  display(){
  rectMode(CENTER); textAlign(CENTER, CENTER); textSize(20);

  // set fill color based on covertype
  switch( this.cover){
    case "softcover":
      fill(250,200,150); break;
    case "hardcover":
      fill(120, 255, 255); break;
    case "leatherbound":
      fill(150,100,100,15); break;
  }
  
  //now draw the book
  push();
  translate(this.x, height/2);
  rect(this.x, height/2, this. pages/10, 150);
  fill(255);
  text(this.title[0], 0, -50);
  pop();

  }
}
