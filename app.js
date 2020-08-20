

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var W = window.innerWidth;
var H = window.innerHeight;
canvas.width = W;
canvas.height = H;
var number = localStorage.getItem('number');
var oreoStrings = [];
var inputVal = localStorage.getItem('inputVal0');
var arr = [];
var oreoArr = [];
var handleLocation =[];
var hArr = [];
var singularArr = [];
var isDragging = [];
var p =0;


for(var i=0;i<number;i++)
{
    oreoStrings.push(localStorage.getItem('inputVal'+i));
    handleLocation.push(
         {
            x: i*W/3,
            y:W/5,
            w: W/5
        }

    )
    hArr.push(handleLocation[i].y);
    isDragging.push(false);
}

for(var j=0;j<oreoStrings.length;j++)
{   singularArr = [];
    for(var i=0;i<oreoStrings[j].length;i++)
    {
        if(oreoStrings[j][i]!='E')
        {
            singularArr.push(oreoStrings[j][i]);
        }
    }
    oreoArr.push(singularArr);
}





 window.onload = function(){
     drawOreo();
     
 }

 



 

  function drawOreo()
  {  

   if(p==0)
   {p++;
    for(var k=0;k<oreoArr.length;k++)
    {  
        for(var l =0;l<oreoArr[k].length;l++)
        {
            if(oreoArr[k][l]=='O')
            {   
                for(var j=0;j<5;j++)
                {
                    drawCylinder(ctx,handleLocation[k].x,hArr[k],handleLocation[k].w,W/200,"#181818");
                    hArr[k]=hArr[k]+W/200;
                }
          
            }
            if(oreoArr[k][l]=='R')
            {   
                drawCylinder(ctx,handleLocation[k].x+(0.1*handleLocation[k].w),hArr[k],handleLocation[k].w*0.8,W/125,"#fffdd0");
                hArr[k]=hArr[k]+W/125;
            }
        }

        ctx.beginPath();
        ctx.rect(handleLocation[k].x-W/100, handleLocation[k].y-W/100, handleLocation[k].w + W/50, hArr[k]-handleLocation[k].y+W/50);
        ctx.stroke();
    }

   }
   else
   {
    for(var k=0;k<oreoArr.length;k++)
    {   

        if(isDragging[k]==true)
        {
            for(var l =0;l<oreoArr[k].length;l++)
            {
                if(oreoArr[k][l]=='O')
                {   
                    for(var j=0;j<5;j++)
                    {
                        drawCylinder(ctx,handleLocation[k].x,hArr[k],handleLocation[k].w,W/200,"#181818");
                        hArr[k]=hArr[k]+W/200;
                    }
              
                }
                if(oreoArr[k][l]=='R')
                {   
                    drawCylinder(ctx,handleLocation[k].x+(0.1*handleLocation[k].w),hArr[k],handleLocation[k].w*0.8,W/125,"#fffdd0");
                    hArr[k]=hArr[k]+W/125;
                }
            }
    
            ctx.beginPath();
            ctx.rect(handleLocation[k].x-W/100, handleLocation[k].y-W/100, handleLocation[k].w + W/50, hArr[k]-handleLocation[k].y+W/50);
            ctx.stroke();
        }
      
    }

   }

    
     

    

  }
  
  

    


  var tempArr = [];
document.body.addEventListener("mousedown",(event)=>{
 
    for(var i=0;i<handleLocation.length;i++)
    {    tempArr.push(hArr[i]);
        // console.log(distanceXY(handleLocation[i].x,handleLocation[i].y,event.clientX,event.clientY,hArr[i]));
        if(distanceXY(handleLocation[i].x,handleLocation[i].y,event.clientX,event.clientY,tempArr[i]))
        {   
            console.log("true");
            isDragging[i] = true;
            document.body.addEventListener("mousemove",(event)=>{
                onMouseMove(event);
            });
            document.body.addEventListener("mouseup",onMouseUp);
        }
   
       
    }
})






var l=0;
function onMouseMove(event)
{  
   for(i=0;i<handleLocation.length;i++)
   {
       if(isDragging[i]==true)
       {
           ctx.clearRect(handleLocation[i].x-W/90,handleLocation[i].y-W/45,handleLocation[i].w+W/45,hArr[i]+W/22.5);
           handleLocation[i].x = event.clientX;
           handleLocation[i].y = event.clientY;
           drawOreo();
           hArr[i] = handleLocation[i].y
       }
      
       hArr[i] = handleLocation[i].y;
   }
   
}

function onMouseUp()
{  
    for(i=0;i<handleLocation.length;i++)
    {
        if(isDragging[i]=true)
        {
            isDragging[i]=false;
            document.body.removeEventListener("mousemove",(event));
            document.body.removeEventListener("mouseup",onMouseUp);
        }
    }
  
}




function distanceXY(x0, y0, x1, y1,h) {
    var dx = x1 - x0,
    dy = y1 - y0;
    // console.log(dx + " "+ dy);
    console.log(h);
    if(dx< W/5 && dy<h && dy>0 && dx>0&&dy<(h-y0))
    {

        return 1;
      
    }
    else
    {
        return 0;
    }
    
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