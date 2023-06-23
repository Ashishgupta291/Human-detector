let ram;
let capture;
let posenet;
let noseX,noseY;
let reyeX,reyeY;
let leyeX,leyeY;
let singlePose,skeleton;
let filterdetails="images/spects.png";
let specs;
var distance, slopeAngle,sinValue;
let width_array  = [2.6 ,3.3  ,2.2 ,3.3 ,2.3 ,2.1 ,2.6 ,2.3 ,2.2 ,2.6 ,3.0 ,0.8 ,2.6 ,2.30 ,2.10 ,2.20 ,2.00,2.50,5.00,3.00,2.20 ,2.80,2.30 ,2.40 ,2.60,2.40 ,2.00 ,2.20 ,2.90 ,2.60 ,3.20,2.20,2.40 ,2.20,2.00 ,2.90,4.60,2.00,2.20 ,2.30,2.20,2.80 ,2.30];
let height_array = [2.4 ,1.8  ,1.8 ,3.5 ,1.9 ,2.1 ,2.5 ,2.3 ,2.2 ,2.5 ,4.5 ,0.8 ,2.5 ,1.20 ,1.20 ,1.00 ,1.40,2.50,5.00,2.70,2.00 ,2.70,1.20 ,2.10 ,2.50,2.00 ,2.00 ,1.80 ,2.10 ,2.00 ,3.00,1.00,1.40 ,2.30,1.40 ,3.00,3.50,1.50,1.20 ,2.10,0.90,2.90 ,2.00];
let y_array      = [0.31,0.05 ,0.45,0.85,0.30,0.35,0.35,0.35,0.35,0.35,0.35,-1.0,0.35,0.35 ,0.35 ,0.35 ,0.45,0.35,0.35,1.70,0.45 ,1.20,0.35 ,0.35 ,0.35,0.35 ,0.35 ,0.35 ,0.35 ,0.10 ,0.35,0.38,0.35 ,0.35,0.35 ,0.35,0.95,0.15,0.35 ,0.35,0.45,-0.09,0.35];
let x_array      = [0.00,-0.06,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.40,0.00,-0.04,-0.04,-0.05,0.00,0.00,0.00,0.00,-0.04,0.00,-0.05,-0.04,0.00,-0.04,-0.05,-0.04,-0.06,-0.05,0.00,0.00,-0.05,0.00,-0.05,0.10,0.00,0.00,-0.06,0.00,0.00,0.00 ,0.00];
let widthfact = width_array[12]; 
let heighfact = height_array[12];
let y_fac     = y_array[12];
let x_fac     = x_array[12];
let videoX,videoY;
let ashish;
let videoWidth;
let videoHeight;


function setup() {                    // it will run single time
  // let linewidth = document.getElementById("horizline").offsetWidth;
  videoWidth  = windowWidth  < 640 ? windowWidth  : 640;
  videoHeight = windowHeight < 480 ? windowHeight : 480;  
  
    createCanvas(videoWidth, videoHeight);            //it will create canvas block of 800px  X  500px 
    background(255);
    capture = createCapture(VIDEO)     //it will initiate your camera to take your vdo
    capture.hide();                    //hide to show the vdo

    // posnet model loading with vdo and callback function
    posenet = ml5.poseNet(capture, modelLoaded);
    // a eventlistener with callback function
    posenet.on('pose',receivedPoses);
    specs = loadImage(filterdetails);

    // Add click event listeners to different filter images
  const filterImages = document.querySelectorAll(".filter");
  filterImages.forEach((image) => {
    image.addEventListener("click", () => {
      filterdetails = image.getAttribute("src");
      specs = loadImage(filterdetails);
    }); 
  });

 // dimention listener
function assignWidthAndHeight(index) {
  
  widthfact = width_array[index];
  heighfact = height_array[index];
  y_fac     = y_array[index];
  x_fac     = x_array[index];
}

filterImages.forEach((image, index) => {
  image.addEventListener("click", () => {
    assignWidthAndHeight(index);
  });
});

// Create a separate HTML button in a div
let divblock = createDiv();
let captureButton = createButton("Capture");
captureButton.class("clicktopic");
captureButton.mousePressed(captureImage);
divblock.child(captureButton);

 //my details
 ashish = createElement('b', 'Developed by Ashish Gupta <a class = "linkedin" href="https://www.linkedin.com/in/ashish-gupta-57aa36278">linkedin <i class="fa fa-linkedin"></i></a>');
}

function receivedPoses(poses){
    console.log(poses);
    ram= poses.length;
    if(poses.length > 0){
        singlePose = poses[0].pose;
        skeleton = poses[0].skeleton;
        document.getElementById("greet").innerHTML="You are looking nice &#128525;";
        document.getElementById("greet").style.color="rgb(223, 26, 144)";
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
  
  function captureImage() {
    // Capture the current frame and save it as an image
    // capture.loadPixels();
    saveCanvas("Funglasses", "png");
    // capture.pause(); 
  }

function draw() {  //it will run infinite times continuously
    
    // images and videos(webcam)
   // Calculate the position to center the video
  videoX = (width - capture.width) / 2;
  videoY = (height - capture.height) / 2;

// Draw the video at the calculated position
    image(capture, videoX, videoY);      // show the vdo picture by picture
    fill(255,0,0);                       // WHITE COLOR FEELING IN CIRCLE
       
    if(singlePose && (ram>0)){
        // //uncomment this for skeleton
        // for(let i=0; i<singlePose.keypoints.length; i++){
        //     ellipse(singlePose.keypoints[i].position.x + videoX, singlePose.keypoints[i].position.y + videoY,20);
        // }
        // stroke(255,255,255);
        // strokeWeight(5);
        // for(let j=0; j<skeleton.length; j++){
        //     line(skeleton[j][0].position.x + videoX, skeleton[j][0].position.y + videoY, skeleton[j][1].position.x + videoX, skeleton[j][1].position.y + videoY)
        // }
        

        // for appling filter on face  
           distance = calculateDistance(singlePose.leftEye.x, singlePose.leftEye.y, singlePose.rightEye.x, singlePose.rightEye.y);
        console.log(distance);
           slopeAngle = calculateSlopeAngle(singlePose.leftEye.x, singlePose.leftEye.y, singlePose.rightEye.x, singlePose.rightEye.y);
           sinValue = sin(radians(slopeAngle));
          push();
          translate(Math.floor(singlePose.nose.x+50*sinValue-distance*x_fac + videoX),Math.floor(singlePose.nose.y-distance*y_fac + videoY));
          rotate(radians(slopeAngle));
          imageMode(CENTER);
          image(specs,0,0,distance*widthfact,distance*heighfact);
          pop(); 
      // image(specs,singlePose.leftEye.x-distance*1.5,singlePose.leftEye.y-distance*0.8,distance*2,distance*2);
      //image(smoke,singlePose.nose.x-distance*0.9 + videoX,singlePose.nose.y+distance*0.5 + videoY,distance*0.8,distance*0.8);    
    }
}