// made by Dave Fish
// 02.11.19

console.log("drawBarriers");

currentColour = WHITE;

barriers = function(){

	context.strokeStyle = currentColour;
	
	context.lineWidth = canvas.height/80;

	// actually lineWidth/2 bacause it goes from the center of the line
	var thickness = canvas.height/160;
	// just think it looks good at canvas.height/18
	var linePlacement = canvas.height/18;

	// floor
	if (user.y > (canvas.height - (user.radius + linePlacement + thickness))){
		user.y = canvas.height - (user.radius + linePlacement + thickness);
		user.y_velocity = 0;
		user.jumping = false;
	}

	if (multiplayerFlag){		
		if (user2.y > (canvas.height - (user2.radius + linePlacement + thickness))){
			user2.y = canvas.height - (user2.radius + linePlacement + thickness);
			user2.y_velocity = 0;
			user2.jumping = false;
		}
	}

	context.beginPath();
	context.moveTo(0, canvas.height - linePlacement);
	context.lineTo(canvas.width, canvas.height - linePlacement);
	context.stroke();

	// ceiling
	if (user.y < (user.radius + linePlacement + thickness)){
		user.y = user.radius + linePlacement + thickness;
		user.y_velocity = 0;
		user.jumping = false;
	}

	if (multiplayerFlag){
		if (user2.y < (user2.radius + linePlacement + thickness)){
			user2.y = user2.radius + linePlacement + thickness;
			user2.y_velocity = 0;
			user2.jumping = false;
		}
	}

	context.beginPath();
	context.moveTo(0, linePlacement);
	context.lineTo(canvas.width, linePlacement);
	context.stroke();
}

displayScore = function(){
	pointMultiplier = Math.round(pointMultiplier, 2);
	var score = pointMultiplier * (((levelCount-1)*levelCount) + levelCount) + levelCount;
	
	if (levelCount == 1){
		context.fillStyle = GREY;
	}

	//context.fillStyle = WHITE;
	context.fillText(score+" points",canvas.height/80,canvas.height - canvas.height/80);
}