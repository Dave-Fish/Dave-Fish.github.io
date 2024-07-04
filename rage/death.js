// made by Dave Fish
// 02.11.19

console.log("death");

var deathFlag = false;

death = function(){

	for (let p=0; p<coords.length; p++){

		var dx = user.x - coords[p][0];
		var dy = user.y - coords[p][1];
		var distance = Math.sqrt(dx * dx + dy * dy);
		// console.log(distance);

		if (multiplayerFlag){
			var dx = user2.x - coords[p][0];
			var dy = user2.y - coords[p][1];
			var distance2 = Math.sqrt(dx * dx + dy * dy);
		}else{
			var distance2 = canvas.width + canvas.height
		}

		if (((distance <= user.radius + pinkCircle.radius) || (distance2 <= user2.radius + pinkCircle.radius)) && greenFlag == false){
			
			if (distance <= user.radius + pinkCircle.radius){
				userDeathCount += 1;
			}
			if (distance2 <= user2.radius + pinkCircle.radius){
				user2DeathCount += 1;
			}
			
			deathFlag = true;
			theAfterlife();
		}
		if (((distance <= user.radius + pinkCircle.radius) || (distance2 <= user2.radius + pinkCircle.radius)) && greenFlag == true){
			// removes the circle the user hit from the list of coordinates that'll kill the user
			coords.splice(p,1);

			greenFlag = false;


			// go over the level number in pink
			context.fillStyle = GREY;
			context.fillRect(0,0,canvas.width,canvas.height/20);
			
			var fontsize = canvas.height/30
			var fontsizeString = fontsize.toString();
			context.font = fontsizeString+"px Comic Sans MS";
			context.fillStyle = PINK;
			context.fillText("life lost :(",canvas.width/80,canvas.height/25);
		}
	}
}