function setup() {
  // creat canvas the size of the browser window
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
}

function draw() {
  // erase everything
  background(255);
  // change the fill to white with variable transparency
  fill(255, mouseY);
  // draw ellipse at mouse position
  ellipse(mouseX, mouseY, 50, 50);
  // change the stroke for our line in term of transparency
  stroke(0, mouseY);
  // draw line
  line(0, 0, mouseX, mouseY);
  // changing the mapped fill color for the rectangle
  // map remaps a given range to a new one
  fill(0, 0, 255, map(mouseY, 0, height, 0, 255));
  // draw rectangle
  rect(mouseX, mouseY, 200, 200, 20); // make a rectangle that is "attached" to the mouse 200px wide and high
}