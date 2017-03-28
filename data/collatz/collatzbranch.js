function CollatzBranch(num, col, r){
    this.start = num;
    this.color = col || color(255);
    this.r = r || 5;
    this.collatz = [];
    this.x = 150 + this.r;
    this.y = height - 100;
    this.angle = 4*PI/4;
}

CollatzBranch.prototype.show = function(){
    //fill(this.color);
    noFill();
    stroke(this.color);
    strokeWeight(this.r);
    let even;
    beginShape();
    for(let i = this.collatz.length - 1; i >= 0; i--) {
        even = (this.collatz[i] % 2 == 0)? true : false;
        if(even) this.angle += -PI/10;
        else this.angle += PI/6;
        // ellipse(this.x, this.y, 2 * this.r, 2 * this.r);
        vertex(this.x, this.y);
        this.x +=  4 * cos(this.angle);
        this.y += -1 -3 * sin(this.angle);      
    } 
    endShape();
}

CollatzBranch.prototype.compute = function(){
    let current = this.start;
    this.collatz.push(this.start);
    let even;
    while (current != 1){
        even = (current % 2 == 0)? true : false;
        if(even) current /= 2;
        else current = 3 * current + 1;
        this.collatz.push(current);
    }
}


