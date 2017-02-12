
var contentbuttons;
var contentheaders;

function readFile(file, out, out2) {
	
var http = new XMLHttpRequest();
http.open('get', file);
http.onreadystatechange = function () {	
	
	if (http.readyState == 4) {
		
        if (http.responseText) {			
			out.innerHTML = http.responseText;			
			
			var result = "<div id='#top' class='content_button active'><h4>Top</h4></div>\n";
			
			contentheaders = out.getElementsByTagName("h2");
			
			var buttonoffset = 0;
			
			for (i = 0; i < contentheaders.length; i++) {								
				result +=  "<div id='#"+contentheaders[i].id  +"' class='content_button'><h4>"+contentheaders[i].id +"</h4></div>\n";				
			}			
			
			out.scrollTop = 0;
			out2.innerHTML = result;	
			contentbuttons = out2.getElementsByClassName("content_button");			
			contentbuttons[0].style.top = "10px";
			contentbuttons[0].style.left = "5px";
			
			for(var i=1; i<contentbuttons.length; i++) {
				
				contentbuttons[i].style.top = parseInt(contentbuttons[i-1].style.top) -12 +"px";
				
				if(parseInt(contentbuttons[i-1].style.left,10) < 15) {
					contentbuttons[i].style.left = 16 +"px";
				}
				else {
					contentbuttons[i].style.left = "5px";
				}
			}	
			
			var srcs = textfield.getElementsByTagName("img");
			var interval = setInterval(check, 500);
			var allSet = true;
			
			function check(){
				allSet = true;
				for(i=0; i<srcs.length;i++) {
					if(srcs[i].height === 0) {
						allSet = false;
						break;
					}					
				}
				
				
				if(counter > 4 || allSet) {
					
					clearInterval(interval);
					drawScrollbar();
					
				}
				counter+=1;				
			}	
		}
		
    }	
};
http.send();

}

function makeContent() {
	
}

function createContentButtons(result) {

	
	var htmlText = "";
	for(var i=0;i<result.length; i++) {
		if(i==0) {
			htmlText += "<div class='tier2 active' id='" +result[i] +"'><h4>"+result[i].slice(2,-5) +"</h4></div>";
		}
		else {
			htmlText += "<div class='tier2' id='" +result[i] +"'><h4>"+result[i].slice(2,-5) +"</h4></div>";
		}
	}
	var tierelement = document.getElementById('tier2');
	tierelement.innerHTML = htmlText;
	
	setTier2Buttons();		
	readFile('database/'+activeid +'/' +result[0], document.getElementById('text-file'), document.getElementById('content_buttons'), document.getElementById('text-file').scrollTop);					
	
}
function makeMainClick(e) {		
				
	if(e.target.nodeName == "DIV") {
		
		var current = e.target;
		for(i=0; i<current.parentNode.children.length; i++) {
			current.parentNode.children[i].classList.remove("active");
		}
		current.classList.add("active");
	//	setMainButtons();
		//readFile('database/' +current.id, document.getElementById('text-file'), document.getElementById('content_buttons'), document.getElementById('text-file').scrollTop);					
		activeid = current.id;
		socket.emit('mainfetch', 'games/lol/database/'+current.id);
	}	
	else if(e.target.parentNode.nodeName == "DIV") {
		var current = e.target.parentNode;
		for(i=0; i<current.parentNode.children.length; i++) {
			current.parentNode.children[i].classList.remove("active");
		}
		current.classList.add("active");
		activeid = current.id;
		socket.emit('mainfetch', 'games/lol/database/'+current.id);
	//	setMainButtons();
		//readFile('database/' +current.id, document.getElementById('text-file'), document.getElementById('content_buttons'), document.getElementById('text-file').scrollTop);					
		
	}
}
function makeTier2Click(e) {		
				
	if(e.target.nodeName == "DIV") {
		
		var current = e.target;
		for(i=0; i<current.parentNode.children.length; i++) {
			current.parentNode.children[i].classList.remove("active");
		}
		current.classList.add("active");
		setMainButtons();
		readFile('database/' +activeid +'/' +current.id, document.getElementById('text-file'), document.getElementById('content_buttons'), document.getElementById('text-file').scrollTop);					
		
	
	}	
	else if(e.target.parentNode.nodeName == "DIV") {
		var current = e.target.parentNode;
		for(i=0; i<current.parentNode.children.length; i++) {
			current.parentNode.children[i].classList.remove("active");
		}
		current.classList.add("active");
		
		setMainButtons();
		readFile('database/' +activeid +'/' +current.id, document.getElementById('text-file'), document.getElementById('content_buttons'), document.getElementById('text-file').scrollTop);					
		
	}
}
function makeContentClick(e) {						
	if(e.target.nodeName == "DIV") {
		var current = e.target;
		/*
		for(i=0; i<current.parentNode.children.length; i++) {
			e.target.parentNode.children[i].classList.remove("active");
		}
		current.classList.add("active");
		*/
		
		if(current.id === "#top") {
			 $('.content_text').animate({scrollTop:0}, 'slow');
		}
		else {
			var value = current.id;	
					
			var header = document.getElementById(value.substring(1));	
			
			$('.content_text').animate({scrollTop:header.offsetTop}, 'slow');
		}
	}		
	
}

