// made by Dave Fish
// 04.11.19

startFlag = true;
startDetect = function(){
	instructions();	
	context.fillText("press up, down, left, right",canvas.height/100,canvas.height/25);
	if (tapFlag || controller.up || controller.down || controller.left || controller.right){
		startFlag = false;
		console.log("lets do it");
		loop();
	}
	
	if (startFlag){
		window.requestAnimationFrame(startDetect);
	}
}


instructionFlag = true;
startInstructions = function(){
	var fontsize = canvas.height/20
	var fontsizeString = fontsize.toString();
	context.font = fontsizeString+"px Comic Sans MS";
	context.fillStyle = PINK;
	context.fillText("press space or enter to play",canvas.width/80,canvas.height/2);
	context.fillText("I made this game for my A level compsci project :)",canvas.width/80,canvas.height/4);
	if (controller.start || controller.restart){
		instructionFlag = false;
		console.log("aight then");
		context.fillStyle = GREY;
		context.fillRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = WHITE
		context.fillText("press left and right arrows",canvas.width/7,canvas.height/1.5)
		setTimeout(multiplayerSelect(),2000);
	}

	if (tapFlag){
		instructionFlag = false;
		console.log("aight then");
		setTimeout(startDetect(),2000);
	}
	
	if (instructionFlag){
		window.requestAnimationFrame(startInstructions);
	}
}

startInstructions();