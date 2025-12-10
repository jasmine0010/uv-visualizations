


let x = 0;
let img;
let audio;

function preload()
{
    img = loadImage('Los-Angeles-Neighborhood-Map.jpg');
    
}


function setup() {
    createCanvas(1000, 600);

    img.resize(width, height);
    
    audio = createAudio('soundEffect.mp3');
    audio.showControls();
    
}

function draw() {
    background(0);
    
       
    image(img, 0, 0);
    
    fill(255);
    textSize(30);
    text('hi annie', width/2, height/2);

    ellipse(x, 200, 100, 50);
    x++;
    
    //ellipse(200, 200, 50, 50);
}




