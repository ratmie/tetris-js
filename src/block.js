import { Config } from './config.js'

import { Cell } from "./cell.js";
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

class Block {
	constructor(ctx, type, x, y) {
		this.ctx = ctx;
		this.color = type.color;
		this.cells = type.cells;
		this.x = x;
		this.y = y;
		this.preX = x;
		this.preY = y;
	};
	moveX(diff) {
		this.preX = this.x;
		this.x += diff;
	}
	moveY(diff) {
		this.preY = this.y;
		this.y += diff;
	}
	print() {
		// console.log('x:' + this.x, ', y:' + this.y);
		for(let cell of this.cells) {
			cell.print(x, y);
			printCell(this.ctx, this.x + cell.x, this.y + cell.y, this.color);
		}
	};
	clear() {
		for(let cell of this.cells) {
			clearCell(this.ctx, this.x + cell.x, this.y + cell.y);
		}
	};
	rotate() {
		for(let cell of this.cells) {
			let tmp = cell.x;
			cell.x = 3 - cell.y;
			cell.y = tmp;
		}	
	}
}
const printCell = (ctx, x, y, color = BG) => {
	if (checkRange(x, y)) {
		ctx.fillStyle = GREY;
		ctx.fillRect(x * Config.DOT_SIZE, y * Config.DOT_SIZE, Config.DOT_SIZE, Config.DOT_SIZE);
		ctx.fillStyle = color;
		ctx.fillRect(x * Config.DOT_SIZE  + 2, y * Config.DOT_SIZE + 2, Config.DOT_SIZE - 4, Config.DOT_SIZE - 4);
		// ctx.strokeStyle = GREY;
		// ctx.strokeRect(x * DOT_SIZE, y * DOT_SIZE, DOT_SIZE, DOT_SIZE);
	} else {
		console.log('false x:' + x + ' y:' + y);
	}
};

const clearCell = (ctx, x, y)=> {
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
export { Block };