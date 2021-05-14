let ctx;
ctx = canvas.getContext('2d');

// clase de los obstaculos
class Obstacle {
	constructor(name,x,y) {
		this.nameObstacle = name;
		this.x = x;
		this.y = y;
		this.right = true
	  }
	draw = function() {
		ctx.fillStyle = '#060547';
		ctx.fillRect(this.x, this.y ,30,30);
	};
	move = function(v1, v2) {
		if (this.right == true) {
			if (this.x < 270) {
				this.x += v1;
			}
			else this.right = false;
		}
		if (this.right == false) {
				if (this.x > 0) {
					this.x -= v2;
				}
				else this.right = true;
		};
	};
};



export default Obstacle;