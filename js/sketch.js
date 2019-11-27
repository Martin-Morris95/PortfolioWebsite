var lineDistanceThresh = 250;
var lines = [];
var timer = 0;

function setup() {
  circles = [
    { x: 975, y: 50 + 769, size: random(5, 15), active: false },
    { x: 1035, y: 50 + 829, size: random(5, 15), active: false },
    { x: 1113, y: 50 + 742, size: random(5, 15), active: false },
    { x: 795, y: 50 + 880, size: random(5, 15), active: false },
    { x: 1242, y: 50 + 808, size: random(5, 15), active: false },
    { x: 1173, y: 50 + 1016, size: random(5, 15), active: false },
    { x: 1245, y: 50 + 1073, size: random(5, 15), active: false },
    { x: 1005, y: 50 + 1033, size: random(5, 15), active: false },
    { x: 884, y: 50 + 1005, size: random(5, 15), active: false },
    { x: 1392, y: 50 + 893, size: random(5, 15), active: false },
    { x: 1327, y: 50 + 658, size: random(5, 15), active: false },
    { x: 1494, y: 50 + 580, size: random(5, 15), active: false },
    { x: 1478, y: 50 + 531, size: random(5, 15), active: false },
    { x: 1506, y: 50 + 804, size: random(5, 15), active: false },
    { x: 1645, y: 50 + 957, size: random(5, 15), active: false },
    { x: 1371, y: 50 + 317, size: random(5, 15), active: false },
    { x: 1455, y: 50 + 127, size: random(5, 15), active: false },
    { x: 1608, y: 50 + 307, size: random(5, 15), active: false },
    { x: 1575, y: 50 + 430, size: random(5, 15), active: false },
    { x: 1735, y: 50 + 533, size: random(5, 15), active: false },
    { x: 1660, y: 50 + 718, size: random(5, 15), active: false },
    { x: 1795, y: 50 + 730, size: random(5, 15), active: false },
    { x: 1962, y: 50 + 887, size: random(5, 15), active: false },
    { x: 1974, y: 50 + 822, size: random(5, 15), active: false },
    { x: 1995, y: 50 + 729, size: random(5, 15), active: false },
    { x: 1932, y: 50 + 536, size: random(5, 15), active: false },
    { x: 1834, y: 50 + 366, size: random(5, 15), active: false },
    { x: 1894, y: 50 + 170, size: random(5, 15), active: false },
    { x: 1693, y: 50 + 167, size: random(5, 15), active: false },
    { x: 1637, y: 50 + 15, size: random(5, 15), active: false },
    { x: 1721, y: 50 + 960, size: random(5, 15), active: false },
    { x: 1759, y: 50 + -10, size: random(5, 15), active: false },
    { x: 1890, y: 50 + -10, size: random(5, 15), active: false },
    { x: 2000, y: 50 + 367, size: random(5, 15), active: false }
  ];

  createCanvas(windowWidth, windowHeight);

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

  calculateLines();
}
var animPlay = false;
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
              y2: circles[j].y
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
