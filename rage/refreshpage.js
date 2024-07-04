// made by Dave Fish
// 02.11.19

console.log("refreshPage");

var levelString = 0
var levelCount = 0

refreshPage = function(){
	// if user is going off the left of the screen
	if (user.x < -canvas.width/25) {
		user.x = canvas.width;
	} else if (user.x > canvas.width) {// if user goes past right boundary
		user.x = -canvas.height/25;
	}

	if (user2.x > canvas.width) {
		user.x = -canvas.height/25
	}

    if (user.x < 0 || user2.x < 0){

		console.log("speed",user.speed);
		console.log("x speed",user.x_speed);
		console.log("y speed",user.y_speed);
		console.log("x velocity",user.x_velocity);
		console.log("y velocity",user.y_velocity);

		coords = [];
	    context.fillStyle = GREY;
		context.fillRect(0, 0, canvas.width, canvas.height);
		context.fill();

		user.x = 0;
		user2.x = 0;
		levelCount += 1;
		var levelString = (levelCount-1).toString();

		for (i=2; i <levelCount; i++){

			//console.log("daddy");
			//console.log(levelCount);

			circleMain();

		}
		//if (levelCount !== 1){
			circlePower();
		//}
		var fontsize = canvas.height/30
		var fontsizeString = fontsize.toString();
		context.font = fontsizeString+"px Comic Sans MS";
		context.fillStyle = PINK;
		if (greenFlag == true){
			context.fillStyle = GREEN;
		}
		if (levelString == 0){
			//context.fillText("__ update :3",canvas.width/30,canvas.height/4);
			//context.fillStyle = (GREY);
			//context.fillRect(0,canvas.height - canvas.height/20,canvas.width,canvas.height);
			
			
		}
		if (levelString == 1){
			context.fillText("1 year old",canvas.height/100,canvas.height/25);
			context.fillText("version 0.2.5",canvas.height/80,canvas.height - canvas.height/80)
		}else{
			
			context.fillText(levelString+" years old",canvas.height/100,canvas.height/25);

			// it can go here because the points will always be 0 on level 1
			displayScore();
		}

		

		// tells the user what the current powerup is
		colourInfo();

		// this is totally extra but I love and apreciate my stakeholders and I want to remind them of that every now and then
		if (levelString > 5){
			context.direction = "rtl";
			// they have to earn it a bit tho
			if (levelString % 7 == 2){
				context.fillText("hey guess what",canvas.width - canvas.width/80,canvas.height/25)
			}
			if (levelString % 7 == 3){
				context.fillStyle = GREY;
				context.fillRect(canvas.width/2,0,canvas.width/2,canvas.height/20);
				
				context.fillStyle = PINK;

				// I may as well create this variable here because I don't want it to have to define it unnessicarily
				adjectives = [
				"awesome",
				"cool",
				"really cool",
				"amazing",
				"lovely",
				"brilliant",
				"wonderful",
				"pretty",
				"clever",
				"good at this",
				"really helpful",
				"nice",
				"sweet",
				"delightful",
				"a heckin cool dude",
				"a heckin nice person",
				"great",
				"cool",
				"cool",
				"awesome",
				"helping my programming",
				"the video game person",
				]
				var adjectivesPick = Math.floor(Math.random()*adjectives.length);
				context.fillText("you're "+adjectives[adjectivesPick]+" :3",canvas.width - canvas.width/80,canvas.height/25)
			}
			context.direction = "ltr"
		}
		redFlag = false;
		orangeFlag = false;
		yellowFlag = false;
		blueFlag = false;
		purpleFlag = false;

		if (multiplayerFlag){
			redFlag2 = false;
			orangeFlag2 = false;
			yellowFlag2 = false;
			blueFlag2 = false;
			purpleFlag2 = false;
		}
	}
}