function setMainButtons() {				
	
	for(i=0;i<buttondivs.length; i++) {
	
		if(buttondivs[i].classList.contains("active")) {
			activebutton = i;
			
			break;
		}
	}
	buttondivs[activebutton].style.left = "40px";
	for(i = activebutton-1; i>= 0; i--) {
		//offset = parseInt(buttondivs[i+1].style.top,10);
		if(buttondivs[i+1].classList.contains("active") || parseInt(buttondivs[i+1].style.left,10) > 30) {
			buttondivs[i].style.left = "5px";
		}
		else {
			buttondivs[i].style.left = "40px";
		}
	//	buttondivs[i].style.top = offset +"px";
		
	}
	for(i = activebutton+1; i<buttondivs.length; i++) {
		offset = parseInt(buttondivs[i-1].style.top,10);
		if(buttondivs[i-1].classList.contains("active") || parseInt(buttondivs[i-1].style.left,10) > 30) {
			buttondivs[i].style.left = "5px";
		}
		else {
			buttondivs[i].style.left = "40px";
		}
		buttondivs[i].style.top = offset-25 +"px";
		
	}	
	
}

function setTier2Buttons() {				
	var buttons = document.getElementsByClassName("tier2");
	buttons[0].style.left = "1px";
	buttons[0].style.top = "10px";
	for(i = 1; i< buttons.length; i++) {
		offset = parseInt(buttons[i-1].style.top,10);
		
		if(parseInt(buttons[i-1].style.left,10) > 20) {
			buttons[i].style.left = "1px";
		}
		else {
			buttons[i].style.left = "25px";
		}
		buttons[i].style.top = offset-18 +"px";
		
	}
}

var activebutton = 0;

function checkHeader() {
	/*if(textfield.scrollTop > 20) {
		if(!header.classList.contains("scrolling")) {
			header.classList.add("scrolling");
			
		}
		
	}
	else {
		header.classList.remove("scrolling");
	}*/
	
	if(contentheaders[0].getBoundingClientRect().top > 10) {
		
		if(!contentbuttons[0].classList.contains("active")) {
			
			for(j=1; j<contentbuttons.length; j++) {
				contentbuttons[j].classList.remove("active");
			}
			contentbuttons[0].classList.add("active");
			activebutton = 0;
			
		//	drawScrollbar();		
		}
	}
	else {
		
		var lowest = 0;
		for(var i = 0; i<contentheaders.length; i++) {					
			if(contentheaders[i].getBoundingClientRect().top < 10) {
				lowest = i;								
			}	
			else {
				break;
			}
		}
		if(!contentbuttons[lowest+1].classList.contains("active")) {
			for(j=0; j<contentbuttons.length; j++) {
				contentbuttons[j].classList.remove("active");
			}
			
			contentbuttons[lowest+1].classList.add("active");	
			activebutton = lowest+1;
		//	drawScrollbar();
		}
			
	}
	drawScrollbar();
}
function map(value,istart,istop,ostart, ostop) {
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}

