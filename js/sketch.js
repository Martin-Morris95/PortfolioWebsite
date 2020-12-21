var lineDistanceThresh = 250;
var lines = [];
var timer = 0;
var buffer = 55;
var destroyPage = false;
var button;

function setup() {
  createCanvas(windowWidth, windowHeight - 18);
  setupCircles();
  ellipseMode(RADIUS);

  noStroke();
  fill(255);
  //displayCoords();
  stroke(255);
  strokeWeight(3);
  drawLines();
  fill(255);
  strokeWeight(1.5);
  stroke(24, 106, 181);
  drawCircles();

  noStroke();
}

function destroy() {
  destroyPage = true;
  var x = document.getElementById("destroyButton");
  x.classList.add("pure-button-disabled");
  x.classList.remove("pulse-red");
}

var index = 0;
var originalX, originalY;
function draw() {
  background(138, 207, 252);

  noStroke();
  fill(255);
  //displayCoords();
  stroke(255);
  strokeWeight(3);
  drawLines();
  fill(255);
  strokeWeight(1.5);
  stroke(24, 106, 181);
  drawCircles();

  noStroke();
  calculateLines();
  if (destroyPage) {
    for (i = 0; i < circles.length; i++) {
      if (circles[i].y < windowHeight / 3) {
        circles[i].y += random(6, 12);
      } else if (
        circles[i].y >= windowHeight / 3 &&
        circles[i].y < (windowHeight / 3) * 2
      ) {
        circles[i].y += random(3, 5);
      } else {
        circles[i].y += random(2, 3);
      }
    }

    var stillOnScreen = false;
    for (i = 0; i < circles.length; i++) {
      if (circles[i].y < windowHeight) {
        stillOnScreen = true;
      }
    }

    if (!stillOnScreen) {
      destroyPage = false;
      setupCircles();
      var x = document.getElementById("destroyButton");
      x.classList.remove("pure-button-disabled");
      x.classList.add("pulse-red");
    }
  }
}

function drawCircles() {
  for (i = 0; i < circles.length; i++) {
    ellipse(circles[i].x, circles[i].y, circles[i].size, circles[i].size);
  }
}

function displayCoords() {
  for (i = 0; i < circles.length; i++) {
    text(
      "x:" + circles[i].x + ",y:" + circles[i].y,
      circles[i].x - circles[i].size,
      circles[i].y - circles[i].size - 10
    );
  }
}

function sameCircle(x1, x2, y1, y2) {
  if (x1 == x2 && y1 == y2) {
    return true;
  }
  return false;
}

