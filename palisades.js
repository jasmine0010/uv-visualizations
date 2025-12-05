


let x = 0;

function setup() {
    createCanvas(1000, 600);
    
}

function draw() {
    fill(255);
    textSize(30);
    text('hi annie', width/2, height/2);

    ellipse(x, 200, 100, 50);
    x++;
}
