let canvas;
let ctx;
const DOT_SIZE = 20;
const FIELD_WIDTH = 10;
const FIELD_HEIGHT = 20;
const SCREEN_WIDTH = FIELD_WIDTH * DOT_SIZE;
const SCREEN_HEIGHT = FIELD_HEIGHT * DOT_SIZE;
var posX = 3;
var posY = 0;
var rightPressed = false;
var leftPressed = false;
let frame = 0;
const GREY = "rgb(128,128,128)";
const BLACK = "rgb(225,225,225)";
const WHITE = "rgb(5,5,5)";
const RED = "rgb(240,0,0)";
const BLUE = "rgb(0,0,240)";
var block;

//テトリミノの定義 4 * 4の領域内の座標を示す。
const BlockType = [{
	color: RED,
	cells: [{ x: 2, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }]
},
{
	color: BLUE,
	cells: [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }]
}];

const init = () => {
	canvas = document.getElementById('maincanvas');
	ctx = canvas.getContext('2d');
	canvas.width = SCREEN_WIDTH;
	canvas.height = SCREEN_HEIGHT;
	ctx.fillStyle = BLACK;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	block = new Block(BlockType[1]);

	requestAnimationFrame(update);
};

const update = () => {
	requestAnimationFrame(update);

	frame++;
	if ((frame % 30) == 0) {
		console.log(frame);
		if (posY < FIELD_HEIGHT - 1) {
			posY += 1;
		}
		if (rightPressed) {
			posX += 1;
		} else if (leftPressed) {
			posX -= 1;
		}
		render();
	}
};

const render = () => {
	console.log('x:' + posX + ', y:' + posY);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = BLACK;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	// printFrame();
	//printCell(posX, posY, RED)
	block.print(posX, posY);
};

const printCell = (x, y, color = BLACK) => {
	if (checkRange(x, y)) {
		ctx.fillStyle = color;
		ctx.fillRect(x * DOT_SIZE, y * DOT_SIZE, DOT_SIZE, DOT_SIZE);
		ctx.fillSyele = GREY;
		ctx.strokeRect(x * DOT_SIZE, y * DOT_SIZE, DOT_SIZE, DOT_SIZE);
	} else {
		console.log('false x:' + x + ' y:' + y);
	}
};

const checkRange = (x, y) => {
	if ((0 <= x) && (x < FIELD_WIDTH) && (0 <= y) && (y < FIELD_HEIGHT)) {
		return true;
	}
	return false;
}

const keyDownHandler = e => {
	if (e.keyCode == 39) {
		rightPressed = true;
	} else if (e.keyCode == 37) {
		leftPressed = true;
	}
};

const keyUpHandler = e => {
	if (e.keyCode == 39) {
		rightPressed = false;
	} else if (e.keyCode == 37) {
		leftPressed = false;
	}
};


class Block {
	constructor(type) {
		this.color = type.color;
		this.cells = type.cells;
	};
	print(x, y) {
		for(let cell of this.cells) {
			printCell(x + cell.x, y + cell.y, this.color);
		}
	};
}

window.addEventListener('load', init);
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);