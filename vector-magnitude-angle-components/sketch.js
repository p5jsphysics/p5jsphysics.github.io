// p5jsphysics.github.io
// vector-magnitude-angle-components
// sketch.js using p5.js v1.11.11
// by Dr. Richard Taylor @ Muskingum University

// A coordinate system is placed at the center
// of the canvas.
//
// A vector is drawn from the origin of the
// coordinate system (the vector's tail) to the
// mouse's position (the vector's head).
//
// The vector's magnitude, angle, and 
// components are displayed.

let xTail = 0;
let yTail = 0;
let xHead = 0;
let yHead = 0;
let magnitude = 0;
let angle = 0;
let xComponent = 0;
let yComponent = 0;
let style = "triangle";
let arcRadius = 50;
let fontHeight = 34;

function setup() {
  createCanvas(windowWidth, windowHeight);
  xTail = windowWidth / 2;
  yTail = windowHeight / 2;
  textSize(fontHeight);
}

function draw() {
  background("lightgray");
  drawXAxis();
  labelXAxis();
  drawYAxis();
  labelYAxis();
  calculate();
  drawArrow();
  showMagnitude();
  drawAngle();
  showAngle();
  showMessage();
  drawXArrow();
  showXComponent();
  drawYArrow();
  showYComponent();
  if (style == "rectangle") {
    drawXPerpendicular();
    drawYPerpendicular();
  }
}

function mouseClicked() {
  if (style == "triangle") {
    style = "rectangle";
  } else {
    style = "triangle";
  }
}

function drawXAxis() {
  stroke("black");
  strokeWeight(1);
  line(0, yTail, windowWidth, yTail);
  drawHead(windowWidth, yTail, 0, 10, 20);
}

function labelXAxis() {
  stroke("black");
  strokeWeight(1);
  fill("black");
  textAlign(RIGHT, BOTTOM);
  text("+x axis", windowWidth - 20, yTail - 10);  
}

function drawYAxis() {
  stroke("black");
  strokeWeight(1);
  line(xTail, windowHeight, xTail, 0);
  drawHead(xTail, 0, HALF_PI, 10, 20);
}

function labelYAxis() {
  stroke("black");
  strokeWeight(1);
  fill("black");
  textAlign(LEFT, TOP);
  text ("+y axis", xTail + 10, 0 + 20);  
}

function calculate() {
  xHead = mouseX;
  yHead = mouseY;
  xComponent = xHead - xTail;
  yComponent = yHead - yTail;
  magnitude = sqrt(pow(xComponent, 2) + pow(yComponent, 2));
  angle = atan2(yComponent, xComponent);
  if (angle < 0) {
    angle = abs(angle);
  } else {
    angle = TWO_PI - angle;
  }
}

function drawArrow() {
  stroke("blue");
  strokeWeight(5);
  line(xTail, yTail, mouseX, mouseY);
  drawHead(mouseX, mouseY, angle, 10, 20);
}

function showMagnitude() {
  stroke("blue");
  strokeWeight(1);
  fill("blue");
  textAlign(LEFT, TOP);
  text("Magnitude = " + str(round(magnitude)), 0, 0);
}

function drawAngle() {
  stroke("red");
  strokeWeight(5);
  noFill();
  arc(xTail, yTail, 2 * arcRadius, 2 * arcRadius, -angle, 0);
  let x = xTail + arcRadius * cos(angle);
  let y = yTail - arcRadius * sin(angle);
  drawHead(x, y, angle + 0.9 * HALF_PI, 10, 20);
}

function showAngle() {
  stroke("red");
  strokeWeight(1);
  fill("red");
  textAlign(LEFT, TOP);
  text("Angle = " + str(round(degrees(angle))) + "\u00B0", 0, fontHeight);  
}

function showMessage() {
  stroke("black");
  strokeWeight(1);
  fill("black");
  textAlign(RIGHT, TOP);
  text("Click", windowWidth, 0);
}

function drawXArrow() {
  stroke("green");
  strokeWeight(5);
  line(xTail, yTail, xHead, yTail);
  if (xComponent > 0) {
    drawHead(xHead, yTail, 0, 10, 20);
  } else {
    drawHead(xHead, yTail, PI, 10, 20);
  }
}

function showXComponent() {
  stroke("green");
  strokeWeight(1);
  fill("green");
  textAlign(LEFT, TOP);
  text("X Component = Magnitude * cos(Angle)", 0, windowHeight - 3 * fontHeight);
  text("X Component = " + str(round(magnitude)) + " * cos(" + str(round(degrees(angle))) + "\u00B0)", 0, windowHeight - 2 * fontHeight);
  text("X Component = " + str(round(xComponent)), 0, windowHeight - 1 * fontHeight);  
}

function drawXPerpendicular() {
  stroke("black")
  strokeWeight(1);
  setLineDash([5, 10]);
  line(xHead, yTail, xHead, yHead);
  setLineDash([]);
}

function drawYArrow() {
  stroke("purple");
  strokeWeight(5);
  let x = xHead;
  if (style == "rectangle") {
    x = xTail;
  }
  line(x, yTail, x, yHead);
  if (-yComponent > 0) {
    drawHead(x, yHead, HALF_PI, 10, 20);
  } else {
    drawHead(x, yHead, HALF_PI + PI, 10, 20);
  }
}

function showYComponent() {
  stroke("purple");
  strokeWeight(1);
  fill("purple");
  textAlign(LEFT, TOP);
  text("Y Component = Magnitude * sin(Angle)", xTail, windowHeight - 3 * fontHeight);
  text("Y Component = " + str(round(magnitude)) + " * sin(" + str(round(degrees(angle))) + "\u00B0)", xTail, windowHeight - 2 * fontHeight);
  text("Y Component = " + str(round(-yComponent)), xTail, windowHeight - 1 * fontHeight);
}

function drawYPerpendicular() {
  stroke("black")
  strokeWeight(1);
  setLineDash([5, 10]);
  line(xTail, yHead, xHead, yHead);    
  setLineDash([]);
}

// This draws the head of an arrow.
// x, y is the vertex of the head.
// theta is the angle of the arrow in radians.
// w is the half width of the head.
// h is the height of the head.
function drawHead(x, y, theta, w, h) {
  let cost = cos(theta);
  let cosc = cos(HALF_PI - theta);
  let sint = sin(theta);
  let sinc = sin(HALF_PI - theta);
  let x1 = x - h * cost - w * cosc;
  let y1 = y + h * sint - w * sinc;
  let x2 = x - h * cost + w * cosc;
  let y2 = y + h * sint + w * sinc;
  line(x, y, x1, y1);
  line(x, y, x2, y2);
}

// This sets the line dash.
function setLineDash(list) {
  drawingContext.setLineDash(list);
}