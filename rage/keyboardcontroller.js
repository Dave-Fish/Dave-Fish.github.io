// made by Dave Fish
// 02.11.19

console.log("keyboardController");
function openInNewTab(url) { // taken from https://stackoverflow.com/questions/4907843/open-a-url-in-a-new-tab-and-not-a-new-window
	var win = window.open(url, '_blank');
	win.focus();
  } 
controller = {

    left:false,
    right:false,
    up:false,
    keyListener:function(event){
        var key_state = (event.type == "keydown")?true:false;
        switch(event.keyCode){

			case 37: // left key
			controller.left = key_state;
			break;
			case 38: // up key
			controller.up = key_state;
			break;
			case 39: // right key
			controller.right = key_state;
			break;
			case 40: // down key
			controller.down = key_state;
			break;
			
			case 65: // a
			controller.left2 = key_state;
			break;
			case 87: // w
			controller.up2 = key_state;
			break;
			case 68: // d
			controller.right2 = key_state;
			break;
			case 83: // s
			controller.down2 = key_state;
			break;

			case 82: case 13:// r, enter
			controller.restart = key_state;
			break;
			case 32: // space
			controller.start = key_state;
			break;

			case 69: // e
				openInNewTab("https://forms.gle/xRtqM8bQ4qfoVyAe6");
			break;
		}
	}
};

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);


/*
//should be disabling scrolling
function noScroll(){
	window.scrollTo(0, 0);
}
  
// add listener to disable scroll
window.addEventListener('keydown', noScroll);
  
// Remove listener to re-enable scroll
window.removeEventListener('keydown', noScroll);
*/