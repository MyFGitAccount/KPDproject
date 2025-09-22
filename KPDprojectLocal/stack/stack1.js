class Stack{
   constructor(){
      this.capacity=1024;
      this.size=0;
      this.data=[]; // fixed initialization
   }
   push=(data)=>{
      if(this.size>=this.capacity) return
      this.data[this.size]=data;
      this.size++;
   }
   pop=()=>{
     if(this.size == 0) return
     let popData=this.data[this.size - 1]; // fixed index
     this.size--;
     return popData;
   }
   printStack=()=>{
      for(let i=0;i<this.size;i++){
         console.log(`stack[${i}]:${this.data[i]}`);
      }
   }
   isEqual=(op)=>{
     if(op===this.data[this.size - 1] && typeof(this.data[this.size - 2])=="number" && typeof(this.data[this.size - 3])=="number"){ // fixed index
        this.pop();
        return true;
     }
     return false;
   }
   eval=()=>{
      if(this.isEqual("+")){
        let num1=this.pop();
        let num2=this.pop();
        this.size++;
        let result=num2+num1;
        this.data[this.size]=result;
        return result;
      }
      else if(this.isEqual("-")){
        let num1=this.pop();
        let num2=this.pop();
        this.size++;
        let result=num2-num1;
        this.data[this.size]=result;
        return result;
      } 
      else if(this.isEqual("/")){ 
        let num1=this.pop();
        let num2=this.pop();
        this.size++;
        let result=num2/num1;
        this.data[this.size]=result;
        return result;
      }
      else if(this.isEqual("*")){ 
        let num1=this.pop();
        let num2=this.pop();
        this.size++;
        let result=num2*num1;
        this.data[this.size]=result;
        return result;
      }
      else if(this.isEqual("^")){ 
        let num1=this.pop();
        let num2=this.pop();
        this.size++;
        let result=Math.pow(num2,num1);
        this.data[this.size]=result;
        return result;
      }
      else{
       return "sorry this op[eration is not currently supported";
      }
   }
   drawStackImg=(ctx,level)=>{
     ctx.beginPath();
     ctx.moveTo(ctx.canvas.width/2-30,10+10*level); 
     ctx.lineTo(ctx.canvas.width/2,10+10*level);
     ctx.lineTo(ctx.canvas.width/2,10+10*level+10);
     ctx.lineTo(ctx.canvas.width/2-30,10+10*level+10);
     ctx.lineTo(ctx.canvas.width/2-30,10+10*level);
     ctx.stroke();
     ctx.fillText(this.data[level], ctx.canvas.width/2-16,10+10*level+8);
   }
   drawStack=(ctx)=>{
     for(let i=0;i<this.size;i++){
        this.drawStackImg(ctx,i);
     }
   }
}

let stack=new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
const height=600;
const width=600;
canvas.width=width;
canvas.height=height;
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
stack.pop();
stack.pop();
stack.push('+');
stack.push(5);
stack.push(7);
stack.push("-");
stack.eval();
drawCanvas();
stack.drawStack(ctx);
