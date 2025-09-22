class Stack{
   constructor(){
      this.capacity=1024;
      this.size=0;
      this.data=[];
   }
   push=(data)=>{
      if(this.size>=this.capacity) return
      this.data[this.size]=data;
      this.size++;
   }
   pop=()=>{
     if(this.size == 0) return
     let popData=this.data[this.size-1];
     this.size--;
     return popData;
   }
   printStack=()=>{
      for(let i=0;i<this.size;i++){
         console.log(`stack[${i}]:${this.data[i]}`);
      }
   }
   isEqual=(op)=>{
     return (op===this.data[this.size-1]&&typeof(this.data[this.size-2])=="number"&&typeof(this.data[this.size-3])=="number")
   }
   eval=()=>{
      if(this.isEqual("+")){
        this.pop();
        let num1=this.pop();
        let num2=this.pop();
        let result=num2+num1;
        this.data[this.size]=result;
        this.size++;
        return result;
      }
      else if(this.isEqual("-")){
        this.pop();
        let num1=this.pop();
        let num2=this.pop();
        let result=num2-num1;
        this.data[this.size]=result;
        this.size++;
        return result;
      } 
      else if(this.isEqual("/")){ 
        this.pop();
        let num1=this.pop();
        let num2=this.pop();
        let result=num2/num1;
        this.data[this.size]=result;
        this.size++;
        return result;
      }
      else if(this.isEqual("*")){ 
        this.pop();
        let num1=this.pop();
        let num2=this.pop();
        let result=num2*num1;
        this.data[this.size]=result;
        this.size++;
        return result;
      }
      else if(this.isEqual("^")){ 
        this.pop();
        let num1=this.pop();
        let num2=this.pop();
        let result=Math.pow(num2,num1);
        this.data[this.size]=result;
        this.size++;
        return result;
      }
      else{
       return "sorry this operation is not currently supported";
      }
   }
   drawStackImg=(ctx,level)=>{
     let x=ctx.canvas.width/2-30;
     let xoffset=50;
     let y=10+30*level;
     let yoffset=30;
     let textxoffset=16;
     let textyoffset=10;
     ctx.beginPath();
     ctx.moveTo(x,y);
     ctx.lineTo(x+xoffset,y);
     ctx.lineTo(x+xoffset,y+yoffset);
     ctx.lineTo(x,y+yoffset);
     ctx.lineTo(x,y);
     ctx.stroke();
     ctx.fillText(this.data[level], x+textxoffset,y+textyoffset);
   }
   drawStack=(ctx)=>{
     for(let i=0;i<this.size;i++){
        this.drawStackImg(ctx,i);
     }
   }
}

let stack=new Stack();
const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
const height=700;
const width=700;
canvas.width=width;
canvas.height=height;
const btn1=document.getElementById("btn-1");
const btn2=document.getElementById("btn-2");
const btn3=document.getElementById("btn-3");
const btn4=document.getElementById("btn-4");
const btn5=document.getElementById("btn-5");
const btn6=document.getElementById("btn-6");
const btn7=document.getElementById("btn-7");
const btn8=document.getElementById("btn-8");
const btn9=document.getElementById("btn-9");
const btnADD=document.getElementById("btn-add");
const btnSUB=document.getElementById("btn-sub");
const btnMUL=document.getElementById("btn-mul");
const btnDIV=document.getElementById("btn-div");
const btnEVAL=document.getElementById("btn-eval");
function numberBtnList(numBtn,num,currStack){
   numBtn.addEventListener("click",()=>{
      currStack.push(num);
      ctx.clearRect(0,0,width,height);
      drawCanvas();
      stack.drawStack(ctx);
   })
}
function oprBtnList(oprBtn,opr,currStack){
   oprBtn.addEventListener("click",()=>{
      currStack.push(opr);
      ctx.clearRect(0,0,width,height);
      drawCanvas();
      currStack.drawStack(ctx);
   })
}

function evalFunc(evalBtn,currStack){
   evalBtn.addEventListener("click",()=>{
      currStack.eval();
      ctx.clearRect(0,0,width,height);
      drawCanvas();
      currStack.drawStack(ctx);
   })
}
function drawCanvas(){
   ctx.beginPath();
   ctx.moveTo(0,0);
   ctx.lineTo(0,height);
   ctx.lineTo(width,height);
   ctx.lineTo(width,0);
   ctx.lineTo(0,0);
   ctx.strokeStyle="black";
   ctx.stroke();
   ctx.closePath();
}
numberBtnList(btn1,1,stack);
numberBtnList(btn2,2,stack);
numberBtnList(btn3,3,stack);
numberBtnList(btn4,4,stack);
numberBtnList(btn5,5,stack);
numberBtnList(btn6,6,stack);
numberBtnList(btn7,7,stack);
numberBtnList(btn8,8,stack);
numberBtnList(btn9,9,stack);

oprBtnList(btnADD,"+",stack);
oprBtnList(btnSUB,"-",stack);
oprBtnList(btnMUL,"*",stack);
oprBtnList(btnDIV,"/",stack);

evalFunc(btnEVAL,stack);
drawCanvas();

//stack.drawStack(ctx);
