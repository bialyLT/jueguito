import Obstacle from './classes/Obstacle.js';
import Rectangle from './classes/Rectangle.js';
import Circle from './classes/Circle.js';
import posObstacles from './createObstacles.js';

const { round, pow, sqrt } = Math;
const fps = 60;
const leveltitle = document.getElementById('level')
const alertLose = document.getElementById('alertLose')
const alertStart = document.getElementById('alertStart')
const buttonStart = document.getElementById('buttonStart')
const body = document.getElementById('body')
const info = document.getElementById('info')
let startButton = false


//creacion de los objetos

const arrayObstacles = posObstacles.map(p=> new Obstacle(p.nameObstacle, p.x, p.y));
const circle = new Circle(150, 660)
const rectstart = new Rectangle (0, 622)
const rectend = new Rectangle (0,0)



// funcion para detectar el mouse dentro del canvas

const oMousePos = function(canvas, e) {
	const ClientRect = canvas.getBoundingClientRect()
	  return {
	  x: round(e.clientX - ClientRect.left),
	  y: round(e.clientY - ClientRect.top)
  }
}


// funcion para calcular distancia entre dos objetos 2d
const dis = (obj1x, obj2x, obj1y, obj2y) => {
	let d
	 d = sqrt(pow(obj1x - obj2x, 2) + pow(obj1y - obj2y, 2))
	 return d
}

// funcion para que todos circle se choque con todos los obstaculos
const touchObs = function() {
	const d = [];
	arrayObstacles.forEach(c => {
		d.push(dis(c.x+15, circle.x, c.y+15, circle.y).toFixed(0));
	})
	d.forEach(o => {
		if (o < 30) {
			loseGame()
			circle.move = false
			setTimeout(() => {
				location.reload()
			}, 2000);
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
		if (circle.y < 80 && evenObs) {
			velObstacleLeft += 1
			circleEnding = false
		}
	}
	else {
		if (circle.y > 620) {
			velObstacleRight += 1
			circleEnding = true
		}
	}
}




// funcion para redibujar el canvas
const deleteCanvas = () => {
	canvas.width = 300
	canvas.height = 700
}

// FUNCIONES DE NIVELES


// funcion para cambiar el numero de nivel



const changeLevel = () => {
	let level = velObstacleRight
	leveltitle.innerHTML = `Nivel ${level}`
	console.log(velObstacleRight)
}

// funcion para imprimir en pantalla que perdiste
const  loseGame = () => {
	if (circle.move == false) {
		alertLose.style.visibility = 'visible'
		alertLose.innerHTML = `Buen intento! `
	}
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
	changeLevel()
	loseGame()
}







//escucha de eventos



// escucha de mouse
canvas.addEventListener('mousedown', () =>{
	circle.move = true
	canvas.style.cursor = 'none'
	canvas.addEventListener('mousemove', (e) =>{
		// condicion para que no toque las paredes ni los cuadrados
		if (circle.move == true && circle.x > 20 && circle.x < 280 && circle.y > 20 && circle.y < 690 ) {
				circle.drag(oMousePos(canvas, e).x,oMousePos(canvas, e).y)
		}
		else {
			loseGame()
			circle.move = false
			setTimeout(() => {
				location.reload()
			}, 2000);
		}
	})
	canvas.addEventListener('mouseup', (e) => {
		canvas.style.cursor = 'default'
		circle.move = false
	})
})

//escucha de tactil

canvas.addEventListener('touchstart', (e) => {
	e.preventDefault()
	circle.move = true
	canvas.addEventListener('touchmove', (e) => {
		e.preventDefault()
		if (circle.move == true && circle.x > 20 && circle.x < 280 && circle.y > 20 && circle.y < 690 ) {
			circle.drag(oMousePos(canvas, e).x,oMousePos(canvas, e).y)
	}
	else {
		loseGame()
		circle.move = false
		setTimeout(() => {
			location.reload()
		}, 2000);
	}
	})
	canvas.addEventListener('touchend', (e) => {
		e.preventDefault()
		circle.move = false
	})
})

// escucha del boton start




buttonStart.addEventListener('click', () => {
	alertStart.innerHTML = `Sube hasta el final al redondito blanco y vuelve al mismo lugar!`
	alertStart.style.visibility = 'visible'
	setTimeout(() => {
		alertStart.style.visibility = 'hidden'
	}, 3000);
	if (body.requestFullscreen) {
		body.requestFullscreen();
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