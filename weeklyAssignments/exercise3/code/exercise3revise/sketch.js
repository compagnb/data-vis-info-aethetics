// exercise 3 redo
// barbara compagnoni

// importing data vars
var table;
var nums = [];
var goals = [];
var hexColor = [];
var targets = [];
var loaded = false;

var counter = 0;

// min and max values for the size
var minVal = 100; // make higher for worse case senerio
var maxVal = 0; // make lower for worse case and gets bumped up higher


fontArray = [100, 100, 100, 300, 300, 300, 400, 400, 400, 500, 500, 500, 700, 700,700, 900, 900, 900];
var radius = 0;

var circleTxtArray = [];
var buttonArray = [];
var targetArray = [];
var arclength = 0;
var titleImg;

// preload data
function preload(){
  // load data info from undpGoals.txt
  table = loadTable("data/undpGoals.txt", "tsv", "header");
  titleImg = loadImage("images/title.jpg");
}


function setup() {
  createCanvas(windowWidth, 142);
  background(255);
  // noCanvas();
  createHeader();
  
  // process all the data into arrays
  processData();
  createArray();
}

function draw() {
  
  for (var h = 0; h < buttonArray.length; h++){
    buttonArray[h].display();
    buttonArray[h].update();
    // targetArray[h].display();
  }
  for (var i = 0; i < circleTxtArray.length; i++){
    // circleTxtArray[i].display();
  }
  
  // noLoop();
}

// process data function
function processData() {
  //  count the rows
  print(table.getRowCount() + " total rows in table");
  //  count the columns
  print(table.getColumnCount() + " total columns in table");
  //  print contents of column named Country Name
  goals = table.getColumn("Goal");
  hexColor = table.getColumn("hexColor");
  targets = table.getColumn("Targets");
  nums = table.getColumn("Number");

  // while parsing, give me the max and min values
  mapHighLow();
  loaded = true;
}

// function to give max and min values
function mapHighLow(){
  for (var i = 0; i < goals.length; i++) {
    val = goals[i].length;

    if(minVal > val){
      minVal = val;
    } else if(maxVal < val){
      maxVal = val;
    }
  }
  console.log("min val: " + minVal + " ||  max val: " + maxVal );
}

function createHeader(){
  fill(191, 222, 235);
  noStroke();
  rect( 0, 142, width, height - 142);
  image(titleImg, 0, 0);
}

function createArray(){
    // if loaded create objects
  if(loaded){
    var row = 0;
    for(var k = 0; k < goals.length; k++){
      if ( k <= 3){
        row = 1;
      }else if( k >= 4 && k < 8){
        row = 2;
      }else if( k >= 8 && k < 12){
        row = 3;
      }else if( k >= 12 && k < 16){
        row = 4;
      }else{
        row = 5;
      }
      radius = map(goals[k].length, minVal, maxVal, 50, 115);
      buttonArray.push(new Button(goals[k], 50 + k%4 * 100, 75 + row * 100, k));
      circleTxtArray.push(new CircleTxt(goals[k], windowWidth*.65, 300, radius, hexColor[k], nums[k]));
      targetArray.push(new Blurb(targets[k], k));
      // counter++;
      // console.log(k);
    }
  }
}


function Button(id, posX, posY, addClass){
  // this.fileName = fileName;
  this.id = id;
  this.posX = posX;
  this.posY = posY;
  this.addClass = addClass;
  this.imgNum = addClass + 1;
}

Button.prototype.display = function(){
  var div = createDiv('');
  div.position(this.posX , this.posY);
  div.id("button"+ this.addClass);
  // div.onmouseover(bigImg('.circleTxt'+ this.addClass,'.targetTxt'+ this.addClass));
  // div.style('background-color', '#' + hexColor[this.addClass]);
  div.style('background-image', 'url(images/' + this.imgNum + '.png)');
}
Button.prototype.update = function(){
  if(dist(this.posX+50, this.posY+50,mouseX, mouseY) <= 50){
    targetArray[this.addClass].display();
    circleTxtArray[this.addClass].display();
  }else{
    var allCTxt = selectAll(".circleTxt" + this.addClass);
    var allTTxt = selectAll(".targetTxt" + this.addClass);
      // console.log(addClass);
      for (var k = 0; k < allCTxt.length; k++){
        allCTxt[k].style('visibility', 'hidden');
      }
      for (var j = 0; j < allTTxt.length; j++){
        allCTxt[j].style('visibility', 'hidden');
      }
        
  }
}

// class circle text
function CircleTxt(string, posX, posY, radius, hexCol, addClass) {
  this.string = string;
  this.posX = posX;
  this.posY = posY;
  this.radius = radius;
  this.hexCol = hexCol;
  this.addClass = addClass-1;

}

CircleTxt.prototype.display = function() {
  var parentDiv = createDiv('');
  parentDiv.id('parent' + this.addClass);
  var arclength = 0;
  for (var i = 0; i < this.string.length; i++) {

    // get the letter
    var currentChar = this.string.charAt(i);

    // convert space into html
    if (currentChar === ' ') {
        currentChar = '&nbsp;';
    }

    // creates a div for each letter
    var div = createDiv(currentChar);
    
    // define type face and size before calculating width
    div.style('font-size', this.string.length);
    div.style('font-family', 'Roboto');
    div.style('font-weight', '600');
    div.style('text-transform', 'uppercase');
    div.style('color', '#' + this.hexCol);
    
    // dummy position to estimate width
    div.position(0, 0);
    var w = div.elt.offsetWidth;

    // Each box is centered so we move half the width
    arclength += this.radius/(this.string.length*.33);
    // arclength += w

    // Get the angle
    var theta = PI + arclength / radius;
    div.position(this.posX + this.radius * cos(theta), this.posY + this.radius * sin(theta));
    
    // add class for styling
    div.addClass("circleTxt" + this.addClass);
    // console.log(this.hexColor);
    // div.style('opacity','0.6');

    div.elt.style.height = this.string.length +"px";
    

    // CSS transform, convert angle to degrees
    var angle = 90 + floor(degrees(theta));
    div.style('transform', 'rotate(' + angle + 'deg)');

    // Move halfway again
    arclength += w / 2;
    div.parent(parentDiv);
  }
  // console.log(this.addClass);
}

function Blurb(target, addClass){
  this.target = target;
  this.addClass = addClass;
  var div;
}

Blurb.prototype.display = function(){
  div = createDiv(this.target);
  div.class('targetTxt' + this.addClass);
  div.class(this.addClass);
  div.position(windowWidth*.45, 500);
  div.style('color', '#' + hexColor[this.addClass]);
}


function styleCLASS(addClass, anotherClass){
    var allOnes = selectAll("." + addClass + " " + anotherClass);
    // console.log(addClass);
    for (var k = 0; k < allOnes.length; k++){
    
        allOnes[k].style('color', '#' + hexColor[addClass]);
        // allOnes[k].style('text-transform', 'uppercase');
        allOnes[k].style('font-family', 'Roboto');
        allOnes[k].style('font-weight', '300');
        allOnes[k].style('font-size', 10 + 'pt');
        allOnes[k].style('width', '40%');
        allOnes[k].style('display', 'none');
    }
}


        
  
