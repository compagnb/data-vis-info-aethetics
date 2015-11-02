// LEAFLET.JS EARTHQUAKE VISUALIZATION
// USGS DATA - SOURCE UPDATED EVERY 5 MINUTES
// JavaScript library available at http://leafletjs.org/

var map; // global
var canvas; // p5 canvas
var quakes = []; // array of earthquakes 

// vars for earthquake readings
var lats = []; // array for latitudes
var longs = []; // array for longitudes
var gaps = []; // array for gaps
var hrs = []; // array for hrs
var mags = []; // array of magnitudes
var locations = []; // array of location names
var date = []; // array of dates
var countries = []; // array of country/state names

var magSlider; // UI for setting minimum magnitude
var magnitude; // div for storing min magnitude from slider 
var gapSlider; // UI for setting minimum magnitude
var gap; // div for storing min magnitude from slider 
var hrSlider; // UI for setting minimum magnitude
var hr; // div for storing min magnitude from slider 

var dataParsed = false;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight-65); // full window p5 canvas
  canvas.parent('map'); // make p5 and leaflet use the same canvas (and z-index)
  initLeaflet(); // load leaflet functions and creat map and defined view
  loadStrings("http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.csv", parseSource); // load source, parse when done

    // getDate();
    createTitle();
    createMagSlider();
    createGapSlider();
    createHrsSlider();
}

function draw() {
  // hide and show individual quakes by checking against slider threshold
  for (var i = 1; i < mags.length; i++) {
    
    if (mags[i] < magSlider.value() && gaps[i] > gapSlider.value() && hrs[i] > hrSlider.value()){
      quakes[i].setRadius(0);
    }else{
      quakes[i].setRadius(5);
    }
  }
  magnitude.html("Magnitude > " + magSlider.value() + " RS");
  gap.html("Gap < " + gapSlider.value() + " Degrees");
  hr.html("Hour < " + hrSlider.value());
}


function createHrsSlider(){
  // UI slider
  var curHr = hour()
  hrSlider = createSlider(0, 24, curHr);
  // hrSlider.position((width/3*2)-3, 50);
  hrSlider.addClass('sliders');
  hrSlider.parent('legend-hrs');

  // slider numeric feedback
  hr = createDiv('Min hr: ' + hrSlider.value());
  hr.addClass('valDiv');
  hr.parent('legend-hrs');
}

function createGapSlider(){
  // UI slider
  gapSlider = createSlider(10, 300, 10);
  // gapSlider.position((width/3)+16, 50);
  gapSlider.addClass('sliders');
  gapSlider.parent('legend-gap');

  // slider numeric feedback
  gap = createDiv('Min gap: ' + gapSlider.value());
  gap.addClass('valDiv');
  gap.parent('legend-gap');
}

function createMagSlider(){
  // UI slider
  magSlider = createSlider(0, 10, 1);
  // magSlider.position(32, 50);
  magSlider.addClass('sliders');
  magSlider.parent('legend-mag');

  // slider numeric feedback
  magnitude = createDiv('Min magnitude: ' + magSlider.value());
  magnitude.addClass('valDiv');
  magnitude.parent('legend-mag');
}

function createTitle(){
  var mo = month();
  var d = day();
  var y = year();
  
  var newMo = " ";
  if (mo == 11){
    newMo = "November";
  }
  // title context
  var title = createDiv("<h2>Earthquake Report for "+ newMo + " "+ d + ", " + y +"</h2>");
  title.id("title");
  title.position(20, 15);
  title.parent('header');
}

function createMarkers() {
  for (var i = 1; i < lats.length; i++) {
// create custom leaflet marker
    quakes[i] = L.circleMarker([lats[i], longs[i]], {
      stroke: true,
      color: '#FF1493',
      weight: 2,
      opacity: 0.3,
      fillOpacity: 0.8,
      fillColor: '#FFD700',
      radius:mags[i],
    });

    quakes[i].addTo(map).bindPopup('<h3>' + countries[i].substr(0, countries[i].length-1)+ '</h3>' + locations[i] + ' <br>magnitude: <b>' + mags[i] + '</b> </b> <br>gap: <b>' + gaps[i] + '</b>'); // make new labeled markers at lat, lon,
  }
  console.log(quakes[1]);
}

// parse data function
function parseSource(data) {
  for (var i = 1; i < data.length; i++) {
    var row = split(data[i], ","); // split every row by the comma
    lats[i] = row[1];
    longs[i] = row[2];
    gaps[i] = row[7];
    mags[i] = row[4];
    date[i] = new Date(row[0]);
    hrs[i] = date[i].getHours();
    locations[i] = row[13].substr(1);
    countries[i] = row[14];
  }
  dataParsed = true;
  createMarkers();
}

// init leaflet using a custom mapbox
function initLeaflet() {
  
  // api key
  L.mapbox.accessToken = 'pk.eyJ1IjoiY29tcGFnbmIiLCJhIjoiY2lnYjM5cjh1MW5wZnY5bTNrZ2d2ejVtZyJ9.XdZ79YPqoFtpksmMM-5FkQ';
  
  // custom map load
  map = L.mapbox.map('map', 'compagnb.earthquakes').setView([20, 0], 2);

  // leaflet needs this function, no need to do anything here
  function onMapClick(e) {
  }
  map.on('click', onMapClick);
}

// function to change window size when modified
window.onresize = function() {
  canvas.size(windowWidth,windowHeight-65);
};