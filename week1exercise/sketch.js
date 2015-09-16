// global variables

// set up function
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  
  // background(255);
  
  fill(255, mouseY);
  ellipse(mouseX, mouseY, 50, 40);
  line(0,0, mouseX, mouseY);
  rect(mouseX, mouseY, 200, 200);
  
}