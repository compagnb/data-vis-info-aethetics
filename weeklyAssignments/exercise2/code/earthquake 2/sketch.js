// store the data in a global variable
var table;
var minVal = 100000; // make higher for worse case seneerio
var maxVal = 0; // make lower for worse case and gets bumped up higher

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(200);
  noLoop();
  textSize(10);
  stroke(200);
  noFill();
  // load the "tsv" formatted data from the undp source. 
  // the data structure is "tsv" and we have a "header" in the file
  // table = loadTable("data/all_day.txt", "tsv", "header", showData);
  table = loadTable("http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.csv",
                     "csv", "header", showData);
}

// call back function when table is loaded
function showData() {
  
  // graph -----------------------------------
  // lat and long ----------------------------
  beginShape();
    noStroke();
    fill(100);
    textSize(10);
    text("latitude", 50, windowHeight - 30);
    text("longitude", windowWidth - 60, 50);
    noFill();
    stroke(100);
    strokeWeight(4);
    vertex(windowWidth - 70, 50);
    vertex(windowWidth - 70, windowHeight - 50);
    vertex(50, windowHeight - 50);
  endShape();
  
  // equator ---------------------------------
  beginShape();
    noStroke();
    fill(100);
    textSize(10);
    text("equator", 50, (windowHeight-70)/2);
    strokeWeight(1);
    stroke(150);
    vertex(50, (windowHeight-60)/2);
    vertex(windowWidth-70, (windowHeight-60)/2);
  endShape(); 
    
 
  

  
  // data key ----------------------------
  fill(230);
  rect(50, 50, 250, 150);
  textSize(20);
  fill(100);
  text("Weekly Earthquake Feed", 65, 75);
  textSize(10);
  strokeWeight(1);
  stroke(255, 180, 0, 80);
  fill(255, 180, 0, 80);
  text("6am - 12pm", 85, 105);
  stroke(255, 110, 0, 80);
  fill(255, 110, 0, 80);
  text("1pm - 6pm", 85, 125);
  stroke(200, 0, 200, 80);
  fill(200, 0, 200, 80);
  text("6pm - 10pm", 85, 145);
  stroke(0, 0, 120, 80);
  fill(0, 0, 120, 80);
  text("10pm - 5am", 85, 165);
  noStroke();
  fill(200);
  ellipse(220, 130, 60, 60);
  text("gap", 240, 160);
  fill(255);
  text("magnitude", 197, 130);


  // count the rows in our table
  var count = table.getRowCount();

  // parse the data returned by loadStrings()
  var rowHeight = 30;

  //get min and max
  for (var row = 1; row < count; row++) {
    for (var col = 1; col < 2; col++) {
      var val = table.getString(row, col);
      val = float(val);

      if (minVal > val) {
        minVal = val;
      } else if (maxVal < val) {
        maxVal = val;
      }
    }
  }
  
  //   //get min and max
  // for (var row = 1; row < count; row++) {
  //   for (var col = 1; col < 2; col++) {
  //     var val = table.getString(row, col);
  //     val = float(val);

  //     if (minVal > val) {
  //       minVal = val;
  //     } else if (maxVal < val) {
  //       maxVal = val;
  //     }
  //   }
  // }
  console.log("minimum: " + minVal + " | maximum: " + maxVal);

  //loop through all the rows
  for (row = 0; row < count; row++) {
    // loop through all the columns
    for (col = 1; col < 6; col++) {
    noStroke();
    fill(200, 0, 200, col*7);
      //make a number out of the string val
      var date = new Date(table.getString(row, 0));
      var hr = date.getHours();
      
      // Date.prototype.getHours(today);
      var latitude = table.getString(row, 1);
      var longitude = table.getString(row, 2);
      var magnitude = table.getString(row, 4);
      var gap = table.getString(row, 7);
      
      // console.log(today);
      
      
      if (gap){
        
        if (hr >= 6 && hr <= 12){
          fill(255, 180, 0, 20);
        }else if(hr >=13 && hr <= 18){
          fill(255, 110, 0, 20);
        }else if(hr >= 18 && hr <=21 ){
          fill(200, 0, 200, 20);
        }else{
          fill(0, 0, 120, 20);
        }
        
        
      // ellipseMode(CENTER);
      
      // stroke(gap, 0, gap);
      // noFill();
      // ellipse(map(latitude, minVal, maxVal, 50, windowWidth-60), map(longitude, minVal, maxVal, 70-windowHeight, 50), gap/2, gap/2);
      noStroke();
      // fill(random(100,255), random(0,50), random(0,150), 25);
      ellipse(map(latitude, minVal, maxVal, 50, windowWidth-60), map(longitude, minVal, maxVal, 70-windowHeight, 50), gap/2, gap/2);
      
      textSize(10);
      fill(230);
      text(magnitude, map(latitude, minVal, maxVal, 50, windowWidth-60), map(longitude, minVal, maxVal, 70-windowHeight, 50)); 
     
      // ellipse(map(latitude, minVal, maxVal, 50, windowWidth-60), map(longitude, minVal, maxVal, 70-windowHeight, 50), map(magnitude, -0.03,8, 5, 50 ), map(magnitude, -0.03,8, 5, 50 ));
    }
      
    }
  }
}


