var hue = Math.floor(Math.random()*360);
hue = 272;
console.log(hue);
var saturation = "100%";
var lightness = "57%";

var forward = 0.001;

function colourAnimate(){
    //console.log(hue);
    requestAnimationFrame(colourAnimate);
    
    if(hue >= 360){
        hue = 0;
    }

    if(hue > 150 && hue < 205){
        hue += forward;
        // nice green
    }else if(hue > 255 && hue < 270){
        hue += forward;
        // nice purple
    }else{
        hue += 1000*forward;
    }

    if(hue > 270 && hue < 272){
        forward = -0.001;
    }
    if(hue > 148 && hue < 150){
        forward = 0.001;
    }    
    colour = 'hsl('+hue+','+saturation+','+lightness+')';

    highlighters = document.getElementsByClassName("highlight");
    for(let i = 0; i < highlighters.length; i++){
        highlighters[i].style.textShadow = "0px 0px 10px "+colour;
    }
    a = document.getElementsByTagName("a");
    for(let i = 0; i < a.length; i++){
        a[i].style.textDecorationColor = colour;
    }
}

colourAnimate();


controller = {
    keyListener:function(event){
        var key_state = (event.type == "keydown")?true:false;
        switch(event.keyCode){
            case 37: // left key
            setTimeout(() => location.href = previousPage, 1000);
            //location.href = previousPage;
            break;
            case 39: // right key
            setTimeout(() => location.href = nextPage, 1000);
            break;
        }
    }
};
window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);


// swiped for swiping https://stackoverflow.com/questions/62823062/adding-a-simple-left-right-swipe-gesture
window.addEventListener('touchstart', function (event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
}, false);
window.addEventListener('touchend', function (event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesture();
}, false);

function handleGesture() {
    if (touchendX < touchstartX-200) {
        console.log('Swiped Left');
        location.href = nextPage;
    }
    if (touchendX > touchstartX+200) {
        console.log('Swiped Right');
        location.href = previousPage;
    }
    if (touchendY < touchstartY) {
        console.log('Swiped Up');
    }
    if (touchendY > touchstartY) {
        console.log('Swiped Down');
    }
    if (touchendY === touchstartY) {
        console.log('Tap');
    }
}
