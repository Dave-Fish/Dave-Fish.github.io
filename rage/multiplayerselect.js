// made by Dave Fish
// 14.11.19

drawMultiplayer = function(){
    // draw pink rectangle
    context.fillStyle = PINK;
    var widthUnit=canvas.width/7
    context.fillRect(widthUnit*4,canvas.height/2,widthUnit*2,canvas.height/4);

    //lil grey rectangles for multiplayer
    context.fillStyle = GREY;
    context.fillRect((canvas.width/35)*22,(canvas.height/12)*7,canvas.width/17.5,canvas.height/12);
    context.fillRect((canvas.width/35)*26,(canvas.height/12)*7,canvas.width/17.5,canvas.height/12);
    context.fillRect((canvas.width/108)*70,(canvas.height/12)*8,canvas.width/52.5,canvas.height/12);
    context.fillRect((canvas.width/108)*82,(canvas.height/12)*8,canvas.width/52.5,canvas.height/12);

    context.fillStyle = WHITE;
    
    // left multiplayer eyes
    context.fillRect((canvas.width/324)*210,(canvas.height/36)*22,canvas.width/100,canvas.height/100);
    context.fillRect((canvas.width/324)*218,(canvas.height/36)*22,canvas.width/100,canvas.height/100);

    // right multiplayer eyes
    context.fillRect((canvas.width/324)*242,(canvas.height/36)*22,canvas.width/100,canvas.height/100);
    context.fillRect((canvas.width/324)*250,(canvas.height/36)*22,canvas.width/100,canvas.height/100);
}

drawSingleplayer = function(){
    // draw pink rectangle
    context.fillStyle = PINK;
    var widthUnit=canvas.width/7
    context.fillRect(widthUnit,canvas.height/2,widthUnit*2,canvas.height/4);

    // lil grey rectangles for singleplayer
    context.fillStyle = GREY;
    context.fillRect((canvas.width/35)*9,(canvas.height/12)*7,canvas.width/17.5,canvas.height/12);
    context.fillRect((canvas.width/108)*30 ,(canvas.height/12)*8,canvas.width/52.5,canvas.height/12);

    // faces for multiplayer select
    context.fillStyle = WHITE;
    // singleplayer eyes
    context.fillRect((canvas.width/324)*87,(canvas.height/36)*22,canvas.width/100,canvas.height/100);
    context.fillRect((canvas.width/324)*95,(canvas.height/36)*22,canvas.width/100,canvas.height/100);
}


// tells me if the user has thought about and selected their game mode
var selectedFlag = false;

selectAction = function(){
    if (controller.right){
        context.fillStyle = WHITE;
        context.fillRect(canvas.width/1.83,canvas.height/2.2,canvas.width/3,canvas.height/3);

        drawMultiplayer();

        context.fillStyle = GREY;
        context.fillRect(canvas.width/8,canvas.height/2.2,canvas.width/3,canvas.height/3);

        drawSingleplayer();

        selectedFlag = true;

        multiplayerFlag = true;
    }
    if (controller.left){
        context.fillStyle = GREY;
        context.fillRect(0,0,canvas.width,canvas.height);

        context.fillStyle = WHITE;
        context.fillRect(canvas.width/8,canvas.height/2.2,canvas.width/3,canvas.height/3);

        drawSingleplayer();

        context.fillStyle = GREY;
        context.fillRect(canvas.width/1.83,canvas.height/2.2,canvas.width/3,canvas.height/3);

        drawMultiplayer();

        selectedFlag = true;

        multiplayerFlag = false;
    }
}

var stopThisNonsense = true
multiplayerSelect = function(){
    console.log("E");
    
    selectAction();

    if (selectedFlag){
        if (controller.start || controller.restart){
            startDetect();
            logo = new Image();
            logo.src = "LogoTransparent.png";
            context.drawImage(logo,0,0);
            stopThisNonsense = false
        }
    }
    if (stopThisNonsense){
        window.requestAnimationFrame(multiplayerSelect);
    }
}

