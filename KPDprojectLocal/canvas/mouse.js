const canvas = document.getElementById("canvas");
const width = 500;
const height = 500;
const color = ["LavenderBlush","AliceBlue","AntiqueWhite","Aquamarine","BlueViolet","Coral","DarkOliveGreen","DarkSalmon","DeepPink","FireBrick","Gold","GoldenRod","HoneyDew","HotPink","IndianRed","OrangeRed","LightSalmon","LightCoral","LemonChiffon","Lavender"];
//const color=["Aquamarine","BlueViolet","Coral","DeepPink"]
canvas.width = width;
canvas.height = height;

const ctx = canvas.getContext("2d");


ctx.beginPath();
ctx.rect(0, 0, width, height);
ctx.strokeStyle = "black";
ctx.stroke();
ctx.closePath();

let isMouseDown = false;

canvas.addEventListener("mousedown", () => {
  isMouseDown = true;
});

canvas.addEventListener("mouseup", () => {
  isMouseDown = false;
});


canvas.addEventListener("mouseleave", () => {
  isMouseDown = false;
});


document.addEventListener("mousemove", function (event) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  if (isMouseDown) {
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
      console.log(`X: ${mouseX}, Y: ${mouseY}`);
      const colorIndex = Math.floor(Math.random() * color.length);
      ctx.beginPath();
      ctx.arc(mouseX, mouseY,20,0,Math.PI*2);
      ctx.fillStyle = color[colorIndex];
      ctx.fill();
      ctx.closePath();
    }
  }
});


