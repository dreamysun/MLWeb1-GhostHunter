// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Real time Object Detection using YOLO and p5.js
=== */

let video;
let yolo;
let status;
let objects = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);

  // Create a YOLO method
  yolo = ml5.YOLO(video, startDetecting);

  // Hide the original video
  video.hide();
  status = select('#status');
}

function draw() {
  image(video, 0, 0, width, height);

  for (let i = 0; i < objects.length; i++) {
    noStroke();
    fill(0, 255, 0);
    text(objects[i].label, objects[i].x * width, objects[i].y * height - 5);
    noFill();
    strokeWeight(4);
    stroke(0, 255, 0);
    rect(objects[i].x * width, objects[i].y * height, objects[i].w * width, objects[i].h * height);

//ghost hunter
    if (objects[i].label = "person") {
      let ghostX = objects[i].x * width * random(3);
      let ghostY = objects[i].y * height * random(3);
      let ghostX2 = objects[i].w * width * random(2) - 100;
      let ghostY2 = objects[i].h * height - 50;

      strokeWeight(1);
      text("GHOST HERE!!!!!", ghostX, ghostY);
      fill(150,50);
      strokeWeight(2);
      stroke(0, 255, 0);
      rect(ghostX, ghostY, ghostX2, ghostY2);
    }
  }


}

function startDetecting() {
  status.html('Model loaded!');
  detect();
}

function detect() {
  yolo.detect(function(err, results) {
    objects = results;
    detect();
  });

}
