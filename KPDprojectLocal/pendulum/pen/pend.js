function degreeToRadian(degree) {
        return degree * Math.PI / 180;
}

let radius1 = 150;   
let radius2 = 150;   
let mass1 = 12;      
let mass2 = 10;      
let gravity = 1.0;   

let angle1 = degreeToRadian(120);
let angle2 = degreeToRadian(60);
let angularVelocity1 = 0.02;
let angularVelocity2 = 0.02;
let angularAcceleration1 = 1.5;
let angularAcceleration2 = 1.2;

let pointsArr = [];
const maxTrail = 1500;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const resetBtn=document.getElementById("reset-btn");
const width = 600;
const height = 600;
canvas.width = width;
canvas.height = height;

const anchorX = width / 2;
const anchorY = height / 4;

let x1 = 0, y1 = 0, x2 = 0, y2 = 0;

function updatePositions() {
   x1 = anchorX + radius1 * Math.sin(angle1);
   y1 = anchorY + radius1 * Math.cos(angle1);
   x2 = x1 + radius2 * Math.sin(angle2);
   y2 = y1 + radius2 * Math.cos(angle2);
}

function updateAngularAccelerations() {
   const m1 = mass1, m2 = mass2;
   const L1 = radius1, L2 = radius2;
   const a1 = angle1, a2 = angle2;
   const v1 = angularVelocity1, v2 = angularVelocity2;

   const sin = Math.sin, cos = Math.cos;

   const num1 =
          -gravity * (2 * m1 + m2) * sin(a1)
          - m2 * gravity * sin(a1 - 2 * a2)
          - 2 * sin(a1 - a2) * m2 * (v2 * v2 * L2 + v1 * v1 * L1 * cos(a1 - a2));

   const den1 = L1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
   angularAcceleration1 = num1 / den1;

   const num2 =
          2 * sin(a1 - a2) * (
            v1 * v1 * L1 * (m1 + m2)
            + gravity * (m1 + m2) * cos(a1)
            + v2 * v2 * L2 * m2 * cos(a1 - a2)
          );

    const den2 = L2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
    angularAcceleration2 = num2 / den2;
      }

function updateTrail() {
   pointsArr.push({ x: x2, y: y2 });
   if (pointsArr.length > maxTrail) pointsArr.shift();
}

function drawFirstPendulum() {
        
   ctx.beginPath();
   ctx.moveTo(anchorX, anchorY);
   ctx.lineTo(x1, y1);
   ctx.lineWidth = 2;
   ctx.strokeStyle = "#e2e2e2";
   ctx.stroke();
   ctx.closePath();

        
   ctx.beginPath();
   ctx.arc(x1, y1, mass1, 0, Math.PI * 2);
   ctx.fillStyle = "#4FC3F7";
   ctx.fill();
   ctx.strokeStyle = "#89D6FA";
   ctx.stroke();
   ctx.closePath();
}

function drawSecondPendulum() {

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#e2e2e2";
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(x2, y2, mass2, 0, Math.PI * 2);
  ctx.fillStyle = "#FF7043";
  ctx.fill();
  ctx.strokeStyle = "#FFA07A";
  ctx.stroke();
  ctx.closePath();
}

function drawAnchor() {
   ctx.beginPath();
   ctx.arc(anchorX, anchorY, 4, 0, Math.PI * 2);
   ctx.fillStyle = "#ccc";
   ctx.fill();
   ctx.closePath();
}

function drawTrajectoryPath() {
   if (pointsArr.length < 2) return;

        // dotted circles trail
        // ctx.beginPath();
        // for (let i = 0; i < pointsArr.length; i++) {
        //   ctx.moveTo(pointsArr[i].x, pointsArr[i].y);
        //   ctx.arc(pointsArr[i].x, pointsArr[i].y, 1.2, 0, Math.PI * 2);
        // }
        // ctx.fillStyle = "rgba(255, 99, 132, 0.6)";
        // ctx.fill();
        // ctx.closePath();

        // Line trail 
   const n = pointsArr.length;
   ctx.lineWidth = 1.5;
   for (let i = 1; i < n; i++) {
          const p0 = pointsArr[i - 1];
          const p1 = pointsArr[i];
          const t = i / n;
          ctx.strokeStyle = `rgba(255, 99, 132, ${0.2 + 0.6 * t})`;
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.stroke();
          ctx.closePath();
        }
      }

function draw() {
   ctx.clearRect(0, 0, width, height);
   drawTrajectoryPath();
   drawAnchor();
   drawFirstPendulum();
   drawSecondPendulum();
}

function updateAll() {
   updateAngularAccelerations();

   angularVelocity1 += angularAcceleration1;
   angularVelocity2 += angularAcceleration2;

   const damping = 0.999;
   angularVelocity1 *= damping;
   angularVelocity2 *= damping;

   angle1 += angularVelocity1;
   angle2 += angularVelocity2;

   updatePositions();
   updateTrail();
}

function animate() {
   updateAll();
   draw();
   requestAnimationFrame(animate);
}

updatePositions();
animate();

canvas.addEventListener("click", () => { pointsArr.length = 0; });
resetBtn.addEventListener("click",()=>{window.location.reload();});

