// made by Dave Fish
// 02.11.19

console.log("instructions");

instructions = function(){
	context.fillStyle = "#fcd";
	context.fillRect(0,0,canvas.width, canvas.height);

	var fontsize = canvas.width/30
	var fontsizeString = fontsize.toString();
	context.font = fontsizeString+"px Comic Sans MS";
	context.fillStyle = PINK;

	context.direction = "rtl";
	context.fillText("(Don't hit the pink circles ( ͡ʘ ͜ʖ ͡ʘ",canvas.width - canvas.width/10,(canvas.height/10)*2);
	context.fillText("Press left to slow down",canvas.width - canvas.width/10,(canvas.height/10)*3);
	context.fillText("Go over the non pink circles for special effects",canvas.width - canvas.width/10,(canvas.height/10)*4);
	context.fillText("Use the arrow keys to move",canvas.width - canvas.width/10,(canvas.height/10)*5);
	context.fillText("!Become old! Collect powerups",canvas.width - canvas.width/10,(canvas.height/10)*6);
	context.fillText("Or tap the screen if you're on mobile",canvas.width - canvas.width/10,(canvas.height/10)*7);
	context.fillText("Pink circles will kill you",canvas.width - canvas.width/10,(canvas.height/10)*8);
	context.direction = "ltr";

	var fontsize = canvas.height/30
	var fontsizeString = fontsize.toString();
	context.font = fontsizeString+"px Comic Sans MS";
	context.fillText("Made with love by Dave Fish <3",canvas.height/80,canvas.height - canvas.height/80);
}