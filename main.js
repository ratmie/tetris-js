let canvas;
let ctx;
const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;

const init = () => {
	canvas = document.getElementById('maincanvas');
	ctx = canvas.getContext('2d');
	canvas.width = SCREEN_WIDTH;
	canvas.height = SCREEN_HEIGHT;
	requestAnimationFrame(update);
};

const update = () => {
//	console.log('update');
	requestAnimationFrame(update);
	render();
};

const  render = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
};

window.addEventListener('load', init);