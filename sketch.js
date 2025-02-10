let webcam;
let serial;
let connectBtn;
let pxColour;

function setup() {
  createCanvas(windowWidth, windowHeight);

 serial = createSerial();
  
  connectBtn = createButton('connect to Arduino');
  connectBtn.position(20,700);
  connectBtn.mousePressed(connectBtnClick);


  webcam = createCapture(VIDEO);
  webcam.size(width, height);
  webcam.hide(); //stops from appearing twice 

  pxColour = color(0);
}


function draw() {
  background(255);

  let val = serial.readUntil("\n");

  if (val.length > 0) {
    pxColour = color(255,0,0);
  }

  connectBtn.html(serial.opened() ? 'Disconnect' : 'Connect to Arduino');

  let gridSize = 30;

  webcam.loadPixels();
  for (let y=0; y<webcam.height; y+= gridSize) {
    for (let x=0; x<webcam.width; x+= gridSize) {

      let index = (y * webcam.width + x) * 4; //index in pixels array
      let r = webcam.pixels[index]; 
      let dia = map(r, 0, 255, gridSize, 2);

      fill(pxColour);
      noStroke();
      circle(x, y, dia);
    }
  }
}


function connectBtnClick() {
  if (!serial.opened()) {
    console.log("Opening serial connection...");

    serial.open('Arduino', 9600); 
  } else {
    console.log("Closing serial connection...");
    serial.close();
  }

}