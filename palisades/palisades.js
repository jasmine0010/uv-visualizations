


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
    createCanvas(1200, 750);
   
    img.resize(900, height);
    //img.resize(900, 750);
    
   
    
    circles = [];

    circles.push(new Marker(745, 300, 'audio/EloiseG.mp3')) //Eloise G
    circles.push(new Marker(500, 480, 'audio/AddieS.mp3'))//Addison S
    circles.push(new Marker(220, 270, 'audio/EllieL.mp3')) // Ellie L
    circles.push(new Marker(140, 300, 'audio/CaraH.mp3')) // Cara H
    circles.push(new Marker(575, 360, 'audio/ChloeS.mp3')) // chloe S
    circles.push(new Marker(800, 700, 'audio/EleanorS.mp3'))// eleanor S (altadena)
    circles.push(new Marker(420, 490, 'audio/EvieT.mp3'))
    circles.push(new Marker(440, 290, 'audio/TessaHS.mp3'))
    circles.push(new Marker(260, 320, 'audio/AlexN.mp3')) // 90
}



function draw() {
    background(0);
    
       
    image(img, 0, 0);
    
    fill(0);
    textSize(25);
    text('Altadena', 750, 630);
   
    fill(0, 0, 255);
    textSize(22);
    text('Eloise', 715, 275);
    
    fill(0, 0, 255);
    textSize(22);
    text('Addie', 472, 455);
    
    fill(0, 0, 255);
    textSize(22);
    text('Ellie', 197, 245);
   
    fill(0, 0, 255);
    textSize(22);
    text('Cara', 115, 275);
    
    fill(0, 0, 255);
    textSize(22);
    text('Chloe', 545, 335);
    
    fill(0, 0, 255);
    textSize(22);
    text('Eleanor', 760, 675);
    
    fill(0, 0, 255);
    textSize(22);
    text('Evie', 397, 465);
    
    fill(0, 0, 255);
    textSize(22);
    text('Tessa', 410, 265);
    
    fill(0, 0, 255);
    textSize(22);
    text('Alex', 240, 295);
   

   
    
  
    
    for(let c of circles)
        {
            c.display();
        }
}



function mouseClicked()
{
    if (audio)
        {
        audio.hideControls();
        audio = null;
        audio.stop();
        }
    
    for(let c of circles)
        {
            if(dist(c.x, c.y, mouseX, mouseY) < 20)
                {
                    if(!audio)
                        {
                            audio = createAudio(c.filename);
                            audio.showControls();
                        }
                }
        }
  /*if(dist(995, 300, mouseX, mouseY) < 20)
  {
      if(!audio)
          {
            audio = createAudio('audio/EloiseG.mp3');
            audio.showControls();
          }
  }

  if(dist(660, 480, mouseX, mouseY) < 20)
      {
          if(!audio)
              {
                  audio = creatAudio('audio/AddisonS.mp3')
                  audio.showControls();
              }
      }
  if(dist(290, 270, mouseX, mouseY) < 20)
      {
          if(!audio)
              {
                  audio = createAudio('audio/EllieL.mp3')
                  audio.showControls();
              }
      }
      */
  
    

}







class Marker
    {
        constructor(x,y, filename)
        {
            this.x = x;
            this.y = y;
            this.filename = filename;
        }
        
        display()
        {   
            if(dist(this.x, this.y, mouseX, mouseY) < 20)
                {
                    fill(0, 255, 0);
                }
            else
                {
                    fill(255);
                }
            ellipse(this.x, this.y, 20, 20)
        }
    }





