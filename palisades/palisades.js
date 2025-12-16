


let x = 0;
let img;
//let image; 
let audio;
let circles;


function preload()
{
    img = loadImage('palisadesStreetMap.jpg');
    //image = loadImage('')
    
}


function setup() {
    createCanvas(1500, 750);

    img.resize(750, 750);
    
    audio = createAudio('soundEffect.mp3');
    
    circles = [];
    circles.push(new Marker(250, 250));
    
}

function draw() {
    background(0);
    
       
    image(img, 0, 0);
    
    fill(255);
    textSize(30);
    text('hi annie', width/2, height/2);

    ellipse(x, 200, 100, 50);
    x++;
    
    ellipse(200, 200, 50, 50);
    
    for(let c of circles)
        {
            c.display();
        }
}



function mouseClicked()
{
    if(mouseX<= 250 && mouseY >= 150)
        {
              audio.showControls();
        }
}







class Marker
    {
        constructor(x,y)
        {
            this.x = x;
            this.y = y;
        }
        
        display()
        {
            ellipse(this.x, this.y, 20, 20)
        }
    }





