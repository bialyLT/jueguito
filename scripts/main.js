import Obstacle from './classes/Obstacle.js';
import Rectangle from './classes/Rectangle.js';
import Circle from './classes/Circle.js';
import posObstacles from './createObstacles.js';
import canvasHeight from './canvasHeight.js';

const { round, pow, sqrt } = Math;
const fps = 60;
const leveltitle = document.getElementById('level')
const alertLose = document.getElementById('alertLose')
const alertStart = document.getElementById('alertStart')
const buttonStart = document.getElementById('buttonStart')
const main = document.getElementById('main')
const info = document.getElementById('info')
const bestLevel = document.getElementById('bestLevel')
let startButton = false



// variables para calcular las alturas del canvas y sus objetos de manera relativa

const heightCanvas = canvasHeight(85);
const heightRectangles = ((heightCanvas * 10) / 100);
const posRectStart = (heightCanvas - heightRectangles);
const posCircleStart = (posRectStart + 20)


//creacion de los objetos

const arrayObstacles = posObstacles.map(p=> new Obstacle(p.nameObstacle, p.x, p.y));
const circle = new Circle(150, posCircleStart)
const rectstart = new Rectangle (0, posRectStart)
const rectend = new Rectangle (0,0)


// funcion para detectar el mouse dentro del canvas

const oMousePos = function(canvas, e) {
	const ClientRect = canvas.getBoundingClientRect()
	  return {
	  x: round(e.clientX - ClientRect.left),
	  y: round(e.clientY - ClientRect.top)
  }
}


// funcion para detectar tactil en canvas
const oTouchPos = function(canvas, e) {
	const ClientRect = canvas.getBoundingClientRect()
	  return {
	  x: round(e.touches[0].clientX - ClientRect.left),
	  y: round(e.touches[0].clientY - ClientRect.top)
  }
}

// funcion para calcular distancia entre dos objetos 2d
const dis = (obj1x, obj2x, obj1y, obj2y) => {
	let d
	 d = sqrt(pow(obj1x - obj2x, 2) + pow(obj1y - obj2y, 2))
	 return d
}

// funcion para que circle se choque con todos los obstaculos
const touchObs = function() {
	const d = [];
	arrayObstacles.forEach(c => {
		d.push(dis(c.x+15, circle.x, c.y+15, circle.y).toFixed(0));
	})
	d.forEach(o => {
		if (o < 30) {
			loseGame()
			circle.move = false
		}
	})
	return d
}


// funcion para que suba de nivel por cada vez que circle toca un rectangulo
let velObstacleLeft = 1;
let velObstacleRight = 1;
let circleEnding = true

const touchRect = function() {
	if (circleEnding == true) {
		const evenObs = arrayObstacles.map(p =>(p % 2 == 0))
		if (circle.y < heightRectangles && evenObs) {
			velObstacleLeft += 1
			circleEnding = false
		}
	}
	else {
		if (circle.y > posRectStart) {
			velObstacleRight += 1
			circleEnding = true
		}
	}
}




// funcion para redibujar el canvas
const deleteCanvas = () => {
	canvas.width = 300
	canvas.height = heightCanvas
}
// FUNCIONES DE NIVELES


// funcion para cambiar el numero de nivel



const changeLevel = () => {
	let level = velObstacleRight
	leveltitle.innerHTML = `Nivel ${level}`
}

// funcion para imprimir en pantalla que perdiste
const  loseGame = () => {
	if (circle.move == false) {
		alertLose.innerHTML = `Buen intento!`
		alertLose.style.visibility = 'visible'
	}
}

// funcion para crear record

const recordGame = (velfinal) => {
	let record = velfinal
	bestLevel.innerHTML = `New Best: ${record}`
}



//bucles principales
let startGame = () => {
	setInterval(() => {
		mainDraw()
		mainRules()
	}, 1000/fps)
}

const mainDraw = () => {
	deleteCanvas()
	arrayObstacles.forEach(d => {
		d.draw()
		if (circle.move == true) {
			d.move(velObstacleLeft, velObstacleRight)
		}
	})
	rectstart.draw()
	rectend.draw()
	circle.draw()
}
const mainRules = () => {
	circle.stop()
	touchObs()
	touchRect()
	changeLevel(velObstacleRight)
	loseGame()
}







//escucha de eventos



// escucha de mouse
canvas.addEventListener('mousedown', (e) =>{
	velObstacleRight = 1
	velObstacleLeft = 1
	let mouseStart = e.isTrusted
	alertLose.style.visibility = 'hidden'
	circle.move = true
	canvas.style.cursor = 'none'
	canvas.addEventListener('mousemove', (e) =>{
		if (mouseStart == true) {
			// condicion para que no toque las paredes ni los cuadrados
			if (circle.move == true && circle.x > 20 && circle.x < 280 && circle.y > 20 && circle.y < (heightCanvas - 10) ) {
				circle.drag(oMousePos(canvas, e).x,oMousePos(canvas, e).y)
			}
			else {
				loseGame()
				circle.move = false
			}
		}
		})
		canvas.addEventListener('mouseup', (e) => {
			canvas.style.cursor = 'default'
			loseGame()
			circle.move = false
	})
})

//escucha de tactil

canvas.addEventListener('touchstart', (e) => {
	velObstacleRight = 1
	velObstacleLeft = 1
	let touchstart = e.isTrusted
	alertLose.style.visibility = 'hidden'
	circle.move = true
	canvas.style.cursor = 'none'
	canvas.addEventListener('touchmove', (e) =>{
		if (touchstart == true){
			// condicion para que no toque las paredes ni los cuadrados
			if (circle.move == true && circle.x > 20 && circle.x < 280 && circle.y > 20 && circle.y < (heightCanvas - 10) ) {
					circle.drag(oTouchPos(canvas, e).x,oTouchPos(canvas, e).y)
			}
			else {
				loseGame()
				circle.move = false
			}
			}
	},{passive: true})
	canvas.addEventListener('touchend', (e) => {
		loseGame()
		canvas.style.cursor = 'default'
		circle.move = false
	},{passive: true})
},{passive: true})


// escucha del boton start




buttonStart.addEventListener('click', () => {
	canvas.style.border = '5px solid #000'
	alertStart.style.visibility = 'visible'
	info.style.visibility = 'visible'
	setTimeout(() => {
		alertStart.style.visibility = 'hidden'
	}, 3000);
	if (!main.elementFullscreen) {
		main.requestFullscreen();
	}
	buttonStart.style.display = 'none';
	if (startButton == false) {
		startButton = true
		startGame()

	}
})

// escucha del boton de informacion

info.addEventListener('click', () => {
	alertStart.style.visibility = 'visible'
	setTimeout(() => {
		alertStart.style.visibility = 'hidden'
	}, 4000);
})




