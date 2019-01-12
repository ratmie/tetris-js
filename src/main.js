<script type="module" />
import { Block } from './block.js';

let canvas;
let ctx;
const DOT_SIZE = 20;
const FIELD_WIDTH = 10;
const FIELD_HEIGHT = 20;
const SCREEN_WIDTH = FIELD_WIDTH * DOT_SIZE;
const SCREEN_HEIGHT = FIELD_HEIGHT * DOT_SIZE;
const BLOCK_SIZE = 4;
const INIT_X = 3;
const INIT_Y = 0;
var posX = INIT_X;
var posY = INIT_Y;
var rightPressed = false;
var leftPressed = false;
var topPressed = false;
let frame = 0;
const GREY = "rgb(128,128,128)";
const BG = "rgb(225,225,225)";
const WHITE = "rgb(5,5,5)";
const RED = "rgb(240,0,0)";
const BLUE = "rgb(0,0,240)";
const GREEN = "rgb(0,245,0)";
const YELLOW = "rgb(250,250,0)";
const CYAN = "rgb(0,245,245)";
const MAGENTA = "rgb(255,0,255)";
const ORANGE = "rgb(255,165,0)";
var activeBlock;
var map;

class Map {
	constructor(width, height){
		this.map = new Array(height);
		for(let y = 0; y < height; y++) {
			this.map[y] = (new Array(width).fill(false));
		}
	}

	// 接触すればtrue
	isCollideBlock(block, x, y) {
		for(let cell of block.cells) {
			if(this.isExistCell(cell.x + x, cell.y + y)) {
				console.log('true');
				return true;
			}
		}
		return false;
	}

	// すでに存在すればtrue
	isExistCell(x, y) {
		if(checkRange(x,y)) {
			return this.map[x][y];
		}
		return true;
	}

	putBlock(block) {
		for(let cell of block.cells) {
			this.map[cell.x + block.x][cell.y + block.y] = true;
		}
	}

	checkLine() {

	}

	deleteLine() {

	}
}

//テトリミノの定義 4 * 4の領域内の座標を示す。
const BlockType = [{
	color: RED,
	cells: [{ x: 2, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }]
},
{
	color: BLUE,
	cells: [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }]
},
{
	color: GREEN,
	cells: [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }]
},
{
	color: YELLOW,
	cells: [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }]
},
{
	color: CYAN,
	cells: [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }]
},
{
	color: MAGENTA,
	cells: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }]
},
{
	color: ORANGE,
	cells: [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }]
}
];

const init = () => {
	canvas = document.getElementById('maincanvas');
	ctx = canvas.getContext('2d');
	canvas.width = SCREEN_WIDTH;
	canvas.height = SCREEN_HEIGHT;
	ctx.fillStyle = BG;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.lineWidth = 2;
	map = new Map(FIELD_WIDTH, FIELD_HEIGHT);
	activeBlock = new Block(BlockType[6]);
	requestAnimationFrame(update);
};

const update = () => {
	var id = requestAnimationFrame(update);
	frame++;
	if ((frame % 30) == 0) {
		// console.log(frame);
		if (map.isCollideBlock(activeBlock, activeBlock.x, activeBlock.y + 1)) {
			if (activeBlock.y == 0) {
				activeBlock.print();
				cancelAnimationFrame(id);
				requestAnimationFrame(gameOver);
				return;
			}
			map.putBlock(activeBlock);
			console.log('put (x,y) = ' + activeBlock.x + activeBlock.y);
			activeBlock = new Block(BlockType[Math.floor(Math.random()*7)]);
		} else {
			activeBlock.clear();

			activeBlock.moveY(1);
			if (rightPressed) {
				if (!map.isCollideBlock(activeBlock, activeBlock.x + 1, activeBlock.y)) {
					activeBlock.moveX(1);
				}
			} else if (leftPressed) {
				if (!map.isCollideBlock(activeBlock, activeBlock.x - 1, activeBlock.y)) {
					activeBlock.moveX(-1);
				}
			} else if (topPressed) {
				activeBlock.rotate();
			}
			render();
		}
	}
};

const gameOver = () => {
	console.log("game over");
}
const render = () => {
	activeBlock.print();
};

const printCell = (x, y, color = BG) => {
	if (checkRange(x, y)) {
		ctx.fillStyle = GREY;
		ctx.fillRect(x * DOT_SIZE, y * DOT_SIZE, DOT_SIZE, DOT_SIZE);
		ctx.fillStyle = color;
		ctx.fillRect(x * DOT_SIZE  + 2, y * DOT_SIZE + 2, DOT_SIZE - 4, DOT_SIZE - 4);
		// ctx.strokeStyle = GREY;
		// ctx.strokeRect(x * DOT_SIZE, y * DOT_SIZE, DOT_SIZE, DOT_SIZE);
	} else {
		console.log('false x:' + x + ' y:' + y);
	}
};

const clearCell = (x, y)=> {
	ctx.clearRect(x * DOT_SIZE, y * DOT_SIZE, DOT_SIZE, DOT_SIZE);
	ctx.fillStyle = BG;
	ctx.fillRect(x * DOT_SIZE, y * DOT_SIZE, DOT_SIZE, DOT_SIZE);
	// ctx.strokeStyle = BG;
	// ctx.strokeRect(x * DOT_SIZE, y * DOT_SIZE, DOT_SIZE, DOT_SIZE);
};

const checkRange = (x, y) => {
	if ((0 <= x) && (x < FIELD_WIDTH) && (0 <= y) && (y < FIELD_HEIGHT)) {
		return true;
	}
	return false;
};

const keyDownHandler = e => {
	console.log(e.keyCode);
	if (e.keyCode == 39) {
		rightPressed = true;
	} else if (e.keyCode == 37) {
		leftPressed = true;
	} else if (e.keyCode == 38) {
		topPressed = true;
	} 
};

const keyUpHandler = e => {
	if (e.keyCode == 39) {
		rightPressed = false;
	} else if (e.keyCode == 37) {
		leftPressed = false;
	} else if (e.keyCode == 38) {
		topPressed = false;
	} 
};




window.addEventListener('load', init);
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);