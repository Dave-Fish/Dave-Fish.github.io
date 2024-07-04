// made by Dave Fish
// 21.11.19

console.log("main");

canvas = document.querySelector('canvas');

var context, controller, user, loop;

context = document.querySelector("canvas").getContext("2d");

canvas.width = window.innerWidth-5;
canvas.height = window.innerHeight-5;

user2 = {
    radius:canvas.height/30,
    x:0,
    x_velocity:0,
    y:canvas.height/5,
    y_velocity:0,
	x_speed:canvas.width/1000,
	y_speed:canvas.height/666,
	speed:0,

	//jumping:true,
};

user = {
    radius:canvas.height/30,
    x:0,
    x_velocity:0,
    y:canvas.height/5,
    y_velocity:0,
	x_speed:canvas.width/1000,
	y_speed:canvas.height/666,
	speed:0,

	//jumping:true,
};

pinkCircle = {
	x:0,
	y:0,
	radius:canvas.height/40,
};

powerCircle = {
	x:0,
	y:0,
	radius:canvas.height/40,
}

// will hold the user's scores per session and show them their top 5
var ageScores = [0,0,0,0];
var scoreScores = [0,0,0,0];

// will hold the user's death count and display it in the afterlife
var userDeathCount = 0;
var user2DeathCount = 0;

// is the colour for the main pink circles
const PINK = "#f2a";

// is the colour for the main background
const GREY = "#222";
// and makes the background
context.fillStyle = GREY;
context.fillRect(0,0,canvas.width,canvas.height);

// only used sparingly
const WHITE = "#eee";