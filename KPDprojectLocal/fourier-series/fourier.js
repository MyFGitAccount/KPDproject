const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let time = 0;
let wave = []
const num = 5;
const r = 75;
const originX = 300;
const originY = 300;
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  let x = originX;
  let y = originY

  for (let i = 0; i < num; i++) {
    let n = i * 2 + 1;
    let radius = r * (4 / (n * Math.PI));
    let prevX = x;
    let prevY = y

    ctx.beginPath();
    ctx.strokeStyle = "gray";
    ctx.arc(prevX, prevY, radius, 0, Math.PI * 2);
    ctx.stroke()

    x += radius * Math.cos(n * time);
    y += radius * Math.sin(n * time)

    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = "black";
    ctx.stroke();
  }

  wave.unshift(y)
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(originX + 200, wave[0]);
  ctx.strokeStyle = "red";
  ctx.stroke()
  ctx.beginPath();
  ctx.moveTo(originX + 200, wave[0]);
  for (let i = 0; i < wave.length; i++) {
    ctx.lineTo(originX + 200 + i, wave[i]);
  }
  ctx.strokeStyle = "blue";
  ctx.stroke()

  if (wave.length > 600) {
    wave.pop();
  }
  time += 0.03;
}
function animate() {
  draw();
  requestAnimationFrame(animate);
}
animate();
