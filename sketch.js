let capture;
let posenet;
let noseX,noseY;
let reyeX,reyeY;
let leyeX,leyeY;
let singlePose,skeleton;
let actor_img;
let specs,smoke;

function setup() {                    // it will run single time
    createCanvas(640,480);          //it will create a canvas block of 800px  X  500px 
    background(255);
    capture = createCapture(VIDEO)     //it will initiate your camera to take your vdo
    capture.hide();                    //hide to show the vdo

    //posnet model loading with vdo and callback function
    posenet = ml5.poseNet(capture, modelLoaded);
    //a eventlistener with callback function
    posenet.on('pose',receivedPoses);

    actor_img = loadImage('images/shahrukh.png');
    specs = loadImage('images/spects.png');
    smoke = loadImage('images/cigar.png');

}

function receivedPoses(poses){
    console.log(poses);

    if(poses.length > 0){
        singlePose = poses[0].pose;
        skeleton = poses[0].skeleton;
        document.getElementById("greet").innerHTML="Human detected !!";
        document.getElementById("greet").style.color="rgb(216, 8, 8)";
    }
    else{document.getElementById("greet").innerHTML="Finding...";
    document.getElementById("greet").style.color="azure";}
}

function modelLoaded() {
    console.log('Model has been loaded');
}
function calculateDistance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
  
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance;
}
 function calculateSlopeAngle(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
  
    const slope = dy / dx;
    const angleRadians = Math.atan(slope);
    const angleDegrees = (angleRadians * 180) / Math.PI;
  
    return angleDegrees;
  }
  

function draw() {  //it will run infinite times continuously
    
    // images and videos(webcam)
    image(capture, 0, 0);                // show the vdo picture by picture
    fill(255,0,0);                       // 

    if(singlePose){
        //uncomment this for skeleton
        // for(let i=0; i<singlePose.keypoints.length; i++){
        //     ellipse(singlePose.keypoints[i].position.x, singlePose.keypoints[i].position.y,20);
        // }
        // stroke(255,255,255);
        // strokeWeight(5);
        // for(let j=0; j<skeleton.length; j++){
        //     line(skeleton[j][0].position.x, skeleton[j][0].position.y, skeleton[j][1].position.x, skeleton[j][1].position.y)
        // }
        
        // for appling filter on face  
          var distance = calculateDistance(singlePose.leftEye.x, singlePose.leftEye.y, singlePose.rightEye.x, singlePose.rightEye.y);
        console.log(distance);
          var slopeAngle = calculateSlopeAngle(singlePose.leftEye.x, singlePose.leftEye.y, singlePose.rightEye.x, singlePose.rightEye.y);
          var sinValue = sin(radians(slopeAngle));
          push();
          translate(singlePose.nose.x+50*sinValue,singlePose.nose.y-distance*0.5);
          rotate(radians(slopeAngle));
          imageMode(CENTER);
          image(specs,0,0,distance*2,distance*2);
          pop(); 
        // image(specs,singlePose.leftEye.x-distance*1.5,singlePose.leftEye.y-distance*0.8,distance*2,distance*2);
        image(smoke,singlePose.nose.x-distance*0.9,singlePose.nose.y+distance*0.5,distance*0.8,distance*0.8);    
    }
}