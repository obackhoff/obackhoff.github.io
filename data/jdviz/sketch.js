let song, fft, spectrum, divs, offsets, scaleCenter, hillsWidth, radio;
let songActive = true;
let micActive = false;
let mic = null;

function playPause(){
  if(song.isPlaying()) song.pause();
  else song.play();
}
function stop(){
  song.stop();
}

function preload(){
  song = loadSound('song.mp3');
}

function setup() {
  createCanvas(600, 600).parent('#canvas');
  //mic = new p5.AudioIn();
  //mic.start();
  fft = new p5.FFT(0.7);
  //fft.setInput(song);
  // song.play();
  divs = 52;
  offsets = [];
  for(let  i = 0; i < divs; i++) offsets.push(random(10));
  let buttonPlay = createButton('Play - Pause').parent('#button');
  buttonPlay.mouseClicked(playPause);
  let buttonStop = createButton('Stop').parent('#button');
  buttonStop.mouseClicked(stop);
  radio = createRadio().parent('#radio');
  radio.option('Song', 1);
  radio.option('Microphone', 2);
  scaleCenter = 2*width/5;
  hillsWidth = 90
}

function draw() {
  background(30);
  fill(30);
  stroke(255);
  strokeWeight(1.5);


  if(radio.value() == 1 && !songActive) {
    mic.stop();
    fft.setInput(song);
    songActive = true;
    micActive = false;
  }
  if(radio.value() == 2 && !micActive){
    if(!mic) mic = new p5.AudioIn();
    mic.start();
    fft.setInput(mic);
    songActive = false;
    micActive = true;
  }

  spectrum = fft.analyze();
  spectrum.splice(spectrum.length - 300, 299);
  let len = spectrum.length
  for (let i = 0; i < divs; i++) {
    beginShape();
    for(let k = 0; k < 6; k++){
      curveVertex(map(k,0,5, width/2 - scaleCenter, width/2 - hillsWidth/1.7 + - offsets[i]), i * (height - scaleCenter)/divs + scaleCenter/2);
    }
    for (let j = 0; j < floor(len/divs); j++) {
      let x = map(j, 0, len/divs, width/2 - hillsWidth/2, width/2 + hillsWidth/2);
      let y = map(spectrum[j + i * floor(len/divs)],
              0,
              //weird math to make it more like the album cover
              ((0.01 + offsets[i]/20) * (abs(width/2 - x) -20*sin(frameCount*offsets[i]/300) + hillsWidth/2 - 0.1*hillsWidth*offsets[i])**2 + 255) /map(i,0,9,1,1.2),
              i * (height - scaleCenter)/divs + scaleCenter/2,
              i * (height - scaleCenter)/divs + scaleCenter/2 - 0.3*scaleCenter/2
            );
      curveVertex(x, y);
    }
    for(let k = 0; k < 6; k++){
      curveVertex(map(k,0,5, width/2 + hillsWidth/2 + offsets[i], width/2 + scaleCenter), i * (height - scaleCenter)/divs + scaleCenter/2);
    }
    endShape();
  }
  noStroke();
  rect(0, 0, width/2 - width/4, height);
  rect(width/2 + width/4, 0, width/2 - width/4, height);
}
