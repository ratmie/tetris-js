import { Config } from './config.js'
class Cell {
	constructor(color) {
		this.color;
	}

	print(x, y) {
		if (checkRange(x, y)) {
			ctx.fillStyle = GREY;
			ctx.fillRect(x * Config.DOT_SIZE, y * Config.DOT_SIZE, Config.DOT_SIZE, Config.DOT_SIZE);
			ctx.fillStyle = this.color;
			ctx.fillRect(x * Config.DOT_SIZE  + 2, y * Config.DOT_SIZE + 2, Config.DOT_SIZE - 4, Config.DOT_SIZE - 4);
		} else {
			console.log('false x:' + x + ' y:' + y);
		}
	}

	clear() {

	}
}

export { Cell };