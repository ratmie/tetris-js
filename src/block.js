import { Config } from './config.js';

import { Cell } from './cell.js';
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

class Block {
	constructor(ctx, type, x, y) {
		this.ctx = ctx;
		this.color = BlockType[type].color;
		this.cells = BlockType[type].cells;
		this.x = x;
		this.y = y;
		this.preX = x;
		this.preY = y;
	}

	moveX(diff) {
		this.preX = this.x;
		this.x += diff;
	}
	moveY(diff) {
		this.preY = this.y;
		this.y += diff;
	}
	print() {
		for (let cell of this.cells) {
			this.printCell(this.x + cell.x, this.y + cell.y, this.color);
		}
	}

	clear() {
		for (let cell of this.cells) {
			clearCell(this.ctx, this.x + cell.x, this.y + cell.y);
		}
	}

	rotate() {
		for (let cell of this.cells) {
			let tmp = cell.x;
			cell.x = 3 - cell.y;
			cell.y = tmp;
		}
	}

	printCell(x, y, color = BG) {
		if (checkRange(x, y)) {
			this.ctx.fillStyle = GREY;
			this.ctx.fillRect(x * Config.DOT_SIZE, y * Config.DOT_SIZE, Config.DOT_SIZE, Config.DOT_SIZE);
			this.ctx.fillStyle = color;
			this.ctx.fillRect(x * Config.DOT_SIZE + 2, y * Config.DOT_SIZE + 2, Config.DOT_SIZE - 4, Config.DOT_SIZE - 4);
		} else {
			console.log('false x:' + x + ' y:' + y);
		}
	}
}

const clearCell = (ctx, x, y) => {
	ctx.clearRect(x * Config.DOT_SIZE, y * Config.DOT_SIZE, Config.DOT_SIZE, Config.DOT_SIZE);
	ctx.fillStyle = BG;
	ctx.fillRect(x * Config.DOT_SIZE, y * Config.DOT_SIZE, Config.DOT_SIZE, Config.DOT_SIZE);
	// ctx.strokeStyle = BG;
	// ctx.strokeRect(x * DOT_SIZE, y * DOT_SIZE, DOT_SIZE, DOT_SIZE);
};
const checkRange = (x, y) => {
	if ((0 <= x) && (x < Config.FIELD_WIDTH) && (0 <= y) && (y < Config.FIELD_HEIGHT)) {
		return true;
	}
	return false;
};

//テトリミノの定義 4 * 4の領域内の座標を示す。
const BlockType = [{
	// Z
	color: RED,
	cells: [{ x: 2, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }]
},
{  // j
	color: BLUE,
	cells: [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }]
},
{ // 5
	color: GREEN,
	cells: [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }]
},
{ //■
	color: YELLOW,
	cells: [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }]
},
{ // I
	color: CYAN,
	cells: [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }]
},
{ // T
	color: MAGENTA,
	cells: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }]
},
{  // L
	color: ORANGE,
	cells: [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }]
}
];

export { Block };