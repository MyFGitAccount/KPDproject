function degreeToRadian(degree){
    return degree*Math.PI/180;
}
let radius1=100;
let radius2=100;
let mass1=30;
let mass2=20;
let gravity=1
let angle1=degreeToRadian(10);
let angle2=degreeToRadian(20);
let angularVelocity1=0.05;
let angularVelocity2=0.05;
let angularAcceleration1=1;
let angularAcceleration2=1;
let pointsArr=[];

const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
const height=700;
const width=700;
canvas.height=height;
canvas.width=width;

let x1=radius1*Math.sin(angle1);
let y1=radius1*Math.cos(angle1);
let x2=radius2*Math.sin(angle2);
let y2=radius2*Math.cos(angle2);

function updatePositions() {
  x1 = width / 2 + radius1 * Math.sin(angle1);
  y1 = height / 4 + radius1 * Math.cos(angle1);
  x2 = x1 + radius2 * Math.sin(angle2);
  y2 = y1 + radius2 * Math.cos(angle2);
}

function drawFirstPendulum(){
    ctx.beginPath();
    ctx.moveTo(width/2,height/2);
    ctx.lineTo(x1,y1);
    ctx.arc(x1,y1,mass1,Math.PI*2,false);
    ctx.strokeStyle="black";
    ctx.stroke()
    ctx.closePath();
}

function drawSecondPendulum(){
    ctx.beginPath()
    ctx.moveTo(x1,y1)
    ctx.lineTo(x2,y2);
    ctx.arc(x2,y2,mass2,Math.PI*2,false);
    ctx.strokeStyle="black"
    ctx.stroke()
    ctx.closePath();
}

let number1=-gravity*(2*mass1+mass2)*Math.sin(angle1);
let number2=mass2*gravity*Math.sin(angle1-2*angle2);
let number3=2*Math.sin(angle1-angle2)*mass2;
let number4=angularVelocity2*angularVelocity2*radius2+angularVelocity1*angularVelocity1*radius1*Math.cos(angle1-angle2);

function updatePoint(x,y){
    pointsArr.push({x:x2,y:y2});
}
function updateAngularAcceleration1(){
    let d1=radius1*(2*mass1+mass2-mass2*Math.cos(2*angle1-2*angle2));
    angularAcceleration1=(number1-number2-number3*number4)/d1;
		    
}

let numberA=2*Math.sin(angle1-angle2);
let numberB=angularVelocity1*angularVelocity1*radius1*(mass1+mass2)+gravity*(mass1+mass2)*Math.cos(angle1)+angularVelocity2*angularVelocity2*radius2*mass2*Math.cos(angle1-angle2);

function updateAngularAcceleration2(){
    let d2=radius2*(2*mass1+mass2-mass2*Math.cos(2*angle1-2*angle2));
		    angularAcceleration2=(numberA*numberB)/d2;
}

function updateAngularVelocity1(){
    angularVelocity1+=angularAcceleration1;
}
function updateAngularVelocity2(){
    angularVelocity2+=angularAcceleration2;
}

function updateAngle1(){
    angle1+=angularVelocity1;
}
function updateAngle2(){
    angle2+=angularVelocity2;
}

function updateAll(){
    updatePositions()
    updateAngularAcceleration1();
    updateAngularAcceleration2();
    updateAngularVelocity1();
    updateAngularVelocity2();
    updateAngle1();
    updateAngle2();
}

function drawTrajectoryPath(){
    ctx.beginPath()
    for(let i=0;i<pointsArr.length;i++){
       ctx.moveTo(pointsArr[i].x,pointsArr[i].y);
       ctx.arc(pointsArr[i].x,pointsArr[i].y,0.1,0,Math.PI*2,false);
       
    }
    ctx.fillStyle="red";
    ctx.fill();
    ctx.closePath()
}

function draw(){
   ctx.clearRect(0,0,width,height);
   drawFirstPendulum();
   drawSecondPendulum();
   drawTrajectoryPath();
}
function animate(){
   updateAll();
   draw();
   requestAnimationFrame(animate);
}


animate()
