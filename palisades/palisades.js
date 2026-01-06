


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

    img.resize(width, height);
    
   
    
    circles = [];

    circles.push(new Marker(995, 300, 'audio/EloiseG.mp3')) //Eloise G
    circles.push(new Marker(660, 480, 'audio/AddieS.mp3'))//Addison S
    circles.push(new Marker(290, 270, 'audio/EllieL.mp3')) // Ellie L
    circles.push(new Marker(190, 300, 'audio/CaraH.mp3')) // Cara H
    circles.push(new Marker(770, 360, 'audio/ChloeS.mp3')) // chloe S
    circles.push(new Marker(1100, 700, 'audio/EleanorS.mp3'))// eleanor S (altadena)
    circles.push(new Marker(550, 490, 'audio/EvieT.mp3'))
    circles.push(new Marker(590, 290, 'audio/TessaHS.mp3'))
    circles.push(new Marker(350, 320, 'audio/AlexN.mp3'))
}



function draw() {
    background(0);
    
       
    image(img, 0, 0);
    
    text('Altadena', 1050, 650);
    textSize(25);
   

   
    
  
    
    for(let c of circles)
        {
            c.display();
        }
}



function mouseClicked()
{
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
            ellipse(this.x, this.y, 20, 20)
        }
    }





