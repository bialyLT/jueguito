import canvasHeight from './canvasHeight.js'
const heightCanvas = canvasHeight(110);
const heightObstacles = ((heightCanvas * 10) / 100);
const posX = 30
const posY = heightObstacles;


let posObstacles = [
	{
		x: posX * 0,
		y: posY,
		nameObstacle: "obstacle1"
	},
	{
		x: posX * 1,
		y: posY * 2,
		nameObstacle: "obstacle2"
	},
	{
		x: posX * 4,
		y: posY * 3,
		nameObstacle: "obstacle3"
	},
	{
		x: posX * 5,
		y: posY * 4,
		nameObstacle: "obstacle4"
	},
	{
		x: posX * 2,
		y: posY * 5,
		nameObstacle: "obstacle5"
	},
	{
		x: posX * 3,
		y: posY * 6,
		nameObstacle: "obstacle6"
	},
	{
		x: posX * 7,
		y: posY * 7,
		nameObstacle: "obstacle6"
	},
	{
		x: posX * 6,
		y: posY * 8,
		nameObstacle: "obstacle6"
	},
]

export default posObstacles