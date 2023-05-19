song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
score_leftWrist = 0;
scoer_rightWrist = 0;

function preload() {
  song = loadSound("BTS-Dynamite-(HipHopKit.com).mp3")
  song1 = loadSound("butter.mp3") ;
}

function setup() {
  canvas = createCanvas(600, 500);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log("posenet model is intialized");
}

function draw() {
  image(video, 0, 0, 600, 500);
   

  fill("black");
  stroke("white");

  if(score_rightWrist > 0.2){
      circle(rightWristX , rightWristX , 20);
      song1.stop();
      song.play();
  }
  if (score_leftWrist > 0.2) {
    circle(leftWristX, leftWristY, 20);
    song.stop();
    song1.play();
  }
  

  
      
}

function play_song() {
  song.play();
  song.setVolume(1);
  song.rate(1);
}

function gotPoses(results) {
  if (results.length > 0) {
    console.log(results);

    score_rightWrist = results[0].pose.keypoints[10].score;
    score_leftWrist = results[0].pose.keypoints[9].score;
    console.log("score_leftWrist = " + score_leftWrist + "score_rightWrist = " + score_rightWrist);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX + " , leftWristY = " + leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX + " , rightWristY = " + rightWristY);
  }
}