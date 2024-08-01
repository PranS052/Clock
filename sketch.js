// Declare variables for shape radii
let secondsRadius;
let minutesRadius;
let hoursRadius;
let clockDiameter;

function setup() {
  createCanvas(710, 710);
  stroke(255);
  angleMode(DEGREES);

  // Set radius for each shape based on canvas dimensions
  let radius = min(width, height) / 2;
  secondsRadius = radius * 0.71;
  minutesRadius = radius * 0.6;
  hoursRadius = radius * 0.5;
  clockDiameter = radius * 1.7;
}

function draw() {
  background(103,157,168);
  translate(width / 2, height / 2);

  // Get the server time (replace with your actual server time retrieval method)
  let serverTime = new Date(); // Example: Replace with actual server time

  // Calculate the time difference (offset)
  let localTime = new Date();
  let timeDiff = serverTime - localTime;

  // Get the current time adjusted by the offset
  let now = new Date(localTime.getTime() + timeDiff);
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  // Calculate angles for clock hands
  let secondAngle = map(seconds, 0, 60, 0, 360);
  let minuteAngle = map(minutes + seconds / 60, 0, 60, 0, 360);
  let hourAngle = map(hours % 12 + minutes / 60, 0, 12, 0, 360);

  // Draw clock face (circle)
  noFill();
  stroke(50);
  ellipse(0, 0, clockDiameter);

  // Draw hour digits (1 to 12) with different colors
  textSize(24);
  textAlign(CENTER, CENTER);
  for (let i = 1; i <= 12; i++) {
    let angle = map(i, 0, 12, -90, 270);
    let x = cos(angle) * (clockDiameter / 2 - 20); // Inside the circle
    let y = sin(angle) * (clockDiameter / 2 - 20);
    let digitColor = (i % 2 === 0) ? color(255, 0, 0) : color(0, 255, 0); // Red or green
    fill(digitColor);
    text(i, x, y);
  }

  // Draw clock hands
  stroke(50);
  strokeWeight(2);

  // Hour hand
  push();
  rotate(hourAngle);
  line(0, 0, hoursRadius, 0);
  pop();

  // Minute hand
  push();
  rotate(minuteAngle);
  line(0, 0, minutesRadius, 0);
  pop();

  // Second hand
  push();
  stroke(255, 0, 0); // Red color for seconds
  rotate(secondAngle);
  line(0, 0, secondsRadius, 0);
  pop();

  // Display digital time
  fill(255);
  textSize(32);
  textAlign(CENTER, BOTTOM);
  let digitalTime = nf(hours, 2) + ':' + nf(minutes, 2) + ':' + nf(seconds, 2);
  text(digitalTime, 0, clockDiameter / 2 + 40);
}