var scrollposition= 0;
var scrollbarheight =0;
function drawScrollbar() {
	
	ctx.clearRect(0, 0, c.width, c.height);
	var preypos = 6;
	var ypos;
	scrollposition = map(textfield.scrollTop,0,textfield.scrollHeight, 0, c.height);
	scrollbarheight = textfield.clientHeight/(textfield.scrollHeight/textfield.clientHeight);
	for(var i=0;i<contentheaders.length;i++) {
		
		ypos = map(contentheaders[i].offsetTop,0,textfield.scrollHeight, 0, c.height);
		
		
		ctx.beginPath();
		ctx.moveTo(middle,ypos);
		ctx.lineTo(middle,preypos+20);		
		ctx.stroke(); 		
		if(i != activebutton-1) {
			
			drawHexagon(ctx,middle,ypos,10,5,basic);	
		}
		
		preypos = ypos;
	}
	
	if(activebutton > 0) {
		ypos = map(contentheaders[activebutton-1].offsetTop,0,textfield.scrollHeight, 0, c.height);
		drawHexagon(ctx,middle,ypos,10,5,active);	
		drawHexagon(ctx, middle, 6, 10, 5, basic);	
	}
	else {		
		drawHexagon(ctx, middle, 6, 10, 5, active);	
		
	}
	ctx.fillStyle = basic;	
	ctx.fillRect(10,scrollposition,10,scrollbarheight);
	ctx.fillStyle = "#FFFFFF";	
	ctx.fillRect(13,scrollposition+2,4,scrollbarheight-4);

}

function drawHexagon(context,x,y,r,thickness, color) {	
	
	context.fillStyle=color;	
	context.translate(x,y);
	context.rotate(-Math.PI/3);	
	context.fillRect(0,-thickness/2,thickness,r+thickness);
	for(var i=0;i<5;i++) {
		context.translate(0,r);
		context.rotate(Math.PI/3);		
		context.fillRect(0,-thickness/2,thickness,r+thickness);	
	}	
	context.setTransform(1, 0, 0, 1, 0, 0);
}

function setLabelImages() {
	
	var icons = document.getElementsByClassName("icon");
	/*
	for() {
		
	}*/
}

function animationTest() {
		/*var canvas = document.getElementById("draw");
		var ctx = canvas.getContext('2d');
		var x = 10;
		var y = 10;
		var thickness = 4;
		var r = 20;
		var color = "black";
		ctx.fillStyle="#000000";	
		canvas.width = 500;
		canvas.height = 500;
		var frames = 0;
		//var interval = setInterval(drawHexagon(ctx, 50,50,40,4,"black"), 100);
		//var interval = setInterval(draw, 100);
		//
		drawHexagon(ctx, 100,100,40,4,"black");
		var interval;
		function drawHexagon(context,x,y,r,thickness, color) {	
		   interval = setInterval(function() {animateLine(ctx,x,y,thickness,r); }, 100);
		}
		var increment = 0;
		var sides = 0;
		function animateLine(cont,x,y, width, height) {
		   if(sides===0 && increment === 0) { 
			context.translate(x,y); 
			context.rotate(-Math.PI/3);}
		   else if(sides !== 0 && increment === 0) { 
			context.translate(0,r);  
			context.rotate(Math.PI/3);
		   }
			if(increment >= height) {
				increment = 0;
				sides++;
			}
		  
		  if(sides >=5) {
			context.setTransform(1, 0, 0, 1, 0, 0);
			clearInterval(interval);
		  }
		  increment++;
	}*/
}

