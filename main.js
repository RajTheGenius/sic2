video = "";
objects = [];
status = "";

function setup() {
	canvas =  createCanvas(600, 500);
	canvas.position(500, 400);
    video = createCapture(VIDEO);
    video.hide();
    synth = window.speechSynthesis;

}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Object detected";
}

function modelLoaded() {
    console.log("modelLoaded");
    status = true;
}

function draw() {
	image(video, 0, 0, 600, 500);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "objects Detected";

            fill("red");
            percentage = floor(objects[i].confidence * 100);
            text( objects[i].label + " " + percentage + "%", objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }else{
        console.log(results);
        utterThis = new SpeechSynthesisUtterance(results[0].label);
        synth.speak(utterThis);
    }
    
}