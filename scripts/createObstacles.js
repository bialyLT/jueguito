import canvasHeight from './canvasHeight.js'
const heightCanvas = canvasHeight(80);
const heightObstacles = ((heightCanvas * 10) / 100);
const posX = 30
const posY = heightObstacles;


let posObstacles = [
	{
		x: posX * 0,
		y: posY*1.2,
		nameObstacle: "obstacle1"
	},
	{
		x: posX * 1,
		y: posY * 2.5,
		nameObstacle: "obstacle2"
	},
	{
		x: posX * 4,
		y: posY * 4,
		nameObstacle: "obstacle3"
	},
	{
		x: posX * 5,
		y: posY * 5.5,
		nameObstacle: "obstacle4"
	},
	{
		x: posX * 2,
		y: posY * 7,
		nameObstacle: "obstacle5"
	},
	{
		x: posX * 3,
		y: posY * 8.5,
		nameObstacle: "obstacle6"
	}
]

export default posObstacles