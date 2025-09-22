const canvas = document.getElementById("canvas");
const height = 600;
const width = 600;
canvas.height = height;
canvas.width = width;
const ctx = canvas.getContext("2d");
const showMass=document.getElementById("show-mass");
const showSpeedX=document.getElementById("show-speedx");
const showSpeedY=document.getElementById("show-speedy");
const showPosX=document.getElementById("show-posx");
const showPosY=document.getElementById("show-posy");
const showAccelX=document.getElementById("show-accelx");
const showAccelY=document.getElementById("show-accely");
const showFriction=document.getElementById("show-friction");
let circlePosX = width / 2;
let circlePosY = height / 2;
let circleVecX = 1;
let circleVecY = 0.5;
let mass = 20;

let friction=0;
let accelX = 0.7;
let accelY = 0.5; //gravity duh

const massInput = document.getElementById("mass"); //m
const accelxInput=document.getElementById("accelx"); //ax
const accelyInput=document.getElementById("accely") //ay
const speedx = document.getElementById("speedx");  //v.x
const speedy = document.getElementById("speedy");  //v.y
const posx = document.getElementById("posx");  //s.x
const posy = document.getElementById("posy");  //s.y
const frictionInput=document.getElementById("friction"); //friction

function drawCircle() {
  ctx.beginPath();
  ctx.arc(circlePosX, circlePosY, mass, 0, Math.PI * 2, false);
  ctx.stroke();
  ctx.closePath();
}

function setInput(setter, input, defaultValue) {
  input.addEventListener("input", () => {
    setter(parseFloat(input.value) || defaultValue);
  });
}

function setMass(setter, input, defaultValue) {
  setInput(setter, input, defaultValue);
}
function setSpeedX(setter, input, defaultValue) {
  setInput(setter, input, defaultValue);
}
function setSpeedY(setter, input, defaultValue) {
  setInput(setter, input, defaultValue);
}
function setAccelX(setter,input,defaultValue){
    setInput(setter,input,defaultValue);
}
function setAccelY(setter,input,defaultValue){
    setInput(setter,input,defaultValue);
}
function setPosX(setter, input, defaultValue) {
  setInput(setter, input, defaultValue);
}
function setPosY(setter, input, defaultValue) {
  setInput(setter, input, defaultValue);
}
function setFriction(setter,input,defaultValue){
  setInput(setter,input,defaultValue);
}

function bounceOffX() {
  if (circlePosX + mass / 3 > width || circlePosX - mass / 3 < 0) {
    circleVecX *= -0.95;
    accelX*=-0.95
  }
}

function bounceOffY() {
  if (circlePosY + mass / 3 > height || circlePosY - mass / 3 < 0) {
    circleVecY *= -0.95;
    accelY*=-0.95; 
  }
}

function applyFriction() {
  circleVecX *= (1 - friction);
  circleVecY *= (1 - friction);
}

function move(dt) {
  // v = u + at
  circleVecX += accelX * dt;
  circleVecY += accelY * dt;

  // s = ut + at^2/2
  circlePosX += circleVecX * dt + 0.5 * accelX * dt * dt;
  circlePosY += circleVecY * dt + 0.5 * accelY * dt * dt;
}
//get current Time
let lastTime = performance.now();

function animate(currentTime) {
  //get dt
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  ctx.clearRect(0, 0, width, height);
  drawCircle();
  applyFriction();
  move(deltaTime);
  bounceOffX();
  bounceOffY();
  show();
  requestAnimationFrame(animate);
}

function init() {
  setMass(ret => mass = ret, massInput, 20);
  setSpeedX(ret => circleVecX = ret, speedx, 1);
  setSpeedY(ret => circleVecY = ret, speedy, 0.85);
  setAccelX(ret=>accelX=ret,accelxInput,0.75);
  setAccelY(ret=>accelY=ret,accelyInput,0.5)  
  setPosX(ret => circlePosX = ret, posx, width / 2);
  setPosY(ret => circlePosY = ret, posy, height / 2);
  setFriction(ret=>friction=ret, frictionInput, 0);
}

function show(){
    showMass.innerText=`mass:${mass}`;
    showPosX.innerText=`posx:${circlePosX}`;
    showPosY.innerText=`posy:${circlePosY};`;
    showSpeedX.innerText=`speedx:${circleVecX}`;
    showSpeedY.innerText=`speedy:${circleVecY}`;
    showAccelX.innerText=`accelx:${accelX}`;
    showAccelY.innerText=`accely:${accelY}`;
    showFriction.innerText=`friction:${friction}`
}
function run() {
  init();
  animate(performance.now());
}

run();
