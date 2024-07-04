// made by Dave Fish
// 02.11.19

console.log("powerUps");

var currentColour = GREY;

// defines the value of each colour
const RED = "#f22";
const ORANGE = "#f72";
const YELLOW = "#ff5";
const GREEN = "#0d5";
const BLUE = "#2af";
const PURPLE = "#929";

colourInfo = function(){
	
	if (levelCount !== 1){
	
	context.direction = "rtl";
	var fontsize = canvas.height/30
	var fontsizeString = fontsize.toString();
	context.font = fontsizeString+"px Comic Sans MS";
	//context.fillText("1 year old",canvas.height/100,canvas.height/25);

	context.fillStyle = currentColour;

	if (currentColour == RED){
		if (levelCount % 5 == 4){
			context.fillText("slowly",canvas.width - canvas.width/80,canvas.height - canvas.height/80);
		}else{
			context.fillText("speedy",canvas.width - canvas.width/80,canvas.height - canvas.height/80);
		}
	}
	if (currentColour == ORANGE){
	context.fillText("anti chunky",canvas.width - canvas.width/80,canvas.height - canvas.height/80);
	}
	if (currentColour == YELLOW){
	context.fillText("chunky",canvas.width - canvas.width/80,canvas.height - canvas.height/80);
	}
	if (currentColour == GREEN){
	context.fillText("life",canvas.width - canvas.width/80,canvas.height - canvas.height/80);
	}
	if (currentColour == BLUE){
		if (levelCount % 5 == 0){
			context.fillText("extragrav",canvas.width - canvas.width/80,canvas.height - canvas.height/80);
		}else{
			context.fillText("antigrav",canvas.width - canvas.width/80,canvas.height - canvas.height/80);
		}
	}
	if (currentColour == PURPLE){
	context.fillText("!points",canvas.width - canvas.width/80,canvas.height - canvas.height/80);
	}
	context.direction = "ltr";
	
	}
}

// to tell me if the user hits its respective colour
var redFlag = false;
var orangeFlag = false;
var yellowFlag = false;
var greenFlag = false;
var blueFlag = false;
var purpleFlag = false;

// and for multiplayer
var redFlag2 = false;
var orangeFlag2 = false;
var yellowFlag2 = false;
// green is not needed because they share an extra life
var blueFlag2 = false;
var purpleFlag2 = false;

// for how often the user touches a powerup
var pointMultiplier = 1;

