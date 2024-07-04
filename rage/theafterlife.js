// made by Dave Fish
// 02.11.19

console.log("theAfterlife");

theAfterlife = function(){
	pointMultiplier = Math.round(pointMultiplier, 2);
	var score = pointMultiplier * (((levelCount-1)*levelCount) + levelCount) + levelCount;
	console.log(pointMultiplier);
	console.log(levelCount);
	console.log(score);
	
	currentColour = "#111";
	barriers();
	
	// light pink
	context.fillStyle = ("#fbc");
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	user.x = canvas.width*2;

	if (multiplayerFlag){
		user2.x = canvas.width*2;
	}

	// x co-ordinate of the text
	var textX = canvas.width/80

	context.fillStyle = (PINK);

	var scoreString = "Score: "+score
	var fontsize = canvas.width/(scoreString.length + canvas.height/80);
	var fontsizeString = fontsize.toString();
	context.font = fontsizeString+"px Comic Sans MS";
	context.fillText(scoreString, textX, (canvas.height/10)*6);
	context.fillText("Age: "+((levelCount-1).toString()), textX, (canvas.height/10)*4);
	context.fillText("You died", textX, (canvas.height/10)*2);

	var fontsize = canvas.height/30
	var fontsizeString = fontsize.toString();
	context.font = fontsizeString+"px Comic Sans MS";
	context.direction = "rtl";

	// adds scores to a list, then orders the list from highest to lowest
	scoreScores.push(score);
	scoreScores.sort(function(a, b){return b-a});
	console.log("scores:");
	console.log(scoreScores);
	ageScores.push(levelCount-1);
	ageScores.sort(function(a, b){return b-a});
	console.log("ages:");
	console.log(ageScores);

	// filling a list with the outputs required for a scoreboard, in the right order
	var scoreOutputs = ["Best scores"];
	for(i = 0; i < 5 ;i++){
		scoreOutputs.push(scoreScores[i].toString());
	}
	scoreOutputs.push("Best ages");
	for(i = 0; i < 5 ;i++){
		scoreOutputs.push(ageScores[i].toString());
	}

	// x co-ordinate of the text
	var textX = canvas.width - canvas.width/80

	// outputs all strings I want on my scoreboard
	for(i = 0; i < 12 ;i++){
		context.fillText(scoreOutputs[i],textX,(canvas.height/20)*(i+2));
	}

	if (tapFlag){
		context.fillText("Press anywhere to play again",textX,canvas.height - canvas.height/10);
	}else{
		context.fillText("Press enter to play again",textX,canvas.height - canvas.height/10);
	}
	context.direction = "ltr";
	
	
	//var highScore = document.cookie;

	//document.cookie = "High score: "+score;

	//console.log("slow down");
	
	
	//setTimeout(function(){location.reload();},10000);
	
	//if (deathFlag == false){
	//	setTimeout(function(){
	//		console.log("hgvbs,xbliruvgfblb");
	//		reset();
	//	},10000);
	//}
	
	if (multiplayerFlag){
		context.fillText("player 1 deaths: "+userDeathCount.toString(),canvas.width/80,canvas.height/1.2);
		context.fillText("player 2 deaths: "+user2DeathCount.toString(),canvas.width/80,canvas.height/1.1);
	}else{
		context.fillText("Deaths: "+userDeathCount.toString(),canvas.width/80,canvas.height/1.3);
	}
	
}