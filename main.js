song1 = "";
song2 = "";

scoreleftWrist = 0;
scorerightWrist = 0;
leftwristX = 0;
leftwristY = 0;
rightwristX = 0;
rightwristY = 0;

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.position(375, 200);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotResult);
}

function modelLoaded() {
    console.log("poseNet model loaded");
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("yellow");
    stroke("black");

    if(scoreleftWrist > 0.2)
    {
        circle(leftwristX, leftwristY, 20);
        song1.setVolume(1);
        song1.rate(1);
        song1.play();
        song2.stop();
        document.getElementById("song-name").innerHTML = "Song name - Harry Potter Theme Song"; 
    }

    if(scorerightWrist > 0.2)
    {
        circle(rightwristX, rightwristY, 20);
        song2.setVolume(1);
        song2.rate(1);
        song2.play();
        song1.stop();
        document.getElementById("song-name").innerHTML = "Song name - Peter Pan Song"; 
    }
}


function gotResult(results) {
    if (results.length > 0) {
        console.log(results);
        scoreleftWrist = results[0].pose.keypoints[9].score;
        scorerightWrist = results[0].pose.keypoints[10].score;

        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;

        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;

        console.log("LeftWristX = " + leftwristX + " LeftWristY = " + leftwristY);
        console.log("RightWristX = " + rightwristX + " RightWristY = " + rightwristY);
        console.log("Score right wrist = " + scorerightWrist + "Score left wrist = " + scoreleftWrist);
    }
}