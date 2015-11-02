// barbara compagnoni
// data vis and info aethetics
// fall 2015
//
// maping time
// binary clock

// global vars
var d, h, m, mo, s, y, ss, st, ms, mt, hs, ht, mos, mot, ds, dt, yts, yth, ys, yt;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 200, 200);

}

function draw() {
  // refresh background
  background(0, 200, 200);

  // update the clock in real time
  updateTime();

  // // print for testing purposes
  // text("y: " + y + " " + "yts: " + yts + " " + "yth: " + yth, 10, 30);

  // for loop to iterate through and create boxes
  // iterating from 3 down because 
  for (var i = 3; i >= 0; i--) {

    // first col for hours
    drawBox(88, 298, i, 0);
    if (ht >= pow(2, i)) {
      ht -= pow(2, i);
    } else {
      fill(200, 0, 200);
      rect(90, 300 - (i * 70), 60, 60);
    }

    // second col for hours
    drawBox(158, 298, i, 1);
    if (hs >= pow(2, i)) {
      hs -= pow(2, i);
    } else {
      fill(200, 0, 200);
      rect(160, 300 - (i * 70), 60, 60);
    }
    
    // first col for minutes
    drawBox(228, 298, i, 2);
      if (mt >= pow(2,i)){
        mt -= pow(2,i);
      }else{
        fill(150, 0, 200);
        rect(230,300-(i*70),60,60);
      }

    // second col for minutes
    drawBox(298, 298, i, 3);
      if (ms >= pow(2,i)){
        ms -= pow(2,i);
      }else{
        fill(150, 0, 200);
        rect(300,300-(i*70),60,60);
      }
    
    // first col for seconds
    drawBox(368, 298, i, 4);
    if (st >= pow(2,i)){
        st -= pow(2,i);
    }else{
      fill(100, 0, 200);
      rect(370,300-(i*70),60,60);
    }
    
    // second col for seconds
    drawBox(438, 298, i, 5);
    if (ss >= pow(2,i)){
        ss -= pow(2,i);
    }else{
      fill(100, 0, 200);
      rect(440,300-(i*70),60,60);
    }
    
    // col for months
    drawBox(508, 298, i, 6);
    if (mot >= pow(2,i)){
        mot -= pow(2,i);
    }else{
      fill(50, 50, 200);
      rect(510,300-(i*70),60,60);
    }
    
    // col for months
    drawBox(578, 298, i, 7);
    if (mos >= pow(2,i)){
        mos -= pow(2,i);
    }else{
      fill(50, 50, 200);
      rect(580,300-(i*70),60,60);
    }
    
    // col for days
    drawBox(648, 298, i, 8);
    if (dt >= pow(2,i)){
        dt -= pow(2,i);
    }else{
      fill(0, 100, 100);
      rect(650,300-(i*70),60,60);
    }
    
    // col for days
    drawBox(718, 298, i, 9);
    if (ds >= pow(2,i)){
        ds -= pow(2,i);
    }else{
      fill(0, 100, 100);
      rect(720,300-(i*70),60,60);
    }
    
    // col for years
    drawBox(788, 298, i, 6);
    if (yt >= pow(2,i)){
        yt -= pow(2,i);
    }else{
      fill(0, 200, 100);
      rect(790,300-(i*70),60,60);
    }
    
    // col for years
    drawBox(858, 298, i, 7);
    if (ys >= pow(2,i)){
        ys -= pow(2,i);
    }else{
      fill(0, 200, 100);
      rect(860,300-(i*70),60,60);
    }
  }
}

// pull an updated time from computer clock
function updateTime() {
  d = day();
  h = hour();
  m = minute();
  mo = month();
  s = second();
  y = year();

  // time calculations for binary conversion
  st = (s - ss) / 10; // how many 10 seconds i.e. 10, 20, 30...
  ss = s % 10; // the first digit in seconds

  mt = (m - ms) / 10; //how many 10 mins i.e. 10, 20, 30...
  ms = m % 10; // the first digit in mins

  ht = (h - hs) / 10; // how many 10 hours ie. 10, 20
  hs = h % 10; // the first digit in hrs
  
  mot = (mo - mos) / 10; // how many ten days
  mos = mo % 10; // first digits in days
  
  dt = (d - ds) / 10; // how many 10 days 
  ds = d % 10; // the first digit in days
  
  yts = y % 1000;
  yt = (yts - ys)/10;
  ys = yts % 10;


}

// function to draw a box frame at given coordinates feeding i through
function drawBox(xStart, yStart, bit) {
  strokeWeight(2);
  noFill();
  stroke(200, 0, 200);
  rect(xStart, yStart - (bit * 70), 64, 64);
  noStroke();
  fill(200, 0, 200);
}