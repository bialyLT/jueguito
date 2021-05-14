import canvasHeight from './../canvasHeight.js';
const heightCanvas = canvasHeight(85);
const heightRectangles = ((heightCanvas * 10) / 100);
const posRectStart = (heightCanvas - heightRectangles);
const posCircleStart = (posRectStart + 20)
let ctx;
ctx = canvas.getContext('2d');

// clase del circulo

class Circle{
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.move = true;
	}
	draw = function(){
		ctx.fillStyle = '#FFF';
		ctx.arc(this.x, this.y, 20,0, 2 * Math.PI);
		ctx.fill();
		ctx.stroke();
	};
	drag = function(x, y){
		this.x = x;
		this.y = y;
	};
	stop = function() {
		if (this.move == false) {
			this.x = 150;
			this.y = posCircleStart;
		};
	};
};

export default Circle;