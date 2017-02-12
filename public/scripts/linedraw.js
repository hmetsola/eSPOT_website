function findPos(obj){
var curleft = 0;
var curtop = 0;
var height = obj.clientHeight/2+7;
if (obj.offsetParent) {
	do {
		curleft += obj.offsetLeft;
		curtop += obj.offsetTop;
		
	} while (obj = obj.offsetParent);

		return {X:curleft,Y:curtop, H:height};
	}
}
result = findPos(document.getElementById('test'));

var c=document.getElementById("content_scrollbar");
var ctx=c.getContext("2d");
ctx.beginPath();
var middle = result.Y+result.H;
document.write(result.Y);
ctx.moveTo(0,160);
ctx.lineTo(100,138);
ctx.lineWidth=16;
ctx.stroke(); 
	