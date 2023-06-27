let capture;
let posenet;
let noseX,noseY;
let reyeX,reyeY;
let leyeX,leyeY;
let singlePose,skeleton;
let ram;
let videoX,videoY;
let ashish;
let facingMod = localStorage.getItem('facingMod') || 'user';
let videoWidth ;
let videoHeight; 

// it will run single time
  function setup() {                  
    videoWidth  = windowWidth  < 640 ? windowWidth  : 640;
    videoHeight = windowHeight < 480 ? windowHeight : 480; 
    createCanvas(videoWidth,videoHeight);     //it will create a canvas block of 640px  X  480px (default)
    background(255);
    capture = createCapture({ video: { facingMode: facingMod }, audio:false});    //it will initiate your camera to take your vdo
    capture.hide();                    //hide to show the vdo

  //posnet model loading with vdo and callback function
    posenet = ml5.poseNet(capture, modelLoaded);
  //a eventlistener with callback function
    posenet.on('pose',receivedPoses);
  // Create (two + 1  dummy) separate HTML button in a div
    let divblock = createDiv();
    divblock.class("buttonbox");
  // dummy 
    let dummyButton = createButton("dummy");
    dummyButton.class("dummybutton");
    divblock.child(dummyButton);
  //to capture
    let wrapbox = createDiv();
    wrapbox.style('width','150px');
    wrapbox.style('display','flex');
    wrapbox.style('justify-content','center');
    let captureButton = createButton("Capture");
    captureButton.class("clicktopic");
    captureButton.mousePressed(captureImage);
    wrapbox.child(captureButton);
    divblock.child(wrapbox);
  // to flip camera
    let flipButton = createButton('<i class="fa-solid fa-camera-rotate" id="rotatecamlogo"></i>');
    flipButton.class("flip");
    flipButton.mousePressed(flipcam);
    divblock.child(flipButton);

  //my details
    ashish = createElement('b', 'Developed by Ashish Gupta <a class = "linkedin" href="https://www.linkedin.com/in/ashish-gupta-57aa36278">linkedin <i class="fa fa-linkedin" id="linkedinlogo"></i></a>');
}
function flipcam(){ 
    facingMod = facingMod === 'user' ? 'environment' : 'user';
    localStorage.setItem('facingMod', facingMod);
    window.location.reload();
}
function captureImage() {saveCanvas("Mypose", "png");}
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

//it will run infinite times continuously
 function draw() {  
    videoWidth  = windowWidth  < 640 ? windowWidth  : 640;
    videoHeight = windowHeight < 480 ? windowHeight : 480; 
    resizeCanvas(videoWidth ,videoHeight);  // update canvas dimensions constantly
// images and videos(webcam)
// Calculate the position to center the video
  videoX = (width - capture.width) / 2;
  videoY = (height - capture.height) / 2;

// Draw the mirror video at the calculated position
    translate(width,0);
    scale(-1,1);
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
