let canvas;
let ctx;
const DOT_SIZE = 20;
const FIELD_WIDTH = 10;
const FIELD_HEIGHT = 20;
const SCREEN_WIDTH = (FIELD_WIDTH + 2) * DOT_SIZE;
const SCREEN_HEIGHT = (FIELD_HEIGHT + 2) * DOT_SIZE;
var posX = 3;
var posY = 10;
var rightPressed = false;
var leftPressed = false;
let frame = 0;
const GREY = "rgb(128,128,128)";
const BLACK = "rgb(225,225,225)";
const RED = "rgb(225,0,0)";

const init = () => {
	canvas = document.getElementById('maincanvas');
	ctx = canvas.getContext('2d');
	canvas.width = SCREEN_WIDTH;
	canvas.height = SCREEN_HEIGHT;
	ctx.fillStyle = BLACK;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	requestAnimationFrame(update);
};

const update = () => {
	requestAnimationFrame(update);

	frame++;
	if ((frame % 10) == 0) {
		console.log(frame);
		// if (posY  < FIELD_HEIGHT) {
		// 	posY += 1;
		// }
		if(rightPressed && posX < FIELD_WIDTH) {
			posX += 1;
		} else if(leftPressed && posX > 1) {
			posX -= 1;
		}
		render();
	}
};

const  render = () => {
	console.log('x:' + posX + ', y:' + posY);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = BLACK;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	printFrame();
	printCell(posX, posY, RED)

	// ctx.beginPath();
	// ctx.moveTo( posX * DOT_SIZE, posY);
	// ctx.lineTo(DOT_SIZE + movex, 20);
	// ctx.lineTo(DOT_SIZE + movex, 120);
	// ctx.lineTo(20 + movex, 120);
	// ctx.closePath();
	// ctx.stroke();


};

const printFrame = () => {
	for(let y = 0; y < (FIELD_HEIGHT + 2); y++) {
		printCell(0, y);
		printCell(FIELD_WIDTH + 1, y);
	}
	for(let x = 1; x < (FIELD_WIDTH + 1); x++) {
		printCell(x, FIELD_HEIGHT + 1);
	}
	printCell(1, 0);
	printCell(2, 0);
	printCell(FIELD_WIDTH - 1, 0);
	printCell(FIELD_WIDTH, 0);
};

const printCell = (x, y, color = BLACK) => {
	ctx.fillStyle = color;
	ctx.fillRect(x * DOT_SIZE, y * DOT_SIZE, DOT_SIZE, DOT_SIZE);
	ctx.fillSyele = GREY;
	ctx.strokeRect(x * DOT_SIZE, y * DOT_SIZE, DOT_SIZE, DOT_SIZE);
};

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

window.addEventListener('load', init);
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);