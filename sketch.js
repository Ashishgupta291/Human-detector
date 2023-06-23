let capture;
let posenet;
let noseX,noseY;
let reyeX,reyeY;
let leyeX,leyeY;
let singlePose,skeleton;
let ram;
let videoX,videoY;
let ashish;

function setup() {                  // it will run single time
    let videoWidth = windowWidth < 640 ? windowWidth : 640;
    let videoHeight = windowHeight < 480 ? windowHeight : 480; 
    createCanvas(videoWidth,videoHeight);     //it will create a canvas block of 800px  X  500px 
    background(255);
    capture = createCapture({ video: { facingMode: "environment" }});    //it will initiate your camera to take your vdo
    capture.hide();                    //hide to show the vdo

    //posnet model loading with vdo and callback function
    posenet = ml5.poseNet(capture, modelLoaded);
    //a eventlistener with callback function
    posenet.on('pose',receivedPoses);

    //my details
    ashish = createElement('b', 'Developed by Ashish Gupta <a class = "linkedin" href="https://www.linkedin.com/in/ashish-gupta-57aa36278">linkedin <i class="fa fa-linkedin"></i></a>');
}

function receivedPoses(poses){
    console.log(poses);
    ram = poses.length;            // to directly use it in draw function
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


function draw() {  //it will run infinite times continuously
    
    // images and videos(webcam)
// Calculate the position to center the video
  videoX = (width - capture.width) / 2;
  videoY = (height - capture.height) / 2;

// Draw the video at the calculated position
    image(capture, videoX, videoY);      // show the vdo picture by picture
    fill(255,0,0);                       //  fill color 

    if(singlePose && (ram>0)){
        //uncomment this for skeleton
         for(let i=0; i<singlePose.keypoints.length; i++){
             ellipse(singlePose.keypoints[i].position.x + videoX, singlePose.keypoints[i].position.y + videoY,20);
         }
         stroke(255,255,255);
         strokeWeight(5);
         for(let j=0; j<skeleton.length; j++){
             line(skeleton[j][0].position.x + videoX, skeleton[j][0].position.y + videoY, skeleton[j][1].position.x + videoX, skeleton[j][1].position.y + videoY)
         }
    }
}
