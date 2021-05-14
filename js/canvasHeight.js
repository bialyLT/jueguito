// funcion que devuelve el alto del canvas relativo al navegador para que sea responsive

const domHeight = window.innerHeight;
let canvasHeight = (porc) => {
	canvasHeight = (( domHeight * porc) / 100)
	return canvasHeight
}
export default canvasHeight