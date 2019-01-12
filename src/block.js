class Block {
	constructor(type, x = INIT_X, y = INIT_Y) {
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
			printCell(this.x + cell.x, this.y + cell.y, this.color);
		}
	};
	clear() {
		for(let cell of this.cells) {
			clearCell(this.x + cell.x, this.y + cell.y);
		}
	};
	rotate() {
		for(let cell of this.cells) {
			let tmp = cell.x;
			cell.x = cell.y;
			cell.y = tmp;
		}	
	}
}

export { Block };