var hue = Math.floor(Math.random()*360);
        console.log(hue);
        var saturation = "100%";
        var lightness = "57%";

        function colourAnimate(){
            //console.log(hue);
            requestAnimationFrame(colourAnimate);

            if(hue >= 360){
                hue -= 360;
            }

            if(hue < 50){
                hue += 0.01;
            }else if(hue > 60 && hue < 150){
                hue += 0.3;
            }else if(hue > 200 && hue < 300){
                hue+= 0.1;
            }else{
                hue += 0.02;
            }
            colour = 'hsl('+hue+','+saturation+','+lightness+')';

            highlighters = document.getElementsByClassName("highlight");
            for(let i = 0; i < highlighters.length; i++){
                highlighters[i].style.textShadow = "0px 0px 10px "+colour;
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
