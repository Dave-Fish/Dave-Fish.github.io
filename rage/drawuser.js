// made by Dave Fish
// 02.11.19

console.log("drawUser");

var hue = 0;
var mainColour2 = GREY;
var greyness = 0;
var whiteFlag = false;

drawUser = function(){
	if (green == undefined){
		green = Math.random()*150;
	}
		
	if (redFlag == false && orangeFlag == false && yellowFlag == false && greenFlag == false && blueFlag == false && purpleFlag == false){
		hue += 10;
		var saturation = "100%";
		var lightness = "87%";
		var mainColour = 'hsl('+hue+','+saturation+','+lightness+')';
	}
	
	//if (redFlag == false && orangeFlag == false && yellowFlag == false && greenFlag == false && blueFlag == false && purpleFlag == false){
		greyness += 2;
		if (greyness>230){
			whiteFlag = true;
		}
		if (whiteFlag){
			greyness -= 4;
		}
		if (greyness<130){
			whiteFlag = false;
		}

		var mainColour2 = 'rgb('+greyness+','+greyness+','+greyness+')';

	//}
	
	if (greenFlag){
		hue += 10;
		var saturation = "100%";
		var lightness = "72%";
		var mainColour = 'hsl('+hue+','+saturation+','+lightness+')';

		// the colour for the second circle
		var mainColour2 = 'rgb('+(greyness-130)+',221,'+(greyness-80)+')';
	}
	
	if (redFlag){
		var red = 255;
		green += 1;
		if (green > 100){
			green = 80;
		}
		var mainColour = 'rgb('+red+','+green+','+green+')';
	}
	
	if (orangeFlag){
		var red = 225;
		var green = (Math.random()*100)+100;
		var blue = (Math.random()*50)+50;
		var mainColour = 'rgb('+red+','+green+','+blue+')';
	}
	
	if (yellowFlag){
		var red = 255;
		var green = 255;
		var blue = (Math.random()*155)+100;
		var mainColour = 'rgb('+red+','+green+','+blue+')';
		
		context.fillStyle = mainColour;
		context.fillText("banana!",canvas.width/80,canvas.height/4);
	}
	
	if (blueFlag){
		var red = (Math.random()*50)+100;
		var green = red+50;
		var blue = 255;
		var mainColour = 'rgb('+red+','+green+','+blue+')';
	}
	
	if (purpleFlag){
		var red = 153;
		var green = (Math.random()*55)+50;
		var blue = 153;
		var mainColour = 'rgb('+red+','+green+','+blue+')';
	}

	if (multiplayerFlag){
		if (redFlag2){
			var red = 255;
			green += 1;
			if (green > 100){
				green = 80;
			}
			var mainColour2 = 'rgb('+red+','+green+','+green+')';
		}
		
		if (orangeFlag2){
			var red = 225;
			var green = (Math.random()*100)+100;
			var blue = (Math.random()*50)+50;
			var mainColour2 = 'rgb('+red+','+green+','+blue+')';
		}
		
		if (yellowFlag2){
			var red = 255;
			var green = 255;
			var blue = (Math.random()*155)+100;
			var mainColour2 = 'rgb('+red+','+green+','+blue+')';
			
			context.fillStyle = mainColour;
			context.fillText("banana!",canvas.width/80,canvas.height/4);
		}
		
		if (blueFlag2){
			var red = (Math.random()*50)+100;
			var green = red+50;
			var blue = 255;
			var mainColour2 = 'rgb('+red+','+green+','+blue+')';
		}
		
		if (purpleFlag2){
			var red = 153;
			var green = (Math.random()*55)+50;
			var blue = 153;
			var mainColour2 = 'rgb('+red+','+green+','+blue+')';
		}
	}
	
	
	
	context.fillStyle = mainColour;
	context.beginPath();
	context.arc(user.x, user.y, user.radius, 0, 2*Math.PI);
	context.fill();
	
	if (multiplayerFlag){
		
		context.fillStyle = mainColour2;
		
		context.beginPath();
		context.arc(user2.x, user2.y, user2.radius, 0, 2*Math.PI);
		context.fill();
	}
}
