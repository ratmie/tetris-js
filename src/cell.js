import { Config } from './config.js';
const GREY = 'rgb(128,128,128)';
const BG = 'rgb(225,225,225)';
class Cell {
	constructor(ctx, color) {
		this.ctx = ctx;
		this.color = color;
	}

	print(x, y) {
		if (checkRange(x, y)) {
			console.log('x:' + x + ' y:' + y);
			this.ctx.fillStyle = GREY;
			this.ctx.fillRect(x * Config.DOT_SIZE, y * Config.DOT_SIZE, Config.DOT_SIZE, Config.DOT_SIZE);
			this.ctx.fillStyle = this.color;
			this.ctx.fillRect(x * Config.DOT_SIZE + 2, y * Config.DOT_SIZE + 2, Config.DOT_SIZE - 4, Config.DOT_SIZE - 4);
		} else {
			console.log('false x:' + x + ' y:' + y);
		}
	}

	clear(x, y) {
		this.ctx.clearRect(x * Config.DOT_SIZE, y * Config.DOT_SIZE, Config.DOT_SIZE, Config.DOT_SIZE);
		this.ctx.fillStyle = BG;
		this.ctx.fillRect(x * Config.DOT_SIZE, y * Config.DOT_SIZE, Config.DOT_SIZE, Config.DOT_SIZE);
	}
}

const checkRange = (x, y) => {
	if ((0 <= x) && (x < Config.FIELD_WIDTH) && (0 <= y) && (y < Config.FIELD_HEIGHT)) {
		return true;
	}
	return false;
};

export { Cell };