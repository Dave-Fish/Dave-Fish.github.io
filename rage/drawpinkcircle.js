// made by Dave Fish
// 02.11.19

console.log("drawPinkCircle");

// will store the x and y of each pink circle
// was also the source of most of my pain
var coords = [];

circleMain = function(){
	currentCoordinates = [];
	var linePlacement = canvas.height/18;
	var thickness = canvas.height/80;

	pinkCircle.x = Math.random()*(canvas.width/6*5)+canvas.width/7
	pinkCircle.y = (Math.random()*(canvas.height-(pinkCircle.radius + linePlacement + thickness)*2))+ pinkCircle.radius + linePlacement + thickness

	currentCoordinates = [];
	currentCoordinates.push(pinkCircle.x);
	currentCoordinates.push(pinkCircle.y);
	coords.push(currentCoordinates);
	//console.log(currentCoordinates);

	context.beginPath();
	context.fillStyle = PINK;
	context.arc(pinkCircle.x,pinkCircle.y,pinkCircle.radius,0,2*Math.PI);
	context.fill();
}