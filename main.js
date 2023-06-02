console.log("main");

canvas = document.querySelector('canvas');

var context, controller, user, loop;

context = document.querySelector("canvas").getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight*0.99;

window.addEventListener('resize',function(event){
    canvas.width = window.innerWidth-5;
    canvas.height = window.innerHeight-5;
})


var maxRadius = (canvas.width + canvas.height)/10;


// shamelessly stolen
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// couldn't be arsed
/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove',function(event){
    mouse.x = event.x;
    mouse.y = event.y;

    if (mouse.x <= 10 || mouse.y <= 10
        || mouse.x >= canvas.width-10 || mouse.y >= canvas.height-10){
        mouse.x = undefined;
        mouse.y = undefined;
    }
})

function randInt(x, y){
    return(Math.floor((Math.random()*(y-x))));
}

colours = [
    "#ff22aa", //system
    "#ff2222", //red
    "#c1694f", //fawn
    "#fada5e", //sunny
    "#08d11c", //artie
    "#0078d7", //blue
    "#967bb6", //lavender
    "#f5a9b8", //pink
    "#920a4e", //mulberry
    "#050505", //styx
]
shuffleArray(colours);

function Fish(x, y, dx, dy, width, colour, opacity, fish){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.width = width;
    this.minWidth = this.width;
    this.colour = colour;
    this.opacity = opacity;
    this.fish = fish;


    this.draw = function(){
        context.beginPath();
        context.shadowColor = this.colour;
        context.drawImage(this.fish, this.x, this.y, this.width, this.width);
        context.shadowBlur = 10;
        context.drawImage(this.fish, this.x, this.y, this.width, this.width);
        context.shadowBlur = 20;
        context.drawImage(this.fish, this.x, this.y, this.width, this.width);
        context.shadowBlur = 30;
        context.drawImage(this.fish, this.x, this.y, this.width, this.width);
        
        context.fill();
    }

    this.update = function(){
        if (this.x > canvas.width){
            this.x = 0 - this.width;
            this.dy = ((Math.random() - 0.5));
            if(this.width!=maxFishSize+100){
                this.colour = colours[randInt(0,colours.length)];
            }else{
                this.colour = "#ff22aa";
            }
        }

        if (this.y > canvas.height || this.y < 0){
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;


        // interactivity
        //if(this.width!=maxFishSize+100){

            maxDistance = 100;
            if(mouse.x - this.x - this.width/2 < maxDistance && mouse.x - this.x - this.width/2 > -maxDistance &&
                mouse.y - this.y - this.width/2 < maxDistance && mouse.y - this.y - this.width/2 > -maxDistance){
                    //this.colour = colours[0];
                    d = new Date();
                    this.colour = colours[Math.round(d.getMinutes())%colours.length];
            }
        //}

        this.draw();
    }
}

var fishArray = [];
var fishCount = Math.floor((canvas.width + canvas.height)/100);
//var fishCount = 5;

var maxFishSize = (canvas.width + canvas.height)/10
var totalFish = 5;

for (i=0; i<fishCount; i++){
    for(j = 0; j<totalFish; j++){
        if(randInt(0,j+1)==0){
            fish = new Image();
            fish.src = "fish"+j+".png";
        }
    }
    if(i/totalFish<1){
        fish = new Image();
            fish.src = "fish"+i+".png";
    }
    
    var width = (Math.random()*(maxFishSize)+100);
    var x = Math.random() * (canvas.width);
    var y = Math.random() * (canvas.height);
    var dx = ((Math.random() + 0.3));
    var dy = ((Math.random() - 0.5));
    if(i/colours.length<1){
        var colour = colours[i];
    }else{
        var colour = colours[randInt(0,colours.length)];
    }
    var opacity = Math.random();

    fishArray.push(new Fish(x, y, dx, dy, width, colour, opacity, fish));
}

fishArray.push(new Fish(canvas.width/2-200, canvas.height/2-200, dx, dy, maxFishSize+100, "#ff22aa", 1, fish))

palms = new Image();
palms.src = "palm.png";

function animate(){
    requestAnimationFrame(animate);
    context.fillStyle = "#222";
    context.fillRect(0, 0, canvas.width, canvas.height);
    for(i=0; i<fishArray.length; i++){
        fishArray[i].update();
    }

    d = new Date();
    colour = colours[Math.round(d.getMinutes())%colours.length];
    context.beginPath();
    context.shadowBlur = 10;
    context.shadowColor = colour;
    context.drawImage(palms, 0, canvas.height-(canvas.width/1.6298811545)+canvas.width/10, canvas.width, canvas.width/1.6298811545);
    context.fill();
}

animate();