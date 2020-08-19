var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var W = window.innerWidth;
var H = window.innerHeight;
canvas.width = W;
canvas.height = H;
var inputVal = localStorage.getItem('inputVal');
var arr = [];

 var handle = {
        x: W/2,
        y:H/2,
        w:300
    }

  

  

 var h = handle.y;




 for(var i=0;i<inputVal.length;i++)
 {
     if(inputVal[i]!='E')
     {
         arr.push(inputVal[i]);
     }
 }

 window.onload = function(){
     drawOreo();
 }

 var dragCircle={
    x: handle.x + 320,
    y: h+20,
    r: 10
 }



  function drawOreo()
  {
    for(var i=0;i<arr.length;i++)
    {
        if(arr[i]=='O')
        {   
            for(var j=0;j<5;j++)
            {
                drawCylinder(ctx,handle.x,h,handle.w,10,"#181818");
                h=h+10;
            }
      
        }
        if(arr[i]=='R')
        {   
            drawCylinder(ctx,handle.x+25,h,handle.w*0.8,25,"#fffdd0");
            h=h+25;
        }
    }

      ctx.beginPath();
      ctx.rect(handle.x-20, handle.y-20, 340, h-handle.y+40);
      ctx.stroke();

    

    //   ctx.beginPath();
    //   ctx.arc(dragCircle.x,dragCircle.y,dragCircle.r,0,Math.PI*2,true);
    //   ctx.fillStyle="#c70039";
    //   ctx.fill();

  }
  
  

    





document.body.addEventListener("mousedown",(event)=>{
    if(distanceXY(handle.x,handle.y,event.clientX,event.clientY))
    {
        document.body.addEventListener("mousemove",onMouseMove);
        document.body.addEventListener("mouseup",onMouseUp);
    }
    if(collisionDistance(event.clientX,event.clientY,dragCircle.x,dragCircle.y)<dragCircle.r)
    {
        document.body.addEventListener("mousemove",onMouseMoveDrag);
        // document.body.addEventListener("mouseup",onMouseUpDrag);
    }
})
 

function onMouseMove(event)
{
  
    ctx.clearRect(handle.x-50,handle.y-50,400,h+100)
    handle.x = event.clientX;
    handle.y = event.clientY;
    dragCircle.x = handle.x + 320
    
    h=handle.y;
    dragCircle.y = h+20;
    drawOreo();
  
}

function onMouseUp()
{
    document.body.removeEventListener("mousemove",onMouseMove);
    document.body.removeEventListener("mouseup",onMouseUp);
}

function onMouseMoveDrag(event)
{

}


function distanceXY(x0, y0, x1, y1) {
    var dx = x1 - x0,
        dy = y1 - y0;
        if(dx<300 && dy<h)
        {
            return 1;
        }
        else
        {
            return 0;
        }
 
}

function collisionDistance(x0,y0,x1,y1){
    var dx = x1 - x0,
        dy = y1 - y0;
        console.log(Math.sqrt(dx*dx+dy*dy));
        return Math.sqrt(dx*dx+dy*dy);
       
}
























function drawCylinder(ctx, x, y, w, h,color) {
    'use strict';
    var i, xPos, yPos, pi = Math.PI, twoPi = 2 * pi;

    ctx.beginPath();

    for (i = 0; i < twoPi; i += 0.001) {
        xPos = (x + w / 2) - (w / 2 * Math.cos(i));
        yPos = (y + h / 8) + (h / 8 * Math.sin(i));

        if (i === 0) {
            ctx.moveTo(xPos, yPos);
        } else {
            ctx.lineTo(xPos, yPos);
        }
    }
    ctx.moveTo(x, y + h / 8);
    ctx.lineTo(x, y + h - h / 8);
 

    for (i = 0; i < pi; i += 0.001) {
        xPos = (x + w / 2) - (w / 2 * Math.cos(i));
        yPos = (y + h - h / 8) + (h / 8 * Math.sin(i));

        if (i === 0) {
            ctx.moveTo(xPos, yPos);
        } else {
            ctx.lineTo(xPos, yPos);
        }
    }
    ctx.moveTo(x + w, y + h / 8);
    ctx.lineTo(x + w, y + h - h / 8);
    ctx.stroke();
  
 
      ctx.fillStyle=color;
      ctx.fill();

}