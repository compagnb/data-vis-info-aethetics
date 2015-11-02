var count = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(200);
  textAlign(CENTER, CENTER);
  
}

function draw() {
  if (mouseIsPressed){
    background(128);
  }else{
    background(255);
  }
  
  
  
  text(count, width/2, height/2);
  
}

function mousePressed(){
  count++;
  if (count % 5 == 0){
    fill(128, 128, 0);
  }else {
    fill(0,0,128);
  }
}