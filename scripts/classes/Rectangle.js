import canvasHeight from './../canvasHeight.js';
const heightCanvas = canvasHeight(85);
const heightRectangles = ((heightCanvas * 10) / 100);

let ctx;
ctx = canvas.getContext('2d');
// clase de inicio y fin

class Rectangle{
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	draw = function() {
		ctx.fillStyle = "#206a5d";
		if (heightCanvas < 600) {
			ctx.fillRect(this.x, this.y, 300, 50);
		}
		else ctx.fillRect(this.x, this.y, 300, heightRectangles);
	};
};

export default Rectangle;