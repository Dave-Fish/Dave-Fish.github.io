// made by Dave Fish
// 02.11.19

console.log("mainLoop");
var speedPoints = 0;

loop = function() {

	//if (dadddyman){

		user.x_velocity += canvas.width/1750;

		if (multiplayerFlag){
			user2.x_velocity += canvas.width/1750;
		}

		if (controller.up/*&& user.jumping == false */) {
			user.y_velocity -= canvas.height/400;
			user.jumping = true;
		}

		if (controller.left) {
			user.x_velocity -= canvas.width/2000;
		}

		if (controller.right) {
			user.x_velocity += canvas.width/666;
			if(speedPoints < 500){
				pointMultiplier += 0.01;
				speedPoints += 1;
			}
		}

		if (controller.down) {
			user.y_velocity += canvas.height/400;
		}
		


		//var gravity = 1.5
		user.y_velocity += user.y_speed;// gravity
		user.x += user.x_velocity * user.x_speed;
		user.y += user.y_velocity;
		user.x_velocity *= 0.85;// friction
		user.y_velocity *= 0.85;// friction


		if (multiplayerFlag){
			if (controller.up2/*&& user.jumping == false */) {
				user2.y_velocity -= canvas.height/400;
				user2.jumping = true;
			}
	
			if (controller.left2) {
				user2.x_velocity -= canvas.width/2000;
			}
	
			if (controller.right2) {
				user2.x_velocity += canvas.width/666;
				if(speedPoints < 500){
					pointMultiplier += 0.01;
					speedPoints += 1;
				}
			}
	
			if (controller.down2) {
				user2.y_velocity += canvas.height/400;
			}
			
	
	
			//var gravity = 1.5
			user2.y_velocity += user2.y_speed;// gravity
			user2.x += user2.x_velocity * user2.x_speed;
			user2.y += user2.y_velocity;
			user2.x_velocity *= 0.85;// friction
			user2.y_velocity *= 0.85;// friction
		}

		// it means circle
		drawUser();

		// draws and defines the ceiling and floor
		barriers();

		// literally the refresh page function, kill me
		if (deathFlag == false){
			refreshPage();
		}else{
			if (controller.restart){
				reset();
			}
		}

		
		// if the user hasn't failed, the game will continue
		death();

		// for when the user is colliding with a coloured circle
		hitPower();

		// call update when the browser is ready to draw again
		window.requestAnimationFrame(loop);
		//}
};

