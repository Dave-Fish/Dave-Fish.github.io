// made by Dave Fish
// 02.11.19

reset = function(){
	levelString = 0;
	levelCount = 0;
	level = 0;
	score = 0;	 
	deathFlag = false;
	pointMultiplier = 1;
	score = 0;
	
	user.radius = canvas.height/30;
	user.x_velocity = 0;
	user.y = canvas.height/5;
	user.y_velocity = 0;
	user.x_speed = canvas.width/1000;
	user.y_speed = canvas.height/666;
	user.speed = 0;

	if (multiplayerFlag){
		user2.radius = canvas.height/30;
		user2.x_velocity = 0;
		user2.y = canvas.height/5;
		user2.y_velocity = 0;
		user2.x_speed = canvas.width/1000;
		user2.y_speed = canvas.height/666;
		user2.speed = 0;
	}
	
	redFlag = false;
	orangeFlag = false;
	yellowFlag = false;
	blueFlag = false;
	purpleFlag = false;
	
	redFlag2 = false;
	orangeFlag2 = false;
	yellowFlag2 = false;
	blueFlag2 = false;
	purpleFlag2 = false;
	
	currentColour = GREY;
	powerCircle.x = 0;
	powerCircle.y = 0;
	
	console.log("cleared.");
	//refreshPage();
}