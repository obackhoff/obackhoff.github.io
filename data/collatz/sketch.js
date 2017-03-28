let branches, cnt;

function setup() {
    createCanvas(900,900);
    background(51);
    branches = [];
    cnt = 0;
    for(let i = 1; i <= 10000; i++){
        let branch = new CollatzBranch(i, color(0, i % 150 + 105, i % 150 + 105), 7);
        branches.push(branch);
    }
    // branches.forEach((b)=>{
    //     b.compute();
    //     b.show();
    // });
}

function draw() {
   if(cnt < branches.length) {
       branches[cnt].compute();
       branches[cnt].show();
       cnt++;
   } 
}
