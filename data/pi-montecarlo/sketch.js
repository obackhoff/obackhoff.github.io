let total, pointsIn, iters, run;

function setup() {
  createCanvas(700, 500);
  background(51);

  pointsIn = 0;
  total = 0;
  iters = 0;
  run = true;
}

function mousePressed(){
  run = !run;
}

function draw() {
  if(run){

    iters > 3000? iters = 3000 : iters++;
    for(let i=0; i < iters; i++ ){
      let x = random(width - 200);
      let y = random(height);
      stroke(255);
      if(dist(x,y, width/2 - 100, height/2) < height/2) {
        pointsIn++;
        stroke(255, 100, 100);
      }
      ellipse(x,y, 1,1);
      total++;
    }

    let pi = 4* pointsIn / total;

    noStroke();
    fill(51);
    rect(width - 200, 0, 200, height);
    textSize(20);
    fill(200,200,200);
    text("PI = ", width - 190, 40);
    text(pi.toFixed(10), width - 190, 60);
    text("Error = ", width - 190, 80);
    text((100 * abs(PI - pi)/PI).toFixed(10) + " %", width - 190, 100);
    text("Points in circle = ", width - 190, 140);
    text(pointsIn, width - 190, 160);
    text("Total points = ", width - 190, 200);
    text(total, width - 190, 220);
    text("PI = 4 * ( M / N )", width - 190, 260);
    text("M = Points in circle\nN = Total # of points", width - 190, 300);
    textSize(13);
    text("Click mouse to pause/resume", width - 190, 400);

    noFill();
    stroke(30, 250, 200);
    ellipse(width/2 - 100, height/2, height, height);
    rect(0,0, width - 200, height);
    background(51, 10);
  }
}
