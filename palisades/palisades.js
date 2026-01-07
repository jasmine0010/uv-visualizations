


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


// scaling factor
const s = .8;


function setup() {
        
    let xref = 1200;
    let yref = 750;

    createCanvas(xref*s, yref*s);
    img.resize(width, height);
    
    circles = [];

    circles.push(new Marker(745*s, 300*s, 'audio/EloiseG.mp3')) //Eloise G
    circles.push(new Marker(500*s, 480*s, 'audio/AddieS.mp3'))//Addison S
    circles.push(new Marker(220*s, 270*s, 'audio/EllieL.mp3')) // Ellie L
    circles.push(new Marker(140*s, 300*s, 'audio/CaraH.mp3')) // Cara H
    circles.push(new Marker(575*s, 360*s, 'audio/ChloeS.mp3')) // chloe S
    circles.push(new Marker(1000*s, 700*s, 'audio/EleanorS.mp3'))// eleanor S (altadena)
    circles.push(new Marker(420*s, 490*s, 'audio/EvieT.mp3'))
    circles.push(new Marker(440*s, 290*s, 'audio/TessaHS.mp3'))
    circles.push(new Marker(260*s, 320*s, 'audio/AlexN.mp3')) // 90
}



function draw() {
    background(0);
    
       
    image(img, 0, 0);


    fill(200);
    rect(900*s, 570*s, 300, 200);

    
    fill(0);
    textSize(25);
    text('Altadena', 950*s, 630*s);
   
    fill(0, 0, 255);
    textSize(22);
    text('Eloise', 715*s, 275*s);
    
    fill(0, 0, 255);
    textSize(22);
    text('Addie', 472*s, 455*s);
    
    fill(0, 0, 255);
    textSize(22);
    text('Ellie', 197*s, 245*s);
   
    fill(0, 0, 255);
    textSize(22);
    text('Cara', 115*s, 275*s);
    
    fill(0, 0, 255);
    textSize(22);
    text('Chloe', 545*s, 335*s);
    
    fill(0, 0, 255);
    textSize(22);
    text('Eleanor', 960*s, 675*s);
    
    fill(0, 0, 255);
    textSize(22);
    text('Evie', 397*s, 465*s);
    
    fill(0, 0, 255);
    textSize(22);
    text('Tessa', 410*s, 265*s);
    
    fill(0, 0, 255);
    textSize(22);
    text('Alex', 240*s, 295*s);
   

   
    
  
    
    for(let c of circles)
        {
            c.display();
        }
}



function mouseClicked()
{
    if (audio)
        {
        audio.stop();
        audio.hideControls();
        audio.remove();
        audio = null
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





