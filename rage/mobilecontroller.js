// made by Dave Fish
// 02.11.19

console.log("mobileController");

touchX = 0;
touchY = 0;
tapFlag = false;
tap = function(){
	
	canvas.addEventListener("touchstart",function(){
		controller.up = true;
		tapFlag = true;
		multiplayerFlag = false;
		
		if (deathFlag){
			reset();
		}

		var touchX, touchY;
		touchX = context.clientX;
		touchY = context.clientY;
		context.fillStyle = WHITE;
		//context.fillText(touchX,200,100);
	}
	)
	canvas.addEventListener("touchend",function(){
		controller.up = false;
		deltaX = touchX - canvas.clientX;
		deltaY = touchY - canvas.clientY;
		context.fillStyle = WHITE;
		//context.fillText(deltaX,100,100);
		
		
		if (deltaX < -(canvas.width/10)){
			controller.left = true;
		}
		if (deltaX > canvas.width/10){
			controller.left = false;
		}
	}
	)
};

window.addEventListener("touchstart", tap);
window.addEventListener("touchend", tap);