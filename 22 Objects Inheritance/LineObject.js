// Child Class #2 - Line
class LineObject extends AnimatedObject{
    constructor(){
        super(random(width), random(height));
    }

    move(){ // combo overrider, but built on parent
        super.move(); // run parent's move()
        this.x -= 5;
        if(this.x < 0) this.x = width;
    }

    display(){
        if(mouseIsPressed){
            strokeWeight(12);
        }
        else strokeWeight(2);
        line(this.x, this.y, this.x + 15, this.y);
    }
}