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
		ctx.fillRect(this.x, this.y, 300, 80);
	};
};

export default Rectangle;