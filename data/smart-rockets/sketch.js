// Code based on:
// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/bGz7mv2vD6g

var population;
var lifespan = 400;
var lifeP;
var cnt = 0;
var target;
var maxforce = 0.2;

var rx = 100;
var ry = 150;
var rw = 200;
var rh = 10;

function setup() {
  createCanvas(400, 300);
  rocket = new Rocket();
  population = new Population(25);
  target = createVector(width / 2, 50);

}

function draw() {
  background(0);
  population.run();

  cnt++;
  if (cnt == lifespan || population.alive <= 0) {
    population.evaluate();
    population.selection();
    //population = new Population();
    cnt = 0;
  }

  fill(255);
  rect(rx, ry, rw, rh);

  ellipse(target.x, target.y, 16, 16);
}
