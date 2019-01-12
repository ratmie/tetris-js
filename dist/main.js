/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/block.js":
/*!**********************!*\
  !*** ./src/block.js ***!
  \**********************/
/*! exports provided: Block */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Block\", function() { return Block; });\nclass Block {\r\n\tconstructor(type, x = INIT_X, y = INIT_Y) {\r\n\t\tthis.color = type.color;\r\n\t\tthis.cells = type.cells;\r\n\t\tthis.x = x;\r\n\t\tthis.y = y;\r\n\t\tthis.preX = x;\r\n\t\tthis.preY = y;\r\n\t};\r\n\tmoveX(diff) {\r\n\t\tthis.preX = this.x;\r\n\t\tthis.x += diff;\r\n\t}\r\n\tmoveY(diff) {\r\n\t\tthis.preY = this.y;\r\n\t\tthis.y += diff;\r\n\t}\r\n\tprint() {\r\n\t\t// console.log('x:' + this.x, ', y:' + this.y);\r\n\t\tfor(let cell of this.cells) {\r\n\t\t\tprintCell(this.x + cell.x, this.y + cell.y, this.color);\r\n\t\t}\r\n\t};\r\n\tclear() {\r\n\t\tfor(let cell of this.cells) {\r\n\t\t\tclearCell(this.x + cell.x, this.y + cell.y);\r\n\t\t}\r\n\t};\r\n\trotate() {\r\n\t\tfor(let cell of this.cells) {\r\n\t\t\tlet tmp = cell.x;\r\n\t\t\tcell.x = cell.y;\r\n\t\t\tcell.y = tmp;\r\n\t\t}\t\r\n\t}\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/block.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _block_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./block.js */ \"./src/block.js\");\n\r\n\r\nlet canvas;\r\nlet ctx;\r\nconst DOT_SIZE = 20;\r\nconst FIELD_WIDTH = 10;\r\nconst FIELD_HEIGHT = 20;\r\nconst SCREEN_WIDTH = FIELD_WIDTH * DOT_SIZE;\r\nconst SCREEN_HEIGHT = FIELD_HEIGHT * DOT_SIZE;\r\nconst BLOCK_SIZE = 4;\r\nconst INIT_X = 3;\r\nconst INIT_Y = 0;\r\nvar posX = INIT_X;\r\nvar posY = INIT_Y;\r\nvar rightPressed = false;\r\nvar leftPressed = false;\r\nvar topPressed = false;\r\nlet frame = 0;\r\nconst GREY = \"rgb(128,128,128)\";\r\nconst BG = \"rgb(225,225,225)\";\r\nconst WHITE = \"rgb(5,5,5)\";\r\nconst RED = \"rgb(240,0,0)\";\r\nconst BLUE = \"rgb(0,0,240)\";\r\nconst GREEN = \"rgb(0,245,0)\";\r\nconst YELLOW = \"rgb(250,250,0)\";\r\nconst CYAN = \"rgb(0,245,245)\";\r\nconst MAGENTA = \"rgb(255,0,255)\";\r\nconst ORANGE = \"rgb(255,165,0)\";\r\nvar activeBlock;\r\nvar map;\r\n\r\nclass Map {\r\n\tconstructor(width, height){\r\n\t\tthis.map = new Array(height);\r\n\t\tfor(let y = 0; y < height; y++) {\r\n\t\t\tthis.map[y] = (new Array(width).fill(false));\r\n\t\t}\r\n\t}\r\n\r\n\t// 接触すればtrue\r\n\tisCollideBlock(block, x, y) {\r\n\t\tfor(let cell of block.cells) {\r\n\t\t\tif(this.isExistCell(cell.x + x, cell.y + y)) {\r\n\t\t\t\tconsole.log('true');\r\n\t\t\t\treturn true;\r\n\t\t\t}\r\n\t\t}\r\n\t\treturn false;\r\n\t}\r\n\r\n\t// すでに存在すればtrue\r\n\tisExistCell(x, y) {\r\n\t\tif(checkRange(x,y)) {\r\n\t\t\treturn this.map[x][y];\r\n\t\t}\r\n\t\treturn true;\r\n\t}\r\n\r\n\tputBlock(block) {\r\n\t\tfor(let cell of block.cells) {\r\n\t\t\tthis.map[cell.x + block.x][cell.y + block.y] = true;\r\n\t\t}\r\n\t}\r\n\r\n\tcheckLine() {\r\n\r\n\t}\r\n\r\n\tdeleteLine() {\r\n\r\n\t}\r\n}\r\n\r\n//テトリミノの定義 4 * 4の領域内の座標を示す。\r\nconst BlockType = [{\r\n\tcolor: RED,\r\n\tcells: [{ x: 2, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }]\r\n},\r\n{\r\n\tcolor: BLUE,\r\n\tcells: [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }]\r\n},\r\n{\r\n\tcolor: GREEN,\r\n\tcells: [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }]\r\n},\r\n{\r\n\tcolor: YELLOW,\r\n\tcells: [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }]\r\n},\r\n{\r\n\tcolor: CYAN,\r\n\tcells: [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }]\r\n},\r\n{\r\n\tcolor: MAGENTA,\r\n\tcells: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }]\r\n},\r\n{\r\n\tcolor: ORANGE,\r\n\tcells: [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }]\r\n}\r\n];\r\n\r\nconst init = () => {\r\n\tcanvas = document.getElementById('maincanvas');\r\n\tctx = canvas.getContext('2d');\r\n\tcanvas.width = SCREEN_WIDTH;\r\n\tcanvas.height = SCREEN_HEIGHT;\r\n\tctx.fillStyle = BG;\r\n\tctx.fillRect(0, 0, canvas.width, canvas.height);\r\n\tctx.lineWidth = 2;\r\n\tmap = new Map(FIELD_WIDTH, FIELD_HEIGHT);\r\n\tactiveBlock = new _block_js__WEBPACK_IMPORTED_MODULE_0__[\"Block\"](BlockType[6]);\r\n\trequestAnimationFrame(update);\r\n};\r\n\r\nconst update = () => {\r\n\tvar id = requestAnimationFrame(update);\r\n\tframe++;\r\n\tif ((frame % 30) == 0) {\r\n\t\t// console.log(frame);\r\n\t\tif (map.isCollideBlock(activeBlock, activeBlock.x, activeBlock.y + 1)) {\r\n\t\t\tif (activeBlock.y == 0) {\r\n\t\t\t\tactiveBlock.print();\r\n\t\t\t\tcancelAnimationFrame(id);\r\n\t\t\t\trequestAnimationFrame(gameOver);\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\t\t\tmap.putBlock(activeBlock);\r\n\t\t\tconsole.log('put (x,y) = ' + activeBlock.x + activeBlock.y);\r\n\t\t\tactiveBlock = new _block_js__WEBPACK_IMPORTED_MODULE_0__[\"Block\"](BlockType[Math.floor(Math.random()*7)]);\r\n\t\t} else {\r\n\t\t\tactiveBlock.clear();\r\n\r\n\t\t\tactiveBlock.moveY(1);\r\n\t\t\tif (rightPressed) {\r\n\t\t\t\tif (!map.isCollideBlock(activeBlock, activeBlock.x + 1, activeBlock.y)) {\r\n\t\t\t\t\tactiveBlock.moveX(1);\r\n\t\t\t\t}\r\n\t\t\t} else if (leftPressed) {\r\n\t\t\t\tif (!map.isCollideBlock(activeBlock, activeBlock.x - 1, activeBlock.y)) {\r\n\t\t\t\t\tactiveBlock.moveX(-1);\r\n\t\t\t\t}\r\n\t\t\t} else if (topPressed) {\r\n\t\t\t\tactiveBlock.rotate();\r\n\t\t\t}\r\n\t\t\trender();\r\n\t\t}\r\n\t}\r\n};\r\n\r\nconst gameOver = () => {\r\n\tconsole.log(\"game over\");\r\n}\r\nconst render = () => {\r\n\tactiveBlock.print();\r\n};\r\n\r\nconst printCell = (x, y, color = BG) => {\r\n\tif (checkRange(x, y)) {\r\n\t\tctx.fillStyle = GREY;\r\n\t\tctx.fillRect(x * DOT_SIZE, y * DOT_SIZE, DOT_SIZE, DOT_SIZE);\r\n\t\tctx.fillStyle = color;\r\n\t\tctx.fillRect(x * DOT_SIZE  + 2, y * DOT_SIZE + 2, DOT_SIZE - 4, DOT_SIZE - 4);\r\n\t\t// ctx.strokeStyle = GREY;\r\n\t\t// ctx.strokeRect(x * DOT_SIZE, y * DOT_SIZE, DOT_SIZE, DOT_SIZE);\r\n\t} else {\r\n\t\tconsole.log('false x:' + x + ' y:' + y);\r\n\t}\r\n};\r\n\r\nconst clearCell = (x, y)=> {\r\n\tctx.clearRect(x * DOT_SIZE, y * DOT_SIZE, DOT_SIZE, DOT_SIZE);\r\n\tctx.fillStyle = BG;\r\n\tctx.fillRect(x * DOT_SIZE, y * DOT_SIZE, DOT_SIZE, DOT_SIZE);\r\n\t// ctx.strokeStyle = BG;\r\n\t// ctx.strokeRect(x * DOT_SIZE, y * DOT_SIZE, DOT_SIZE, DOT_SIZE);\r\n};\r\n\r\nconst checkRange = (x, y) => {\r\n\tif ((0 <= x) && (x < FIELD_WIDTH) && (0 <= y) && (y < FIELD_HEIGHT)) {\r\n\t\treturn true;\r\n\t}\r\n\treturn false;\r\n};\r\n\r\nconst keyDownHandler = e => {\r\n\tconsole.log(e.keyCode);\r\n\tif (e.keyCode == 39) {\r\n\t\trightPressed = true;\r\n\t} else if (e.keyCode == 37) {\r\n\t\tleftPressed = true;\r\n\t} else if (e.keyCode == 38) {\r\n\t\ttopPressed = true;\r\n\t} \r\n};\r\n\r\nconst keyUpHandler = e => {\r\n\tif (e.keyCode == 39) {\r\n\t\trightPressed = false;\r\n\t} else if (e.keyCode == 37) {\r\n\t\tleftPressed = false;\r\n\t} else if (e.keyCode == 38) {\r\n\t\ttopPressed = false;\r\n\t} \r\n};\r\n\r\n\r\n\r\n\r\nwindow.addEventListener('load', init);\r\ndocument.addEventListener('keydown', keyDownHandler, false);\r\ndocument.addEventListener('keyup', keyUpHandler, false);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });