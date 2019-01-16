import { Config } from './config.js';
import { Block } from './block.js';
import { Cell } from './cell.js';

let canvas;
let ctx;
const GREY = 'rgb(128,128,128)';
const BG = 'rgb(225,225,225)';
const WHITE = 'rgb(5,5,5)';
const RED = 'rgb(240,0,0)';
const BLUE = 'rgb(0,0,240)';
const GREEN = 'rgb(0,245,0)';
const YELLOW = 'rgb(250,250,0)';
const CYAN = 'rgb(0,245,245)';
const MAGENTA = 'rgb(255,0,255)';
const ORANGE = 'rgb(255,165,0)';

var rightPressed = false;
var leftPressed = false;
var topPressed = false;
var bottomPressed = false;
var spacePressed = false;
let frame = 0;

var activeBlock;
var map;

class Map {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.map = new Array(height);
		for (let x = 0; x < width; x++) {
			this.map[x] = (new Array(height).fill(false));
		}
	}

	// 接触すればtrue
	isCollideBlock(block, x, y) {
		for (let cell of block.cells) {
			if (this.isExistCell(cell.x + x, cell.y + y)) {
				console.log('true');
				return true;
			}
		}
		return false;
	}

	// すでに存在すればtrue
	isExistCell(x, y) {
		if (checkRange(x, y)) {
			if (this.map[x][y] && this.map[x][y].color) {
				return true;
			} else {
				return false;
			}
		}
		return true;
	}

	putBlock(block) {
		for (let cell of block.cells) {
			console.log('putBlock x:' + (cell.x + block.x) + ', y:' + (cell.y + block.y) );
			this.map[cell.x + block.x][cell.y + block.y] = new Cell(ctx, block.color);
		}
		console.table(this.map);
	}

	checkLine(y) {
		for (let x = 0; x < this.width; x++) {
			if (!this.isExistCell(x, y)) {
				// console.log('x:'+x+', y:'+y);
				return false;
			}
		}
		return true;
	}

	deleteLine(ys) {
		this.clearMap();
		for (let y = 0; y <= ys; y++) {
			for (let x; x < this.width; x++) {
				map[x][y] = map[x][y - 1];
			}
		}
		console.table(this.map);
		this.printMap();
	}

	clearMap() {
		for (let x = 0; x < this.width; x++)  {
			for (let y = 0; y < this.height; y++) {
				if(this.isExistCell(x, y)) {
					this.map[x][y].clear(x, y);
				}
			}
		}
	}

	printMap() {
		console.log('printmap');
		for (let x = 0; x < this.width; x++) {
			for (let y = 0; y < this.height; y++) {
				// console.log('x:' + x + ' y:' + y);
				// console.log(this.map[x][y]);
				if(this.isExistCell(x, y)) {
					this.map[x][y].print(x, y);
				}
			}
		}
	}

	checkMap() {
		for (let y = 0; y < this.height; y++) {
			if (this.checkLine(y)) {
				console.log('Line '+ y);
				this.deleteLine(y);
			}
		}
	}
}



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
	activeBlock = new Block(ctx, Math.floor(Math.random() * 7), Config.INIT_X, Config.INIT_Y);
	requestAnimationFrame(update);
};

const update = () => {
	var id = requestAnimationFrame(update);
	frame++;

	if ((frame % 30) !== 0) {
		return;
	}
	if (spacePressed) {
		pause(id);
	}
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
		map.printMap();
		map.checkMap();
		activeBlock = new Block(ctx, Math.floor(Math.random() * 7), Config.INIT_X, Config.INIT_Y);
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
		} else if (bottomPressed) {
			// activeBlock.moveY(1);
		}
		render();
	}
}; 

const pause = (id) => {
	console.log('pause');
	cancelAnimationFrame(id);

	frame++;
	if ((frame % 30) !== 0) {     
		return;
	}
	id = requestAnimationFrame(pause);	

	if (spacePressed) {
		cancelAnimationFrame(id);
		resume(id);
	} else {
	
	}
};

const resume = (id) => {
	console.log('resume');      
	frame++;
	cancelAnimationFrame(id);
	requestAnimationFrame(update);
};

const gameOver = () => {
	console.log('game over');
};

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
	} else if (e.keyCode == 40) {
		bottomPressed = true;
	} else if (e.keyCode == 32) {
		spacePressed = true;
	}
};

const keyUpHandler = e => {
	if (e.keyCode == 39) {
		rightPressed = false;
	} else if (e.keyCode == 37) {
		leftPressed = false;
	} else if (e.keyCode == 38) {
		topPressed = false;
	} else if ( e.keyCode == 40) {
		bottomPressed = false;
	} else if (e.keyCode == 32) {
		spacePressed = false;
	}
};

window.addEventListener('load', init);
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);