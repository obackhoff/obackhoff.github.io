// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/BjoM9oKOAKY

function Particle() {
  this.pos = createVector(random(width), random(height));
  this.vel = p5.Vector.random2D();//createVector(0, 0);
  this.vel.setMag(random(1,4));
  this.acc = createVector(0, 0);
  this.maxspeed = 4;
  this.h = 0;
  this.connected = [];
  this.connection = 60 + random(-10,10);

  //this.prevPos = this.pos.copy();

  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.connected = [];
    var x = this.pos.x;
    var y = this.pos.y;
    var thisV = this.pos;
    var connected = this.connected;
    var conn = this.connection;
    var h = this.h;
    particles.forEach(function(p){
      var distance = dist(x,y,p.pos.x,p.pos.y);
     if (distance <= conn && !p.connected.includes(thisV)){
        connected.push(p.pos);
        strokeWeight(2);
        stroke(h,255,255, map(connected.length, 0, 10, 0, 255));
        line(x,y, p.pos.x, p.pos.y);
     }
    });
  }

  this.follow = function(vectors) {
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    var force = vectors[index];
    this.applyForce(force);
  }

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.show = function() {
    stroke(this.h, 255, 255, 200);
    // stroke(360, 5);
    this.h = this.h + 1;
    if (this.h > 255) {
      this.h = 0;
    }
    strokeWeight(5);
    point(this.pos.x, this.pos.y);
    //line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    //this.updatePrev();
  }

  this.updatePrev = function() {
    //this.prevPos.x = this.pos.x;
    //this.prevPos.y = this.pos.y;
  }

  this.edges = function() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }

  }

}
