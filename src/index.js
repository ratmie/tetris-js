import { Config } from './config.js'
import { Block } from './block.js';

let canvas;
let ctx;
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

var rightPressed = false;
var leftPressed = false;
var topPressed = false;
let frame = 0;

var activeBlock;
var map;

class Map {
	constructor(width, height){
		this.height = height;
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

	checkLine(y) {
		for (let x = 0; x < this.width; x++) {
			if(!this.isExistCell(x, y)) {
				return false;
			}
		}
		return true;
	}

	deleteLine(ys) {
		for (let y = ys; y > 0; y--){
			for (let x; x < this.width; x++) {
				map[x][y] = map[x][y-1];
			}
		}
		this.clearMap();
		this.printfMap();
	}

	clearMap() {
		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				this.map[x][y].clear();
			}
		}		
	}

	printfMap() {
		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				this.map[x][y].print();
			}
		}
	}

	checkMap() {
		for (let y = 0; y < this.height; y++) {
			if (this.checkLine(y)) {
				console.log("check ok");
				this.deleteLine(y);
			}
		}
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
	canvas.width = Config.SCREEN_WIDTH;
	canvas.height = Config.SCREEN_HEIGHT;
	ctx.fillStyle = BG;
	console.log(canvas.width, canvas.height);
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.lineWidth = 2;
	map = new Map(Config.FIELD_WIDTH, Config.FIELD_HEIGHT);
	activeBlock = new Block(ctx, BlockType[6], Config.INIT_X, Config.INIT_Y);
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
			map.checkMap();
			activeBlock = new Block(ctx, BlockType[Math.floor(Math.random()*7)], INIT_X, INIT_Y);
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



const checkRange = (x, y) => {
	if ((0 <= x) && (x < Config.FIELD_WIDTH) && (0 <= y) && (y < Config.FIELD_HEIGHT)) {
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