hitPower = function(){
	var px = user.x - powerCircle.x;
	var py = user.y - powerCircle.y;
	var distance = Math.sqrt(px * px + py * py);
	// console.log(distance);

	if (distance <= user.radius + powerCircle.radius){
		var currentLevel = levelCount;
		//console.log(pointMultiplier);
		//pointMultiplier += 1;

		if (currentColour == RED){
			console.log("red");
			if (levelCount % 5 == 4){
				// canvas.width/1000 is min speed
				if (user.x_speed > canvas.width/1000){
					user.x_speed -= canvas.width/3333;
					pointMultiplier += 0.1;
					// decreases speed every 1 in 5 
				}
			}else{
				// canvas.width/133 is max speed
				if (user.x_speed < canvas.width/133){
					user.x_speed += canvas.width/3333;
					pointMultiplier += 0.1;
				}
			}
			redFlag = true;
			// increases speed
		}
		
		if (currentColour == ORANGE){
			console.log("orange");
			if (user.radius > canvas.height/50){
				user.radius -= 1;
				if (pointMultiplier > 1){
					pointMultiplier -= 0.1;
				}
			}
			orangeFlag = true;
			// decreases size of player
		}
		
		if (currentColour == YELLOW){
			console.log("yellow");
			if (user.radius < canvas.height/3){
				user.radius += 1;
				pointMultiplier += 0.2;
			}
			yellowFlag = true;
			// increases size of player
		}
		
		if (currentColour == GREEN){
			console.log("green");
			greenFlag = true;
			if (pointMultiplier > 1){
				pointMultiplier -= 0.1;
			}

			// go over the level number in green to show the user that they have an extra life
			context.fillStyle = GREY;
			context.fillRect(0,0,canvas.width,canvas.height/20);
			
			var fontsize = canvas.height/30
			var fontsizeString = fontsize.toString();
			context.font = fontsizeString+"px Comic Sans MS";
			context.fillStyle = GREEN;
			context.fillText("safety!",canvas.height/80,canvas.height/25);
			// anti-pink
			// gives you an extra life (1 up)
		}
		
		if (currentColour == BLUE){
			console.log("blue");
			if (levelCount % 5 == 0){
				if (user.y_speed < canvas.height/416){
					user.y_speed += canvas.height/20000;
					pointMultiplier += 0.1;
					// more gravity every one in 5 levels
				}
			}else{
				if (user.y_speed > canvas.height/2000){
					user.y_speed -= canvas.height/20000;
					pointMultiplier += 0.1;
				}
			}
			blueFlag = true;
			// less gravity
		}
		
		if (currentColour == PURPLE){
			console.log("purple");
			pointMultiplier += 0.1;
			purpleFlag = true;
			// just gives points
		}
	}

	if (multiplayerFlag){
		var px = user2.x - powerCircle.x;
		var py = user2.y - powerCircle.y;
		var distance2 = Math.sqrt(px * px + py * py);
		// console.log(distance);

		if (distance2 <= user2.radius + powerCircle.radius){
			var currentLevel = levelCount;
			//console.log(pointMultiplier);
			//pointMultiplier += 1;

			if (currentColour == RED){
				console.log("red");
				if (levelCount % 5 == 4){
					// canvas.width/1000 is min speed
					if (user2.x_speed > canvas.width/1000){
						user2.x_speed -= canvas.width/3333;
						pointMultiplier += 0.1;
						// decreases speed every 1 in 5 
					}
				}else{
					// canvas.width/133 is max speed
					if (user2.x_speed < canvas.width/133){
						user2.x_speed += canvas.width/3333;
						pointMultiplier += 0.1;
					}
				}
				redFlag2 = true;
				// increases speed
			}
		
			if (currentColour == ORANGE){
				console.log("orange");
				if (user2.radius > canvas.height/50){
					user2.radius -= 1;
					if (pointMultiplier > 1){
						pointMultiplier -= 0.1;
					}
				}
				orangeFlag2 = true;
				// decreases size of player
			}
			
			if (currentColour == YELLOW){
				console.log("yellow");
				if (user2.radius < canvas.height/3){
					user2.radius += 1;
					pointMultiplier += 0.2;
				}
				yellowFlag2 = true;
				// increases size of player
			}
		
			if (currentColour == GREEN){
				console.log("green");
				greenFlag = true;
				if (pointMultiplier > 1){
					pointMultiplier -= 0.1;
				}

				// go over the level number in green to show the user that they have an extra life
				context.fillStyle = GREY;
				context.fillRect(0,0,canvas.width,canvas.height/20);
			
				var fontsize = canvas.height/30
				var fontsizeString = fontsize.toString();
				context.font = fontsizeString+"px Comic Sans MS";
				context.fillStyle = GREEN;
				context.fillText("safety!",canvas.height/80,canvas.height/25);
				// anti-pink
				// gives you an extra life (1 up)
			}
		
			if (currentColour == BLUE){
				console.log("blue");
				if (levelCount % 5 == 0){
					if (user2.y_speed < canvas.height/416){
						user2.y_speed += canvas.height/20000;
						pointMultiplier += 0.1;
						// more gravity every one in 5 levels
					}
				}else{
					if (user2.y_speed > canvas.height/2000){
						user2.y_speed -= canvas.height/20000;
						pointMultiplier += 0.1;
					}
				}
				blueFlag2 = true;
				// less gravity
			}
		
			if (currentColour == PURPLE){
				console.log("purple");
				pointMultiplier += 0.1;
				purpleFlag2 = true;
				// just gives points
			}
		}
	}
}

// gives it somewhere in the list of colours to start
var colourStart = Math.floor(Math.random()*5);

circlePower = function(){
	colours = [RED,ORANGE,YELLOW,GREEN,BLUE,PURPLE];

	var linePlacement = canvas.height/18;
	var thickness = canvas.height/80;
	
	colourStart += 1;
	if (colourStart > 5){
		colourStart = 0;
	}
	
	currentColour = colours[colourStart];
	
	if (levelCount !== 1 && levelCount !== 0 && levelCount){
		powerCircle.x = Math.random()*(canvas.width/6*5)+canvas.width/7
		powerCircle.y = (Math.random()*(canvas.height-(powerCircle.radius + linePlacement + thickness)*2))+ powerCircle.radius + linePlacement + thickness

		context.beginPath();
		context.fillStyle = (currentColour);
		context.arc(powerCircle.x,powerCircle.y,pinkCircle.radius,0,2*Math.PI);
		context.fill();
	}
}