function drawLines() {
  for (i = 0; i < lines.length; i++) {
    line(lines[i].x1, lines[i].y1, lines[i].x2, lines[i].y2);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Run when the mouse/touch is down.
function mousePressed() {
  var circleDetected = false;
  if (circles.length > 0) {
    for (var i = 0; i < circles.length; i++) {
      var circle = circles[i],
        distance = dist(mouseX, mouseY, circle.x, circle.y);
      if (distance < circle.size) {
        circle.active = true;
        circleDetected = true;
      } else {
        circle.active = false;
      }
    }

    if (!circleDetected) {
      addCircle(mouseX, mouseY, false);
      calculateLines();
    }
  } else {
    addCircle(mouseX, mouseY, false);
    calculateLines();
  }
  // Prevent default functionality.
  return false;
}

function addCircle(x, y, activeStatus) {
  circles.push({ x: x, y: y, size: random(5, 15), active: activeStatus });
}

function calculateLines() {
  lines.length = 0;

  for (i = 0; i < circles.length; i++) {
    for (j = 0; j < circles.length; j++) {
      //check to see if its the same circle
      if (circles[i].x != circles[j].x && circles[i].y != circles[j].y) {
        //Check if the other circles are to far
        if (
          dist(circles[i].x, circles[i].y, circles[j].x, circles[j].y) <
          lineDistanceThresh
        ) {
          if ((circles[i].x < circles[j].x, circles[i].y < circles[j].y)) {
            lines.push({
              x1: circles[i].x,
              y1: circles[i].y,
              x2: circles[j].x,
              y2: circles[j].y,
            });
          }
        }
      }
    }
  }
  console.log(lines);
}

function sameLine(x1, y1, x2, y2) {
  sameLines = false;
  if (lines.length == 0) {
    return false;
  }
  for (i = 0; i < lines.length; i++) {
    if (
      x1 == lines[i].x2 &&
      x2 == lines[i].x1 &&
      y1 == lines[i].y2 &&
      y2 == lines[i].y1
    ) {
      sameLines = true;
    }
  }

  return sameLines;
}
// Run when the mouse/touch is dragging.
function mouseDragged() {
  if (circles.length > 0) {
    for (var i = 0; i < circles.length; i++) {
      var circle = circles[i];
      if (circle.active) {
        circle.x = mouseX;
        circle.y = mouseY;
        calculateLines();
        break;
      }
    }
  }
  // Prevent default functionality.
  return false;
}

// LINE/LINE
function lineIntersect(x1, y1, x2, y2, x3, y3, x4, y4) {
  // calculate the distance to intersection point
  var uA =
    ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) /
    ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
  var uB =
    ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) /
    ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
  // if uA and uB are between 0-1, lines are colliding
  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
    return true;
  }
  return false;
}
function setupCircles() {
  circles = [
    { x: 975, y: buffer + 769, size: random(5, 15), active: false },
    { x: 1035, y: buffer + 829, size: random(5, 15), active: false },
    { x: 1113, y: buffer + 742, size: random(5, 15), active: false },
    { x: 795, y: buffer + 880, size: random(5, 15), active: false },
    { x: 1242, y: buffer + 808, size: random(5, 15), active: false },
    { x: 1173, y: buffer + 1016, size: random(5, 15), active: false },
    { x: 1245, y: buffer + 1073, size: random(5, 15), active: false },
    { x: 1005, y: buffer + 1033, size: random(5, 15), active: false },
    { x: 884, y: buffer + 1005, size: random(5, 15), active: false },
    { x: 1392, y: buffer + 893, size: random(5, 15), active: false },
    { x: 1327, y: buffer + 658, size: random(5, 15), active: false },
    { x: 1494, y: buffer + 580, size: random(5, 15), active: false },
    { x: 1478, y: buffer + 531, size: random(5, 15), active: false },
    { x: 1506, y: buffer + 804, size: random(5, 15), active: false },
    { x: 1645, y: buffer + 957, size: random(5, 15), active: false },
    { x: 1371, y: buffer + 317, size: random(5, 15), active: false },
    { x: 1455, y: buffer + 127, size: random(5, 15), active: false },
    { x: 1608, y: buffer + 307, size: random(5, 15), active: false },
    { x: 1575, y: buffer + 430, size: random(5, 15), active: false },
    { x: 1735, y: buffer + 533, size: random(5, 15), active: false },
    { x: 1660, y: buffer + 718, size: random(5, 15), active: false },
    { x: 1795, y: buffer + 730, size: random(5, 15), active: false },
    { x: 1962, y: buffer + 887, size: random(5, 15), active: false },
    { x: 1974, y: buffer + 822, size: random(5, 15), active: false },
    { x: 1995, y: buffer + 729, size: random(5, 15), active: false },
    { x: 1932, y: buffer + 536, size: random(5, 15), active: false },
    { x: 1834, y: buffer + 366, size: random(5, 15), active: false },
    { x: 1894, y: buffer + 170, size: random(5, 15), active: false },
    { x: 1693, y: buffer + 167, size: random(5, 15), active: false },
    { x: 1637, y: buffer + 15, size: random(5, 15), active: false },
    { x: 1721, y: buffer + 960, size: random(5, 15), active: false },
    { x: 1759, y: buffer + -10, size: random(5, 15), active: false },
    { x: 1890, y: buffer + -10, size: random(5, 15), active: false },
    { x: 2000, y: buffer + 367, size: random(5, 15), active: false },
  ];
}
/*
function calculateLines(){
  for( i = 1; i<circles.length; i++){
    var buffer = random(2,10);
     if(circles[i].x < circles[0].x){
       if(circles[i].y < circles[0].y){
         line(circles[i].x  , circles[i].y, circles[0].x- buffer,circles[0].y  - buffer);
       }else if(circles[i].y > circles[0].y){
       line(circles[i].x  , circles[i].y, circles[0].x- buffer,circles[0].y  + buffer);
       }else{
         line(circles[i].x  , circles[i].y, circles[0].x- buffer,circles[0].y );
       }
     }else if(circles[i].x > circles[0].x){
        if(circles[i].y < circles[0].y){
         line(circles[i].x  , circles[i].y, circles[0].x+ buffer,circles[0].y  - buffer);
       }else if(circles[i].y > circles[0].y){
       line(circles[i].x  , circles[i].y, circles[0].x + buffer,circles[0].y  + buffer);
       }else{
         line(circles[i].x  , circles[i].y, circles[0].x+ buffer,circles[0].y );
       }
     }else{
        if(circles[i].y < circles[0].y){
         line(circles[i].x  , circles[i].y, circles[0].x,circles[0].y  - buffer);
       }else if(circles[i].y > circles[0].y){
       line(circles[i].x  , circles[i].y, circles[0].x,circles[0].y  + buffer);
     }
      
     }
  }
  } */
