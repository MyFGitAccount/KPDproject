const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
const width=600;
const height=600;
canvas.height=height;
canvas.width=width;
//Math.PI*2=360 
function RtoA(angle){
    return angle/Math.PI*180;
}
const r=10
const angle=RtoA(70);

function drawCanvas(){
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(0,width);
    ctx.lineTo(height,width);
    ctx.lineTo(height,0);
    ctx.lineTo(0,0);
    ctx.stroke();
    ctx.closePath();
}
function drawPendulum(a){
    let y=r*Math.cos(a);
    let x=r*Math.sin(a);
    ctx.beginPath();
    ctx.moveTo(width/2,0);
    ctx.lineTo(x,y);
    ctx.strokeStyle="#181818";
    ctx.stroke();
    ctx.closePath();
}
drawCanvas();
drawPendulum(angle);
