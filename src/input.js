class Input {
	Listdata = (code) => {
		this.code = code;
		this.frame = 0;
	}

	keyStack = [];

	updateKeyState = () => {

	}

	
}

const keyDownHandler= e => {
	if(e.keyCode == 39) {
		rightPressed = true;
	} else if (e.keyCode == 37) {
		leftPressed = true;
	}
};

const keyUpHandler= e => {
	if(e.keyCode == 39) {
		rightPressed = false;
	} else if (e.keyCode == 37) {
		leftPressed = false;
	}
};

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);