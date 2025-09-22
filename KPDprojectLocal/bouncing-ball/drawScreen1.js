const canvas=document.getElementById("canvas");
const width=600;
const height=600;
canvas.width=width;
canvas.height=height;
const ctx=canvas.getContext("2d");
const drawBtn=document.getElementById("drawline");
const refreshBtn=document.getElementById("refresh-browser");
let counter=0;
function drawPoint(x,y,rX,rY,rot,startAngle,endAngle){
   ctx.beginPath();
   ctx.ellipse(x,y,rX,rY,rot,startAngle,endAngle);
   ctx.fill();
   ctx.closePath();
}
function drawFourPoint(){
    drawPoint(5,5,5,5,0,0,Math.PI*2);
    ctx.fillText("(0,0)")
    drawPoint(width-5,height-5,5,5,0,0,Math.PI*2);
    drawPoint(width-5,5,5,5,0,0,Math.PI*2);
    drawPoint(5,height-5,5,5,0,0,Math.PI*2);
}
function drawLine(x1,y1,x2,y2){
   ctx.beginPath();
   ctx.moveTo(x1,y1);
   ctx.lineTo(x2,y2);
   ctx.stroke();
   ctx.closePath()
}
drawBtn.addEventListener("click",()=>{
   if(counter==0){
      drawLine(5,5,width-5,5);
   }
   else if(counter==1){
      drawLine(width-5,5,width-5,height);
   }
   else if(counter==2){ 
      drawLine(width-5,height,5,height-5);
   }
   else if(counter==3){
      drawLine(5,height-5,5,5)
   }
   counter++;
})
refreshBtn.addEventListener("click",()=>{
   window.location.reload();
})
drawFourPoint();

